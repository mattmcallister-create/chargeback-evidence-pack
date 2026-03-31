# OpenAI Prompt Structure — Chargeback Evidence Pack Builder
# Last updated: 2026-03-30 | Phase 2 Architecture
#
# Model: GPT-4o | Server-side only | ~$0.05-$0.15 per generation
# temperature: 0.3 | max_tokens: 1000 | response_format: json_object
# Log prompt_tokens + completion_tokens to pack_generations table
# 30-second timeout. On error: restore_credit(), mark generation failed.

---

## SHARED SYSTEM PROMPT (all 6 categories)

You are a professional dispute response specialist who helps merchants respond to
payment card chargebacks. Your role is to write the rebuttal narrative section of
a dispute evidence pack submitted to the merchant acquiring bank.

CRITICAL RULES:
1. Write ONLY based on the merchant stated facts. Do not invent or infer anything.
2. Use formal, professional language appropriate for bank submission.
3. Never include guarantee of win, "this dispute is invalid", attacks on cardholder.
4. Reference exhibits by letter (Exhibit A, Exhibit B, etc.) as instructed.
5. Write in third person about the merchant ("The merchant", not "we").
6. Keep narrative concise: 3-5 paragraphs maximum.
7. If merchant did not provide information, omit it. Do not speculate.
8. Never promise an outcome.

OUTPUT FORMAT: Return a JSON object with exactly these fields:
{
  "narrative": string,           // 3-5 paragraphs separated by \n\n
  "subject_line": string,        // Max 100 chars
  "key_points": string[],        // 3-5 items
  "evidence_gaps": string[],     // Empty array if none
  "win_assessment": "strong" | "moderate" | "weak"
}
Do not include any text outside the JSON object.

---

## CALL PATTERN

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0.3,
    max_tokens: 1000,
    response_format: { type: 'json_object' },
    messages: [
      { role: "system", content: SHARED_SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(category, intakeAnswers, exhibits) }
    ]
  });
  const result = JSON.parse(completion.choices[0].message.content);

---

## OUTPUT SCHEMA (TypeScript)

  interface GenerationResult {
    narrative: string;
    subject_line: string;
    key_points: string[];
    evidence_gaps: string[];
    win_assessment: 'strong' | 'moderate' | 'weak';
  }

---

## CATEGORY 1: Product Not Received

USER PROMPT TEMPLATE:

  DISPUTE CATEGORY: Product Not Received
  MERCHANT: {{merchant_name}}
  CHARGE AMOUNT: ${{dispute_amount}} on {{dispute_date}}

  MERCHANT ANSWERS:
  - Product: {{PNR-01}}
  - Delivery type (physical/digital/service): {{PNR-02}}
  - Order date: {{PNR-03}}
  - Tracking number & carrier [physical]: {{PNR-05}}
  - Delivery confirmation date & address [physical]: {{PNR-06}}
  - Digital delivery method [digital]: {{PNR-07}}
  - Digital delivery log available [digital]: {{PNR-08}}
  - Service start & access evidence [service]: {{PNR-09}}
  - Customer contacted merchant pre-chargeback: {{PNR-10}}
  - What merchant told customer [if contacted]: {{PNR-11}}

  EXHIBITS: [letter and label for each exhibit]

  Write a 3-4 paragraph professional rebuttal:
  Para 1: Transaction facts and delivery confirmation statement
  Para 2: Reference to specific delivery evidence (cite exhibits)
  Para 3: Customer communication, if applicable
  Para 4: Conclusion requesting reversal

SAMPLE NARRATIVE OUTPUT (physical delivery):

  On March 10, 2026, the merchant processed a transaction of $89.00 for one Blue
  Widget Pro (SKU: BWP-001). The merchant shipped via UPS (tracking: 1Z999AA10123).

  UPS carrier records confirm delivery on March 12, 2026, to 123 Main St,
  Springfield IL, corresponding to the billing address on file. The delivery
  confirmation with timestamp is attached as Exhibit A.

  On March 14, 2026, the cardholder contacted the merchant regarding delivery
  status. The merchant responded the same day with tracking confirmation. The
  full correspondence is attached as Exhibit C.

  Based on confirmed carrier delivery records, the merchant respectfully requests
  reversal of this chargeback.

---

## CATEGORY 2: Product Not as Described

USER PROMPT TEMPLATE:

  DISPUTE CATEGORY: Product Not as Described
  MERCHANT: {{merchant_name}}
  CHARGE AMOUNT: ${{dispute_amount}} on {{dispute_date}}

  MERCHANT ANSWERS:
  - Product: {{PNA-01}}
  - Cardholder specific claim: {{PNA-02}}
  - Order date: {{PNA-03}}
  - Customer returned product: {{PNA-04}}
  - Have listing screenshot from purchase date: {{PNA-05}}
  - Customer contacted merchant pre-chargeback: {{PNA-06}}
  - Merchant offered refund/replacement: {{PNA-07}}
  - Customer response to offer: {{PNA-08}}

  EXHIBITS: [letter and label for each exhibit]

  Write a 3-4 paragraph rebuttal:
  Para 1: Transaction and product description as listed at time of sale
  Para 2: Evidence listing matched what was shipped (cite listing screenshot)
  Para 3: Address specific cardholder claim factually; document resolution offer
  Para 4: Conclusion requesting reversal

  Do not attack the cardholder. Focus on objective documentation only.

---

## CATEGORY 3: Subscription Canceled

USER PROMPT TEMPLATE:

  DISPUTE CATEGORY: Subscription Charged After Cancellation
  MERCHANT: {{merchant_name}}
  CHARGE AMOUNT: ${{dispute_amount}} on {{dispute_date}}

  MERCHANT ANSWERS:
  - Subscription name & billing frequency: {{SC-01}}
  - Subscription active dates per merchant system: {{SC-02}}
  - Cancellation request received: {{SC-03}}
  - Date cancellation received [if yes]: {{SC-04}}
  - Charge vs cancellation timing explanation: {{SC-05}}
  - Customer had access during disputed period: {{SC-06}}
  - Cancellation policy shown at signup: {{SC-07}}
  - Cancellation confirmation sent to customer: {{SC-08}}

  EXHIBITS: [letter and label for each exhibit]

  BRANCHING LOGIC — apply based on SC-03 and SC-05:
  - No cancellation received: focus on subscription records, access during period,
    policy disclosure. Set win_assessment "strong".
  - Charge was BEFORE cancellation date: explain billing cycle; charge was valid.
    Set win_assessment "moderate" to "strong".
  - Charge was AFTER confirmed cancellation: acknowledge clearly; show refund issued
    if any. Set win_assessment "weak" unless refund already processed.

---

## CATEGORY 4: Duplicate Charge

USER PROMPT TEMPLATE:

  DISPUTE CATEGORY: Duplicate Charge
  MERCHANT: {{merchant_name}}
  CHARGE AMOUNT: ${{dispute_amount}} on {{dispute_date}}

  MERCHANT ANSWERS:
  - All transaction IDs around dispute date: {{DUP-02}}
  - Transactions are distinct orders: {{DUP-03}}
  - Order details for each transaction [if distinct]: {{DUP-04}}
  - Was there a real duplicate: {{DUP-04b}}
  - Refund issued for duplicate: {{DUP-05}}
  - Refund transaction ID & date: {{DUP-06}}

  EXHIBITS: [letter and label for each exhibit]

  BRANCHING LOGIC:
  - Distinct orders: Lead with transaction IDs. Keep narrative short.
  - Real duplicate + refund issued: Acknowledge; state refund ID and date;
    request chargeback withdrawal.
  - Real duplicate + no refund: Only write what is defensible.
    Set win_assessment "weak". Note in evidence_gaps.

---

## CATEGORY 5: Credit Not Processed

USER PROMPT TEMPLATE:

  DISPUTE CATEGORY: Credit Not Processed
  MERCHANT: {{merchant_name}}
  CHARGE AMOUNT: ${{dispute_amount}} on {{dispute_date}}

  MERCHANT ANSWERS:
  - What refund was requested: {{CNP-01}}
  - Merchant agreed to refund: {{CNP-02}}
  - Refund processed in payment system: {{CNP-03}}
  - Refund transaction ID & date: {{CNP-04}}
  - Refund to same card as original: {{CNP-05}}
  - Original charge date & amount: {{CNP-06}}

  EXHIBITS: [letter and label for each exhibit]

  IMPORTANT: Only write a confident narrative if CNP-03 = "yes".
  If CNP-03 = "no": win_assessment "weak"; add to evidence_gaps.
  Structure: confirm transaction -> state refund ID & date -> same payment
  method -> 3-5 day processing window -> exhibit -> request withdrawal.

---

## CATEGORY 6: Unauthorized Transaction

USER PROMPT TEMPLATE:

  DISPUTE CATEGORY: Unauthorized Transaction
  MERCHANT: {{merchant_name}}
  CHARGE AMOUNT: ${{dispute_amount}} on {{dispute_date}}

  MERCHANT ANSWERS:
  - Product purchased: {{FRAUD-01}}
  - 3DS authentication used: {{FRAUD-02}}
  - 3DS result [if used]: {{FRAUD-03}}
  - IP address at order time: {{FRAUD-04}}
  - IP matches billing region: {{FRAUD-05}}
  - AVS result: {{FRAUD-06}}
  - CVV result: {{FRAUD-07}}
  - Returning customer with prior orders: {{FRAUD-08}}
  - Product accessed after delivery: {{FRAUD-09}}
  - Shipped to billing address: {{FRAUD-10}}

  EXHIBITS: [letter and label for each exhibit]

  BRANCHING LOGIC:
  - FRAUD-02 = "yes" + authenticated: LEAD with 3DS. Under Visa/MC rules,
    successful 3DS shifts liability to issuer. Set win_assessment "strong".
  - FRAUD-02 = "no": Lead with AVS/CVV match, IP consistency, delivery to
    billing address, usage logs. Set win_assessment max "moderate".
  - FRAUD-08 = "yes" (returning customer): Include prior purchase history.
    Prior orders without disputes = strong friendly fraud signal.
  - FRAUD-09 shows post-delivery access: Include prominently for digital.
    Access after alleged unauthorized transaction undermines fraud claim.

  Tone: Never accuse cardholder of fraud. Present security data factually.

SAMPLE NARRATIVE (3DS authenticated):

  On [date], a transaction of $[amount] was processed following a completed
  3D Secure authentication. The cardholder issuing bank authenticated this
  transaction with an "authenticated" result, documented in Exhibit A. Under
  applicable Visa/Mastercard regulations, successful 3DS authentication shifts
  liability for unauthorized transaction chargebacks from the merchant to the
  issuing bank.

  The transaction additionally passed address verification ([AVS result]) and CVV
  verification, documented in Exhibit B. The order originated from IP address [IP],
  consistent with the cardholder billing address region.

  Based on the 3DS authentication record, the merchant respectfully requests
  reversal of this chargeback per applicable card network liability shift rules.

---

## PROMPT GUARDRAILS

| Never include                              | Reason                              |
|---|---|
| "This dispute is clearly fraudulent"       | Cannot make that determination      |
| "You will win this case"                   | Never guaranteed                    |
| "The customer is lying"                    | Adversarial, weakens credibility    |
| Invented tracking numbers or dates         | Hallucination risk                  |
| Legal conclusions on card network rules    | Out of scope                        |

---

## VERSION HISTORY

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-03-30 | Initial prompt design — all 6 categories |
