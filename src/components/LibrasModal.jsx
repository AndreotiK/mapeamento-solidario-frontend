import { Hand, X, Info } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export default function LibrasModal() {
  const { librasOpen, setLibrasOpen } = useAccessibility();

  if (!librasOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-libras"
    >
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-2 border-ms-blue">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
          <div className="flex items-center gap-2 text-ms-blue">
            <Hand className="w-6 h-6" />
            <h2 id="titulo-libras" className="text-xl font-bold">
              Intérprete de Libras
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setLibrasOpen(false)}
            aria-label="Fechar janela de Libras"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Simulação visual do Avatar Intérprete (VLibras) */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 flex flex-col items-center text-center mb-4">
          <div className="w-24 h-24 rounded-full bg-ms-blue text-white flex items-center justify-center mb-3 shadow-md">
            <Hand className="w-12 h-12" />
          </div>
          <p className="font-bold text-ms-blue text-lg">Tradução em Libras Ativa</p>
          <p className="text-sm text-gray-700 mt-2">
            "Bem-vindo ao Mapeamento Solidário. Escolha <strong>Buscar Lar</strong> se precisa de abrigo gratuito, ou <strong>Oferecer Moradia</strong> se representa uma ONG ou abrigo."
          </p>
        </div>

        <div className="bg-gray-50 p-3 rounded-xl flex items-start gap-2 text-xs text-gray-600 mb-5">
          <Info className="w-4 h-4 text-ms-blue shrink-0 mt-0.5" />
          <span>
            Protótipo de IHC: Em produção, este módulo integra o widget oficial VLibras (Gov.br) para tradução simultânea de toda a interface.
          </span>
        </div>

        <button
          type="button"
          onClick={() => setLibrasOpen(false)}
          className="w-full min-h-[48px] bg-ms-blue text-white font-bold rounded-xl hover:bg-blue-900 transition-colors"
        >
          Entendi, fechar
        </button>
      </div>
    </div>
  );
}