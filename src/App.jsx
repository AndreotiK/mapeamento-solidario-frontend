import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Identificacao from './pages/morador/Identificacao';
import BuscaImoveis from './pages/morador/BuscaImoveis';
import DetalhesImovel from './pages/morador/DetalhesImovel';
import LoginGestor from './pages/gestor/Login';
import DashboardGestor from './pages/gestor/Dashboard';
import CadastroImovel from './pages/gestor/CadastroImovel'; 
import SolicitacaoAvaliacao from './pages/gestor/SolicitacaoAvaliacao';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Rotas do Morador */}
        <Route path="/morador/identificacao" element={<Identificacao />} />
        <Route path="/morador/busca" element={<BuscaImoveis />} />
        <Route path="/morador/detalhes/:id" element={<DetalhesImovel />} />
        
        {/* Rotas do Gestor */}
        <Route path="/gestor/login" element={<LoginGestor />} />
        <Route path="/gestor/solicitar-acesso" element={<SolicitacaoAvaliacao />} />
        <Route path="/gestor/dashboard" element={<DashboardGestor />} />
        <Route path="/gestor/cadastro-imovel" element={<CadastroImovel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;