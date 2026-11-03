import { MapPin, Building2, HeartHandshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ms-gray-bg flex flex-col items-center justify-center p-6">
      
      {/* Cabeçalho */}
      <div className="text-center mb-12">
        <div className="bg-ms-green w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <HeartHandshake className="text-white w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-ms-green mb-2">Mapeamento Solidário</h1>
        <p className="text-ms-gray-text text-lg">Como podemos te ajudar hoje?</p>
      </div>

      {/* Botões de Ação */}
      <div className="w-full max-w-sm flex flex-col gap-6">
        
        {/* Botão: Buscar Lar */}
        <button 
          onClick={() => navigate('/morador/identificacao')}
          className="w-full min-h-[80px] bg-ms-green text-white rounded-2xl p-6 flex items-center gap-4 shadow-md hover:bg-green-800 transition-colors focus:ring-4 focus:ring-green-300"
        >
          <div className="bg-white/20 p-3 rounded-full">
            <MapPin className="w-8 h-8" />
          </div>
          <div className="text-left">
            <span className="block text-xl font-bold">Buscar Lar</span>
            <span className="block text-sm opacity-90">Encontrar moradia temporária</span>
          </div>
        </button>

        {/* Botão: Oferecer Moradia */}
        <button 
          onClick={() => navigate('/gestor/login')}
          className="w-full min-h-[80px] bg-ms-blue text-white rounded-2xl p-6 flex items-center gap-4 shadow-md hover:bg-blue-900 transition-colors focus:ring-4 focus:ring-blue-300"
        >
          <div className="bg-white/20 p-3 rounded-full">
            <Building2 className="w-8 h-8" />
          </div>
          <div className="text-left">
            <span className="block text-xl font-bold">Oferecer Moradia</span>
            <span className="block text-sm opacity-90">Área do gestor e ONGs</span>
          </div>
        </button>

      </div>

      {/* Rodapé */}
      <div className="mt-16 text-sm text-ms-gray-text font-medium flex items-center gap-2">
        <span>Feito para garantir cidadania e dignidade</span>
      </div>
    </div>
  );
}