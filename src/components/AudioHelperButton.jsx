import { Volume2, Square } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export default function AudioHelperButton({
  texto,
  label = 'Ouvir',
  variant = 'outline', // 'outline' | 'solid' | 'compact'
  className = '',
}) {
  const { speak, stopSpeaking, isSpeaking } = useAccessibility();

  const handleToggleAudio = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(texto, true);
    }
  };

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleToggleAudio}
        aria-label={isSpeaking ? 'Parar leitura em áudio' : `Ouvir: ${label}`}
        className={`min-w-[44px] min-h-[44px] px-3 py-2 rounded-xl border-2 border-ms-blue text-ms-blue bg-blue-50/70 hover:bg-blue-100 font-bold text-sm flex items-center justify-center gap-1.5 transition-colors shrink-0 ${className}`}
      >
        {isSpeaking ? <Square className="w-4 h-4 fill-current" /> : <Volume2 className="w-4 h-4" />}
        <span>{isSpeaking ? 'Parar' : label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggleAudio}
      aria-label={isSpeaking ? 'Parar leitura em áudio' : label}
      className={`min-h-[48px] px-4 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors border-2 ${
        isSpeaking
          ? 'bg-red-600 text-white border-red-700 hover:bg-red-700'
          : variant === 'solid'
          ? 'bg-ms-blue text-white border-ms-blue hover:bg-blue-900'
          : 'bg-white text-ms-blue border-ms-blue hover:bg-blue-50'
      } ${className}`}
    >
      {isSpeaking ? (
        <>
          <Square className="w-5 h-5 fill-current shrink-0" />
          <span>Parar áudio</span>
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5 shrink-0" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}