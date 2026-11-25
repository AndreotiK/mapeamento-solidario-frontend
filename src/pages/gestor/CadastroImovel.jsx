import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Droplets,
  Zap,
  Accessibility,
  Wrench,
  ImagePlus,
  ShieldCheck,
  CheckCircle2,
  Utensils,
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import AudioHelperButton from '../../components/AudioHelperButton';
import FormErrorSummary from '../../components/FormErrorSummary';

export default function CadastroImovel() {
  const navigate = useNavigate();
  const { setDrawerOpen, speak, playAlertTone, settings } = useAccessibility();

  const [sucesso, setSucesso] = useState(false);
  const [errosCampos, setErrosCampos] = useState({});
  const [mensagemErro, setMensagemErro] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    tempoMaximo: '',
    vagas: '',
    temAgua: false,
    temLuz: false,
    temRampa: false,
    banheiroAdaptado: false,
    ofereceBanho: false,
    ofereceAlimentacao: false,
    temOficinas: false,
    nomesOficinas: '',
    aceitaTermo: false,
  });

  const instrucaoTela =
    'Cadastrar Novo Imóvel. Preencha os campos obrigatórios marcados em vermelho: Nome do Imóvel, Endereço Completo, Total de Vagas, Tempo Máximo e o aceite do Termo de Compromisso Ético.';

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
      { key: 'nome', label: 'Nome do Imóvel / Ocupação', isBool: false },
      { key: 'endereco', label: 'Endereço Completo', isBool: false },
      { key: 'vagas', label: 'Total de Vagas / Camas', isBool: false },
      { key: 'tempoMaximo', label: 'Tempo Máximo', isBool: false },
      { key: 'aceitaTermo', label: 'Aceite do Termo de Compromisso Ético', isBool: true },
    ];

    const faltantes = obrigatorios.filter((c) =>
      c.isBool ? !formData[c.key] : !String(formData[c.key]).trim()
    );

    if (faltantes.length > 0) {
      const novosErros = {};
      faltantes.forEach((f) => {
        novosErros[f.key] = true;
      });
      setErrosCampos(novosErros);

      const msg =
        faltantes.length === 1
          ? `Falta 1 campo para continuar: Preencha ${faltantes[0].label} e toque em Salvar e Publicar Imóvel de novo.`
          : `Faltam ${faltantes.length} campos para continuar: Preencha ${faltantes
              .map((f) => f.label)
              .join(', ')} e toque em Salvar e Publicar Imóvel de novo.`;

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
    speak('Imóvel cadastrado com sucesso!', true);

    setTimeout(() => navigate('/gestor/dashboard'), 3000);
  };

  if (sucesso) {
    return (
      <div className="min-h-screen bg-ms-gray-bg flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-green-100 p-6 rounded-full mb-6">
          <CheckCircle2 className="w-16 h-16 text-ms-green" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Imóvel Cadastrado!</h1>
        <p className="text-gray-600 mb-8">
          Sua ocupação já está disponível no mapa para pessoas que precisam de acolhimento.
        </p>
        <p className="text-sm text-gray-500">Redirecionando para o painel...</p>
      </div>
    );
  }

  const primeiroCampoInvalido = Object.keys(errosCampos).find((k) => errosCampos[k]);

  return (
    <div className="min-h-screen bg-ms-gray-bg pb-24">
      <header className="bg-white p-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/gestor/dashboard')}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-ms-gray-text hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Voltar para o painel"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-ms-blue ml-2">Cadastrar Novo Imóvel</h1>
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
        <p className="text-sm font-semibold text-gray-700 bg-white p-3 rounded-xl border border-gray-200">
          Campos marcados com <span className="text-red-600 font-extrabold text-base">*</span> são obrigatórios.
        </p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
          {/* SEÇÃO 1 */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
              <MapPin className="text-ms-blue w-5 h-5" /> 1. Localização e Capacidade
            </h2>

            <div className="flex flex-col gap-1">
              <label htmlFor="nome" className="font-semibold text-gray-800">
                Nome do Imóvel / Ocupação <span className="text-red-600 font-extrabold text-lg">*</span>
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                value={formData.nome}
                onChange={handleChange}
                aria-invalid={!!errosCampos.nome}
                className={`p-3 border-2 rounded-xl focus:ring-0 ${
                  errosCampos.nome ? 'border-red-600 bg-red-50' : 'border-gray-300 focus:border-ms-blue'
                }`}
                placeholder="Ex: Ocupação Digna Centro"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="endereco" className="font-semibold text-gray-800">
                Endereço Completo <span className="text-red-600 font-extrabold text-lg">*</span>
              </label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                required
                value={formData.endereco}
                onChange={handleChange}
                aria-invalid={!!errosCampos.endereco}
                className={`p-3 border-2 rounded-xl focus:ring-0 ${
                  errosCampos.endereco ? 'border-red-600 bg-red-50' : 'border-gray-300 focus:border-ms-blue'
                }`}
                placeholder="Rua, Número, Bairro"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="vagas" className="font-semibold text-gray-800">
                  Total de Vagas / Camas <span className="text-red-600 font-extrabold text-lg">*</span>
                </label>
                <input
                  type="number"
                  id="vagas"
                  name="vagas"
                  required
                  min="1"
                  value={formData.vagas}
                  onChange={handleChange}
                  aria-invalid={!!errosCampos.vagas}
                  className={`p-3 border-2 rounded-xl focus:ring-0 ${
                    errosCampos.vagas ? 'border-red-600 bg-red-50' : 'border-gray-300 focus:border-ms-blue'
                  }`}
                  placeholder="Ex: 15"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="tempoMaximo" className="font-semibold text-gray-800">
                  Tempo Máximo (meses) <span className="text-red-600 font-extrabold text-lg">*</span>
                </label>
                <select
                  id="tempoMaximo"
                  name="tempoMaximo"
                  required
                  value={formData.tempoMaximo}
                  onChange={handleChange}
                  aria-invalid={!!errosCampos.tempoMaximo}
                  className={`p-3 border-2 rounded-xl focus:ring-0 bg-white ${
                    errosCampos.tempoMaximo ? 'border-red-600 bg-red-50' : 'border-gray-300 focus:border-ms-blue'
                  }`}
                >
                  <option value="">Selecione...</option>
                  <option value="3">3 meses</option>
                  <option value="6">6 meses</option>
                  <option value="12">1 ano</option>
                </select>
              </div>
            </div>
          </section>

          {/* SEÇÃO 2 */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
              <Accessibility className="text-ms-blue w-5 h-5" /> 2. Infraestrutura
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                <input type="checkbox" name="temAgua" checked={formData.temAgua} onChange={handleChange} className="w-5 h-5 accent-ms-blue" />
                <Droplets className="text-cyan-600 w-5 h-5" />
                <span className="font-medium">Água Encanada</span>
              </label>

              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                <input type="checkbox" name="temLuz" checked={formData.temLuz} onChange={handleChange} className="w-5 h-5 accent-ms-blue" />
                <Zap className="text-yellow-500 w-5 h-5" />
                <span className="font-medium">Energia Elétrica</span>
              </label>

              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                <input type="checkbox" name="temRampa" checked={formData.temRampa} onChange={handleChange} className="w-5 h-5 accent-ms-blue" />
                <Accessibility className="text-purple-600 w-5 h-5" />
                <span className="font-medium">Rampas de Acesso</span>
              </label>

              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                <input type="checkbox" name="banheiroAdaptado" checked={formData.banheiroAdaptado} onChange={handleChange} className="w-5 h-5 accent-ms-blue" />
                <Accessibility className="text-purple-600 w-5 h-5" />
                <span className="font-medium">Banheiro Adaptado</span>
              </label>
            </div>
          </section>

          {/* SEÇÃO 3 */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
              <Wrench className="text-ms-blue w-5 h-5" /> 3. Serviços Oferecidos
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                <input type="checkbox" name="ofereceBanho" checked={formData.ofereceBanho} onChange={handleChange} className="w-5 h-5 accent-ms-blue" />
                <Droplets className="text-cyan-600 w-5 h-5" />
                <span className="font-medium">Oferece Banho</span>
              </label>

              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                <input type="checkbox" name="ofereceAlimentacao" checked={formData.ofereceAlimentacao} onChange={handleChange} className="w-5 h-5 accent-ms-blue" />
                <Utensils className="text-orange-500 w-5 h-5" />
                <span className="font-medium">Oferece Alimentação</span>
              </label>

              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                <input type="checkbox" name="temOficinas" checked={formData.temOficinas} onChange={handleChange} className="w-5 h-5 accent-ms-blue" />
                <Wrench className="text-purple-600 w-5 h-5" />
                <span className="font-medium">Possui Oficinas</span>
              </label>
            </div>

            {formData.temOficinas && (
              <div className="flex flex-col gap-1 mt-2">
                <label htmlFor="nomesOficinas" className="font-semibold text-gray-700 text-sm">
                  Quais oficinas são oferecidas?
                </label>
                <input
                  type="text"
                  id="nomesOficinas"
                  name="nomesOficinas"
                  value={formData.nomesOficinas}
                  onChange={handleChange}
                  className="p-3 border-2 border-gray-300 rounded-xl focus:border-ms-blue focus:ring-0"
                  placeholder="Ex: Culinária, Informática, Artesanato"
                />
              </div>
            )}
          </section>

          {/* SEÇÃO 4 */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
              <ImagePlus className="text-ms-blue w-5 h-5" /> 4. Fotos do Local
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
              <ImagePlus className="w-10 h-10 mb-2 text-gray-400" />
              <p className="font-medium">Toque para adicionar fotos</p>
              <p className="text-xs mt-1">(Funcionalidade de upload em breve)</p>
            </div>
          </section>

          {/* SEÇÃO 5: Termo Ético */}
          <section
            className={`p-5 rounded-2xl shadow-sm border-2 flex flex-col gap-3 ${
              errosCampos.aceitaTermo ? 'bg-red-100 border-red-600' : 'bg-red-50 border-red-200'
            }`}
          >
            <h2 className="text-lg font-bold text-red-800 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6" /> Termo de Compromisso Ético
            </h2>
            <p className="text-sm text-red-700">
              Este projeto visa garantir a dignidade e a reintegração social. Para evitar a mercantilização da vulnerabilidade, é{' '}
              <strong>expressamente proibido</strong> cobrar qualquer valor de aluguel, taxa ou contribuição financeira dos moradores.
            </p>
            <label className="flex items-start gap-3 mt-2 cursor-pointer bg-white p-4 rounded-xl border border-red-200">
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
                Declaro que este imóvel é gratuito e que não cobrarei nenhum valor (nem simbólico) pela estadia.{' '}
                <span className="text-red-600 font-extrabold text-base">*</span>
              </span>
            </label>
          </section>

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
            Salvar e Publicar Imóvel
          </button>
        </form>
      </main>
    </div>
  );
}