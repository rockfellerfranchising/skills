# Code-review-graph obrigatório

Code-review-graph (CRG) é uma memória estrutural local-first para agentes: indexa símbolos, imports, chamadas, dependências e impacto em um banco local e os expõe por CLI/MCP. Ele reduz a necessidade de reler o repositório inteiro e deve ser a primeira ferramenta para entender código Rockfeller.

## Regra para AGENTS.md gerado

Inclua instrução explícita: antes de Grep/Glob/Read, use o MCP do code-review-graph para obter contexto mínimo, busca semântica, callers/dependents, fluxos afetados e cobertura de testes. Só use busca textual como complemento quando o grafo não cobrir o arquivo/artefato.

## Setup esperado

1. Instalar/configurar o CRG conforme a documentação oficial do projeto e o cliente MCP usado pelo time.
2. Inicializar e construir o grafo na raiz do repositório.
3. Manter `.code-review-graph/graph.db` ignorado pelo Git; versionar apenas configuração/documentação necessária.
4. Atualizar o grafo após mudanças estruturais ou antes de revisão de PR relevante.

O Leveling é a referência interna: possui `.code-review-graph/graph.db` ignorado e seu `AGENTS.md` obriga as ferramentas de grafo antes de exploração por texto.

Fontes externas: https://code-review-graph.com/ e https://github.com/tirth8205/code-review-graph
