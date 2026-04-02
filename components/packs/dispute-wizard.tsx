'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAllCategoryIntakes,
  getCategoryIntake,
  validateAnswers,
  type CategoryIntake,
  type IntakeQuestion,
} from '@/lib/intake/categories';
import { DISPUTE_CATEGORIES, type DisputeCategory } from '@/lib/constants';

// ââ Types âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

type WizardStep = 'category' | 'basics' | 'questions' | 'review';

interface PackFormData {
  dispute_category: DisputeCategory | '';
  merchant_name: string;
  transaction_amount: string; // stored as string for input, converted to number on submit
  transaction_date: string;
  dispute_reason: string;
  intake_answers: Record<string, any>;
}

// ââ Wizard Component ââââââââââââââââââââââââââââââââââââââââââââââââ

export default function DisputeWizard() {
  const router = useRouter();
  const [step, setStep] = useState<WizardStep>('category');
  const [formData, setFormData] = useState<PackFormData>({
    dispute_category: '',
    merchant_name: '',
    transaction_amount: '',
    transaction_date: '',
    dispute_reason: '',
    intake_answers: {},
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = getAllCategoryIntakes();

  // ââ Step handlers âââââââââââââââââââââââââââââââââââââââââââââââââ

  function selectCategory(categoryId: DisputeCategory) {
    setFormData((prev) => ({
      ...prev,
      dispute_category: categoryId,
      intake_answers: {},
    }));
    setErrors([]);
    setStep('basics');
  }

  function goToQuestions() {
    const newErrors: string[] = [];
    if (!formData.merchant_name.trim()) newErrors.push('Merchant name is required');
    if (!formData.transaction_amount || Number(formData.transaction_amount) <= 0)
      newErrors.push('Transaction amount must be a positive number');
    if (!formData.transaction_date) newErrors.push('Transaction date is required');
    if (!formData.dispute_reason.trim()) newErrors.push('Dispute reason is required');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors([]);
    setStep('questions');
  }

  function goToReview() {
    if (!formData.dispute_category) return;
    const validationErrors = validateAnswers(
      formData.dispute_category,
      formData.intake_answers
    );
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);
    setStep('review');
  }

  async function submitPack() {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrors([]);

    try {
      const response = await fetch('/api/packs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dispute_category: formData.dispute_category,
          merchant_name: formData.merchant_name.trim(),
          transaction_amount: Math.round(Number(formData.transaction_amount) * 100), // convert to cents
          transaction_date: formData.transaction_date,
          dispute_reason: formData.dispute_reason.trim(),
          intake_answers: formData.intake_answers,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create pack');
      }

      const { pack } = await response.json();
      router.push(`/app/packs/${pack.id}`);
    } catch (err: any) {
      setErrors([err.message]);
      setIsSubmitting(false);
    }
  }

  // ââ Render helpers ââââââââââââââââââââââââââââââââââââââââââââââââ

  function updateField(field: keyof PackFormData, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function updateAnswer(questionId: string, value: any) {
    setFormData((prev) => ({
      ...prev,
      intake_answers: { ...prev.intake_answers, [questionId]: value },
    }));
  }

  // ââ Step 1: Category Selection ââââââââââââââââââââââââââââââââââââ

  if (step === 'category') {
    return (
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">What type of dispute is this?</h2>
        <p className="text-gray-600 mb-6">
          Select the category that best describes your situation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.categoryId}
              onClick={() => selectCategory(cat.categoryId)}
              className="text-left p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <h3 className="font-semibold text-lg">{cat.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{cat.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ââ Step 2: Basic Information âââââââââââââââââââââââââââââââââââââ

  if (step === 'basics') {
    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setStep('category')}
          className="text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          â Back to category selection
        </button>
        <h2 className="text-2xl font-bold mb-6">Transaction Details</h2>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            {errors.map((e, i) => (
              <p key={i} className="text-red-700 text-sm">
                {e}
              </p>
            ))}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Merchant Name</label>
            <input
              type="text"
              value={formData.merchant_name}
              onChange={(e) => updateField('merchant_name', e.target.value)}
              placeholder="e.g., Amazon, Netflix, Uber"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Transaction Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={formData.transaction_amount}
              onChange={(e) => updateField('transaction_amount', e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Transaction Date</label>
            <input
              type="date"
              value={formData.transaction_date}
              onChange={(e) => updateField('transaction_date', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Why are you disputing this charge?
            </label>
            <textarea
              value={formData.dispute_reason}
              onChange={(e) => updateField('dispute_reason', e.target.value)}
              rows={3}
              placeholder="Briefly describe why this charge should be reversed"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={goToQuestions}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // ââ Step 3: Category-Specific Questions âââââââââââââââââââââââââââ

  if (step === 'questions') {
    const intake = formData.dispute_category
      ? getCategoryIntake(formData.dispute_category)
      : null;

    if (!intake) return null;

    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => {
            setStep('basics');
            setErrors([]);
          }}
          className="text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          â Back to transaction details
        </button>
        <h2 className="text-2xl font-bold mb-2">{intake.title}</h2>
        <p className="text-gray-600 mb-6">
          Please answer the following questions to build your evidence pack.
        </p>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            {errors.map((e, i) => (
              <p key={i} className="text-red-700 text-sm">
                {e}
              </p>
            ))}
          </div>
        )}

        <div className="space-y-5">
          {intake.questions.map((q) => (
            <QuestionField
              key={q.id}
              question={q}
              value={formData.intake_answers[q.id]}
              onChange={(val) => updateAnswer(q.id, val)}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={goToReview}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Review &amp; Submit
          </button>
        </div>
      </div>
    );
  }

  // ââ Step 4: Review & Submit âââââââââââââââââââââââââââââââââââââââ

  if (step === 'review') {
    const intake = formData.dispute_category
      ? getCategoryIntake(formData.dispute_category)
      : null;

    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => {
            setStep('questions');
            setErrors([]);
          }}
          className="text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          â Back to questions
        </button>
        <h2 className="text-2xl font-bold mb-6">Review Your Dispute Pack</h2>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            {errors.map((e, i) => (
              <p key={i} className="text-red-700 text-sm">
                {e}
              </p>
            ))}
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-sm text-gray-500 uppercase mb-2">
              Dispute Category
            </h3>
            <p>{intake?.title}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-sm text-gray-500 uppercase mb-2">
              Transaction Details
            </h3>
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-600">Merchant</dt>
                <dd className="font-medium">{formData.merchant_name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Amount</dt>
                <dd className="font-medium">${formData.transaction_amount}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Date</dt>
                <dd className="font-medium">{formData.transaction_date}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-sm text-gray-500 uppercase mb-2">
              Dispute Reason
            </h3>
            <p className="text-sm">{formData.dispute_reason}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setStep('basics')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Edit Details
          </button>
          <button
            onClick={submitPack}
            disabled={isSubmitting}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Creating Pack...' : 'Create Evidence Pack'}
          </button>
        </div>
      </div>
    );
  }

  return null;
}

// ââ Question Field Component ââââââââââââââââââââââââââââââââââââââââ

function QuestionField({
  question,
  value,
  onChange,
}: {
  question: IntakeQuestion;
  value: any;
  onChange: (val: any) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {question.label}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {question.helpText && (
        <p className="text-xs text-gray-500 mb-1">{question.helpText}</p>
      )}

      {question.type === 'text' && (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {question.type === 'textarea' && (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          rows={3}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {question.type === 'date' && (
        <input
          type="date"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {question.type === 'select' && (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select an option...</option>
          {question.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {question.type === 'boolean' && (
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={question.id}
              checked={value === true}
              onChange={() => onChange(true)}
              className="text-blue-600"
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={question.id}
              checked={value === false}
              onChange={() => onChange(false)}
              className="text-blue-600"
            />
            <span>No</span>
          </label>
        </div>
      )}
    </div>
  );
}
