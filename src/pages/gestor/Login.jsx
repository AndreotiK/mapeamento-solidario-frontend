import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Lock, Mail, FilePlus2, Accessibility } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import AudioHelperButton from '../../components/AudioHelperButton';
import FormErrorSummary from '../../components/FormErrorSummary';

export default function Login() {
  const navigate = useNavigate();
  const { setDrawerOpen, speak, playAlertTone, settings } = useAccessibility();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errosCampos, setErrosCampos] = useState({});
  const [mensagemErro, setMensagemErro] = useState('');

  const instrucaoTela =
    'Área do Gestor. Digite seu E-mail ou CNPJ e sua Senha, ambos obrigatórios, e toque em Entrar no Sistema. Caso ainda não tenha acesso, toque em Ainda não tenho login.';

  useEffect(() => {
    if (settings.voiceReading) {
      speak(instrucaoTela);
    }
  }, [settings.voiceReading, speak, instrucaoTela]);

  const handleLogin = (e) => {
    e.preventDefault();
    const faltantes = [];
    const novosErros = {};

    if (!email.trim()) {
      faltantes.push({ key: 'email', label: 'E-mail ou CNPJ' });
      novosErros.email = true;
    }
    if (!senha.trim()) {
      faltantes.push({ key: 'senha', label: 'Senha' });
      novosErros.senha = true;
    }

    if (faltantes.length > 0) {
      setErrosCampos(novosErros);
      const msg =
        faltantes.length === 1
          ? `Falta 1 campo para continuar: Preencha ${faltantes[0].label} e toque em Entrar no Sistema de novo.`
          : `Faltam ${faltantes.length} campos para continuar: Preencha ${faltantes
              .map((f) => f.label)
              .join(', ')} e toque em Entrar no Sistema de novo.`;

      setMensagemErro(msg);
      playAlertTone('error');
      speak(msg, true);

      if (settings.autoFocusErrors) {
        document.getElementById(faltantes[0].key)?.focus();
      }
      return;
    }

    setErrosCampos({});
    setMensagemErro('');
    playAlertTone('info');
    navigate('/gestor/dashboard');
  };

  const primeiroCampoInvalido = Object.keys(errosCampos).find((k) => errosCampos[k]);

  return (
    <div className="min-h-screen bg-ms-gray-bg flex flex-col justify-center p-6">
      <div className="max-w-md w-full mx-auto bg-white rounded-3xl p-8 shadow-lg relative">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/')}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-ms-gray-text hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Voltar para a tela inicial"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2">
            <AudioHelperButton texto={instrucaoTela} label="Ouvir" variant="compact" />
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir configurações de acessibilidade"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border-2 border-ms-blue text-ms-blue hover:bg-blue-50"
            >
              <Accessibility className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="bg-ms-blue w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <Building2 className="text-white w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-ms-blue">Área do Gestor</h1>
          <p className="text-ms-gray-text mt-1">Acesse para gerenciar sua ocupação</p>
        </div>

        <form onSubmit={handleLogin} noValidate className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-gray-800 flex items-center gap-2">
              <Mail className="w-5 h-5 text-ms-blue" />
              <span>
                E-mail ou CNPJ <span className="text-red-600 font-extrabold text-lg">*</span>
              </span>
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrosCampos((p) => ({ ...p, email: false }));
              }}
              aria-invalid={!!errosCampos.email}
              className={`w-full p-4 border-2 rounded-xl focus:ring-0 text-lg ${
                errosCampos.email
                  ? 'border-red-600 bg-red-50 text-red-950'
                  : 'border-gray-300 bg-gray-50 focus:border-ms-blue'
              }`}
              placeholder="ong@exemplo.com"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="senha" className="font-semibold text-gray-800 flex items-center gap-2">
              <Lock className="w-5 h-5 text-ms-blue" />
              <span>
                Senha <span className="text-red-600 font-extrabold text-lg">*</span>
              </span>
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                setErrosCampos((p) => ({ ...p, senha: false }));
              }}
              aria-invalid={!!errosCampos.senha}
              className={`w-full p-4 border-2 rounded-xl focus:ring-0 text-lg ${
                errosCampos.senha
                  ? 'border-red-600 bg-red-50 text-red-950'
                  : 'border-gray-300 bg-gray-50 focus:border-ms-blue'
              }`}
              placeholder="••••••••"
              required
            />
          </div>

          <FormErrorSummary
            mensagem={mensagemErro}
            onFocarPrimeiroErro={() =>
              primeiroCampoInvalido && document.getElementById(primeiroCampoInvalido)?.focus()
            }
          />

          <button
            type="submit"
            className="mt-2 w-full min-h-[60px] bg-ms-blue text-white text-xl font-bold rounded-xl shadow-md hover:bg-blue-900 transition-colors focus:ring-4 focus:ring-blue-300"
          >
            Entrar no Sistema
          </button>
        </form>

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