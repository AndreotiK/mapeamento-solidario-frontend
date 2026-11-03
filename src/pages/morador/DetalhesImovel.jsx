import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Droplets, Utensils, Wrench, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

// Dados mockados detalhados (simulando o que viria do banco de dados)
const dadosImovel = {
  id: 1,
  nome: "Abrigo Esperança",
  distancia: "1.2 km",
  vagasDisponiveis: 15,
  tempoMaximo: "3 meses",
  endereco: "Rua das Flores, 120 - Centro",
  imagem: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&q=80&w=800",
  servicos: ["Banho", "Alimentação", "Oficinas"],
  descricao: "Um espaço seguro e acolhedor para você se reestabelecer. Aqui você tem acesso a refeições diárias, banho quente e oficinas de capacitação profissional.",
  regras: [
    "Proibido cobrança de aluguel (regra do projeto).",
    "Respeito mútuo entre todos os moradores.",
    "Participação opcional nas oficinas oferecidas."
  ]
};

export default function DetalhesImovel() {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL (ex: /morador/detalhes/1)
  
  const [modalAberto, setModalAberto] = useState(false);
  const [codigoReserva, setCodigoReserva] = useState('');

  // Função que simula a chamada ao backend para reservar
  const handleReservar = () => {
    // Gera um código aleatório de 4 dígitos (ex: MS-8472)
    const codigo = `MS-${Math.floor(1000 + Math.random() * 9000)}`;
    setCodigoReserva(codigo);
    setModalAberto(true);
  };

  return (
    <div className="min-h-screen bg-ms-gray-bg pb-24">
      {/* Cabeçalho */}
      <header className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => navigate('/morador/busca')} 
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-ms-gray-text hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Voltar para a busca"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-ms-green ml-2">Detalhes da Moradia</h1>
      </header>

      <main className="max-w-md mx-auto">
        {/* Imagem de Capa */}
        <div className="h-64 w-full bg-gray-200 relative">
          <img 
            src={dadosImovel.imagem} 
            alt={`Foto do local: ${dadosImovel.nome}`} 
            className="w-full h-full object-cover opacity-80" 
          />
        </div>

        <div className="p-6 flex flex-col gap-6 -mt-6 bg-ms-gray-bg rounded-t-3xl relative z-0">
          
          {/* Título e Vagas */}
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-3xl font-bold text-gray-800">{dadosImovel.nome}</h2>
              <span className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full text-sm flex items-center gap-1 border border-green-300">
                <Users className="w-4 h-4" /> {dadosImovel.vagasDisponiveis} vagas
              </span>
            </div>
            <p className="text-ms-gray-text flex items-center gap-1 mt-2 text-lg">
              <MapPin className="w-5 h-5" /> {dadosImovel.endereco}
            </p>
          </div>

          {/* Aviso de Tempo Máximo */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-start gap-3">
            <Clock className="w-6 h-6 text-ms-blue shrink-0" />
            <div>
              <p className="font-bold text-ms-blue">Tempo máximo de estadia</p>
              <p className="text-sm text-blue-800">Você pode ficar por até <strong>{dadosImovel.tempoMaximo}</strong> para se reestabelecer.</p>
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-3">O que este local oferece:</h3>
            <div className="flex flex-wrap gap-2">
              {dadosImovel.servicos.includes("Banho") && (
                <span className="flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-2 rounded-xl text-base font-medium border border-cyan-200">
                  <Droplets className="w-5 h-5" /> Banho
                </span>
              )}
              {dadosImovel.servicos.includes("Alimentação") && (
                <span className="flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-xl text-base font-medium border border-orange-200">
                  <Utensils className="w-5 h-5" /> Alimentação
                </span>
              )}
              {dadosImovel.servicos.includes("Oficinas") && (
                <span className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-xl text-base font-medium border border-purple-200">
                  <Wrench className="w-5 h-5" /> Oficinas
                </span>
              )}
            </div>
          </div>

          {/* Descrição e Regras */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">Sobre o local</h3>
            <p className="text-gray-600 leading-relaxed">{dadosImovel.descricao}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-ms-green" /> Regras de convivência
            </h3>
            <ul className="list-disc pl-5 text-gray-600 flex flex-col gap-2">
              {dadosImovel.regras.map((regra, index) => (
                <li key={index}>{regra}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Botão Fixo no Rodapé para Reservar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 shadow-lg max-w-md mx-auto">
        <button 
          onClick={handleReservar}
          className="w-full min-h-[60px] bg-ms-green text-white text-xl font-bold rounded-xl shadow-md hover:bg-green-800 transition-colors focus:ring-4 focus:ring-green-300 flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-6 h-6" />
          Reservar Vaga Agora
        </button>
      </div>

      {/* Modal de Sucesso da Reserva (Overlay) */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div 
            className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in duration-200"
            role="dialog" 
            aria-modal="true"
            aria-labelledby="titulo-modal"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-ms-green" />
            </div>
            
            <h2 id="titulo-modal" className="text-2xl font-bold text-gray-800 mb-2">Reserva Prévia Feita!</h2>
            <p className="text-gray-600 mb-6">
              Sua vaga foi reservada por 24 horas. Apresente este código na recepção para finalizar seu cadastro:
            </p>

            <div className="bg-ms-gray-bg border-2 border-dashed border-ms-green py-4 rounded-xl mb-6">
              <span className="text-4xl font-black text-ms-green tracking-widest">{codigoReserva}</span>
            </div>

            <p className="text-sm text-gray-500 mb-8">
              Não é necessário imprimir. Basta mostrar esta tela ou falar o código para o assistente social.
            </p>

            <button 
              onClick={() => navigate('/')}
              className="w-full min-h-[50px] bg-ms-blue text-white font-bold rounded-xl hover:bg-blue-900 transition-colors"
            >
              Entendi, voltar ao início
            </button>
          </div>
        </div>
      )}
    </div>
  );
}