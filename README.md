# Circuitos Logicos

## Um quebra cabeças de circuitos lógicos para ensino de pensamento computacional. Até o momento a implementação usa uma estrutura de arvore.

## Manual

##### Todas as portas recebem duas entradas de portas abaixo delas e enviam uma saída para uma porta acima. Assim, os valores booleanos fluem de baixo para cima em uma estrutura de árvore. O objetivo do jogador é levar um valor verdadeiro até a porta mais ao topo.

### Valores Booleanos

##### A energia na arvore carrega uma valor que pode ser verdadeiro ou falso, ou seja, há ou não há energia em uma determinada conexão entre as portas. Essa energia é originada nas torres localizadas nas posições mais inferiores de cada ramo da arvore, ou seja, seus nós folhas.

### Portas

##### Cada porta tem entradas e saídas recebidas e enviadas através das suas conexões. Suas entradas são aquelas conexões ligadas à parte inferior da porta, enquanto sua saída é aquela conexão ligada ao topo da porta. O tipo da porta combinada às suas entradas podem resultar em diferentes valores de saída.

#### And

<img windth="200%" src="https://raw.githubusercontent.com/4ntFer/LogicCircuitGame/main/andONOFF.gif">

##### Essas tem uma saída verdadeira se e somente se suas duas entradas forem verdadeira. A resolução dessas portas rende ao jogador mais pontos que a resolução de uma porta or.

#### Or

##### Essas tem uma saída verdadeira se qualquer uma de suas entradas for verdadeira

#### Portas sem visualização

##### Essas mostram sempre o valor de sua saída como falso, mesmo que esse seja verdadeiro. Logo, para resolve-la o jogador terá mais trabalho e por isso recebera mais pontos.

### Pin de negação

#### Um pin pode alterar o valor da saída da porta aplicando uma negação à ela. Caso o jogador tenha pins a serem aplicados, existirá um botão no canto direito da tela. Para aplicar um pin a qualquer porta, basta clicar no botão e então clicar na porta.

