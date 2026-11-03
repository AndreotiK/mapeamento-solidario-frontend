import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, CheckCircle, Clock, Search, UserPlus, FileText } from 'lucide-react';

// Mock de dados: Reservas pendentes
const reservasIniciais = [
  { id: 1, codigo: 'MS-4829', nome: 'Carlos Silva', data: 'Hoje, 14:30' },
  { id: 2, codigo: 'MS-1192', nome: 'Ana Souza', data: 'Hoje, 10:15' }
];

// Mock de dados: Moradores ativos
const moradoresAtivos = [
  { id: 1, nome: 'João Pereira', entrada: '01/10/2026', tempoRestante: '2 meses e 28 dias' },
  { id: 2, nome: 'Maria Oliveira', entrada: '15/09/2026', tempoRestante: '1 mês e 12 dias' }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState(reservasIniciais);
  const [codigoInput, setCodigoInput] = useState('');
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });

  const handleConfirmarReserva = (codigoReserva) => {
    // Simula a verificação do código
    if (codigoInput.toUpperCase() === codigoReserva) {
      // Remove a reserva da lista de pendentes
      setReservas(reservas.filter(r => r.codigo !== codigoReserva));
      setMensagem({ texto: `Reserva ${codigoReserva} confirmada com sucesso!`, tipo: 'sucesso' });
      setCodigoInput('');
      
      // Limpa a mensagem após 4 segundos
      setTimeout(() => setMensagem({ texto: '', tipo: '' }), 4000);
    } else {
      setMensagem({ texto: 'Código incorreto. Verifique com o morador.', tipo: 'erro' });
    }
  };

  return (
    <div className="min-h-screen bg-ms-gray-bg pb-10">
      {/* Cabeçalho */}
      <header className="bg-ms-blue text-white p-4 shadow-md sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Abrigo Esperança</h1>
            <p className="text-sm text-blue-200">Painel do Gestor</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-blue-800 hover:bg-blue-900 rounded-full transition-colors"
            aria-label="Sair do sistema"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="p-4 max-w-2xl mx-auto flex flex-col gap-6 mt-4">
        
        {/* Cards de Métricas Rápidas */}
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

        {/* Mensagem de Feedback */}
        {mensagem.texto && (
          <div className={`p-4 rounded-xl border-l-4 font-bold ${mensagem.tipo === 'sucesso' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700'}`} role="alert">
            {mensagem.texto}
          </div>
        )}

        {/* Seção: Reservas Pendentes */}
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" /> Aguardando Confirmação
          </h2>
          
          {reservas.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Nenhuma reserva pendente no momento.</p>
          ) : (
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
                  
                  <div className="flex gap-2 mt-2">
                    <input 
                      type="text" 
                      placeholder="Digite o código (ex: MS-1234)"
                      value={codigoInput}
                      onChange={(e) => setCodigoInput(e.target.value)}
                      className="flex-1 p-3 border-2 border-gray-300 rounded-lg uppercase focus:border-ms-blue focus:ring-0"
                    />
                    <button 
                      onClick={() => handleConfirmarReserva(reserva.codigo)}
                      className="bg-ms-blue text-white font-bold px-4 rounded-lg hover:bg-blue-900 transition-colors flex items-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" /> Confirmar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Seção: Moradores Ativos */}
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-ms-green" /> Moradores Ativos
            </h2>
            <button className="text-ms-blue text-sm font-bold flex items-center gap-1 hover:underline">
              <UserPlus className="w-4 h-4" /> Novo Morador
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {moradoresAtivos.map((morador) => (
              <div key={morador.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-0">
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

        {/* Botão para Cadastrar Novo Imóvel (Futuro) */}
        <button 
            onClick={() => navigate('/gestor/cadastro-imovel')} // <-- Adicione o onClick aqui
            className="w-full bg-white border-2 border-dashed border-gray-300 text-gray-600 font-bold p-4 rounded-2xl hover:bg-gray-50 hover:border-ms-blue transition-colors flex items-center justify-center gap-2"
            >
            <FileText className="w-5 h-5" /> 
            Cadastrar Novo Imóvel / Oficina
            </button>
      </main>
    </div>
  );
}