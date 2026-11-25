import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, IdCard, Users, Accessibility } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import AudioHelperButton from '../../components/AudioHelperButton';
import FormErrorSummary from '../../components/FormErrorSummary';

export default function Identificacao() {
  const navigate = useNavigate();
  const { setDrawerOpen, speak, playAlertTone, settings } = useAccessibility();

  const [formData, setFormData] = useState({
    nomeSocial: '',
    dataNascimento: '',
    genero: '',
    documento: '',
  });

  const [errosCampos, setErrosCampos] = useState({});
  const [mensagemErro, setMensagemErro] = useState('');

  const instrucaoTela =
    'Tela Seus Dados. Precisamos de poucas informações para encontrar um lar para você. ' +
    'Preencha os campos obrigatórios marcados em vermelho: Nome Social, Data de Nascimento e Gênero. ' +
    'O campo CadÚnico ou Documento é opcional. Depois, toque no botão verde Buscar Moradia.';

  useEffect(() => {
    if (settings.voiceReading) {
      speak(instrucaoTela);
    }
  }, [settings.voiceReading, speak, instrucaoTela]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errosCampos[name]) {
      setErrosCampos((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const obrigatorios = [
      { key: 'nomeSocial', label: 'Nome Social' },
      { key: 'dataNascimento', label: 'Data de Nascimento' },
      { key: 'genero', label: 'Gênero' },
    ];

    const faltantes = obrigatorios.filter((campo) => !formData[campo.key].trim());

    if (faltantes.length > 0) {
      const novosErros = {};
      faltantes.forEach((f) => {
        novosErros[f.key] = true;
      });
      setErrosCampos(novosErros);

      const msg =
        faltantes.length === 1
          ? `Falta 1 campo para continuar: Preencha ${faltantes[0].label} e toque em Buscar Moradia de novo.`
          : `Faltam ${faltantes.length} campos para continuar: Preencha ${faltantes
              .map((f) => f.label)
              .join(', ')} e toque em Buscar Moradia de novo.`;

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
    navigate('/morador/busca');
  };

  const primeiroCampoInvalido = Object.keys(errosCampos).find((k) => errosCampos[k]);

  return (
    <div className="min-h-screen bg-ms-gray-bg pb-10">
      {/* Cabeçalho Fixo */}
      <header className="bg-white p-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-ms-gray-text hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Voltar para a tela inicial"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-ms-green ml-2">Seus Dados</h1>
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

      <main className="p-6 max-w-md mx-auto">
        <p className="text-ms-gray-text mb-3 text-lg">
          Precisamos de poucas informações para encontrar um lar para você.{' '}
          <strong>Sua privacidade é respeitada.</strong>
        </p>
        <p className="text-sm font-semibold text-gray-700 mb-6">
          Campos com <span className="text-red-600 font-extrabold text-base">*</span> são obrigatórios.
        </p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
          {/* Nome Social */}
          <div className="flex flex-col gap-2">
            <label htmlFor="nomeSocial" className="font-semibold text-gray-800 flex items-center gap-2">
              <User className="w-5 h-5 text-ms-green" />
              <span>
                Nome Social <span className="text-red-600 font-extrabold text-lg" aria-hidden="true">*</span>
              </span>
            </label>
            <input
              type="text"
              id="nomeSocial"
              name="nomeSocial"
              value={formData.nomeSocial}
              onChange={handleChange}
              aria-invalid={!!errosCampos.nomeSocial}
              className={`w-full p-4 border-2 rounded-xl focus:ring-0 text-lg transition-colors ${
                errosCampos.nomeSocial
                  ? 'border-red-600 bg-red-50 text-red-950 focus:border-red-700'
                  : 'border-gray-300 bg-white focus:border-ms-green'
              }`}
              placeholder="Como você gostaria de ser chamado(a)?"
              required
            />
          </div>

          {/* Data de Nascimento */}
          <div className="flex flex-col gap-2">
            <label htmlFor="dataNascimento" className="font-semibold text-gray-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-ms-green" />
              <span>
                Data de Nascimento <span className="text-red-600 font-extrabold text-lg" aria-hidden="true">*</span>
              </span>
            </label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              aria-invalid={!!errosCampos.dataNascimento}
              className={`w-full p-4 border-2 rounded-xl focus:ring-0 text-lg transition-colors ${
                errosCampos.dataNascimento
                  ? 'border-red-600 bg-red-50 text-red-950 focus:border-red-700'
                  : 'border-gray-300 bg-white focus:border-ms-green'
              }`}
              required
            />
          </div>

          {/* Gênero */}
          <div className="flex flex-col gap-2">
            <label htmlFor="genero" className="font-semibold text-gray-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-ms-green" />
              <span>
                Gênero <span className="text-red-600 font-extrabold text-lg" aria-hidden="true">*</span>
              </span>
            </label>
            <select
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              aria-invalid={!!errosCampos.genero}
              className={`w-full p-4 border-2 rounded-xl focus:ring-0 text-lg transition-colors ${
                errosCampos.genero
                  ? 'border-red-600 bg-red-50 text-red-950 focus:border-red-700'
                  : 'border-gray-300 bg-white focus:border-ms-green'
              }`}
              required
            >
              <option value="" disabled>
                Selecione uma opção
              </option>
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
            <span className="text-sm text-gray-500 -mt-1 mb-1 block">
              Opcional. Ajuda a agilizar seu cadastro final.
            </span>
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

          {/* Resumo de Erro Construtivo */}
          <FormErrorSummary
            mensagem={mensagemErro}
            onFocarPrimeiroErro={() =>
              primeiroCampoInvalido && document.getElementById(primeiroCampoInvalido)?.focus()
            }
          />

          {/* Botão de Avançar */}
          <button
            type="submit"
            className="mt-2 w-full min-h-[60px] bg-ms-green text-white text-xl font-bold rounded-xl shadow-md hover:bg-green-800 transition-colors focus:ring-4 focus:ring-green-300"
          >
            Buscar Moradia
          </button>
        </form>
      </main>
    </div>
  );
}