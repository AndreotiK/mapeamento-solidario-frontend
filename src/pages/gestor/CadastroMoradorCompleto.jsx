import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User, IdCard, Calendar, HeartPulse, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CadastroMoradorCompleto() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Recupera os dados passados pelo Dashboard (Nome e Código)
  const { nome = '', codigo = '' } = location.state || {};

  const [sucesso, setSucesso] = useState(false);

  const [formData, setFormData] = useState({
    nomeCompleto: nome, // Pré-preenchido
    nomeSocial: '',
    dataNascimento: '',
    documento: '', // RG ou CPF (agora obrigatório)
    cadUnico: '', // NIS
    necessidadesEspeciais: '',
    contatoEmergencia: '',
    tempoEstadia: '3', // Em meses
    aceitaRegras: false
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
    if (!formData.aceitaRegras) {
      alert("É necessário confirmar a leitura das regras da moradia.");
      return;
    }
    
    // Simula o envio para o backend
    console.log("Cadastro Completo Realizado:", { ...formData, codigoReserva: codigo });
    setSucesso(true);
    
    // Após 3 segundos, volta para o Dashboard
    setTimeout(() => navigate('/gestor/dashboard'), 3000);
  };

  if (sucesso) {
    return (
      <div className="min-h-screen bg-ms-gray-bg flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-green-100 p-6 rounded-full mb-6">
          <CheckCircle2 className="w-16 h-16 text-ms-green" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Morador Cadastrado!</h1>
        <p className="text-gray-600 mb-4 max-w-sm">
          O morador <strong>{formData.nomeCompleto}</strong> agora está ativo no sistema e já pode ocupar a vaga.
        </p>
        <p className="text-sm text-gray-500 mb-8">Redirecionando para o painel...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ms-gray-bg pb-10">
      {/* Cabeçalho */}
      <header className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => navigate('/gestor/dashboard')} 
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-ms-gray-text hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Voltar para o painel"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-ms-blue ml-2">Cadastro do Morador</h1>
      </header>

      <main className="p-4 max-w-2xl mx-auto flex flex-col gap-6 mt-4">
        
        {/* Aviso do Código Validado */}
        <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-green-800 font-medium">Código de Pré-Reserva validado:</p>
            <p className="text-2xl font-black text-ms-green font-mono">{codigo}</p>
          </div>
          <ShieldCheck className="w-10 h-10 text-green-500" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          
          {/* Seção: Dados Pessoais */}
          <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
            <User className="text-ms-blue w-5 h-5" /> 1. Dados Pessoais
          </h2>

          <div className="flex flex-col gap-1">
            <label htmlFor="nomeCompleto" className="font-semibold text-gray-700">Nome Completo (Registro Civil) *</label>
            <input 
              type="text" id="nomeCompleto" name="nomeCompleto" required
              value={formData.nomeCompleto} onChange={handleChange}
              className="p-3 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="nomeSocial" className="font-semibold text-gray-700">Nome Social (Opcional)</label>
            <input 
              type="text" id="nomeSocial" name="nomeSocial"
              value={formData.nomeSocial} onChange={handleChange}
              className="p-3 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0"
              placeholder="Como prefere ser chamado(a)?"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="dataNascimento" className="font-semibold text-gray-700">Data de Nascimento *</label>
              <input 
                type="date" id="dataNascimento" name="dataNascimento" required
                value={formData.dataNascimento} onChange={handleChange}
                className="p-3 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0 bg-white"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="documento" className="font-semibold text-gray-700">RG ou CPF *</label>
              <input 
                type="text" id="documento" name="documento" required
                value={formData.documento} onChange={handleChange}
                className="p-3 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0"
                placeholder="Número do documento"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="cadUnico" className="font-semibold text-gray-700">Número do CadÚnico / NIS (Opcional)</label>
            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" id="cadUnico" name="cadUnico"
                value={formData.cadUnico} onChange={handleChange}
                className="w-full p-3 pl-10 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0"
                placeholder="Se possuir"
              />
            </div>
          </div>

          {/* Seção: Saúde e Acessibilidade */}
          <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mt-4 flex items-center gap-2">
            <HeartPulse className="text-ms-blue w-5 h-5" /> 2. Saúde e Acolhimento
          </h2>

          <div className="flex flex-col gap-1">
            <label htmlFor="necessidadesEspeciais" className="font-semibold text-gray-700">Possui alguma necessidade especial ou condição de saúde?</label>
            <textarea 
              id="necessidadesEspeciais" name="necessidadesEspeciais" rows="2"
              value={formData.necessidadesEspeciais} onChange={handleChange}
              className="p-3 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0"
              placeholder="Ex: Cadeirante, gestante, hipertenso, faz uso de medicação controlada..."
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="contatoEmergencia" className="font-semibold text-gray-700">Contato de Emergência (Nome e Telefone)</label>
            <input 
              type="text" id="contatoEmergencia" name="contatoEmergencia"
              value={formData.contatoEmergencia} onChange={handleChange}
              className="p-3 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0"
              placeholder="Ex: Maria (irmã) - (11) 98888-8888"
            />
          </div>

          {/* Seção: Estadia */}
          <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mt-4 flex items-center gap-2">
            <Calendar className="text-ms-blue w-5 h-5" /> 3. Detalhes da Estadia
          </h2>

          <div className="flex flex-col gap-1">
            <label htmlFor="tempoEstadia" className="font-semibold text-gray-700">Tempo estimado de estadia (meses) *</label>
            <select 
              id="tempoEstadia" name="tempoEstadia" required
              value={formData.tempoEstadia} onChange={handleChange}
              className="p-3 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0 bg-white"
            >
              <option value="1">1 mês</option>
              <option value="3">3 meses</option>
              <option value="6">6 meses</option>
              <option value="12">1 ano</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Lembre-se: o limite máximo do imóvel é de {formData.tempoEstadia} meses.</p>
          </div>

          {/* Termo de Regras */}
          <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200 mt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input 
                type="checkbox" name="aceitaRegras" checked={formData.aceitaRegras} onChange={handleChange}
                className="w-6 h-6 mt-1 accent-ms-blue shrink-0" required
              />
              <span className="text-sm font-medium text-gray-700 leading-tight">
                Confirmo que o morador leu e concordou com as <strong>regras de convivência</strong> da moradia (respeito mútuo, participação opcional em oficinas, gratuidade total).
              </span>
            </label>
          </div>

          <button 
            type="submit"
            className="mt-4 w-full min-h-[60px] bg-ms-green text-white text-xl font-bold rounded-xl shadow-md hover:bg-green-800 transition-colors focus:ring-4 focus:ring-green-300"
          >
            Finalizar Cadastro e Alocar Vaga
          </button>
        </form>
      </main>
    </div>
  );
}