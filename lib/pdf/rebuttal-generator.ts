import type { Pack, Exhibit } from '@/lib/database/types';
import { DISPUTE_CATEGORIES } from '@/lib/constants';

/**
 * Generate a professional rebuttal narrative using OpenAI GPT-4o.
 *
 * The rebuttal is written from the cardholder's perspective and presents
 * factual, professional arguments supporting the dispute. The text is
 * cached in pack_generations.rebuttal_text so it's only generated once.
 */
export async function generateRebuttal(
  pack: Pack,
  exhibits: Exhibit[]
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const categoryLabel =
    DISPUTE_CATEGORIES.find((c) => c.id === pack.dispute_category)?.label ??
    pack.dispute_category;

  const exhibitSummary = exhibits
    .map((ex, i) => `  ${i + 1}. ${ex.label} (${ex.original_name})`)
    .join('\n');

  const intakeContext = Object.entries(pack.intake_answers || {})
    .filter(([, v]) => v !== '' && v !== null && v !== undefined)
    .map(([k, v]) => {
      const label = k.replace(/_/g, ' ');
      const val = typeof v === 'boolean' ? (v ? 'Yes' : 'No') : String(v);
      return `  - ${label}: ${val}`;
    })
    .join('\n');

  const prompt = `You are a professional chargeback dispute specialist writing a rebuttal narrative for a cardholder's evidence pack. Write a factual, professional narrative that supports the cardholder's dispute.

DISPUTE DETAILS:
- Category: ${categoryLabel}
- Merchant: ${pack.merchant_name}
- Transaction Amount: $${(pack.transaction_amount / 100).toFixed(2)}
- Transaction Date: ${pack.transaction_date}
- Cardholder's Statement: ${pack.dispute_reason}

${intakeContext ? `ADDITIONAL DETAILS:\n${intakeContext}` : ''}

EVIDENCE PROVIDED:
${exhibitSummary || '  (No evidence documents uploaded)'}

INSTRUCTIONS:
1. Write 300-500 words in a professional, factual tone
2. Present the cardholder's case clearly and persuasively
3. Reference the evidence provided where appropriate
4. Use language appropriate for a bank's dispute resolution department
5. Do NOT fabricate facts â only reference information provided above
6. Structure with clear paragraphs, no bullet points
7. Begin with a clear statement of the dispute
8. End with a summary of why the dispute should be resolved in the cardholder's favor

Write the rebuttal narrative now:`;
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are a professional chargeback dispute specialist. Write clear, factual, persuasive rebuttal narratives for evidence packs.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('[rebuttal-generator] OpenAI API error:', errorBody);
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const result = await response.json();
  const text = result.choices?.[0]?.message?.content?.trim();

  if (!text) {
    throw new Error('OpenAI returned empty response');
  }

  return text;
}
