import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User, IdCard, Calendar, HeartPulse, ShieldCheck, CheckCircle2, Accessibility } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import AudioHelperButton from '../../components/AudioHelperButton';
import FormErrorSummary from '../../components/FormErrorSummary';

export default function CadastroMoradorCompleto() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setDrawerOpen, speak, playAlertTone, settings } = useAccessibility();

  const { nome = '', codigo = '' } = location.state || {};

  const [sucesso, setSucesso] = useState(false);
  const [errosCampos, setErrosCampos] = useState({});
  const [mensagemErro, setMensagemErro] = useState('');

  const [formData, setFormData] = useState({
    nomeCompleto: nome,
    nomeSocial: '',
    dataNascimento: '',
    documento: '',
    cadUnico: '',
    necessidadesEspeciais: '',
    contatoEmergencia: '',
    tempoEstadia: '3',
    aceitaRegras: false,
  });

  const instrucaoTela =
    'Cadastro Completo do Morador. Preencha os campos obrigatórios marcados em vermelho: Nome Completo, Data de Nascimento, RG ou CPF, Tempo de Estadia e a confirmação de leitura das regras de convivência.';

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
      { key: 'nomeCompleto', label: 'Nome Completo', isBool: false },
      { key: 'dataNascimento', label: 'Data de Nascimento', isBool: false },
      { key: 'documento', label: 'RG ou CPF', isBool: false },
      { key: 'tempoEstadia', label: 'Tempo estimado de estadia', isBool: false },
      { key: 'aceitaRegras', label: 'Confirmação das regras de convivência', isBool: true },
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
          ? `Falta 1 campo para continuar: Preencha ${faltantes[0].label} e toque em Finalizar Cadastro e Alocar Vaga de novo.`
          : `Faltam ${faltantes.length} campos para continuar: Preencha ${faltantes
              .map((f) => f.label)
              .join(', ')} e toque em Finalizar Cadastro e Alocar Vaga de novo.`;

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
    setSucesso(true);
    speak(`Morador ${formData.nomeCompleto} cadastrado com sucesso!`, true);

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

  const primeiroCampoInvalido = Object.keys(errosCampos).find((k) => errosCampos[k]);

  return (
    <div className="min-h-screen bg-ms-gray-bg pb-10">
      <header className="bg-white p-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/gestor/dashboard')}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-ms-gray-text hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Voltar para o painel"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-ms-blue ml-2">Cadastro do Morador</h1>
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

      <main className="p-4 max-w-2xl mx-auto flex flex-col gap-6 mt-4">
        {codigo && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm text-green-800 font-medium">Código de Pré-Reserva validado:</p>
              <p className="text-2xl font-black text-ms-green font-mono">{codigo}</p>
            </div>
            <ShieldCheck className="w-10 h-10 text-green-500" />
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-700">
            Campos com <span className="text-red-600 font-extrabold text-base">*</span> são obrigatórios.
          </p>

          <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
            <User className="text-ms-blue w-5 h-5" /> 1. Dados Pessoais
          </h2>

          <div className="flex flex-col gap-1">
            <label htmlFor="nomeCompleto" className="font-semibold text-gray-800">
              Nome Completo (Registro Civil) <span className="text-red-600 font-extrabold text-lg">*</span>
            </label>
            <input
              type="text"
              id="nomeCompleto"
              name="nomeCompleto"
              required
              value={formData.nomeCompleto}
              onChange={handleChange}
              aria-invalid={!!errosCampos.nomeCompleto}
              className={`p-3 border-2 rounded-xl focus:ring-0 ${
                errosCampos.nomeCompleto ? 'border-red-600 bg-red-50' : 'border-gray-300 focus:border-ms-blue'
              }`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="nomeSocial" className="font-semibold text-gray-700">
              Nome Social (Opcional)
            </label>
            <input
              type="text"
              id="nomeSocial"
              name="nomeSocial"
              value={formData.nomeSocial}
              onChange={handleChange}
              className="p-3 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0"
              placeholder="Como prefere ser chamado(a)?"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="dataNascimento" className="font-semibold text-gray-800">
                Data de Nascimento <span className="text-red-600 font-extrabold text-lg">*</span>
              </label>
              <input
                type="date"
                id="dataNascimento"
                name="dataNascimento"
                required
                value={formData.dataNascimento}
                onChange={handleChange}
                aria-invalid={!!errosCampos.dataNascimento}
                className={`p-3 border-2 rounded-xl focus:ring-0 bg-white ${
                  errosCampos.dataNascimento ? 'border-red-600 bg-red-50' : 'border-gray-300 focus:border-ms-blue'
                }`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="documento" className="font-semibold text-gray-800">
                RG ou CPF <span className="text-red-600 font-extrabold text-lg">*</span>
              </label>
              <input
                type="text"
                id="documento"
                name="documento"
                required
                value={formData.documento}
                onChange={handleChange}
                aria-invalid={!!errosCampos.documento}
                className={`p-3 border-2 rounded-xl focus:ring-0 ${
                  errosCampos.documento ? 'border-red-600 bg-red-50' : 'border-gray-300 focus:border-ms-blue'
                }`}
                placeholder="Número do documento"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="cadUnico" className="font-semibold text-gray-700">
              Número do CadÚnico / NIS (Opcional)
            </label>
            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="cadUnico"
                name="cadUnico"
                value={formData.cadUnico}
                onChange={handleChange}
                className="w-full p-3 pl-10 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0"
                placeholder="Se possuir"
              />
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mt-4 flex items-center gap-2">
            <HeartPulse className="text-ms-blue w-5 h-5" /> 2. Saúde e Acolhimento
          </h2>

          <div className="flex flex-col gap-1">
            <label htmlFor="necessidadesEspeciais" className="font-semibold text-gray-700">
              Possui alguma necessidade especial ou condição de saúde?
            </label>
            <textarea
              id="necessidadesEspeciais"
              name="necessidadesEspeciais"
              rows="2"
              value={formData.necessidadesEspeciais}
              onChange={handleChange}
              className="p-3 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0"
              placeholder="Ex: Cadeirante, gestante, hipertenso, faz uso de medicação controlada..."
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="contatoEmergencia" className="font-semibold text-gray-700">
              Contato de Emergência (Nome e Telefone)
            </label>
            <input
              type="text"
              id="contatoEmergencia"
              name="contatoEmergencia"
              value={formData.contatoEmergencia}
              onChange={handleChange}
              className="p-3 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0"
              placeholder="Ex: Maria (irmã) - (11) 98888-8888"
            />
          </div>

          <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mt-4 flex items-center gap-2">
            <Calendar className="text-ms-blue w-5 h-5" /> 3. Detalhes da Estadia
          </h2>

          <div className="flex flex-col gap-1">
            <label htmlFor="tempoEstadia" className="font-semibold text-gray-800">
              Tempo estimado de estadia (meses) <span className="text-red-600 font-extrabold text-lg">*</span>
            </label>
            <select
              id="tempoEstadia"
              name="tempoEstadia"
              required
              value={formData.tempoEstadia}
              onChange={handleChange}
              aria-invalid={!!errosCampos.tempoEstadia}
              className={`p-3 border-2 rounded-xl focus:ring-0 bg-white ${
                errosCampos.tempoEstadia ? 'border-red-600 bg-red-50' : 'border-gray-300 focus:border-ms-blue'
              }`}
            >
              <option value="1">1 mês</option>
              <option value="3">3 meses</option>
              <option value="6">6 meses</option>
              <option value="12">1 ano</option>
            </select>
          </div>

          <div
            className={`p-4 rounded-xl border-2 mt-2 ${
              errosCampos.aceitaRegras ? 'bg-red-50 border-red-600' : 'bg-gray-50 border-gray-200'
            }`}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                id="aceitaRegras"
                name="aceitaRegras"
                checked={formData.aceitaRegras}
                onChange={handleChange}
                aria-invalid={!!errosCampos.aceitaRegras}
                className="w-6 h-6 mt-1 accent-ms-blue shrink-0"
                required
              />
              <span className="text-sm font-medium text-gray-800 leading-tight">
                Confirmo que o morador leu e concordou com as <strong>regras de convivência</strong> da moradia (respeito mútuo, participação opcional em oficinas, gratuidade total).{' '}
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
            className="mt-2 w-full min-h-[60px] bg-ms-green text-white text-xl font-bold rounded-xl shadow-md hover:bg-green-800 transition-colors focus:ring-4 focus:ring-green-300"
          >
            Finalizar Cadastro e Alocar Vaga
          </button>
        </form>
      </main>
    </div>
  );
}