export type ScenarioKey = 'conservative' | 'expected' | 'optimistic';

export interface SimulationInputs {
  monthlyInvestment: number;
  closeRate: number;
  averageTicket: number;
}

export interface ScenarioDefinition {
  key: ScenarioKey;
  label: string;
  shortLabel: string;
  eyebrow: string;
  description: string;
  cpl: number;
  qualificationRate: number;
  averageRecoveryWindowDays: number;
}

export interface ScenarioMetrics {
  rawNewContacts: number;
  rawQualifiedPatients: number;
  rawClosedPatients: number;
  rawEstimatedRevenue: number;
  rawRecoveryDays: number | null;
  newContacts: number;
  qualifiedPatients: number;
  closedPatients: number;
  estimatedRevenue: number;
  recoveryDays: number | null;
}

export interface ScenarioResult extends ScenarioDefinition, ScenarioMetrics {}

export const MIN_MONTHLY_INVESTMENT = 500;
export const MAX_MONTHLY_INVESTMENT = 15000;
export const MIN_CLOSE_RATE = 5;
export const MAX_CLOSE_RATE = 100;
export const MIN_AVERAGE_TICKET = 80;
export const MAX_AVERAGE_TICKET = 5000;

export const DEFAULT_SIMULATION_INPUTS: SimulationInputs = {
  monthlyInvestment: 2500,
  closeRate: 25,
  averageTicket: 320,
};

export const SCENARIOS: Record<ScenarioKey, ScenarioDefinition> = {
  conservative: {
    key: 'conservative',
    label: 'Conservador',
    shortLabel: 'Prudente',
    eyebrow: 'Más prudente',
    description: 'Lectura prudente con más margen.',
    cpl: 30,
    qualificationRate: 0.25,
    averageRecoveryWindowDays: 45,
  },
  expected: {
    key: 'expected',
    label: 'Esperado',
    shortLabel: 'Referencia',
    eyebrow: 'Escenario base',
    description: 'La referencia más realista.',
    cpl: 22,
    qualificationRate: 0.35,
    averageRecoveryWindowDays: 30,
  },
  optimistic: {
    key: 'optimistic',
    label: 'Optimista',
    shortLabel: 'Acelerado',
    eyebrow: 'Mayor eficiencia',
    description: 'Escenario ágil con mejor eficiencia.',
    cpl: 15,
    qualificationRate: 0.45,
    averageRecoveryWindowDays: 21,
  },
};

export const SCENARIO_ORDER: ScenarioKey[] = ['conservative', 'expected', 'optimistic'];

export const currencyFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export const compactCurrencyFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  notation: 'compact',
  maximumFractionDigits: 1,
});

const roundCurrencyEstimate = (value: number) => Math.max(0, Math.round(value / 10) * 10);

export const clampNumber = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const sanitizeSimulationInputs = (inputs: SimulationInputs): SimulationInputs => ({
  monthlyInvestment: clampNumber(inputs.monthlyInvestment, MIN_MONTHLY_INVESTMENT, MAX_MONTHLY_INVESTMENT),
  closeRate: clampNumber(inputs.closeRate, MIN_CLOSE_RATE, MAX_CLOSE_RATE),
  averageTicket: clampNumber(inputs.averageTicket, MIN_AVERAGE_TICKET, MAX_AVERAGE_TICKET),
});

export const calculateScenarioMetrics = (
  rawInputs: SimulationInputs,
  scenario: ScenarioDefinition,
): ScenarioMetrics => {
  const inputs = sanitizeSimulationInputs(rawInputs);
  const closeRateFactor = inputs.closeRate / 100;

  const rawNewContacts = inputs.monthlyInvestment / scenario.cpl;
  const rawQualifiedPatients = rawNewContacts * scenario.qualificationRate;
  const rawClosedPatients = rawQualifiedPatients * closeRateFactor;
  const rawEstimatedRevenue = rawClosedPatients * inputs.averageTicket;
  const rawRecoveryDays =
    rawEstimatedRevenue > 0
      ? inputs.monthlyInvestment / (rawEstimatedRevenue / scenario.averageRecoveryWindowDays)
      : null;

  return {
    rawNewContacts,
    rawQualifiedPatients,
    rawClosedPatients,
    rawEstimatedRevenue,
    rawRecoveryDays,
    newContacts: Math.max(0, Math.round(rawNewContacts)),
    qualifiedPatients: Math.max(0, Math.round(rawQualifiedPatients)),
    closedPatients: Math.max(0, Math.round(rawClosedPatients)),
    estimatedRevenue: roundCurrencyEstimate(rawEstimatedRevenue),
    recoveryDays:
      rawRecoveryDays && Number.isFinite(rawRecoveryDays) ? Math.max(1, Math.ceil(rawRecoveryDays)) : null,
  };
};

export const calculateScenarioResults = (
  inputs: SimulationInputs,
): Record<ScenarioKey, ScenarioResult> =>
  SCENARIO_ORDER.reduce<Record<ScenarioKey, ScenarioResult>>((accumulator, key) => {
    const definition = SCENARIOS[key];
    accumulator[key] = {
      ...definition,
      ...calculateScenarioMetrics(inputs, definition),
    };
    return accumulator;
  }, {} as Record<ScenarioKey, ScenarioResult>);

export const formatCurrency = (value: number) => currencyFormatter.format(value);

export const formatCompactCurrency = (value: number) => compactCurrencyFormatter.format(value);

export const formatRecoveryWindow = (value: number | null) => {
  if (!value) {
    return 'A definir';
  }

  if (value >= 365) {
    return 'Más de 12 meses';
  }

  if (value >= 90) {
    return `≈ ${Math.round(value / 30)} meses`;
  }

  return `${value} días`;
};
