'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  getCategoryIntake,
  validateAnswers,
  type IntakeQuestion,
} from '@/lib/intake/categories';
import type { DisputeCategory } from '@/lib/constants';

interface PackData {
  id: string;
  status: string;
  dispute_category: DisputeCategory;
  merchant_name: string;
  transaction_amount: number; // cents
  transaction_date: string;
  dispute_reason: string;
  intake_answers: Record<string, any>;
}

export default function EditPackPage() {
  const router = useRouter();
  const params = useParams();
  const packId = params.id as string;

  const [pack, setPack] = useState<PackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ââ Form state ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  const [merchantName, setMerchantName] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [disputeReason, setDisputeReason] = useState('');
  const [intakeAnswers, setIntakeAnswers] = useState<Record<string, any>>({});

  // ââ Load pack data ââââââââââââââââââââââââââââââââââââââââââââââââââ

  useEffect(() => {
    async function fetchPack() {
      try {
        const res = await fetch(`/api/packs/${packId}`);
        if (!res.ok) throw new Error('Pack not found');
        const data = await res.json();
        const p: PackData = data.pack;

        if (p.status !== 'draft') {
          router.push(`/app/packs/${packId}`);
          return;
        }

        setPack(p);
        setMerchantName(p.merchant_name);
        setTransactionAmount((p.transaction_amount / 100).toFixed(2));
        setTransactionDate(p.transaction_date);
        setDisputeReason(p.dispute_reason);
        setIntakeAnswers(p.intake_answers || {});
      } catch {
        setErrors(['Failed to load pack']);
      } finally {
        setLoading(false);
      }
    }
    fetchPack();
  }, [packId, router]);

  // ââ Handlers ââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

  function updateAnswer(questionId: string, value: any) {
    setIntakeAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pack) return;

    const newErrors: string[] = [];
    if (!merchantName.trim()) newErrors.push('Merchant name is required');
    if (!transactionAmount || Number(transactionAmount) <= 0)
      newErrors.push('Transaction amount must be a positive number');
    if (!transactionDate) newErrors.push('Transaction date is required');
    if (!disputeReason.trim()) newErrors.push('Dispute reason is required');

    // Validate intake answers
    const intakeErrors = validateAnswers(
      pack.dispute_category,
      intakeAnswers
    );
    newErrors.push(...intakeErrors);

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors([]);

    try {
      const res = await fetch(`/api/packs/${packId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchant_name: merchantName.trim(),
          transaction_amount: Math.round(Number(transactionAmount) * 100),
          transaction_date: transactionDate,
          dispute_reason: disputeReason.trim(),
          intake_answers: intakeAnswers,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update pack');
      }

      router.push(`/app/packs/${packId}`);
    } catch (err: any) {
      setErrors([err.message]);
      setIsSubmitting(false);
    }
  }

  // ââ Loading / Error states ââââââââââââââââââââââââââââââââââââââââââ

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-40 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!pack) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <p className="text-red-600">Pack not found or cannot be edited.</p>
      </div>
    );
  }

  const intake = getCategoryIntake(pack.dispute_category);

  // ââ Render ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <button
        onClick={() => router.push(`/app/packs/${packId}`)}
        className="text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        &larr; Back to pack
      </button>
      <h1 className="text-2xl font-bold mb-6">Edit Dispute Pack</h1>

      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          {errors.map((e, i) => (
            <p key={i} className="text-red-700 text-sm">
              {e}
            </p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold">Transaction Details</h2>

          <div>
            <label className="block text-sm font-medium mb-1">
              Merchant Name
            </label>
            <input
              type="text"
              value={merchantName}
              onChange={(e) => setMerchantName(e.target.value)}
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
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Transaction Date
            </label>
            <input
              type="date"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Why are you disputing this charge?
            </label>
            <textarea
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category-Specific Questions */}
        {intake && (
          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-semibold">{intake.title}</h2>
            {intake.questions.map((q: IntakeQuestion) => (
              <div key={q.id}>
                <label className="block text-sm font-medium mb-1">
                  {q.label}
                  {q.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                {q.helpText && (
                  <p className="text-xs text-gray-500 mb-1">{q.helpText}</p>
                )}

                {q.type === 'text' && (
                  <input
                    type="text"
                    value={intakeAnswers[q.id] || ''}
                    onChange={(e) => updateAnswer(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}

                {q.type === 'textarea' && (
                  <textarea
                    value={intakeAnswers[q.id] || ''}
                    onChange={(e) => updateAnswer(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}

                {q.type === 'date' && (
                  <input
                    type="date"
                    value={intakeAnswers[q.id] || ''}
                    onChange={(e) => updateAnswer(q.id, e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}

                {q.type === 'select' && (
                  <select
                    value={intakeAnswers[q.id] || ''}
                    onChange={(e) => updateAnswer(q.id, e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select an option...</option>
                    {q.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}

                {q.type === 'boolean' && (
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={q.id}
                        checked={intakeAnswers[q.id] === true}
                        onChange={() => updateAnswer(q.id, true)}
                        className="text-blue-600"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={q.id}
                        checked={intakeAnswers[q.id] === false}
                        onChange={() => updateAnswer(q.id, false)}
                        className="text-blue-600"
                      />
                      <span>No</span>
                    </label>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push(`/app/packs/${packId}`)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
