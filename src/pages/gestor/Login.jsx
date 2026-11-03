import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Lock, Mail, FilePlus2 } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && senha) {
      navigate('/gestor/dashboard');
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <div className="min-h-screen bg-ms-gray-bg flex flex-col justify-center p-6">
      <div className="max-w-md w-full mx-auto bg-white rounded-3xl p-8 shadow-lg relative">
        
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-4 left-4 min-w-[44px] min-h-[44px] flex items-center justify-center text-ms-gray-text hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Voltar para a tela inicial"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="text-center mb-8 mt-4">
          <div className="bg-ms-blue w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <Building2 className="text-white w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-ms-blue">Área do Gestor</h1>
          <p className="text-ms-gray-text mt-2">Acesse para gerenciar sua ocupação</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-gray-700 flex items-center gap-2">
              <Mail className="w-5 h-5 text-ms-blue" /> E-mail ou CNPJ
            </label>
            <input 
              type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0 text-lg bg-gray-50"
              placeholder="ong@exemplo.com" required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="senha" className="font-semibold text-gray-700 flex items-center gap-2">
              <Lock className="w-5 h-5 text-ms-blue" /> Senha
            </label>
            <input 
              type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0 text-lg bg-gray-50"
              placeholder="••••••••" required
            />
          </div>

          <button 
            type="submit"
            className="mt-2 w-full min-h-[60px] bg-ms-blue text-white text-xl font-bold rounded-xl shadow-md hover:bg-blue-900 transition-colors focus:ring-4 focus:ring-blue-300"
          >
            Entrar no Sistema
          </button>
        </form>

        {/* NOVO: Opção para quem não tem login */}
        <div className="mt-8 flex items-center gap-4">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-gray-500 text-sm font-medium">OU</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>

        <button 
          onClick={() => navigate('/gestor/solicitar-acesso')}
          className="mt-6 w-full min-h-[50px] bg-white border-2 border-ms-blue text-ms-blue font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
        >
          <FilePlus2 className="w-5 h-5" />
          Ainda não tenho login
        </button>
      </div>
    </div>
  );
}