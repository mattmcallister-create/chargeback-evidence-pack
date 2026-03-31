# Evidence Matrix — Chargeback Evidence Pack Builder
# Last updated: 2026-03-30 | Phase 2 Architecture
#
# This file is the authoritative source for:
#   - Which dispute categories are supported in v1
#   - What evidence is required/optional per category
#   - What intake questions to ask the merchant
#   - How to structure the narrative for each category
#   - What wins and loses disputes for each category
#
# Format: One section per dispute category.
# Intake questions feed the OpenAI prompt. Evidence checklist drives the UI.
# This file must be read by the generation engine at runtime.

---

## SUPPORTED CATEGORIES (v1)

| # | Internal Key | Display Name | Stripe Reason Code | Visa Code | Mastercard Code |
|---|---|---|---|---|---|
| 1 | product_not_received | Product Not Received | product_not_received | 30 | 4853 |
| 2 | product_unacceptable | Product Not as Described | product_unacceptable | 53 | 4853 |
| 3 | subscription_canceled | Subscription Canceled | subscription_canceled | 41 | 4841 |
| 4 | duplicate | Duplicate Charge | duplicate | 12.6.1 | 4834 |
| 5 | credit_not_processed | Credit Not Processed | credit_not_processed | 13.7 | 4860 |
| 6 | fraudulent | Unauthorized Transaction | fraudulent | 10.4 | 4853 |

Response window: typically 7–30 days from chargeback date (network and bank dependent).
Show deadline tracker prominently. Never guarantee a deadline — confirm with their processor.

---

## CATEGORY 1: Product Not Received (product_not_received)

### What this chargeback means
Cardholder claims they paid but never received the product or service.
Most common in physical goods, digital goods with delivery issues, and SaaS with access problems.

### Critical question for intake triage
"Was this a physical shipment, digital delivery, or service/access grant?"
Answer determines which evidence applies.

### Intake Questions (feed to OpenAI prompt)

| # | Question | Type | Required | Notes |
|---|---|---|---|---|
| Q1 | What did the customer purchase? (product name, SKU, or service) | text | yes | |
| Q2 | Was this a physical product or digital/service delivery? | select: physical / digital / service | yes | Branches evidence checklist |
| Q3 | What is the order date? | date | yes | |
| Q4 | What is the order amount? | currency | yes | |
| Q5 | For physical: What is the tracking number and carrier? | text | if physical | |
| Q6 | For physical: What is the delivery confirmation date and address? | text + date | if physical | |
| Q7 | For digital: How was the product delivered? (email, download link, account access) | text | if digital | |
| Q8 | For digital: Do you have server logs or delivery receipt showing the item was sent? | text | if digital | |
| Q9 | For service: What date did service begin? What did the customer access or use? | text + date | if service | |
| Q10 | Did the customer contact you before filing the chargeback? | yes/no | yes | |
| Q11 | If yes: What did you tell them and when? | text | if yes | |
| Q12 | Did you attempt to resolve this before the chargeback? | text | no | |

### Evidence Checklist

**Critical (missing = weak case):**
- [ ] Proof of delivery (tracking + carrier confirmation, or digital delivery log)
- [ ] Order confirmation showing product, amount, date, shipping address
- [ ] Signed delivery receipt (physical only, if available)
- [ ] Screenshot of delivery confirmation email sent to cardholder

**Strong supporting:**
- [ ] IP address log showing access to digital product
- [ ] Download log or access event log with timestamp
- [ ] Terms of service accepted by customer (with date)
- [ ] Communication log with customer (emails, support tickets)

**Optional but helpful:**
- [ ] Refund policy shown to customer at checkout
- [ ] Customer account activity showing product use
- [ ] Carrier website screenshot showing delivered status with GPS confirmation

### Evidence Gap Detection Rules
- Physical: no tracking = flag as CRITICAL MISSING
- Digital: no delivery log or access log = flag as CRITICAL MISSING
- Both: no order confirmation = flag as CRITICAL MISSING

### Narrative Structure for GPT-4o
1. Opening: State clearly that the product was delivered on [date] to [address/email]
2. Delivery proof: Reference the specific evidence attached (exhibit A, B, etc.)
3. Customer contact history: If they contacted you, show you responded in good faith
4. Resolution attempt: If you offered a resolution, document it
5. Conclusion: Request chargeback reversal based on documented delivery

### Win Conditions
- Carrier tracking showing delivered to billing address
- Digital delivery log with IP match to cardholder's known location
- Customer accessed the product after delivery (usage logs)
- Customer contacted support after delivery (proving receipt)

### Lose Conditions
- No tracking number
- Delivered to a different address than billing address (without authorization)
- Customer never accessed digital product at all
- No response to customer's pre-chargeback complaint

---

## CATEGORY 2: Product Not as Described (product_unacceptable)

### What this chargeback means
Cardholder claims the item received was materially different from what was described,
was defective, or was counterfeit. Subjective disputes are harder to win. Focus on
objective evidence: did the product match the listing description at time of sale?

### Critical question for intake triage
"What specifically is the customer claiming is wrong with the product?"
This determines whether this is a description mismatch, defect, or buyer's remorse.

### Intake Questions (feed to OpenAI prompt)

| # | Question | Type | Required | Notes |
|---|---|---|---|---|
| Q1 | What did the customer purchase? (product name, description) | text | yes | |
| Q2 | What is the customer claiming was wrong? | text | yes | Key for narrative |
| Q3 | What is the order date? | date | yes | |
| Q4 | Did the customer return the product? | yes/no | yes | |
| Q5 | If returned: Was it in the same condition as shipped? | text | if yes | |
| Q6 | Do you have a screenshot of the product listing at time of purchase? | yes/no | yes | |
| Q7 | Does your current listing match what the customer received? | yes/no | yes | |
| Q8 | Did the customer contact you to complain before the chargeback? | yes/no | yes | |
| Q9 | If yes: What was the complaint and how did you respond? | text | if yes | |
| Q10 | Did you offer a refund or replacement? | yes/no | yes | |
| Q11 | If offered: What was the customer's response? | text | if yes | |
| Q12 | Do you have photos of the product as shipped? | yes/no | no | |

### Evidence Checklist

**Critical:**
- [ ] Product listing screenshot at time of purchase (shows description, photos, specs)
- [ ] Invoice or order confirmation showing what was sold
- [ ] Photos of the product as packaged and shipped (if available)
- [ ] Return policy shown to customer at checkout

**Strong supporting:**
- [ ] Customer communication showing complaint and your response
- [ ] Documentation that you offered a refund/resolution and customer declined
- [ ] Third-party review or certification of product quality
- [ ] Comparison photos: listing vs actual product

**If return dispute:**
- [ ] Return tracking showing condition on arrival
- [ ] Photos of returned item showing it does not match original condition

### Evidence Gap Detection Rules
- No product listing screenshot = flag as HIGH PRIORITY
- Customer complained and no response documented = flag as HIGH PRIORITY

### Narrative Structure for GPT-4o
1. Product description: State what was listed and sold, matching exhibit
2. Accurate representation: Reference listing screenshot showing match to what was delivered
3. Customer contact: Address their specific complaint with your documented response
4. Resolution offered: If refund/replacement was offered, document it
5. Return condition: If return attempted, address condition dispute
6. Conclusion: Request reversal because product matched description

### Win Conditions
- Clear product listing that matches what was shipped
- Customer never complained before filing chargeback (buyer's remorse indicator)
- Customer refused offered refund/replacement
- Defect claim is clearly subjective with no supporting evidence from cardholder

### Lose Conditions
- Product listing was vague or misleading
- Product photos did not match actual product
- Merchant ignored customer complaint
- Merchant did not offer any resolution

---

## CATEGORY 3: Subscription Canceled (subscription_canceled)

### What this chargeback means
Cardholder claims they canceled a subscription but continued to be charged.
Often involves: cancellation not processed correctly, confusing cancellation flow,
or customer canceled with wrong party (e.g., app store vs merchant directly).

### Critical question for intake triage
"Was the subscription sold through a third party (app store, marketplace) or directly?"
Direct subscriptions = merchant controls cancellation. Third party = different rules.

### Intake Questions (feed to OpenAI prompt)

| # | Question | Type | Required | Notes |
|---|---|---|---|---|
| Q1 | What subscription was the customer charged for? | text | yes | |
| Q2 | What was the billing frequency and amount? | text | yes | |
| Q3 | When does your system show the subscription was active? (start and end date) | date range | yes | |
| Q4 | Did the customer submit a cancellation request? | yes/no | yes | |
| Q5 | If yes: On what date did you receive the cancellation? | date | if yes | |
| Q6 | When was the disputed charge processed relative to the cancellation? | text | yes | Key: charge before or after cancel? |
| Q7 | Was the cancellation processed correctly in your system? | yes/no | yes | |
| Q8 | Did the customer have access to the service during the disputed billing period? | yes/no | yes | |
| Q9 | What does your cancellation policy say? (billing cycle, proration, etc.) | text | yes | |
| Q10 | Was the cancellation policy disclosed at signup? | yes/no | yes | |
| Q11 | Did you send a cancellation confirmation to the customer? | yes/no | yes | |
| Q12 | Did the customer contact you about the unwanted charge? | yes/no | yes | |

### Evidence Checklist

**Critical:**
- [ ] Subscription agreement signed/accepted by customer (with date)
- [ ] Cancellation policy as shown at signup
- [ ] Your system's record showing subscription status on date of charge
- [ ] Proof that customer had access to service during disputed billing period

**Strong supporting:**
- [ ] Cancellation request log (if received — date/time stamped)
- [ ] Cancellation confirmation email sent to customer
- [ ] Login/usage activity log showing service was accessed during disputed period
- [ ] Any refund issued (partial or full) with date

**If no cancellation was received:**
- [ ] Customer service records showing no cancellation request was received
- [ ] Screenshot of your cancellation flow showing it was accessible and clear

### Evidence Gap Detection Rules
- Charge occurred AFTER a confirmed cancellation date = flag as CRITICAL (very hard to win)
- No subscription agreement = flag as HIGH PRIORITY
- No usage logs for disputed period = flag as MEDIUM

### Narrative Structure for GPT-4o
1. Subscription status: State when subscription was active per your records
2. Cancellation record: State whether a cancellation was received and when
3. Charge timing: Explain the charge relative to billing cycle and cancellation date
4. Policy disclosure: Reference cancellation policy shown at signup
5. Service access: Document that service was available/used during period
6. Resolution: If any credit was offered, document it
7. Conclusion: Request reversal based on subscription terms compliance

### Win Conditions
- Charge occurred before customer's cancellation date
- Customer had access and used the service during the charged period
- Cancellation policy was clearly disclosed at signup
- Customer never submitted a cancellation before the disputed charge

### Lose Conditions
- Charge clearly occurred after confirmed cancellation date
- Cancellation policy was buried or unclear
- Customer submitted cancellation and it wasn't processed
- No record of service access during disputed period

---

## CATEGORY 4: Duplicate Charge (duplicate)

### What this chargeback means
Cardholder claims they were charged multiple times for the same transaction.
This is the most binary dispute — either it's a legitimate duplicate or it isn't.
Technical evidence (transaction IDs, timestamps) is decisive.

### Critical question for intake triage
"What are the transaction IDs and timestamps for all charges the customer is referencing?"
If you can show they are distinct transactions (different orders), this is highly winnable.

### Intake Questions (feed to OpenAI prompt)

| # | Question | Type | Required | Notes |
|---|---|---|---|---|
| Q1 | What is the disputed charge amount and date? | currency + date | yes | |
| Q2 | What are ALL transaction IDs associated with charges to this customer on or around that date? | text | yes | Core evidence |
| Q3 | Do all transactions correspond to distinct orders? | yes/no | yes | |
| Q4 | If distinct orders: What are the order details for each (product, date, amount)? | text | if yes | |
| Q5 | Was there a legitimate duplicate caused by a system error? | yes/no | yes | |
| Q6 | If system error: Was a refund already issued? | yes/no | if yes | |
| Q7 | If refund issued: What is the refund transaction ID and date? | text | if yes | |
| Q8 | Did the customer contact you about the duplicate before filing the chargeback? | yes/no | yes | |

### Evidence Checklist

**Critical:**
- [ ] Transaction records showing all charges (Stripe dashboard export or equivalent)
- [ ] Order records proving distinct orders for each transaction
- [ ] Timestamps and transaction IDs for all charges

**Strong supporting:**
- [ ] Refund confirmation (if duplicate was real and refund was issued)
- [ ] Customer email confirmation for each order (showing they are different)
- [ ] IP/device logs showing separate sessions for each purchase
- [ ] Cart/checkout session logs showing distinct purchase events

**If duplicate was real:**
- [ ] Refund issued date and confirmation
- [ ] Explanation of what caused the duplicate and what was done to prevent recurrence

### Evidence Gap Detection Rules
- No transaction IDs = flag as CRITICAL MISSING
- If duplicate was real and no refund issued = advise merchant to issue refund before responding

### Narrative Structure for GPT-4o
1. Transaction identification: List all relevant transaction IDs with dates and amounts
2. Distinct orders: Explain each transaction corresponds to a separate order
3. Order evidence: Reference order confirmations for each transaction
4. If true duplicate: Acknowledge it, show refund issued with date and amount
5. Conclusion: Request reversal because transactions are distinct, or because refund already processed

### Win Conditions
- Distinct transaction IDs with different order details
- Separate order confirmations showing different products/dates/sessions
- Refund already issued for confirmed duplicate

### Lose Conditions
- Same amount, same day, same product — hard to argue not a duplicate
- No refund issued for a real duplicate
- No transaction records to differentiate the charges

---

## CATEGORY 5: Credit Not Processed (credit_not_processed)

### What this chargeback means
Cardholder claims the merchant agreed to issue a refund but the credit never appeared.
Often caused by: refund processed to wrong card, refund not completed in system,
merchant offered store credit but cardholder expected cash refund.

### Critical question for intake triage
"Was a refund promised? And was it actually processed in your payment system?"
If refund was processed, this is about proof. If not, you may need to issue it first.

### Intake Questions (feed to OpenAI prompt)

| # | Question | Type | Required | Notes |
|---|---|---|---|---|
| Q1 | What did the customer return or request a refund for? | text | yes | |
| Q2 | Did you agree to issue a refund? | yes/no | yes | |
| Q3 | Was the refund processed in your payment system? | yes/no | yes | Core split |
| Q4 | If processed: What is the refund transaction ID and date? | text | if yes | |
| Q5 | If processed: Was it to the same card as the original charge? | yes/no | if yes | |
| Q6 | If not processed: Why not? (still pending, policy dispute, store credit offered instead) | text | if no | |
| Q7 | Was the refund in the form of store credit instead of original payment method? | yes/no | no | |
| Q8 | If store credit: Was this disclosed and did customer agree? | text | if yes | |
| Q9 | What was the original charge date and amount? | date + currency | yes | |
| Q10 | Did the customer communicate about the missing refund before filing? | yes/no | yes | |

### Evidence Checklist

**Critical:**
- [ ] Refund transaction record (Stripe refund ID, amount, date, status: succeeded)
- [ ] Original charge record showing the transaction being refunded
- [ ] Refund confirmation email sent to customer

**Strong supporting:**
- [ ] Customer communication where refund was promised (email, chat log)
- [ ] Timeline showing refund processed before chargeback filing date
- [ ] Bank processing timeline documentation (if refund in transit)

**If store credit was given instead:**
- [ ] Documentation showing customer agreed to store credit
- [ ] Store credit balance showing credit was applied

### Evidence Gap Detection Rules
- Refund promised but not processed = advise issuing it NOW before responding (less damage than chargeback)
- Refund processed to different card = flag as HIGH PRIORITY to document

### Narrative Structure for GPT-4o
1. Refund confirmation: State the refund was processed on [date] with [transaction ID]
2. Timing: Confirm refund was issued before chargeback was filed (if true)
3. Delivery: Note it was credited to the original payment method
4. Processing window: Reference standard bank posting timeline (3–5 business days)
5. Communication: Reference any customer communication about the refund
6. Conclusion: Request chargeback reversal because refund is already on record

### Win Conditions
- Refund transaction ID shows "succeeded" before chargeback date
- Refund issued to same card as original charge
- Customer received refund confirmation email

### Lose Conditions
- No refund was ever processed
- Refund issued to different payment method without authorization
- Store credit given when customer expected cash refund (without clear agreement)

---

## CATEGORY 6: Unauthorized Transaction (fraudulent)

### What this chargeback means
Cardholder (or their bank) claims the transaction was not authorized — either the card
was stolen, or the cardholder doesn't recognize the merchant. This is the most common
chargeback type and the hardest to win for card-not-present merchants without 3DS.

NOTE: For "true fraud" (stolen card), merchants rarely win without 3DS authentication.
This category is most winnable when the cardholder is actually lying (friendly fraud).

### Critical question for intake triage
"Was 3D Secure (3DS) authentication used on this transaction?"
If yes: nearly always winnable. If no: focus on velocity/usage signals.

### Intake Questions (feed to OpenAI prompt)

| # | Question | Type | Required | Notes |
|---|---|---|---|---|
| Q1 | What was purchased and on what date? | text + date | yes | |
| Q2 | Was 3D Secure (3DS/Stripe Radar 3DS) used for this transaction? | yes/no | yes | Determines win probability |
| Q3 | If yes: What is the 3DS authentication result? (authenticated / attempt) | text | if yes | |
| Q4 | What IP address was used to place the order? | text | yes | |
| Q5 | Does the IP address match the billing/shipping address region? | yes/no | yes | |
| Q6 | Was AVS (address verification) attempted and what was the result? | text | yes | |
| Q7 | Was CVV verification used and what was the result? | text | yes | |
| Q8 | Did the customer have a prior account with purchase history? | yes/no | yes | |
| Q9 | If yes: How many prior orders, and did prior orders have disputes? | text | if yes | Friendly fraud signal |
| Q10 | Did the customer log in before placing this order? | yes/no | yes | |
| Q11 | For digital: Was the product accessed after delivery? (IP, login, usage) | text | if digital | |
| Q12 | For physical: Was the product shipped to the billing address? | yes/no | if physical | |
| Q13 | Did the customer receive the product / access the service? | text | yes | Usage = friendly fraud signal |

### Evidence Checklist

**Critical:**
- [ ] 3DS authentication result (if used) — this alone often wins the dispute
- [ ] AVS and CVV match results from transaction
- [ ] IP address and geolocation at time of purchase
- [ ] Signed delivery receipt (physical) or access/download log (digital)

**Strong supporting:**
- [ ] Prior purchase history from same customer (account, email, device)
- [ ] Login event before purchase (timestamp + IP)
- [ ] Device fingerprint / Stripe Radar score
- [ ] Usage logs after delivery (for digital products — proves cardholder received/used it)
- [ ] Shipping address matches billing address

**Friendly fraud signals (include if applicable):**
- [ ] Prior orders from same email/account without disputes
- [ ] Customer service communication after delivery (proves they received it)
- [ ] Social media or other evidence showing customer received item
- [ ] Pattern: this is the cardholder's first ever chargeback vs multiple disputes

### Evidence Gap Detection Rules
- No 3DS and no usage logs = flag as LOW WIN PROBABILITY (advise merchant upfront)
- 3DS authenticated = flag as HIGH WIN PROBABILITY
- Prior disputes from same cardholder = flag as FRIENDLY FRAUD signal

### Warning to include in merchant-facing UI
"Unauthorized transaction disputes are the most common and most difficult to win
without 3D Secure authentication. We'll help you assemble the strongest possible
evidence pack, but the outcome depends heavily on your transaction's authentication
data. We cannot guarantee a reversal."

### Narrative Structure for GPT-4o
1. Authentication: Lead with 3DS result if available — this is the strongest possible opener
2. Transaction signals: AVS, CVV, IP match — show the transaction passed security checks
3. Delivery/access: Document that the product/service was delivered and used
4. Account history: If returning customer, show purchase history without prior disputes
5. Friendly fraud indicators: If applicable, note behavior inconsistent with fraud
6. Conclusion: Request reversal based on transaction security verification

### Win Conditions
- 3DS authentication completed (Visa/MC liability shift to issuer)
- Product delivered to billing address and signed for
- Digital product accessed with IP matching cardholder's region
- Prior purchase history from same customer with no prior disputes
- Customer contacted support after "fraudulent" transaction

### Lose Conditions
- No 3DS authentication used
- No evidence product was received or accessed
- IP address is from a different country than billing address
- First-time customer with no other signals
- No AVS/CVV checks on file

---

## INTAKE QUESTION BANK (all categories, for reference)

The following are all unique intake questions across categories, for use in building
the intake UI. The UI should show only the questions relevant to the selected category.

| Question ID | Category | Question Text | Input Type |
|---|---|---|---|
| PNR-01 | product_not_received | What did the customer purchase? | text |
| PNR-02 | product_not_received | Physical, digital, or service? | select |
| PNR-03 | product_not_received | Order date | date |
| PNR-04 | product_not_received | Order amount | currency |
| PNR-05 | product_not_received | Tracking number and carrier | text |
| PNR-06 | product_not_received | Delivery confirmation date and address | text + date |
| PNR-07 | product_not_received | Digital delivery method | text |
| PNR-08 | product_not_received | Digital delivery log available? | yes/no |
| PNR-09 | product_not_received | Service start date and usage evidence | text + date |
| PNR-10 | product_not_received | Customer contacted you before chargeback? | yes/no |
| PNA-01 | product_unacceptable | What was purchased? | text |
| PNA-02 | product_unacceptable | What does customer claim was wrong? | text |
| PNA-03 | product_unacceptable | Order date | date |
| PNA-04 | product_unacceptable | Customer returned product? | yes/no |
| PNA-05 | product_unacceptable | Have listing screenshot at time of purchase? | yes/no |
| PNA-06 | product_unacceptable | Customer contacted you before chargeback? | yes/no |
| PNA-07 | product_unacceptable | Did you offer refund or replacement? | yes/no |
| SC-01 | subscription_canceled | Subscription name and billing frequency | text |
| SC-02 | subscription_canceled | Subscription active dates per your system | date range |
| SC-03 | subscription_canceled | Cancellation request received? | yes/no |
| SC-04 | subscription_canceled | Date cancellation received | date |
| SC-05 | subscription_canceled | Charge date vs cancellation date | text |
| SC-06 | subscription_canceled | Customer had access during disputed period? | yes/no |
| SC-07 | subscription_canceled | Cancellation policy at signup | text |
| SC-08 | subscription_canceled | Cancellation confirmation sent? | yes/no |
| DUP-01 | duplicate | Disputed charge amount and date | currency + date |
| DUP-02 | duplicate | All transaction IDs for this customer | text |
| DUP-03 | duplicate | Are transactions distinct orders? | yes/no |
| DUP-04 | duplicate | Was duplicate real? | yes/no |
| DUP-05 | duplicate | Refund issued? | yes/no |
| DUP-06 | duplicate | Refund transaction ID and date | text |
| CNP-01 | credit_not_processed | What was returned / what refund was requested? | text |
| CNP-02 | credit_not_processed | Did you agree to issue refund? | yes/no |
| CNP-03 | credit_not_processed | Was refund processed in payment system? | yes/no |
| CNP-04 | credit_not_processed | Refund transaction ID and date | text |
| CNP-05 | credit_not_processed | Refund to same card? | yes/no |
| CNP-06 | credit_not_processed | Original charge date and amount | date + currency |
| FRAUD-01 | fraudulent | What was purchased? | text + date |
| FRAUD-02 | fraudulent | Was 3DS used? | yes/no |
| FRAUD-03 | fraudulent | 3DS authentication result | text |
| FRAUD-04 | fraudulent | IP address at order time | text |
| FRAUD-05 | fraudulent | IP matches billing region? | yes/no |
| FRAUD-06 | fraudulent | AVS result | text |
| FRAUD-07 | fraudulent | CVV result | text |
| FRAUD-08 | fraudulent | Prior account with purchase history? | yes/no |
| FRAUD-09 | fraudulent | Product accessed after delivery? | text |
| FRAUD-10 | fraudulent | Shipped to billing address? | yes/no |

---

## EXHIBIT LABELING CONVENTION

Exhibits must be labeled consistently for the PDF output.

Format: Exhibit [Letter] — [Description]

| Exhibit | Convention | Example |
|---|---|---|
| A | Primary delivery proof | Exhibit A — Carrier Tracking Confirmation |
| B | Order/transaction record | Exhibit B — Order Confirmation #12345 |
| C | Customer communication | Exhibit C — Support Email Thread |
| D | Policy disclosure | Exhibit D — Terms of Service / Refund Policy |
| E | Secondary delivery proof | Exhibit E — Digital Delivery Log |
| F | Account/usage activity | Exhibit F — Account Login and Access Log |
| G | Refund record | Exhibit G — Stripe Refund Confirmation |
| H | Additional evidence | Exhibit H — [As needed] |

Auto-assign exhibit letters sequentially based on upload order.
The PDF generation engine must reference exhibits in the narrative (e.g., "as shown in Exhibit A").

---

## VERSION HISTORY

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-03-30 | Initial evidence matrix — all 6 categories |
