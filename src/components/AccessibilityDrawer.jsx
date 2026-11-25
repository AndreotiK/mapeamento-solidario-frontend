import { useState } from 'react';
import {
  Accessibility,
  X,
  Eye,
  Type,
  Hand,
  Volume2,
  Globe,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export default function AccessibilityDrawer() {
  const {
    settings,
    updateSetting,
    resetSettings,
    drawerOpen,
    setDrawerOpen,
    speak,
  } = useAccessibility();

  const [maisAjustesAberto, setMaisAjustesAberto] = useState(true);

  if (!drawerOpen) return null;

  const handleToggleVoice = () => {
    const next = !settings.voiceReading;
    updateSetting('voiceReading', next);
    if (next) {
      speak('Leitura por voz ativada. Os avisos e instruções serão lidos automaticamente.', true);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-a11y-drawer"
    >
      <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6 shadow-2xl flex flex-col gap-6">
        {/* Cabeçalho da Aba */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5 text-ms-blue">
            <div className="bg-blue-100 p-2 rounded-xl">
              <Accessibility className="w-6 h-6" />
            </div>
            <div>
              <h2 id="titulo-a11y-drawer" className="text-xl font-bold">
                Acessibilidade
              </h2>
              <p className="text-xs text-gray-500">Adapte a tela às suas necessidades</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Fechar menu de acessibilidade"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 1. AJUSTES RÁPIDOS */}
        <section aria-labelledby="sec-ajustes-rapidos" className="flex flex-col gap-3">
          <h3 id="sec-ajustes-rapidos" className="text-sm font-extrabold uppercase tracking-wider text-ms-blue flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Ajustes Rápidos
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {/* Letra Grande */}
            <button
              type="button"
              onClick={() =>
                updateSetting('fontSize', settings.fontSize === 'normal' ? 'large' : 'normal')
              }
              aria-pressed={settings.fontSize !== 'normal'}
              className={`min-h-[54px] p-4 rounded-xl border-2 flex items-center justify-between font-bold transition-colors ${
                settings.fontSize !== 'normal'
                  ? 'bg-ms-blue text-white border-ms-blue'
                  : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-ms-blue'
              }`}
            >
              <span className="flex items-center gap-3">
                <Type className="w-5 h-5" /> Letra Grande
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-black/10">
                {settings.fontSize !== 'normal' ? 'Ativado' : 'Desativado'}
              </span>
            </button>

            {/* Alto Contraste */}
            <button
              type="button"
              onClick={() => updateSetting('highContrast', !settings.highContrast)}
              aria-pressed={settings.highContrast}
              className={`min-h-[54px] p-4 rounded-xl border-2 flex items-center justify-between font-bold transition-colors ${
                settings.highContrast
                  ? 'bg-ms-blue text-white border-ms-blue'
                  : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-ms-blue'
              }`}
            >
              <span className="flex items-center gap-3">
                <Eye className="w-5 h-5" /> Alto Contraste
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-black/10">
                {settings.highContrast ? 'Ativado' : 'Desativado'}
              </span>
            </button>

            {/* Leitura por Voz */}
            <button
              type="button"
              onClick={handleToggleVoice}
              aria-pressed={settings.voiceReading}
              className={`min-h-[54px] p-4 rounded-xl border-2 flex items-center justify-between font-bold transition-colors ${
                settings.voiceReading
                  ? 'bg-ms-blue text-white border-ms-blue'
                  : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-ms-blue'
              }`}
            >
              <span className="flex items-center gap-3">
                <Volume2 className="w-5 h-5" /> Leitura por Voz Automática
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-black/10">
                {settings.voiceReading ? 'Ativado' : 'Desativado'}
              </span>
            </button>
          </div>
        </section>

        {/* 2. MAIS AJUSTES */}
        <section className="border-t border-gray-200 pt-4 flex flex-col gap-4">
          <button
            type="button"
            onClick={() => setMaisAjustesAberto(!maisAjustesAberto)}
            aria-expanded={maisAjustesAberto}
            className="min-h-[48px] flex items-center justify-between font-extrabold text-sm uppercase tracking-wider text-gray-700"
          >
            <span>Mais Ajustes</span>
            {maisAjustesAberto ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {maisAjustesAberto && (
            <div className="flex flex-col gap-5">
              {/* Subcategoria: Tela e Cores */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col gap-3">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-ms-blue" /> Tela e Cores
                </h4>

                <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                  Filtro para Daltonismo / Conforto Visual
                  <select
                    value={settings.colorFilter}
                    onChange={(e) => updateSetting('colorFilter', e.target.value)}
                    className="p-3 border-2 border-gray-300 rounded-xl bg-white font-semibold"
                  >
                    <option value="none">Cores Padrão</option>
                    <option value="protanopia">Ajuste Protanopia (Vermelho-Verde)</option>
                    <option value="deuteranopia">Ajuste Deuteranopia (Verde-Vermelho)</option>
                    <option value="grayscale">Escala de Cinza (Monocromático)</option>
                  </select>
                </label>

                <label className="flex items-center justify-between gap-2 pt-1 cursor-pointer min-h-[44px]">
                  <span className="text-sm font-medium text-gray-700">Reduzir animações e movimentos</span>
                  <input
                    type="checkbox"
                    checked={settings.reducedMotion}
                    onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
                    className="w-5 h-5 accent-ms-blue"
                  />
                </label>
              </div>

              {/* Subcategoria: Texto e Zoom */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col gap-3">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <Type className="w-5 h-5 text-ms-blue" /> Texto e Zoom
                </h4>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'normal', label: '100%' },
                    { id: 'large', label: '115%' },
                    { id: 'xlarge', label: '130%' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => updateSetting('fontSize', opt.id)}
                      className={`min-h-[44px] rounded-xl border-2 font-bold text-sm ${
                        settings.fontSize === opt.id
                          ? 'bg-ms-blue text-white border-ms-blue'
                          : 'bg-white text-gray-700 border-gray-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <label className="flex items-center justify-between gap-2 pt-1 cursor-pointer min-h-[44px]">
                  <span className="text-sm font-medium text-gray-700">Aumentar espaçamento entre letras e linhas</span>
                  <input
                    type="checkbox"
                    checked={settings.textSpacing}
                    onChange={(e) => updateSetting('textSpacing', e.target.checked)}
                    className="w-5 h-5 accent-ms-blue"
                  />
                </label>
              </div>

              {/* Subcategoria: Toque e Digitação */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col gap-3">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <Hand className="w-5 h-5 text-ms-blue" /> Toque e Digitação
                </h4>

                <label className="flex items-center justify-between gap-2 cursor-pointer min-h-[44px]">
                  <span className="text-sm font-medium text-gray-700">Botões e campos extra grandes (58px)</span>
                  <input
                    type="checkbox"
                    checked={settings.largeTouchTargets}
                    onChange={(e) => updateSetting('largeTouchTargets', e.target.checked)}
                    className="w-5 h-5 accent-ms-blue"
                  />
                </label>

                <label className="flex items-center justify-between gap-2 cursor-pointer min-h-[44px]">
                  <span className="text-sm font-medium text-gray-700">Focar automaticamente no campo com erro</span>
                  <input
                    type="checkbox"
                    checked={settings.autoFocusErrors}
                    onChange={(e) => updateSetting('autoFocusErrors', e.target.checked)}
                    className="w-5 h-5 accent-ms-blue"
                  />
                </label>
              </div>

              {/* Subcategoria: Som, Voz e Alertas */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col gap-3">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-ms-blue" /> Som, Voz e Alertas
                </h4>

                <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                  Velocidade da leitura por voz
                  <select
                    value={settings.voiceRate}
                    onChange={(e) => updateSetting('voiceRate', parseFloat(e.target.value))}
                    className="p-3 border-2 border-gray-300 rounded-xl bg-white font-semibold"
                  >
                    <option value={0.8}>Mais lenta (0.8x)</option>
                    <option value={1.0}>Normal (1.0x)</option>
                    <option value={1.25}>Rápida (1.25x)</option>
                  </select>
                </label>

                <label className="flex items-center justify-between gap-2 pt-1 cursor-pointer min-h-[44px]">
                  <span className="text-sm font-medium text-gray-700">Alertas sonoros de confirmação e erro</span>
                  <input
                    type="checkbox"
                    checked={settings.soundAlerts}
                    onChange={(e) => updateSetting('soundAlerts', e.target.checked)}
                    className="w-5 h-5 accent-ms-blue"
                  />
                </label>
              </div>
            </div>
          )}
        </section>

        {/* 3. GERAL (IDIOMAS E RESTAURAR) */}
        <section className="border-t border-gray-200 pt-4 flex flex-col gap-3">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-700 flex items-center gap-2">
            <Globe className="w-4 h-4 text-ms-blue" /> Geral
          </h3>

          <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            Idioma da Interface e da Voz
            <select
              value={settings.language}
              onChange={(e) => updateSetting('language', e.target.value)}
              className="p-3 border-2 border-gray-300 rounded-xl bg-white font-semibold"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="es-ES">Español (Imigrantes / Refugiados)</option>
              <option value="en-US">English (International)</option>
            </select>
          </label>

          <button
            type="button"
            onClick={resetSettings}
            className="mt-2 min-h-[48px] w-full border-2 border-gray-300 text-gray-700 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Restaurar Configurações Padrão
          </button>
        </section>
      </div>
    </div>
  );
}