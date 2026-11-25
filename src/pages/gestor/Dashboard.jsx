import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, CheckCircle, Clock, UserPlus, FileText, Accessibility } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import AudioHelperButton from '../../components/AudioHelperButton';
import FormErrorSummary from '../../components/FormErrorSummary';

const reservasIniciais = [
  { id: 1, codigo: 'MS-4829', nome: 'Carlos Silva', data: 'Hoje, 14:30' },
  { id: 2, codigo: 'MS-1192', nome: 'Ana Souza', data: 'Hoje, 10:15' },
];

const moradoresAtivos = [
  { id: 1, nome: 'João Pereira', entrada: '01/10/2026', tempoRestante: '2 meses e 28 dias' },
  { id: 2, nome: 'Maria Oliveira', entrada: '15/09/2026', tempoRestante: '1 mês e 12 dias' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { setDrawerOpen, speak, playAlertTone, settings } = useAccessibility();

  const [reservas] = useState(reservasIniciais);
  const [codigosDigitados, setCodigosDigitados] = useState({});
  const [erroId, setErroId] = useState(null);
  const [mensagemErro, setMensagemErro] = useState('');

  const textoPainel = `Painel do Gestor, Abrigo Esperança. Há ${reservas.length} reservas pendentes aguardando confirmação e ${moradoresAtivos.length} moradores ativos.`;

  useEffect(() => {
    if (settings.voiceReading) {
      speak(textoPainel);
    }
  }, [settings.voiceReading, speak, textoPainel]);

  const handleConfirmarReserva = (reserva) => {
    const digitado = (codigosDigitados[reserva.id] || '').trim().toUpperCase();

    if (!digitado) {
      const msg = `Falta 1 campo para continuar: Preencha o Código de Reserva de ${reserva.nome} e toque em Confirmar de novo.`;
      setErroId(reserva.id);
      setMensagemErro(msg);
      playAlertTone('error');
      speak(msg, true);
      document.getElementById(`codigo-${reserva.id}`)?.focus();
      return;
    }

    if (digitado === reserva.codigo) {
      setErroId(null);
      setMensagemErro('');
      playAlertTone('info');
      navigate('/gestor/cadastro-completo', {
        state: { nome: reserva.nome, codigo: reserva.codigo },
      });
    } else {
      const msg = `Código incorreto para ${reserva.nome}. Confira o código com o morador e toque em Confirmar de novo.`;
      setErroId(reserva.id);
      setMensagemErro(msg);
      playAlertTone('error');
      speak(msg, true);
      document.getElementById(`codigo-${reserva.id}`)?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-ms-gray-bg pb-10">
      <header className="bg-ms-blue text-white p-4 shadow-md sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex justify-between items-center gap-2">
          <div>
            <h1 className="text-xl font-bold">Abrigo Esperança</h1>
            <p className="text-sm text-blue-200">Painel do Gestor</p>
          </div>

          <div className="flex items-center gap-2">
            <AudioHelperButton texto={textoPainel} label="Ouvir" variant="compact" />
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir configurações de acessibilidade"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-blue-800 hover:bg-blue-900 rounded-xl transition-colors"
            >
              <Accessibility className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/')}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-blue-800 hover:bg-blue-900 rounded-full transition-colors"
              aria-label="Sair do sistema"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="p-4 max-w-2xl mx-auto flex flex-col gap-6 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-full text-orange-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Reservas Pendentes</p>
              <p className="text-2xl font-bold text-gray-800">{reservas.length}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full text-green-700">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Moradores Ativos</p>
              <p className="text-2xl font-bold text-gray-800">{moradoresAtivos.length}</p>
            </div>
          </div>
        </div>

        <FormErrorSummary
          mensagem={mensagemErro}
          onFocarPrimeiroErro={() => erroId && document.getElementById(`codigo-${erroId}`)?.focus()}
        />

        <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" /> Aguardando Confirmação
          </h2>

          <div className="flex flex-col gap-4">
            {reservas.map((reserva) => (
              <div key={reserva.id} className="border border-gray-200 p-4 rounded-xl flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-lg text-gray-800">{reserva.nome}</p>
                    <p className="text-sm text-gray-500">Solicitado em: {reserva.data}</p>
                  </div>
                  <span className="bg-orange-100 text-orange-800 font-mono font-bold px-3 py-1 rounded-lg border border-orange-200">
                    {reserva.codigo}
                  </span>
                </div>

                <label htmlFor={`codigo-${reserva.id}`} className="text-sm font-semibold text-gray-700">
                  Código de confirmação <span className="text-red-600 font-extrabold">*</span>
                </label>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    id={`codigo-${reserva.id}`}
                    type="text"
                    placeholder="Digite o código (ex: MS-4829)"
                    value={codigosDigitados[reserva.id] || ''}
                    onChange={(e) => {
                      setCodigosDigitados((prev) => ({ ...prev, [reserva.id]: e.target.value }));
                      if (erroId === reserva.id) setErroId(null);
                    }}
                    aria-invalid={erroId === reserva.id}
                    className={`flex-1 p-3 border-2 rounded-lg uppercase focus:ring-0 ${
                      erroId === reserva.id
                        ? 'border-red-600 bg-red-50 text-red-950'
                        : 'border-gray-300 focus:border-ms-blue'
                    }`}
                  />
                  <button
                    onClick={() => handleConfirmarReserva(reserva)}
                    className="min-h-[48px] bg-ms-blue text-white font-bold px-4 rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" /> Confirmar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-ms-green" /> Moradores Ativos
            </h2>
            <button
              onClick={() => navigate('/gestor/cadastro-completo')}
              className="min-h-[44px] px-2 text-ms-blue text-sm font-bold flex items-center gap-1 hover:underline"
            >
              <UserPlus className="w-4 h-4" /> Novo Morador
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {moradoresAtivos.map((morador) => (
              <div
                key={morador.id}
                className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-bold text-gray-800">{morador.nome}</p>
                  <p className="text-sm text-gray-500">Entrada: {morador.entrada}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-700 bg-green-50 px-2 py-1 rounded-md">
                    Restam {morador.tempoRestante}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <button
          onClick={() => navigate('/gestor/cadastro-imovel')}
          className="w-full min-h-[56px] bg-white border-2 border-dashed border-gray-300 text-gray-700 font-bold p-4 rounded-2xl hover:bg-gray-50 hover:border-ms-blue transition-colors flex items-center justify-center gap-2"
        >
          <FileText className="w-5 h-5" />
          Cadastrar Novo Imóvel / Oficina
        </button>
      </main>
    </div>
  );
}