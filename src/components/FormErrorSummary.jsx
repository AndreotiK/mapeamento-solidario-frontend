import { AlertCircle } from 'lucide-react';
import AudioHelperButton from './AudioHelperButton';

export default function FormErrorSummary({ mensagem, onFocarPrimeiroErro }) {
  if (!mensagem) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="bg-red-50 border-2 border-red-600 p-4 rounded-2xl text-red-900 flex flex-col gap-3 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-extrabold text-red-700 text-base">Atenção para continuar:</p>
          <p className="font-semibold text-red-900 mt-0.5">{mensagem}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        <AudioHelperButton
          texto={mensagem}
          label="Ouvir erro"
          variant="compact"
          className="border-red-600 text-red-700 bg-white hover:bg-red-100"
        />
        {onFocarPrimeiroErro && (
          <button
            type="button"
            onClick={onFocarPrimeiroErro}
            className="min-h-[44px] px-3 py-2 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors"
          >
            Ir para o campo
          </button>
        )}
      </div>
    </div>
  );
}