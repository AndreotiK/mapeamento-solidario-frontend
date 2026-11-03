import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Landmark, CheckCircle2, Phone, MapPin, ClipboardCheck } from 'lucide-react';

export default function SolicitacaoAvaliacao() {
  const navigate = useNavigate();
  const [enviado, setEnviado] = useState(false);

  const [formData, setFormData] = useState({
    responsavel: '',
    telefone: '', // NOVO: Essencial para agendar a visita
    email: '',
    nomeImovel: '',
    endereco: '',
    turnoVisita: 'manha', // NOVO: Para facilitar o agendamento
    aceitaTermo: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.aceitaTermo) {
      alert("Você precisa aceitar o Termo de Compromisso Ético para solicitar a visita.");
      return;
    }
    
    // Simula o envio para o órgão governamental
    console.log("Solicitação de Visita Técnica:", formData);
    setEnviado(true);
  };

  // Tela de Sucesso com Explicação do Processo
  if (enviado) {
    return (
      <div className="min-h-screen bg-ms-gray-bg flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-blue-100 p-6 rounded-full mb-6">
          <ClipboardCheck className="w-16 h-16 text-ms-blue" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Visita Técnica Solicitada!</h1>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full text-left mb-8">
          <h2 className="font-bold text-gray-800 mb-3 text-lg">Próximos passos:</h2>
          <ol className="list-decimal pl-5 text-gray-600 space-y-2 text-sm">
            <li>Um assistente social do governo entrará em contato pelo telefone <strong>{formData.telefone}</strong> em até 5 dias úteis.</li>
            <li>Será agendada uma visita técnica ao endereço informado para avaliar as condições do imóvel.</li>
            <li>Se o imóvel for aprovado, você receberá um e-mail com seu <strong>login de acesso</strong> e instruções de uso.</li>
          </ol>
        </div>

        <p className="text-sm text-gray-500 mb-8 max-w-xs">Agradecemos por contribuir com a reintegração e dignidade de pessoas em vulnerabilidade.</p>
        
        <button 
          onClick={() => navigate('/gestor/login')}
          className="w-full max-w-sm min-h-[50px] bg-ms-blue text-white font-bold rounded-xl hover:bg-blue-900 transition-colors"
        >
          Voltar para o Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ms-gray-bg pb-10">
      {/* Cabeçalho */}
      <header className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => navigate('/gestor/login')} 
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-ms-gray-text hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Voltar para o login"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-ms-blue ml-2">Solicitar Visita Técnica</h1>
      </header>

      <main className="p-4 max-w-md mx-auto flex flex-col gap-6 mt-4">
        
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-start gap-3">
          <Landmark className="w-6 h-6 text-ms-blue shrink-0" />
          <p className="text-sm text-blue-900">
            Para garantir a segurança de todos, todo novo imóvel passa por uma <strong>vistoria técnica do Governo</strong> antes de receber moradores.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          
          <div className="flex flex-col gap-1">
            <label htmlFor="responsavel" className="font-semibold text-gray-700">Nome do Responsável / ONG</label>
            <input 
              type="text" id="responsavel" name="responsavel" required
              value={formData.responsavel} onChange={handleChange}
              className="p-3 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0"
              placeholder="Seu nome completo"
            />
          </div>

          {/* Novo Campo: Telefone */}
          <div className="flex flex-col gap-1">
            <label htmlFor="telefone" className="font-semibold text-gray-700 flex items-center gap-2">
              Telefone / WhatsApp <span className="text-sm font-normal text-gray-500">(para agendar a visita)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="tel" id="telefone" name="telefone" required
                value={formData.telefone} onChange={handleChange}
                className="w-full p-3 pl-10 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0"
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold text-gray-700">E-mail para Retorno</label>
            <input 
              type="email" id="email" name="email" required
              value={formData.email} onChange={handleChange}
              className="p-3 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0"
              placeholder="voce@email.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="nomeImovel" className="font-semibold text-gray-700">Nome do Imóvel / Ocupação</label>
            <input 
              type="text" id="nomeImovel" name="nomeImovel" required
              value={formData.nomeImovel} onChange={handleChange}
              className="p-3 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0"
              placeholder="Ex: Ocupação Digna Centro"
            />
          </div>

          {/* Novo Campo: Endereço com ícone */}
          <div className="flex flex-col gap-1">
            <label htmlFor="endereco" className="font-semibold text-gray-700">Endereço do Imóvel</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" id="endereco" name="endereco" required
                value={formData.endereco} onChange={handleChange}
                className="w-full p-3 pl-10 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0"
                placeholder="Rua, Número, Bairro, Cidade"
              />
            </div>
          </div>

          {/* Novo Campo: Turno da Visita */}
          <div className="flex flex-col gap-1">
            <label htmlFor="turnoVisita" className="font-semibold text-gray-700">Melhor turno para a visita</label>
            <select 
              id="turnoVisita" name="turnoVisita"
              value={formData.turnoVisita} onChange={handleChange}
              className="p-3 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0 bg-white"
            >
              <option value="manha">Manhã (08h às 12h)</option>
              <option value="tarde">Tarde (13h às 18h)</option>
              <option value="noite">Noite (19h às 21h)</option>
            </select>
          </div>

          {/* Termo Ético */}
          <div className="bg-red-50 p-4 rounded-xl border-2 border-red-200 mt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input 
                type="checkbox" name="aceitaTermo" checked={formData.aceitaTermo} onChange={handleChange}
                className="w-6 h-6 mt-1 accent-red-600 shrink-0" required
              />
              <span className="text-sm font-bold text-gray-800 leading-tight">
                Declaro que o imóvel é gratuito e que não cobrarei nenhum valor (nem simbólico) dos moradores.
              </span>
            </label>
          </div>

          <button 
            type="submit"
            className="mt-4 w-full min-h-[60px] bg-ms-blue text-white text-lg font-bold rounded-xl shadow-md hover:bg-blue-900 transition-colors"
          >
            Solicitar Visita Técnica
          </button>
        </form>
      </main>
    </div>
  );
}