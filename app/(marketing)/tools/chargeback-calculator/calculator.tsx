'use client'

import React, { useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Clock,
  Package,
  Users,
  Zap,
  BarChart3,
  Target,
  type LucideIcon,
} from 'lucide-react'

/* ─── INDUSTRY PRESETS ────────────────────────────────────────────── */
interface PresetValues {
  label: string
  monthlyOrders: number
  monthlyChargebacks: number
  avgOrderValue: number
  marginPct: number
  currentWinRate: number
  disputeFee: number
  hoursPerDispute: number
  hourlyRate: number
}

const presets: Record<string, PresetValues> = {
  ecommerce: {
    label: 'E-commerce',
    monthlyOrders: 2000,
    monthlyChargebacks: 20,
    avgOrderValue: 85,
    marginPct: 40,
    currentWinRate: 25,
    disputeFee: 15,
    hoursPerDispute: 3,
    hourlyRate: 35,
  },
  saas: {
    label: 'SaaS',
    monthlyOrders: 500,
    monthlyChargebacks: 8,
    avgOrderValue: 120,
    marginPct: 80,
    currentWinRate: 30,
    disputeFee: 15,
    hoursPerDispute: 2,
    hourlyRate: 50,
  },
  travel: {
    label: 'Travel & Hospitality',
    monthlyOrders: 800,
    monthlyChargebacks: 24,
    avgOrderValue: 350,
    marginPct: 25,
    currentWinRate: 20,
    disputeFee: 25,
    hoursPerDispute: 4,
    hourlyRate: 40,
  },
  subscription: {
    label: 'Subscription Box',
    monthlyOrders: 3000,
    monthlyChargebacks: 45,
    avgOrderValue: 45,
    marginPct: 50,
    currentWinRate: 22,
    disputeFee: 15,
    hoursPerDispute: 2,
    hourlyRate: 30,
  },
  digital: {
    label: 'Digital Goods',
    monthlyOrders: 5000,
    monthlyChargebacks: 75,
    avgOrderValue: 25,
    marginPct: 90,
    currentWinRate: 35,
    disputeFee: 15,
    hoursPerDispute: 1.5,
    hourlyRate: 40,
  },
  marketplace: {
    label: 'Marketplace',
    monthlyOrders: 10000,
    monthlyChargebacks: 120,
    avgOrderValue: 65,
    marginPct: 15,
    currentWinRate: 20,
    disputeFee: 20,
    hoursPerDispute: 3,
    hourlyRate: 45,
  },
}

/* ─── HELPERS ─────────────────────────────────────────────────────── */
function fmt(n: number): string {
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(1) + 'M'
  return '$' + Math.round(n).toLocaleString()
}

function fmtPct(n: number): string {
  return n.toFixed(2) + '%'
}

interface RiskInfo {
  label: string
  color: string
  bgColor: string
  borderColor: string
  iconType: 'check' | 'warning'
}

function getRiskLevel(chargebackRate: number): RiskInfo {
  if (chargebackRate < 0.65)
    return {
      label: 'Safe',
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      iconType: 'check',
    }
  if (chargebackRate < 1.0)
    return {
      label: 'Warning — Approaching Visa VDMP',
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      iconType: 'warning',
    }
  if (chargebackRate < 1.5)
    return {
      label: 'Danger — Exceeds Visa VDMP & Mastercard ECM',
      color: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconType: 'warning',
    }
  return {
    label: 'Critical — Excessive Chargeback Program',
    color: 'text-red-800',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-300',
    iconType: 'warning',
  }
}

/* ─── RANGE INPUT ─────────────────────────────────────────────────── */
function RangeInput(props: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  format?: 'number' | 'currency' | 'percent' | 'hours'
  helpText?: string
}) {
  const { label, value, min, max, step, onChange, format = 'number', helpText } = props

  let displayValue: string
  if (format === 'currency') displayValue = '$' + value.toLocaleString()
  else if (format === 'percent') displayValue = value + '%'
  else if (format === 'hours') displayValue = value + 'h'
  else displayValue = value.toLocaleString()

  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="mb-5">
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <span className="text-sm font-bold text-slate-900 tabular-nums">{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 sm:h-2 rounded-full appearance-none cursor-pointer touch-slider"
        style={{
          background: 'linear-gradient(to right, #10b981 0%, #10b981 ' + pct + '%, #e2e8f0 ' + pct + '%, #e2e8f0 100%)',
        }}
      />
      {helpText && <p className="text-xs text-slate-400 mt-1">{helpText}</p>}
    </div>
  )
}

/* ─── STAT CARD ───────────────────────────────────────────────────── */
function StatCard(props: {
  label: string
  value: string
  sublabel?: string
  icon: LucideIcon
  accent?: boolean
  negative?: boolean
}) {
  const { label, value, sublabel, icon: Icon, accent = false, negative = false } = props
  const wrapClass = accent
    ? 'bg-emerald-50 border-emerald-200'
    : negative
      ? 'bg-red-50 border-red-200'
      : 'bg-white border-slate-200'
  const iconBg = accent ? 'bg-emerald-100' : negative ? 'bg-red-100' : 'bg-slate-100'
  const iconColor = accent ? 'text-emerald-600' : negative ? 'text-red-600' : 'text-slate-600'
  const valueColor = accent ? 'text-emerald-700' : negative ? 'text-red-700' : 'text-slate-900'

  return (
    <div className={'rounded-xl border p-5 ' + wrapClass}>
      <div className="flex items-start gap-3">
        <div className={'w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ' + iconBg}>
          <Icon size={18} className={iconColor} />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
          <p className={'text-xl sm:text-2xl font-bold tabular-nums mt-1 ' + valueColor}>{value}</p>
          {sublabel && <p className="text-xs text-slate-400 mt-1">{sublabel}</p>}
        </div>
      </div>
    </div>
  )
}

/* ─── COST BAR ────────────────────────────────────────────────────── */
function CostBar(props: { label: string; value: number; maxValue: number; color: string }) {
  const { label, value, maxValue, color } = props
  const pct = maxValue > 0 ? Math.min((value / maxValue) * 100, 100) : 0
  return (
    <div className="mb-3">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-sm text-slate-600">{label}</span>
        <span className="text-sm font-semibold text-slate-900 tabular-nums">{fmt(value)}</span>
      </div>
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={'h-full rounded-full transition-all duration-500 ease-out ' + color}
          style={{ width: pct + '%' }}
        />
      </div>
    </div>
  )
}

/* ─── THRESHOLD METER ─────────────────────────────────────────────── */
function ThresholdMeter(props: {
  rate: number
  label: string
  thresholds: { safe: number; warning: number; excessive: number }
}) {
  const { rate, label, thresholds } = props
  const maxDisplay = thresholds.excessive * 1.5
  const pct = Math.min((rate / maxDisplay) * 100, 100)
  const safePct = (thresholds.safe / maxDisplay) * 100
  const warnPct = (thresholds.warning / maxDisplay) * 100
  const exPct = (thresholds.excessive / maxDisplay) * 100

  let markerColor = 'bg-emerald-500'
  if (rate >= thresholds.warning) markerColor = 'bg-red-500'
  else if (rate >= thresholds.safe) markerColor = 'bg-amber-500'

  return (
    <div className="mb-4">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-bold tabular-nums text-slate-900">{fmtPct(rate)}</span>
      </div>
      <div className="relative h-4 rounded-full overflow-hidden bg-slate-100">
        <div className="absolute inset-0 flex">
          <div className="bg-emerald-100" style={{ width: safePct + '%' }} />
          <div className="bg-amber-100" style={{ width: (warnPct - safePct) + '%' }} />
          <div className="bg-red-100" style={{ width: (exPct - warnPct) + '%' }} />
          <div className="bg-red-200 flex-1" />
        </div>
        <div
          className={'absolute top-0 h-full w-1.5 rounded-full transition-all duration-500 ease-out ' + markerColor}
          style={{ left: pct + '%' }}
        />
      </div>
      <div className="flex justify-between mt-1 text-[11px] sm:text-[10px] text-slate-400">
        <span>0%</span>
        <span>{thresholds.safe}% safe</span>
        <span>{thresholds.warning}% warning</span>
        <span>{thresholds.excessive}%+ excessive</span>
      </div>
    </div>
  )
}

/* ─── MAIN CALCULATOR ─────────────────────────────────────────────── */
export default function ChargebackCalculator() {
  const [monthlyOrders, setMonthlyOrders] = useState(2000)
  const [monthlyChargebacks, setMonthlyChargebacks] = useState(20)
  const [avgOrderValue, setAvgOrderValue] = useState(85)
  const [marginPct, setMarginPct] = useState(40)
  const [currentWinRate, setCurrentWinRate] = useState(25)
  const [disputeFee, setDisputeFee] = useState(15)
  const [hoursPerDispute, setHoursPerDispute] = useState(3)
  const [hourlyRate, setHourlyRate] = useState(35)
  const [activePreset, setActivePreset] = useState<string | null>('ecommerce')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [timeframe, setTimeframe] = useState<'monthly' | 'annual'>('annual')

  const applyPreset = useCallback((key: string) => {
    const p = presets[key]
    setMonthlyOrders(p.monthlyOrders)
    setMonthlyChargebacks(p.monthlyChargebacks)
    setAvgOrderValue(p.avgOrderValue)
    setMarginPct(p.marginPct)
    setCurrentWinRate(p.currentWinRate)
    setDisputeFee(p.disputeFee)
    setHoursPerDispute(p.hoursPerDispute)
    setHourlyRate(p.hourlyRate)
    setActivePreset(key)
  }, [])

  const clearPreset = useCallback(() => setActivePreset(null), [])

  /* ── Calculations ─────────────────────────────────────────────── */
  const calc = useMemo(() => {
    const multiplier = timeframe === 'annual' ? 12 : 1
    const chargebacks = monthlyChargebacks * multiplier
    const orders = monthlyOrders * multiplier
    const chargebackRate = monthlyOrders > 0 ? (monthlyChargebacks / monthlyOrders) * 100 : 0

    const revenueLost = chargebacks * avgOrderValue
    const feesTotal = chargebacks * disputeFee
    const laborTotal = chargebacks * hoursPerDispute * hourlyRate
    const cogsLost = chargebacks * avgOrderValue * (1 - marginPct / 100)
    const totalCost = revenueLost + feesTotal + laborTotal + cogsLost

    const costPerChargeback = chargebacks > 0 ? totalCost / chargebacks : 0
    const costPerTransaction = orders > 0 ? totalCost / orders : 0
    const cbRevenueShare = orders * avgOrderValue > 0 ? (totalCost / (orders * avgOrderValue)) * 100 : 0

    const currentRecovery = revenueLost * (currentWinRate / 100)
    const currentNetLoss = totalCost - currentRecovery

    const improvedWinRate = Math.min(Math.max(currentWinRate + 35, 55), 80)
    const improvedRecovery = revenueLost * (improvedWinRate / 100)

    let chargebackKitCost = 0
    if (chargebacks > 0) {
      if (chargebacks <= 5) chargebackKitCost = chargebacks * 19
      else if (chargebacks <= 10) chargebackKitCost = Math.ceil(chargebacks / 5) * 79
      else if (chargebacks <= 25) chargebackKitCost = Math.ceil(chargebacks / 10) * 129
      else chargebackKitCost = Math.ceil(chargebacks / 25) * 269
    }

    const improvedNetLoss = totalCost - improvedRecovery + chargebackKitCost
    const netSavings = currentNetLoss - improvedNetLoss
    const roi = chargebackKitCost > 0 ? (netSavings / chargebackKitCost) * 100 : 0
    const risk = getRiskLevel(chargebackRate)

    return {
      chargebackRate,
      chargebacks,
      orders,
      revenueLost,
      feesTotal,
      laborTotal,
      cogsLost,
      totalCost,
      costPerChargeback,
      costPerTransaction,
      cbRevenueShare,
      currentRecovery,
      currentNetLoss,
      improvedWinRate,
      improvedRecovery,
      chargebackKitCost,
      improvedNetLoss,
      netSavings,
      roi,
      risk,
    }
  }, [monthlyOrders, monthlyChargebacks, avgOrderValue, marginPct, currentWinRate, disputeFee, hoursPerDispute, hourlyRate, timeframe])

  return (
    <div className="bg-slate-50">
      {/* ── Industry Presets ─────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-medium text-slate-500 mb-3 text-center">
            Quick start — select your industry for typical values
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(presets).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => applyPreset(key)}
                className={
                  'px-4 py-2 rounded-full text-sm font-medium transition-all ' +
                  (activePreset === key
                    ? 'bg-brand-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200')
                }
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Calculator Grid ────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* ── LEFT: Inputs ────────────────────────────────────────── */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-6">
                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <BarChart3 size={20} className="text-brand-700" />
                  Your Numbers
                </h2>

                <RangeInput
                  label="Monthly transactions"
                  value={monthlyOrders}
                  min={50}
                  max={50000}
                  step={50}
                  onChange={(v) => { setMonthlyOrders(v); clearPreset() }}
                />
                <RangeInput
                  label="Monthly chargebacks"
                  value={monthlyChargebacks}
                  min={1}
                  max={500}
                  step={1}
                  onChange={(v) => { setMonthlyChargebacks(v); clearPreset() }}
                />
                <RangeInput
                  label="Average order value"
                  value={avgOrderValue}
                  min={5}
                  max={2000}
                  step={5}
                  onChange={(v) => { setAvgOrderValue(v); clearPreset() }}
                  format="currency"
                />
                <RangeInput
                  label="Gross margin"
                  value={marginPct}
                  min={5}
                  max={95}
                  step={1}
                  onChange={(v) => { setMarginPct(v); clearPreset() }}
                  format="percent"
                  helpText="Revenue minus cost of goods"
                />
                <RangeInput
                  label="Current dispute win rate"
                  value={currentWinRate}
                  min={0}
                  max={80}
                  step={1}
                  onChange={(v) => { setCurrentWinRate(v); clearPreset() }}
                  format="percent"
                  helpText="Industry average is 20-30%"
                />

                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-sm text-brand-700 font-medium hover:text-brand-800 mt-2 mb-2"
                >
                  {showAdvanced ? 'Hide' : 'Show'} advanced settings
                </button>

                {showAdvanced && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <RangeInput
                      label="Dispute fee per chargeback"
                      value={disputeFee}
                      min={10}
                      max={100}
                      step={5}
                      onChange={(v) => { setDisputeFee(v); clearPreset() }}
                      format="currency"
                      helpText="Stripe charges $15. Other processors $15–$100."
                    />
                    <RangeInput
                      label="Hours spent per dispute"
                      value={hoursPerDispute}
                      min={0.5}
                      max={10}
                      step={0.5}
                      onChange={(v) => { setHoursPerDispute(v); clearPreset() }}
                      format="hours"
                      helpText="Gathering evidence, writing responses, follow-up"
                    />
                    <RangeInput
                      label="Hourly labor cost"
                      value={hourlyRate}
                      min={15}
                      max={150}
                      step={5}
                      onChange={(v) => { setHourlyRate(v); clearPreset() }}
                      format="currency"
                      helpText="Fully loaded cost of staff handling disputes"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT: Results ───────────────────────────────────────── */}
            <div className="lg:col-span-7 space-y-6">
              {/* Timeframe toggle */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Your Chargeback Costs</h2>
                <div className="flex bg-white rounded-lg border border-slate-200 p-0.5">
                  <button
                    onClick={() => setTimeframe('monthly')}
                    className={
                      'px-4 py-1.5 rounded-md text-sm font-medium transition-all ' +
                      (timeframe === 'monthly' ? 'bg-brand-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700')
                    }
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setTimeframe('annual')}
                    className={
                      'px-4 py-1.5 rounded-md text-sm font-medium transition-all ' +
                      (timeframe === 'annual' ? 'bg-brand-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700')
                    }
                  >
                    Annual
                  </button>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className={'rounded-xl border-2 p-5 ' + calc.risk.bgColor + ' ' + calc.risk.borderColor}>
                <div className="flex items-start gap-3">
                  {calc.risk.iconType === 'check' ? (
                    <CheckCircle size={22} className={calc.risk.color} />
                  ) : (
                    <AlertTriangle size={22} className={calc.risk.color} />
                  )}
                  <div className="flex-1">
                    <p className={'font-bold text-sm ' + calc.risk.color}>{calc.risk.label}</p>
                    <p className="text-sm text-slate-600 mt-1">
                      Your chargeback rate is{' '}
                      <span className="font-bold">{fmtPct(calc.chargebackRate)}</span>
                      {calc.chargebackRate >= 0.65
                        ? '. You risk entering card network monitoring programs with escalating fines.'
                        : '. You are below card network monitoring thresholds.'}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <ThresholdMeter
                    rate={calc.chargebackRate}
                    label="Visa VDMP / Mastercard ECM"
                    thresholds={{ safe: 0.65, warning: 1.0, excessive: 1.8 }}
                  />
                </div>
              </div>

              {/* Top-line stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                  label={timeframe === 'annual' ? 'Total annual cost' : 'Total monthly cost'}
                  value={fmt(calc.totalCost)}
                  sublabel={fmt(calc.costPerChargeback) + ' per dispute'}
                  icon={TrendingDown}
                  negative
                />
                <StatCard
                  label="Revenue at risk"
                  value={fmt(calc.revenueLost)}
                  sublabel={calc.cbRevenueShare.toFixed(1) + '% of gross revenue'}
                  icon={DollarSign}
                  negative
                />
              </div>

              {/* Cost breakdown */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Target size={18} className="text-brand-700" />
                  Cost Breakdown
                </h3>
                <CostBar label="Revenue lost" value={calc.revenueLost} maxValue={calc.totalCost} color="bg-red-500" />
                <CostBar label="Cost of goods lost" value={calc.cogsLost} maxValue={calc.totalCost} color="bg-orange-500" />
                <CostBar label="Labor cost" value={calc.laborTotal} maxValue={calc.totalCost} color="bg-amber-500" />
                <CostBar label="Dispute fees" value={calc.feesTotal} maxValue={calc.totalCost} color="bg-slate-400" />
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-baseline justify-between">
                  <span className="text-sm font-bold text-slate-900">Total chargeback cost</span>
                  <span className="text-xl font-bold text-red-700 tabular-nums">{fmt(calc.totalCost)}</span>
                </div>
              </div>

              {/* ── ROI / Recovery Section ─────────────────────────────── */}
              <div className="bg-white rounded-2xl border-2 border-emerald-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <Zap size={18} className="text-emerald-600" />
                  With ChargebackKit
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  Projected impact based on structured evidence improving win rates
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Current (without)</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-slate-500">Win rate</p>
                        <p className="text-xl font-bold text-slate-900">{currentWinRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Revenue recovered</p>
                        <p className="text-lg font-bold text-slate-700">{fmt(calc.currentRecovery)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Net loss</p>
                        <p className="text-lg font-bold text-red-600">{fmt(calc.currentNetLoss)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 rounded-xl p-4 -m-1">
                    <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide mb-2">With ChargebackKit</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-emerald-600">Win rate</p>
                        <p className="text-xl font-bold text-emerald-700">
                          {calc.improvedWinRate}%{' '}
                          <span className="text-sm font-normal text-emerald-500">(+{calc.improvedWinRate - currentWinRate}%)</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-emerald-600">Revenue recovered</p>
                        <p className="text-lg font-bold text-emerald-700">{fmt(calc.improvedRecovery)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-emerald-600">Net loss (after tool cost)</p>
                        <p className="text-lg font-bold text-emerald-700">{fmt(calc.improvedNetLoss)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-100 rounded-xl p-5 text-center">
                  <p className="text-sm text-emerald-700 font-medium mb-1">
                    {timeframe === 'annual' ? 'Annual' : 'Monthly'} savings with ChargebackKit
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-emerald-700 tabular-nums">{fmt(calc.netSavings)}</p>
                  <p className="text-sm text-emerald-600 mt-1">
                    {calc.roi > 0 ? Math.round(calc.roi) + '% return on investment' : 'Adjust your inputs to see potential savings'}
                  </p>
                  <p className="text-xs text-emerald-500 mt-1">
                    ChargebackKit cost: {fmt(calc.chargebackKitCost)} {timeframe === 'annual' ? '/year' : '/month'}
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <Link
                    href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
                    className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold text-base px-8 py-4 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg"
                  >
                    Start Recovering Revenue — $19
                    <ArrowRight size={18} />
                  </Link>
                  <p className="text-xs text-slate-400 mt-2">
                    Single pack $19 · 5-pack $79 · 10-pack $129 · 25-pack $269
                  </p>
                </div>
              </div>

              {/* Additional metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard label="Cost per dispute" value={fmt(calc.costPerChargeback)} icon={Package} />
                <StatCard label="Cost per transaction" value={'$' + calc.costPerTransaction.toFixed(2)} icon={Users} />
                <StatCard
                  label="Hours on disputes"
                  value={Math.round(calc.chargebacks * hoursPerDispute) + 'h'}
                  sublabel={timeframe === 'annual' ? '/year' : '/month'}
                  icon={Clock}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Methodology note ──────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border border-slate-200 p-6 text-sm text-slate-500 leading-relaxed">
            <p className="font-semibold text-slate-700 mb-2">How this calculator works</p>
            <p>
              This calculator estimates the true cost of chargebacks by accounting for four cost
              categories: direct revenue loss, chargeback fees charged by your processor, labor costs
              for dispute response, and cost of goods already fulfilled. Win rate projections with
              ChargebackKit are based on the improvement merchants typically see when submitting
              properly structured, category-specific evidence packs versus generic or unstructured
              responses. Individual results vary based on dispute type, evidence quality, and card
              network decisions. ChargebackKit pricing assumes the most cost-effective pack option
              for your volume.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
