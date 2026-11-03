# 🏠 Mapeamento Solidário

Plataforma multiplataforma (Web/Mobile e Totens) para mapeamento, consulta e pré-reserva de moradias temporárias gratuitas e serviços de apoio (banho, alimentação e oficinas) para pessoas em situação de rua ou vulnerabilidade social.

> **Projeto desenvolvido para a disciplina de Interação Humano-Computador (IHC) - UFABC 2026.3**

## 👥 Integrantes do Grupo 3 (Ordem Alfabética)
*   Diego Matheus Mesa Sanches
*   Gustavo Ferreira Andreoti Lima
*   Leticia do Vale Brasil
*   Paula Regina Leao Michel

## 🎯 Sobre o Projeto
O objetivo central é garantir àqueles que não têm condições de moradia um lar temporário para que consigam se reestabelecer e serem reintegrados à sociedade com cidadania. 

Para evitar a mercantilização da vulnerabilidade e a expansão de práticas como Airbnb em áreas carentes, **o sistema proíbe expressamente a cobrança de aluguel (mesmo que simbólico)**. O cadastro de novos imóveis passa por uma rigorosa **avaliação e visita técnica do Governo do Estado** antes de serem disponibilizados.

## 🚀 Funcionalidades Principais

### 👤 Fluxo do Morador (Público-Alvo)
1.  **Identificação:** Cadastro de baixo atrito (Nome Social, Data de Nascimento, Gênero e Documento/CadÚnico opcional), preservando a privacidade e o anonimato.
2.  **Busca de Imóveis:** Feed com base na localização, exibindo fotos (com opacidade reduzida), distância, vagas disponíveis e ícones de serviços (Banho, Alimentação, Oficinas).
3.  **Detalhes e Reserva:** Tela detalhada com regras de convivência e tempo máximo de estadia. O morador realiza uma **pré-reserva** e recebe um **código de identificação** (ex: `MS-1234`) para apresentar na recepção do abrigo.

### 🏢 Fluxo do Gestor (ONGs, Abrigos e Ocupações)
1.  **Solicitação de Visita Técnica:** ONGs que ainda não possuem login solicitam o cadastro. Um assistente social do governo agenda uma visita técnica para avaliar a viabilidade do imóvel.
2.  **Dashboard Administrativo:** Painel para visualizar reservas pendentes, confirmar a entrada de moradores (via código) e gerenciar o tempo de estadia dos moradores ativos.
3.  **Cadastro de Imóvel:** Formulário dividido em etapas (Localização, Infraestrutura, Serviços/Oficinas e Fotos) com um **Termo de Compromisso Ético** obrigatório confirmando a gratuidade do local.

## ♿ Diretrizes de IHC e Acessibilidade Aplicadas
O projeto foi desenhado seguindo os princípios de **Design Universal**, **Design Ético** e **Design Participativo**:

*   **Alvos de Toque (WCAG 2.5.5/2.5.8):** Botões e áreas clicáveis com tamanho mínimo de 44x44px, facilitando o uso por pessoas com tremores ou baixa precisão motora.
*   **Redesenho Universal (Mapa):** O uso de mapas não depende apenas da imagem. A localização é confirmada via texto (endereço escrito) e o ajuste do pino pode ser feito via botão "Corrigir" em vez de arrastar com o dedo.
*   **Contraste e Legibilidade (WCAG 1.4.3):** Cores de texto e fundo com alto contraste (ex: placeholders escuros e bordas visíveis nos inputs). Os ícones de serviços sempre vêm acompanhados de texto (não dependem apenas da cor).
*   **Prevenção de Erros (WCAG 3.3.1/3.3.4):** Validação de campos obrigatórios com mensagens de erro claras e bloqueio de ações destrutivas (ex: exigência do aceite do Termo Ético).
*   **Navegação por Teclado (WCAG 2.1.1):** Foco visível em todos os elementos interativos (`focus-visible` configurado no CSS).

## 🛠️ Tecnologias Utilizadas
*   **React.js** (com Vite para build ultra-rápido)
*   **React Router DOM** (Navegação SPA)
*   **Tailwind CSS v4** (Estilização e Design System)
*   **Lucide React** (Biblioteca de ícones acessíveis)

## 💻 Como rodar o projeto localmente

1. Clone este repositório:
   ```bash
   git clone https://github.com/SEU-USUARIO/mapeamento-solidario-frontend.git