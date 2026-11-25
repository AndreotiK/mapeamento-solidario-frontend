import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Landmark, Phone, MapPin, ClipboardCheck, Accessibility } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import AudioHelperButton from '../../components/AudioHelperButton';
import FormErrorSummary from '../../components/FormErrorSummary';

export default function SolicitacaoAvaliacao() {
  const navigate = useNavigate();
  const { setDrawerOpen, speak, playAlertTone, settings } = useAccessibility();

  const [enviado, setEnviado] = useState(false);
  const [errosCampos, setErrosCampos] = useState({});
  const [mensagemErro, setMensagemErro] = useState('');

  const [formData, setFormData] = useState({
    responsavel: '',
    telefone: '',
    email: '',
    nomeImovel: '',
    endereco: '',
    turnoVisita: 'manha',
    aceitaTermo: false,
  });

  const instrucaoTela =
    'Solicitar Visita Técnica. Preencha os dados do responsável e do imóvel marcados com asterisco vermelho e aceite o Termo de Compromisso Ético antes de tocar em Solicitar Visita Técnica.';

  useEffect(() => {
    if (settings.voiceReading) {
      speak(instrucaoTela);
    }
  }, [settings.voiceReading, speak, instrucaoTela]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errosCampos[name]) {
      setErrosCampos((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const obrigatorios = [
      { key: 'responsavel', label: 'Nome do Responsável / ONG', isBool: false },
      { key: 'telefone', label: 'Telefone / WhatsApp', isBool: false },
      { key: 'email', label: 'E-mail para Retorno', isBool: false },
      { key: 'nomeImovel', label: 'Nome do Imóvel / Ocupação', isBool: false },
      { key: 'endereco', label: 'Endereço do Imóvel', isBool: false },
      { key: 'aceitaTermo', label: 'Aceite do Termo de Compromisso Ético', isBool: true },
    ];

    const faltantes = obrigatorios.filter((c) =>
      c.isBool ? !formData[c.key] : !formData[c.key].trim()
    );

    if (faltantes.length > 0) {
      const novosErros = {};
      faltantes.forEach((f) => {
        novosErros[f.key] = true;
      });
      setErrosCampos(novosErros);

      const msg =
        faltantes.length === 1
          ? `Falta 1 campo para continuar: Preencha ${faltantes[0].label} e toque em Solicitar Visita Técnica de novo.`
          : `Faltam ${faltantes.length} campos para continuar: Preencha ${faltantes
              .map((f) => f.label)
              .join(', ')} e toque em Solicitar Visita Técnica de novo.`;

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
    setEnviado(true);
    speak('Visita técnica solicitada com sucesso!', true);
  };

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
            <li>
              Um assistente social do governo entrará em contato pelo telefone{' '}
              <strong>{formData.telefone}</strong> em até 5 dias úteis.
            </li>
            <li>Será agendada uma visita técnica ao endereço informado para avaliar as condições do imóvel.</li>
            <li>
              Se o imóvel for aprovado, você receberá um e-mail com seu <strong>login de acesso</strong> e instruções de uso.
            </li>
          </ol>
        </div>

        <button
          onClick={() => navigate('/gestor/login')}
          className="w-full max-w-sm min-h-[50px] bg-ms-blue text-white font-bold rounded-xl hover:bg-blue-900 transition-colors"
        >
          Voltar para o Login
        </button>
      </div>
    );
  }

  const primeiroCampoInvalido = Object.keys(errosCampos).find((k) => errosCampos[k]);

  return (
    <div className="min-h-screen bg-ms-gray-bg pb-10">
      <header className="bg-white p-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/gestor/login')}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-ms-gray-text hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Voltar para o login"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-ms-blue ml-2">Solicitar Visita Técnica</h1>
        </div>

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
      </header>

      <main className="p-4 max-w-md mx-auto flex flex-col gap-6 mt-4">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-start gap-3">
          <Landmark className="w-6 h-6 text-ms-blue shrink-0" />
          <p className="text-sm text-blue-900">
            Para garantir a segurança de todos, todo novo imóvel passa por uma{' '}
            <strong>vistoria técnica do Governo</strong> antes de receber moradores.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-700">
            Campos com <span className="text-red-600 font-extrabold text-base">*</span> são obrigatórios.
          </p>

          <div className="flex flex-col gap-1">
            <label htmlFor="responsavel" className="font-semibold text-gray-800">
              Nome do Responsável / ONG <span className="text-red-600 font-extrabold text-lg">*</span>
            </label>
            <input
              type="text"
              id="responsavel"
              name="responsavel"
              required
              value={formData.responsavel}
              onChange={handleChange}
              aria-invalid={!!errosCampos.responsavel}
              className={`p-3 border-2 rounded-xl focus:ring-0 ${
                errosCampos.responsavel ? 'border-red-600 bg-red-50' : 'border-gray-300 focus:border-ms-blue'
              }`}
              placeholder="Seu nome completo"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="telefone" className="font-semibold text-gray-800 flex items-center gap-1 flex-wrap">
              <span>
                Telefone / WhatsApp <span className="text-red-600 font-extrabold text-lg">*</span>
              </span>
              <span className="text-sm font-normal text-gray-500">(para agendar a visita)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                id="telefone"
                name="telefone"
                required
                value={formData.telefone}
                onChange={handleChange}
                aria-invalid={!!errosCampos.telefone}
                className={`w-full p-3 pl-10 border-2 rounded-xl focus:ring-0 ${
                  errosCampos.telefone ? 'border-red-600 bg-red-50' : 'border-gray-300 focus:border-ms-blue'
                }`}
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold text-gray-800">
              E-mail para Retorno <span className="text-red-600 font-extrabold text-lg">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errosCampos.email}
              className={`p-3 border-2 rounded-xl focus:ring-0 ${
                errosCampos.email ? 'border-red-600 bg-red-50' : 'border-gray-300 focus:border-ms-blue'
              }`}
              placeholder="voce@email.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="nomeImovel" className="font-semibold text-gray-800">
              Nome do Imóvel / Ocupação <span className="text-red-600 font-extrabold text-lg">*</span>
            </label>
            <input
              type="text"
              id="nomeImovel"
              name="nomeImovel"
              required
              value={formData.nomeImovel}
              onChange={handleChange}
              aria-invalid={!!errosCampos.nomeImovel}
              className={`p-3 border-2 rounded-xl focus:ring-0 ${
                errosCampos.nomeImovel ? 'border-red-600 bg-red-50' : 'border-gray-300 focus:border-ms-blue'
              }`}
              placeholder="Ex: Ocupação Digna Centro"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="endereco" className="font-semibold text-gray-800">
              Endereço do Imóvel <span className="text-red-600 font-extrabold text-lg">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="endereco"
                name="endereco"
                required
                value={formData.endereco}
                onChange={handleChange}
                aria-invalid={!!errosCampos.endereco}
                className={`w-full p-3 pl-10 border-2 rounded-xl focus:ring-0 ${
                  errosCampos.endereco ? 'border-red-600 bg-red-50' : 'border-gray-300 focus:border-ms-blue'
                }`}
                placeholder="Rua, Número, Bairro, Cidade"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="turnoVisita" className="font-semibold text-gray-800">
              Melhor turno para a visita
            </label>
            <select
              id="turnoVisita"
              name="turnoVisita"
              value={formData.turnoVisita}
              onChange={handleChange}
              className="p-3 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0 bg-white"
            >
              <option value="manha">Manhã (08h às 12h)</option>
              <option value="tarde">Tarde (13h às 18h)</option>
              <option value="noite">Noite (19h às 21h)</option>
            </select>
          </div>

          {/* Termo Ético */}
          <div
            className={`p-4 rounded-xl border-2 mt-2 ${
              errosCampos.aceitaTermo ? 'bg-red-100 border-red-600' : 'bg-red-50 border-red-200'
            }`}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                id="aceitaTermo"
                name="aceitaTermo"
                checked={formData.aceitaTermo}
                onChange={handleChange}
                aria-invalid={!!errosCampos.aceitaTermo}
                className="w-6 h-6 mt-1 accent-red-600 shrink-0"
                required
              />
              <span className="text-sm font-bold text-gray-800 leading-tight">
                Declaro que o imóvel é gratuito e que não cobrarei nenhum valor (nem simbólico) dos moradores.{' '}
                <span className="text-red-600 font-extrabold text-base">*</span>
              </span>
            </label>
          </div>

          <FormErrorSummary
            mensagem={mensagemErro}
            onFocarPrimeiroErro={() =>
              primeiroCampoInvalido && document.getElementById(primeiroCampoInvalido)?.focus()
            }
          />

          <button
            type="submit"
            className="mt-2 w-full min-h-[60px] bg-ms-blue text-white text-lg font-bold rounded-xl shadow-md hover:bg-blue-900 transition-colors"
          >
            Solicitar Visita Técnica
          </button>
        </form>
      </main>
    </div>
  );
}