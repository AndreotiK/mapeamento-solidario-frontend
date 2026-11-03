import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, IdCard, Users } from 'lucide-react';

export default function Identificacao() {
  const navigate = useNavigate();
  
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nomeSocial: '',
    dataNascimento: '',
    genero: '',
    documento: '' // Opcional
  });

  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica (Prevenção de erros - WCAG 3.3.1)
    if (!formData.nomeSocial.trim() || !formData.dataNascimento || !formData.genero) {
      setErro('Por favor, preencha o Nome Social, Data de Nascimento e Gênero.');
      return;
    }

    setErro('');
    
    // Futuramente, aqui salvaríamos no Contexto ou Banco de Dados.
    // Por enquanto, vamos apenas navegar para a próxima tela.
    console.log("Dados do Morador:", formData);
    navigate('/morador/busca'); 
  };

  return (
    <div className="min-h-screen bg-ms-gray-bg pb-10">
      {/* Cabeçalho Fixo */}
      <header className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => navigate('/')} 
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-ms-gray-text hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Voltar para a tela inicial"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-ms-green ml-2">Seus Dados</h1>
      </header>

      <main className="p-6 max-w-md mx-auto">
        <p className="text-ms-gray-text mb-8 text-lg">
          Precisamos de poucas informações para encontrar um lar para você. <strong>Sua privacidade é respeitada.</strong>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Nome Social */}
          <div className="flex flex-col gap-2">
            <label htmlFor="nomeSocial" className="font-semibold text-gray-700 flex items-center gap-2">
              <User className="w-5 h-5 text-ms-green" /> Nome Social *
            </label>
            <input 
              type="text" 
              id="nomeSocial"
              name="nomeSocial"
              value={formData.nomeSocial}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-ms-green focus:ring-0 text-lg bg-white"
              placeholder="Como você gostaria de ser chamado(a)?"
              required
            />
          </div>

          {/* Data de Nascimento */}
          <div className="flex flex-col gap-2">
            <label htmlFor="dataNascimento" className="font-semibold text-gray-700 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-ms-green" /> Data de Nascimento *
            </label>
            <input 
              type="date" 
              id="dataNascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-ms-green focus:ring-0 text-lg bg-white"
              required
            />
          </div>

          {/* Gênero */}
          <div className="flex flex-col gap-2">
            <label htmlFor="genero" className="font-semibold text-gray-700 flex items-center gap-2">
              <Users className="w-5 h-5 text-ms-green" /> Gênero *
            </label>
            <select 
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-ms-green focus:ring-0 text-lg bg-white"
              required
            >
              <option value="" disabled>Selecione uma opção</option>
              <option value="cis_mulher">Mulher Cisgênero</option>
              <option value="cis_homem">Homem Cisgênero</option>
              <option value="trans_mulher">Mulher Transgênero</option>
              <option value="trans_homem">Homem Transgênero</option>
              <option value="nao_binario">Não-binário</option>
              <option value="outro">Outro / Prefiro não informar</option>
            </select>
          </div>

          {/* Documento / CadÚnico (Opcional) */}
          <div className="flex flex-col gap-2">
            <label htmlFor="documento" className="font-semibold text-gray-700 flex items-center gap-2">
              <IdCard className="w-5 h-5 text-ms-green" /> CadÚnico ou Documento
            </label>
            <span className="text-sm text-gray-500 -mt-1 mb-1 block">Opcional. Ajuda a agilizar seu cadastro final.</span>
            <input 
              type="text" 
              id="documento"
              name="documento"
              value={formData.documento}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-ms-green focus:ring-0 text-lg bg-white"
              placeholder="Número do NIS ou RG (opcional)"
            />
          </div>

          {/* Mensagem de Erro */}
          {erro && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 rounded" role="alert">
              <p className="font-bold">Atenção:</p>
              <p>{erro}</p>
            </div>
          )}

          {/* Botão de Avançar */}
          <button 
            type="submit"
            className="mt-4 w-full min-h-[60px] bg-ms-green text-white text-xl font-bold rounded-xl shadow-md hover:bg-green-800 transition-colors focus:ring-4 focus:ring-green-300"
          >
            Buscar Moradia
          </button>
        </form>
      </main>
    </div>
  );
}