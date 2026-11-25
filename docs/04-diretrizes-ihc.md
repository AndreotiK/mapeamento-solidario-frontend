# Diretrizes de IHC e Acessibilidade (WCAG 2.2)

O projeto **Mapeamento Solidário** foi concebido sob os referenciais teóricos de **Design Universal** (Ronald Mace), **Engenharia de Usabilidade** (Jakob Nielsen), **Teoria da Carga Cognitiva** (John Sweller) e **Lei de Fitts**, atendendo aos critérios das diretrizes **WCAG 2.2 (Níveis AA e AAA)**.

## Matriz de Barreiras, Fundamentação Teórica e Soluções

| Barreira Identificada | Referencial Teórico / WCAG | Solução Implementada no Frontend |
| :--- | :--- | :--- |
| Alvos de toque reduzidos para usuários com tremor ou baixa precisão motora | Lei de Fitts / WCAG 2.5.5 (Tamanho do Alvo) | Todos os controles interativos possuem área mínima de `44px` (`min-h-[44px]`), expansível para `58px` na aba de acessibilidade. |
| Baixa literacia digital ou dificuldade de leitura textual | Teoria da Carga Cognitiva (Sweller) / WCAG 1.4 | Integração nativa com **Web Speech API** (`speechSynthesis`), permitindo ouvir instruções, cartões e erros em todas as telas. |
| Barreira comunicacional para pessoas surdas | Design Universal / WCAG 1.2.6 (Língua de Sinais) | Botão dedicado de **Libras** na tela inicial com janela de intérprete virtual simulado (padrão VLibras). |
| Erros de preenchimento genéricos ou pouco visíveis | Heurísticas 1, 5 e 9 de Nielsen / WCAG 3.3.1 e 3.3.3 | Asteriscos em vermelho vivo (`#DC2626`), destaque visual nos campos pendentes e resumo acionável: *"Falta 1 campo para continuar: Preencha X e toque em Y de novo"*. |
| Baixo contraste e sensibilidade visual / daltonismo | WCAG 1.4.3, 1.4.6 e 1.4.12 | Gaveta global de acessibilidade com **Ajustes Rápidos** (Letra Grande, Alto Contraste, Leitura por Voz) e **Mais Ajustes** (filtros de daltonismo, espaçamento de texto e redução de movimento). |
| Barreiras linguísticas para pessoas em situação de refúgio | Design Inclusivo / WCAG 3.1.1 | Seletor de idioma (**Português**, **Español** e **English**) integrado à síntese de voz. |

## Decisões de Arquitetura de Interface

1. **Multimodalidade Redundante:** Nenhuma ação crítica depende exclusivamente de visão ou cor. Alertas combinam ícone semântico, texto instrutivo, destaque em vermelho vivo, sinal sonoro via Web Audio API e leitura por voz.
2. **Controle e Liberdade do Usuário (Heurística 3 de Nielsen):** O painel lateral de acessibilidade persiste as preferências do cidadão localmente e oferece restauração imediata ao estado padrão com um toque.
3. **Prevenção Ética de Erros (WCAG 3.3.4):** O Termo de Compromisso Ético bloqueia o cadastro de imóveis caso a gratuidade integral não seja explicitamente declarada.

\newpage