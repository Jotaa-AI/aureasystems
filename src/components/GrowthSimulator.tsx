import React, { type FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  BarChart3,
  CalendarCheck,
  ChevronRight,
  Mail,
  MessageSquareText,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import './GrowthSimulator.css';
import {
  type ScenarioKey,
  SCENARIO_ORDER,
  DEFAULT_SIMULATION_INPUTS,
  MAX_AVERAGE_TICKET,
  MAX_MONTHLY_INVESTMENT,
  MIN_AVERAGE_TICKET,
  MIN_MONTHLY_INVESTMENT,
  calculateScenarioResults,
  clampNumber,
  formatCompactCurrency,
  formatCurrency,
  formatRecoveryWindow,
} from '../lib/patientFlowSimulator';
import { sendSimulationLead } from '../lib/sendSimulationLead';

interface GrowthSimulatorProps {
  onOpenModal?: () => void;
}

interface AnimatedMetricProps {
  value: number | null;
  formatter: (value: number) => string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const countFormatter = new Intl.NumberFormat('es-ES');

const parseNumericString = (value: string, fallback: number) => {
  if (!value.trim()) {
    return fallback;
  }

  const numericValue = Number(value.replace(/[^\d]/g, ''));
  return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : fallback;
};

const useAnimatedValue = (value: number, duration = 550) => {
  const [animatedValue, setAnimatedValue] = useState(value);
  const previousValueRef = useRef(value);

  useEffect(() => {
    const startValue = previousValueRef.current;

    if (startValue === value) {
      return undefined;
    }

    let animationFrame = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = startValue + (value - startValue) * easedProgress;

      setAnimatedValue(nextValue);

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        previousValueRef.current = value;
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      previousValueRef.current = value;
    };
  }, [duration, value]);

  return animatedValue;
};

const AnimatedMetric: React.FC<AnimatedMetricProps> = ({ value, formatter }) => {
  const safeValue = value ?? 0;
  const animatedValue = useAnimatedValue(safeValue);

  if (value === null) {
    return <span>A definir</span>;
  }

  return <span>{formatter(animatedValue)}</span>;
};

const GrowthSimulator: React.FC<GrowthSimulatorProps> = ({ onOpenModal }) => {
  const [investmentInput, setInvestmentInput] = useState(
    String(DEFAULT_SIMULATION_INPUTS.monthlyInvestment),
  );
  const [averageTicketInput, setAverageTicketInput] = useState(
    String(DEFAULT_SIMULATION_INPUTS.averageTicket),
  );
  const [closeRate, setCloseRate] = useState(DEFAULT_SIMULATION_INPUTS.closeRate);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>('expected');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const monthlyInvestment = clampNumber(
    parseNumericString(investmentInput, DEFAULT_SIMULATION_INPUTS.monthlyInvestment),
    MIN_MONTHLY_INVESTMENT,
    MAX_MONTHLY_INVESTMENT,
  );
  const averageTicket = clampNumber(
    parseNumericString(averageTicketInput, DEFAULT_SIMULATION_INPUTS.averageTicket),
    MIN_AVERAGE_TICKET,
    MAX_AVERAGE_TICKET,
  );

  const inputs = useMemo(
    () => ({
      monthlyInvestment,
      closeRate,
      averageTicket,
    }),
    [averageTicket, closeRate, monthlyInvestment],
  );

  const scenarioResults = useMemo(() => calculateScenarioResults(inputs), [inputs]);
  const activeScenario = scenarioResults[selectedScenario];

  const resetSubmissionFeedback = () => {
    if (submitState !== 'idle') {
      setSubmitState('idle');
      setSubmitMessage('');
    }
  };

  const handleCurrencyFieldChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value.replace(/[^\d]/g, '');
      resetSubmissionFeedback();
      setter(nextValue);
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (honeypot.trim()) {
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!emailPattern.test(normalizedEmail)) {
      setSubmitState('error');
      setSubmitMessage('Introduce un email válido para enviarte la simulación.');
      return;
    }

    setSubmitState('submitting');
    setSubmitMessage('');

    try {
      await sendSimulationLead({
        email: normalizedEmail,
        selectedScenario,
        inputs,
        scenarios: scenarioResults,
        meta: {
          submittedAt: new Date().toISOString(),
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
          source: 'aurea-patientflow-simulator',
        },
      });

      setSubmitState('success');
      setSubmitMessage(`Te hemos enviado la simulación del escenario ${activeScenario.label.toLowerCase()}.`);
    } catch (error) {
      setSubmitState('error');
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : 'No hemos podido enviar tu simulación ahora mismo. Vuelve a intentarlo en unos segundos.',
      );
    }
  };

  const investmentProgress =
    ((monthlyInvestment - MIN_MONTHLY_INVESTMENT) /
      (MAX_MONTHLY_INVESTMENT - MIN_MONTHLY_INVESTMENT)) *
    100;
  const closeRateProgress = ((closeRate - 5) / 95) * 100;

  const resultCards = [
    {
      id: 'contacts',
      label: 'Nuevos contactos interesados',
      hint: 'Interés nuevo generado.',
      value: activeScenario.newContacts,
      formatter: (value: number) => countFormatter.format(Math.round(value)),
      icon: <MousePointerClick size={20} />,
      tone: 'neutral',
    },
    {
      id: 'qualified',
      label: 'Posibles pacientes cualificados',
      hint: 'Contactos con mejor encaje.',
      value: activeScenario.qualifiedPatients,
      formatter: (value: number) => countFormatter.format(Math.round(value)),
      icon: <MessageSquareText size={20} />,
      tone: 'neutral',
    },
    {
      id: 'revenue',
      label: 'Aumento de facturación estimada',
      hint: 'Estimación orientativa.',
      value: activeScenario.estimatedRevenue,
      formatter: (value: number) => formatCurrency(Math.round(value)),
      icon: <BarChart3 size={20} />,
      tone: 'highlight',
    },
    {
      id: 'recovery',
      label: 'Tiempo estimado para recuperar la inversión',
      hint: 'Según el escenario elegido.',
      value: activeScenario.recoveryDays,
      formatter: (value: number) => formatRecoveryWindow(Math.round(value)),
      icon: <CalendarCheck size={20} />,
      tone: 'neutral',
    },
  ] as const;

  return (
    <section className="section growth-simulator-section" id="simulador-crecimiento">
      <div className="container">
        <div className="growth-simulator-shell">
          <div className="growth-simulator-header">
            <span className="growth-simulator-eyebrow">Simulación de crecimiento</span>
            <h2 className="h2 growth-simulator-title">Calcula el crecimiento de tu clínica.</h2>
            <p className="p-large growth-simulator-intro">Tres datos. Una estimación inmediata.</p>
          </div>

          <div className="growth-simulator-grid">
            <aside className="simulator-panel simulator-panel-inputs">
              <div className="simulator-panel-topline">
                <span className="simulator-kicker">
                  <Sparkles size={16} />
                  Proyección guiada
                </span>
                <p>Ajusta tus cifras y revisa la proyección al instante.</p>
              </div>

              <div className="simulator-field-group">
                <div className="simulator-field-header">
                  <label htmlFor="investment-input">Inversión mensual en captación</label>
                  <span>{formatCurrency(monthlyInvestment)}</span>
                </div>

                <div className="simulator-currency-input">
                  <span>€</span>
                  <input
                    id="investment-input"
                    inputMode="numeric"
                    type="text"
                    value={investmentInput}
                    onChange={handleCurrencyFieldChange(setInvestmentInput)}
                    onBlur={() => setInvestmentInput(String(monthlyInvestment))}
                    aria-label="Inversión mensual en captación"
                  />
                </div>

                <input
                  className="simulator-range"
                  type="range"
                  min={MIN_MONTHLY_INVESTMENT}
                  max={MAX_MONTHLY_INVESTMENT}
                  step={100}
                  value={monthlyInvestment}
                  onChange={(event) => {
                    resetSubmissionFeedback();
                    setInvestmentInput(event.target.value);
                  }}
                  style={{ ['--range-progress' as string]: `${investmentProgress}%` }}
                  aria-label="Selecciona la inversión mensual en captación"
                />

                <div className="simulator-range-labels">
                  <span>500 €</span>
                  <span>7.500 €</span>
                  <span>15.000 €</span>
                </div>
              </div>

              <div className="simulator-field-group">
                <div className="simulator-field-header">
                  <label htmlFor="close-rate-range">
                    Si os traemos nuevos posibles pacientes, ¿qué porcentaje podríais cerrar?
                  </label>
                  <span>{closeRate}%</span>
                </div>

                <input
                  id="close-rate-range"
                  className="simulator-range"
                  type="range"
                  min={5}
                  max={100}
                  step={1}
                  value={closeRate}
                  onChange={(event) => {
                    resetSubmissionFeedback();
                    setCloseRate(Number(event.target.value));
                  }}
                  style={{ ['--range-progress' as string]: `${closeRateProgress}%` }}
                  aria-label="Tasa de cierre estimada"
                />

                <div className="simulator-range-labels">
                  <span>5%</span>
                  <span>25%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="simulator-field-group">
                <div className="simulator-field-header">
                  <label htmlFor="ticket-input">¿Cuál es vuestro ticket medio de primera compra?</label>
                  <span>{formatCurrency(averageTicket)}</span>
                </div>

                <div className="simulator-currency-input">
                  <span>€</span>
                  <input
                    id="ticket-input"
                    inputMode="numeric"
                    type="text"
                    value={averageTicketInput}
                    onChange={handleCurrencyFieldChange(setAverageTicketInput)}
                    onBlur={() => setAverageTicketInput(String(averageTicket))}
                    aria-label="Ticket medio de primera compra"
                  />
                </div>
              </div>

              <div className="simulator-trust-row">
                <div>
                  <ShieldCheck size={18} />
                  <span>Sin pedir datos sensibles</span>
                </div>
                <div>
                  <Mail size={18} />
                  <span>Resumen completo por email</span>
                </div>
              </div>
            </aside>

            <div className="simulator-panel simulator-panel-results">
              <div className="simulator-results-header">
                <div>
                  <span className="simulator-results-label">Escenarios</span>
                  <p>Elige la lectura que mejor encaje con tu clínica.</p>
                </div>
              </div>

              <div className="simulator-scenarios" role="tablist" aria-label="Escenarios de crecimiento">
                {SCENARIO_ORDER.map((scenarioKey) => {
                  const scenario = scenarioResults[scenarioKey];
                  const isActive = selectedScenario === scenarioKey;

                  return (
                    <button
                      key={scenarioKey}
                      type="button"
                      className={`scenario-chip ${isActive ? 'is-active' : ''}`}
                      onClick={() => {
                        resetSubmissionFeedback();
                        setSelectedScenario(scenarioKey);
                      }}
                      role="tab"
                      aria-selected={isActive}
                    >
                      <div className="scenario-chip-top">
                        <span>{scenario.label}</span>
                        <strong>{scenario.eyebrow}</strong>
                      </div>
                      <p>{scenario.description}</p>
                      <div className="scenario-chip-metrics">
                        <span>{formatCompactCurrency(scenario.estimatedRevenue)}</span>
                        <small>{formatRecoveryWindow(scenario.recoveryDays)}</small>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="simulator-spotlight-card">
                <div className="simulator-spotlight-copy">
                  <span>{activeScenario.label}</span>
                  <h3>
                    {formatCurrency(monthlyInvestment)} podrían traducirse en {formatCurrency(activeScenario.estimatedRevenue)} estimados.
                  </h3>
                  <p>
                    Basado en un cierre del {closeRate}% y un ticket medio de {formatCurrency(averageTicket)}.
                  </p>
                </div>
                <div className="simulator-spotlight-stat">
                  <span>Ventana de recuperación estimada</span>
                  <strong>{formatRecoveryWindow(activeScenario.recoveryDays)}</strong>
                </div>
              </div>

              <div className="simulator-results-grid">
                {resultCards.map((card) => (
                  <article
                    key={card.id}
                    className={`simulator-result-card ${
                      card.tone === 'highlight' ? 'simulator-result-card-highlight' : ''
                    }`}
                  >
                    <div className="simulator-result-icon">{card.icon}</div>
                    <div className="simulator-result-content">
                      <p>{card.label}</p>
                      <h3>
                        <AnimatedMetric value={card.value} formatter={card.formatter} />
                      </h3>
                      <small>{card.hint}</small>
                    </div>
                  </article>
                ))}
              </div>

              <p className="simulator-disclaimer">
                Estimación orientativa basada en benchmarks de captación, cualificación y velocidad media de
                cierre. La cifra real dependerá de vuestra oferta, proceso comercial, reputación y capacidad de
                respuesta.
              </p>

              <div className="simulator-lead-card">
                <div className="simulator-lead-copy">
                  <span>Recibe tu simulación</span>
                  <h3>Déjanos tu email y te enviaremos el resumen completo.</h3>
                  <p>
                    Incluye tus datos, la estimación completa y una lectura más detallada del caso.
                  </p>
                </div>

                <form className="simulator-lead-form" onSubmit={handleSubmit}>
                  <label className="sr-only" htmlFor="simulation-email">
                    Email
                  </label>
                  <input
                    id="simulation-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="nombre@tuclinica.com"
                    autoComplete="email"
                    aria-label="Email para recibir la simulación"
                  />
                  <input
                    className="simulator-honeypot"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                    aria-hidden="true"
                  />
                  <button type="submit" className="btn simulator-submit-btn" disabled={submitState === 'submitting'}>
                    {submitState === 'submitting' ? 'Enviando simulación...' : 'Recibir mi simulación'}
                    <ChevronRight size={18} />
                  </button>
                </form>

                <p className="simulator-privacy-note">
                  Sin spam. Solo tu simulación y la opción de revisar el caso si encaja.
                </p>

                {submitMessage ? (
                  <div
                    className={`simulator-form-feedback ${
                      submitState === 'error' ? 'is-error' : 'is-success'
                    }`}
                    role="status"
                  >
                    {submitMessage}
                  </div>
                ) : null}

                {submitState === 'success' ? (
                  <button type="button" className="simulator-inline-cta" onClick={onOpenModal}>
                    Quiero revisar mi caso con Aurea
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthSimulator;
