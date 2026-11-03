import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Droplets, Utensils, Wrench, ChevronRight } from 'lucide-react';

// Dados simulados (Mock) para testar o layout
const imoveisMock = [
  {
    id: 1,
    nome: "Abrigo Esperança",
    distancia: "1.2 km",
    vagas: 15,
    servicos: ["Banho", "Alimentação", "Oficinas"],
    imagem: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    nome: "Ocupação Digna",
    distancia: "2.5 km",
    vagas: 4,
    servicos: ["Banho", "Oficinas"],
    imagem: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    nome: "Casa de Passagem Sol",
    distancia: "3.8 km",
    vagas: 8,
    servicos: ["Banho", "Alimentação"],
    imagem: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400",
  }
];

export default function BuscaImoveis() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ms-gray-bg pb-10">
      {/* Cabeçalho Fixo */}
      <header className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => navigate('/morador/identificacao')} 
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-ms-gray-text hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Voltar para a identificação"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-ms-green ml-2">Moradias Próximas</h1>
      </header>

      <main className="p-4 max-w-md mx-auto">
        {/* Indicador de Localização */}
        <div className="flex items-center gap-2 text-ms-gray-text mb-6 bg-blue-50 p-3 rounded-lg border border-blue-100">
          <MapPin className="w-5 h-5 text-ms-blue" />
          <span className="text-sm font-medium">Mostrando resultados com base na sua localização atual.</span>
        </div>

        {/* Lista de Imóveis */}
        <div className="flex flex-col gap-6">
          {imoveisMock.map((imovel) => (
            <div 
              key={imovel.id} 
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col"
            >
              {/* Foto com opacidade reduzida */}
              <div className="relative h-40 w-full bg-gray-200">
                <img 
                  src={imovel.imagem} 
                  alt={`Foto do local: ${imovel.nome}`} 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-ms-green shadow-sm">
                  {imovel.vagas} vagas
                </div>
              </div>

              {/* Conteúdo do Card */}
              <div className="p-5 flex flex-col gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{imovel.nome}</h2>
                  <p className="text-ms-gray-text flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" /> A {imovel.distancia} de você
                  </p>
                </div>

                {/* Ícones de Serviços */}
                <div className="flex flex-wrap gap-2">
                  {imovel.servicos.includes("Banho") && (
                    <span className="flex items-center gap-1 bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium border border-cyan-200">
                      <Droplets className="w-4 h-4" /> Banho
                    </span>
                  )}
                  {imovel.servicos.includes("Alimentação") && (
                    <span className="flex items-center gap-1 bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-medium border border-orange-200">
                      <Utensils className="w-4 h-4" /> Alimentação
                    </span>
                  )}
                  {imovel.servicos.includes("Oficinas") && (
                    <span className="flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium border border-purple-200">
                      <Wrench className="w-4 h-4" /> Oficinas
                    </span>
                  )}
                </div>

                {/* Botão de Ação */}
                <button 
                  onClick={() => navigate(`/morador/detalhes/${imovel.id}`)}
                  className="mt-2 w-full min-h-[50px] bg-ms-blue text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-900 transition-colors focus:ring-4 focus:ring-blue-300"
                >
                  Ver Detalhes e Reservar
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}