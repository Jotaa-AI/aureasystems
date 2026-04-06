import type { ScenarioKey, ScenarioResult, SimulationInputs } from './patientFlowSimulator';

const DEFAULT_SIMULATION_WEBHOOK =
  'https://personal-n8n.brtnrr.easypanel.host/webhook/aureasystems-roi-calculator';

export interface SimulationLeadPayload {
  email: string;
  selectedScenario: ScenarioKey;
  inputs: SimulationInputs;
  scenarios: Record<ScenarioKey, ScenarioResult>;
  meta: {
    submittedAt: string;
    pageUrl?: string;
    source: string;
  };
}

interface ApiResponse {
  ok?: boolean;
  message?: string;
}

const serializeScenario = (scenario: ScenarioResult) => ({
  key: scenario.key,
  label: scenario.label,
  shortLabel: scenario.shortLabel,
  eyebrow: scenario.eyebrow,
  description: scenario.description,
  assumptions: {
    cpl: scenario.cpl,
    qualificationRate: scenario.qualificationRate,
    averageRecoveryWindowDays: scenario.averageRecoveryWindowDays,
  },
  visibleMetrics: {
    newContacts: scenario.newContacts,
    qualifiedPatients: scenario.qualifiedPatients,
    closedPatients: scenario.closedPatients,
    estimatedRevenue: scenario.estimatedRevenue,
    recoveryDays: scenario.recoveryDays,
  },
  rawMetrics: {
    newContacts: scenario.rawNewContacts,
    qualifiedPatients: scenario.rawQualifiedPatients,
    closedPatients: scenario.rawClosedPatients,
    estimatedRevenue: scenario.rawEstimatedRevenue,
    recoveryDays: scenario.rawRecoveryDays,
  },
});

export const sendSimulationLead = async (payload: SimulationLeadPayload) => {
  const endpoint = import.meta.env.VITE_SIMULATION_ENDPOINT ?? DEFAULT_SIMULATION_WEBHOOK;
  const selectedScenarioResult = payload.scenarios[payload.selectedScenario];

  const requestBody = {
    email: payload.email,
    source: payload.meta.source,
    submittedAt: payload.meta.submittedAt,
    pageUrl: payload.meta.pageUrl,
    lead: {
      email: payload.email,
      monthlyInvestment: payload.inputs.monthlyInvestment,
      closeRate: payload.inputs.closeRate,
      averageTicket: payload.inputs.averageTicket,
      selectedScenario: payload.selectedScenario,
      selectedScenarioLabel: selectedScenarioResult.label,
    },
    inputs: {
      monthlyInvestment: payload.inputs.monthlyInvestment,
      closeRate: payload.inputs.closeRate,
      averageTicket: payload.inputs.averageTicket,
    },
    selectedScenario: serializeScenario(selectedScenarioResult),
    summary: {
      newContacts: selectedScenarioResult.newContacts,
      qualifiedPatients: selectedScenarioResult.qualifiedPatients,
      closedPatients: selectedScenarioResult.closedPatients,
      estimatedRevenue: selectedScenarioResult.estimatedRevenue,
      recoveryDays: selectedScenarioResult.recoveryDays,
    },
    scenarios: {
      conservative: serializeScenario(payload.scenarios.conservative),
      expected: serializeScenario(payload.scenarios.expected),
      optimistic: serializeScenario(payload.scenarios.optimistic),
    },
    meta: payload.meta,
    originalPayload: payload,
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  let data: ApiResponse | null = null;

  try {
    data = (await response.json()) as ApiResponse;
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message ?? 'No hemos podido enviar tu simulación ahora mismo.');
  }

  return data;
};
