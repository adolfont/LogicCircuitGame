# Circuitos Logicos

## Um quebra cabeças de circuitos lógicos para ensino de pensamento computacional. Até o momento a implementação usa uma estrutura de arvore.

## ____________________________________________________________________________________________________

## Manual


##### Todas as portas recebem duas entradas de portas abaixo delas e enviam uma saída para uma porta acima. Assim, os valores booleanos fluem de baixo para cima em uma estrutura de árvore. O objetivo do jogador é levar um valor verdadeiro até a porta mais ao topo.

### Valores Booleanos

##### A energia na arvore carrega uma valor que pode ser verdadeiro ou falso, ou seja, há ou não há energia em uma determinada conexão entre as portas. Essa energia é originada nas torres localizadas nas posições mais inferiores de cada ramo da arvore, ou seja, seus nós folhas.

### Portas

##### Cada porta tem entradas e saídas recebidas e enviadas através das conexões. Suas entradas são aquelas conexões ligadas à parte inferior da porta, enquanto sua saída é aquela conexão ligada ao topo da porta. O tipo da porta combinada com as suas entradas podem resultar em diferentes valores de saída.

#### And

##### Essas tem uma saída verdadeira se e somente se suas duas entradas forem verdadeira

#### Or

##### Essas tem uma saída verdadeira se qualquer uma de suas entradas for verdadeira


<a href="https://4ntfer.github.io/LogicCircuitGame/main/src/logicCircuitGame.html">
