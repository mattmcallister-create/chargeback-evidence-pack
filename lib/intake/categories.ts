import { DISPUTE_CATEGORIES, type DisputeCategory } from '@/lib/constants';

// ââ Question types ââââââââââââââââââââââââââââââââââââââââââââââââââ

export type QuestionType = 'text' | 'textarea' | 'date' | 'select' | 'boolean';

export interface IntakeQuestion {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
  placeholder?: string;
  helpText?: string;
  options?: { value: string; label: string }[];
}

export interface CategoryIntake {
  categoryId: DisputeCategory;
  title: string;
  description: string;
  questions: IntakeQuestion[];
}

// ââ Category-specific intake questions ââââââââââââââââââââââââââââââ

const FRAUDULENT_QUESTIONS: IntakeQuestion[] = [
  {
    id: 'recognized_charge',
    label: 'Do you recognize this charge at all?',
    type: 'boolean',
    required: true,
    helpText: 'Select No if you did not authorize this transaction.',
  },
  {
    id: 'card_possession',
    label: 'Was your card in your possession at the time of the charge?',
    type: 'boolean',
    required: true,
  },
  {
    id: 'reported_to_bank',
    label: 'Have you reported this as fraud to your bank?',
    type: 'boolean',
    required: true,
  },
  {
    id: 'police_report',
    label: 'Have you filed a police report?',
    type: 'boolean',
    required: false,
    helpText: 'A police report can strengthen your case but is not always required.',
  },
  {
    id: 'fraud_details',
    label: 'Please describe what happened',
    type: 'textarea',
    required: true,
    placeholder: 'When did you first notice the charge? Any other suspicious activity?',
  },
];

const PRODUCT_NOT_RECEIVED_QUESTIONS: IntakeQuestion[] = [
  {
    id: 'expected_delivery_date',
    label: 'When was the product/service expected to be delivered?',
    type: 'date',
    required: true,
  },
  {
    id: 'contacted_merchant',
    label: 'Have you contacted the merchant about non-delivery?',
    type: 'boolean',
    required: true,
  },
  {
    id: 'merchant_response',
    label: 'What was the merchant\'s response?',
    type: 'select',
    required: true,
    options: [
      { value: 'no_response', label: 'No response' },
      { value: 'promised_delivery', label: 'Promised delivery but never sent' },
      { value: 'refused_refund', label: 'Refused refund' },
      { value: 'partial_refund', label: 'Offered partial refund only' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    id: 'tracking_info',
    label: 'Do you have any tracking information?',
    type: 'textarea',
    required: false,
    placeholder: 'Paste any tracking numbers or delivery confirmation details',
  },
  {
    id: 'additional_details',
    label: 'Any additional details about the non-delivery?',
    type: 'textarea',
    required: false,
  },
];

const NOT_AS_DESCRIBED_QUESTIONS: IntakeQuestion[] = [
  {
    id: 'what_was_advertised',
    label: 'What was advertised or promised?',
    type: 'textarea',
    required: true,
    placeholder: 'Describe the product/service as it was listed or promised to you',
  },
  {
    id: 'what_was_received',
    label: 'What did you actually receive?',
    type: 'textarea',
    required: true,
    placeholder: 'Describe how the product/service differs from what was promised',
  },
  {
    id: 'attempted_return',
    label: 'Have you attempted to return the product?',
    type: 'boolean',
    required: true,
  },
  {
    id: 'return_outcome',
    label: 'What happened when you tried to return/resolve?',
    type: 'select',
    required: true,
    options: [
      { value: 'no_return_attempted', label: 'Haven\'t attempted yet' },
      { value: 'return_denied', label: 'Return was denied' },
      { value: 'no_response', label: 'Merchant didn\'t respond' },
      { value: 'restocking_fee', label: 'Excessive restocking fee charged' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    id: 'defect_details',
    label: 'Additional details about the discrepancy',
    type: 'textarea',
    required: false,
  },
];

const SUBSCRIPTION_CANCELLED_QUESTIONS: IntakeQuestion[] = [
  {
    id: 'cancellation_date',
    label: 'When did you cancel the subscription?',
    type: 'date',
    required: true,
  },
  {
    id: 'cancellation_method',
    label: 'How did you cancel?',
    type: 'select',
    required: true,
    options: [
      { value: 'online', label: 'Online/website' },
      { value: 'email', label: 'Email' },
      { value: 'phone', label: 'Phone call' },
      { value: 'in_person', label: 'In person' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    id: 'cancellation_confirmation',
    label: 'Do you have cancellation confirmation?',
    type: 'boolean',
    required: true,
    helpText: 'Email confirmation, reference number, screenshot, etc.',
  },
  {
    id: 'charges_after_cancel',
    label: 'How many charges occurred after cancellation?',
    type: 'text',
    required: true,
    placeholder: 'e.g., 2 monthly charges',
  },
  {
    id: 'cancellation_details',
    label: 'Any additional details about the cancellation?',
    type: 'textarea',
    required: false,
  },
];

const DUPLICATE_CHARGE_QUESTIONS: IntakeQuestion[] = [
  {
    id: 'num_charges',
    label: 'How many times were you charged?',
    type: 'text',
    required: true,
    placeholder: 'e.g., 2 (one original + one duplicate)',
  },
  {
    id: 'charge_dates',
    label: 'What are the dates of the duplicate charges?',
    type: 'textarea',
    required: true,
    placeholder: 'List the dates and amounts of each charge',
  },
  {
    id: 'same_amount',
    label: 'Are all the charges for the same amount?',
    type: 'boolean',
    required: true,
  },
  {
    id: 'contacted_merchant_duplicate',
    label: 'Have you contacted the merchant about the duplicate?',
    type: 'boolean',
    required: true,
  },
  {
    id: 'duplicate_details',
    label: 'Additional details about the duplicate charges',
    type: 'textarea',
    required: false,
  },
];

const CREDIT_NOT_PROCESSED_QUESTIONS: IntakeQuestion[] = [
  {
    id: 'return_date',
    label: 'When did you return the product or cancel the service?',
    type: 'date',
    required: true,
  },
  {
    id: 'refund_promised_date',
    label: 'When was the refund/credit promised?',
    type: 'date',
    required: false,
  },
  {
    id: 'refund_amount',
    label: 'What refund amount were you promised?',
    type: 'text',
    required: true,
    placeholder: 'e.g., $49.99 full refund',
  },
  {
    id: 'has_return_receipt',
    label: 'Do you have proof of return (tracking, receipt, etc.)?',
    type: 'boolean',
    required: true,
  },
  {
    id: 'credit_details',
    label: 'Additional details about the missing credit',
    type: 'textarea',
    required: false,
  },
];

// ââ Category intake map âââââââââââââââââââââââââââââââââââââââââââââ

const CATEGORY_INTAKES: Record<DisputeCategory, CategoryIntake> = {
  fraudulent: {
    categoryId: 'fraudulent',
    title: 'Fraudulent Charge',
    description: 'You did not authorize or participate in this transaction.',
    questions: FRAUDULENT_QUESTIONS,
  },
  product_not_received: {
    categoryId: 'product_not_received',
    title: 'Product Not Received',
    description: 'You paid for a product or service that was never delivered.',
    questions: PRODUCT_NOT_RECEIVED_QUESTIONS,
  },
  not_as_described: {
    categoryId: 'not_as_described',
    title: 'Not As Described',
    description: 'The product or service received was significantly different from what was advertised.',
    questions: NOT_AS_DESCRIBED_QUESTIONS,
  },
  subscription_cancelled: {
    categoryId: 'subscription_cancelled',
    title: 'Subscription Cancelled',
    description: 'You were charged after cancelling a subscription or recurring service.',
    questions: SUBSCRIPTION_CANCELLED_QUESTIONS,
  },
  duplicate: {
    categoryId: 'duplicate',
    title: 'Duplicate Charge',
    description: 'You were charged more than once for the same transaction.',
    questions: DUPLICATE_CHARGE_QUESTIONS,
  },
  credit_not_processed: {
    categoryId: 'credit_not_processed',
    title: 'Credit Not Processed',
    description: 'A promised refund or credit was never applied to your account.',
    questions: CREDIT_NOT_PROCESSED_QUESTIONS,
  },
};

// ââ Public API ââââââââââââââââââââââââââââââââââââââââââââââââââââââ

/**
 * Get the intake configuration for a specific dispute category.
 */
export function getCategoryIntake(categoryId: DisputeCategory): CategoryIntake {
  return CATEGORY_INTAKES[categoryId];
}

/**
 * Get all category intakes (for rendering category selection).
 */
export function getAllCategoryIntakes(): CategoryIntake[] {
  return DISPUTE_CATEGORIES.map((c) => CATEGORY_INTAKES[c.id]);
}

/**
 * Validate intake answers against a category's required questions.
 * Returns an array of error messages (empty = valid).
 */
export function validateAnswers(
  categoryId: DisputeCategory,
  answers: Record<string, any>
): string[] {
  const intake = CATEGORY_INTAKES[categoryId];
  if (!intake) return ['Invalid dispute category'];

  const errors: string[] = [];

  for (const question of intake.questions) {
    if (question.required) {
      const value = answers[question.id];
      if (value === undefined || value === null || value === '') {
        errors.push(`"${question.label}" is required`);
      }
    }
  }

  return errors;
}
