# ♿ Diretrizes de IHC e Acessibilidade (WCAG 2.1)

O projeto foi desenhado seguindo os princípios de **Design Universal**, **Design Ético** e **Design Participativo**. Abaixo, o mapeamento das barreiras identificadas e as soluções implementadas no frontend.

## Tabela de Barreiras e Soluções

| Barreira Identificada | Critério WCAG | Solução no Frontend |
| :--- | :--- | :--- |
| Alvos de toque pequenos | 2.5.5 (Tamanho do Alvo) | Todos os botões têm `min-height: 44px` (classe `min-h-[44px]` no Tailwind). |
| Texto de exemplo com baixo contraste | 1.4.3 (Contraste) | Placeholders escuros e bordas visíveis nos inputs. |
| Mapa sem alternativa textual | 1.1.1 (Conteúdo não textual) | O endereço é exibido em texto no cartão de detalhes, além do mapa. |
| Pino do mapa só ajustável por arrasto | 2.1.1 (Teclado) | Botão "Corrigir" para ajustar o endereço sem arrastar. |
| Erros sem mensagem clara | 3.3.1 (Identificação de Erro) | Caixas de erro vermelhas com texto explicativo. |
| Falta de confirmação em ações destrutivas | 3.3.4 (Prevenção de Erros) | Termo de Compromisso Ético bloqueia o cadastro sem aceite. |

## Decisões de Design Aplicadas

1.  **Cores com Significado:** O Verde (`#0F5E2E`) é usado para ações do morador (acolhimento), o Azul (`#00417A`) para o gestor (administração) e o Vermelho para alertas éticos.
2.  **Ícones + Texto:** Nenhuma informação depende exclusivamente de cor. Os serviços (Banho, Alimentação, Oficinas) sempre têm ícone e texto.
3.  **Foco Visível:** Configuramos `*:focus-visible` no CSS para garantir que pessoas que navegam por teclado vejam onde estão.