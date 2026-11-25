import { useEffect } from 'react';
import { MapPin, Building2, HeartHandshake, Accessibility, Hand } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../context/AccessibilityContext';
import AudioHelperButton from '../components/AudioHelperButton';

export default function Home() {
  const navigate = useNavigate();
  const { setDrawerOpen, setLibrasOpen, speak, settings } = useAccessibility();

  const textoInstrucoes =
    'Bem-vindo ao Mapeamento Solidário. Como podemos te ajudar hoje? ' +
    'Toque no botão verde Buscar Lar se você precisa encontrar moradia temporária gratuita. ' +
    'Ou toque no botão azul Oferecer Moradia se você faz parte de uma ONG ou gestão de abrigo.';

  useEffect(() => {
    if (settings.voiceReading) {
      speak(textoInstrucoes);
    }
  }, [settings.voiceReading, speak, textoInstrucoes]);

  return (
    <div className="min-h-screen bg-ms-gray-bg flex flex-col justify-between p-6">
      {/* Barra Superior de Acessibilidade Alinhada ao Grid Principal */}
      <header className="w-full max-w-sm mx-auto pt-1">
        <div className="grid grid-cols-2 gap-2.5">
          {/* Ação Primária de Acessibilidade: Ocupa toda a largura superior */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="col-span-2 w-full min-h-[52px] px-4 py-2.5 bg-white border-2 border-ms-blue text-ms-blue font-bold rounded-2xl shadow-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2.5"
          >
            <Accessibility className="w-5 h-5 shrink-0" />
            <span>Acessibilidade</span>
          </button>

          {/* Apoio Multimodal: Dividido simetricamente em 2 colunas */}
          <AudioHelperButton
            texto={textoInstrucoes}
            label="Ouvir instruções"
            variant="outline"
            className="w-full min-h-[52px] rounded-2xl shadow-sm px-3"
          />

          <button
            type="button"
            onClick={() => setLibrasOpen(true)}
            aria-label="Ativar suporte em Libras"
            className="w-full min-h-[52px] px-3 py-2.5 bg-white border-2 border-ms-blue text-ms-blue font-bold text-sm rounded-2xl shadow-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            <Hand className="w-5 h-5 shrink-0" />
            <span>Libras</span>
          </button>
        </div>
      </header>

      {/* Conteúdo Central */}
      <main className="flex flex-col items-center justify-center my-auto py-8">
        <div className="text-center mb-10">
          <div className="bg-ms-green w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <HeartHandshake className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-ms-green mb-2">Mapeamento Solidário</h1>
          <p className="text-ms-gray-text text-lg">Como podemos te ajudar hoje?</p>
        </div>

        {/* Botões de Ação */}
        <div className="w-full max-w-sm flex flex-col gap-5">
          <button
            onClick={() => navigate('/morador/identificacao')}
            className="w-full min-h-[80px] bg-ms-green text-white rounded-2xl p-6 flex items-center gap-4 shadow-md hover:bg-green-800 transition-colors focus:ring-4 focus:ring-green-300"
          >
            <div className="bg-white/20 p-3 rounded-full shrink-0">
              <MapPin className="w-8 h-8" />
            </div>
            <div className="text-left">
              <span className="block text-xl font-bold">Buscar Lar</span>
              <span className="block text-sm opacity-90">Encontrar moradia temporária</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/gestor/login')}
            className="w-full min-h-[80px] bg-ms-blue text-white rounded-2xl p-6 flex items-center gap-4 shadow-md hover:bg-blue-900 transition-colors focus:ring-4 focus:ring-blue-300"
          >
            <div className="bg-white/20 p-3 rounded-full shrink-0">
              <Building2 className="w-8 h-8" />
            </div>
            <div className="text-left">
              <span className="block text-xl font-bold">Oferecer Moradia</span>
              <span className="block text-sm opacity-90">Área do gestor e ONGs</span>
            </div>
          </button>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="text-center text-sm text-ms-gray-text font-medium pb-2">
        <span>Feito para garantir cidadania e dignidade</span>
      </footer>
    </div>
  );
}