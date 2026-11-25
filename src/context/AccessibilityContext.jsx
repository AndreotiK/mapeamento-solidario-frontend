import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AccessibilityContext = createContext(null);

const DEFAULT_SETTINGS = {
  // Ajustes Rápidos & Tela e Cores
  highContrast: false,
  colorFilter: 'none', // 'none' | 'grayscale' | 'protanopia' | 'deuteranopia'
  reducedMotion: false,

  // Texto e Zoom
  fontSize: 'normal', // 'normal' | 'large' | 'xlarge'
  textSpacing: false,

  // Toque e Digitação
  largeTouchTargets: false,
  autoFocusErrors: true,

  // Som, Voz e Alertas
  voiceReading: false, // Leitura automática ao focar/abrir
  voiceRate: 1.0, // 0.8 | 1.0 | 1.25
  soundAlerts: true, // Feedback sonoro discreto

  // Geral e Idiomas
  language: 'pt-BR', // 'pt-BR' | 'es-ES' | 'en-US'
};

export function AccessibilityProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('ms_a11y_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [librasOpen, setLibrasOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Sincroniza classes e variáveis CSS no <html>
  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('ms_a11y_settings', JSON.stringify(settings));

    // Escala de fonte
    const scaleMap = { normal: '1', large: '1.15', xlarge: '1.3' };
    root.style.setProperty('--a11y-font-scale', scaleMap[settings.fontSize] || '1');

    // Espaçamento de texto (WCAG 1.4.12)
    root.style.setProperty('--a11y-letter-spacing', settings.textSpacing ? '0.06em' : '0em');
    root.style.setProperty('--a11y-line-height', settings.textSpacing ? '1.8' : '1.5');

    // Classes booleanas
    root.classList.toggle('a11y-high-contrast', settings.highContrast);
    root.classList.toggle('a11y-large-touch', settings.largeTouchTargets);
    root.classList.toggle('a11y-reduced-motion', settings.reducedMotion);

    // Filtros de cor
    root.classList.remove('a11y-filter-grayscale', 'a11y-filter-protanopia', 'a11y-filter-deuteranopia');
    if (settings.colorFilter !== 'none') {
      root.classList.add(`a11y-filter-${settings.colorFilter}`);
    }

    // Idioma do documento
    root.setAttribute('lang', settings.language);
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    stopSpeaking();
  };

  // Alerta sonoro suave (Web Audio API - sem dependências externas)
  const playAlertTone = useCallback((type = 'info') => {
    if (!settings.soundAlerts) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.value = type === 'error' ? 320 : 580;
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // Ignora caso o navegador bloqueie áudio automático
    }
  }, [settings.soundAlerts]);

  // Síntese de Voz (Web Speech API)
  const speak = useCallback((text, force = false) => {
    if (!text) return;
    if (!force && !settings.voiceReading) return;
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = settings.language;
    utterance.rate = settings.voiceRate;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [settings.voiceReading, settings.language, settings.voiceRate]);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        resetSettings,
        drawerOpen,
        setDrawerOpen,
        librasOpen,
        setLibrasOpen,
        speak,
        stopSpeaking,
        isSpeaking,
        playAlertTone,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility deve ser usado dentro de AccessibilityProvider');
  }
  return context;
}