# Arvore Lógica

Um quebra cabeças de circuitos lógicos para ensino de pensamento computacional. Até o momento a implementação usa uma estrutura de arvore. 

Disponível para jogar em: https://4ntfer.github.io/LogicCircuitGame/src/logicCircuitGame.html

Compativel com desktop e mobile.

## Manual

Todas as portas recebem duas entradas de portas abaixo delas e enviam uma saída para uma porta acima. Assim, os valores booleanos fluem de baixo para cima em uma estrutura de árvore. O objetivo do jogador é levar um valor verdadeiro até a porta mais ao topo.

### Valores Booleanos

A energia na arvore carrega uma valor que pode ser verdadeiro ou falso, ou seja, há ou não há energia em uma determinada conexão entre as portas. Essa energia é originada nas torres localizadas nas posições mais inferiores de cada ramo da arvore, ou seja, seus nós folhas. Se uma conexão estiver brilhando, então ela carrega um valor booleano verdadeiro.

### Portas
<img width= "70%" src="https://raw.githubusercontent.com/4ntFer/LogicCircuitGame/main/port_apresentation.png"/>

Cada porta tem entradas e saídas recebidas e enviadas através das suas conexões. Suas entradas são aquelas conexões ligadas à parte inferior da porta, enquanto sua saída é aquela conexão ligada ao topo da porta. O tipo da porta combinada às suas entradas podem resultar em diferentes valores de saída. Portas com a sinalização em verde no painel podem ser modificadas pelo usuário.

### And

<img width= "20%" src="https://raw.githubusercontent.com/4ntFer/LogicCircuitGame/main/andONOFF.gif"/>

Essas tem uma saída verdadeira se e somente se suas duas entradas forem verdadeira. A resolução dessas portas rende ao jogador mais pontos que a resolução de uma porta or.

### Or

<img width= "20%" src="https://raw.githubusercontent.com/4ntFer/LogicCircuitGame/main/orONOFF.gif"/>

Essas tem uma saída verdadeira se qualquer uma de suas entradas for verdadeira

### Portas sem visualização
<div style= "display: flex; justify-content:space-between; gap: 10px;">
  <img width= "20%" src="https://raw.githubusercontent.com/4ntFer/LogicCircuitGame/main/src/res/genSprites/orPortMod_NoOutputVisualize.png"/>
  <img width= "20%" src="https://raw.githubusercontent.com/4ntFer/LogicCircuitGame/main/src/res/genSprites/andPortMod_NoOutputVisualize.png"/>
<div/>


<img width= "70%" src="https://raw.githubusercontent.com/4ntFer/LogicCircuitGame/main/apresentacaoNoVisualizePort.gif"/>

  
Essas mostram sempre o valor de sua saída como falso, mesmo que esse seja verdadeiro. Logo, para resolve-la o jogador terá mais trabalho e por isso recebera mais pontos.

### Pin de negação
<img width= "70%" src="https://raw.githubusercontent.com/4ntFer/LogicCircuitGame/main/PINEX.gif"/>

Um pin pode alterar o valor da saída da porta aplicando uma negação à ela. Caso o jogador tenha pins a serem aplicados, existirá um botão no canto direito da tela. Novos pins são adquiridos conforme o jogador faz pontos e alguns niveis só podem ser concluidos com a utilização de pins. Para aplicar um pin a qualquer porta, basta clicar no botão e então clicar na porta.

## Detalhes da implementação

A implentação do funcionamento interno, isto é, a parte que não inclui a interface de usuário, utiliza uma estrutura de árvore, onde cada nó não folha é uma porta e deve consultar seus dois nós filhos para saber a sua saída. Dessa forma, todo nó conhece seus filhos, mas não precisa conhecer seu pai.

<img width= "50%" src="https://raw.githubusercontent.com/4ntFer/LogicCircuitGame/main/node_knows_diagram.png"/>

A adoção dessa estrutura de árvore permitiu a implementação da geração aleátoria de niveis. Segue o pseudo-código do algorimo que gera uma árvore aleatória:

```
GeraNivel(N)
  Onde N é o número de nós na árvore.

  A <- nó vazio
  GeraArvore(A,N)
  inicializa(A)
  retorna A

GeraArvore(A,N)
  n <- inteiro aleatório no intervalo de 0 a 5

  se n == 1
    se |A| + 1 < N
      filho a esquerda de A <- novo nó
      GeraArvore(filho a esquerda de A, N)

    se |A| + 1 < N
      filho a direita de A <- novo nó
      GeraArvore(filho a direita de A, N)

  se n == 2
    se |A| + 1 < N
      filho a direita de A <- novo nó
      GeraArvore(filho a direita de A, N)

    se |A| + 1 < N
      filho a esquerda de A <- novo nó
      GeraArvore(filho a esquerda de A, N)

  se n < 3
    geraArvore(A,N)

inicializa(A)
  se A é folha
    porta de A <- porta aleatória, podendo ser AND ou OR
  se não
    porta de A <- porta que retorna sempre o mesmo valor booleano, podendo ser verdadeiro ou falso
  
```

Esse algoritmo foi facilmente modificado para a implementação das portas sem visualização e das portas não modificaveis

Além disso, por cada nível ser uma estrutura de dados árvore, é perfeitamente possível que os niveis pré definidos sejam salvos em arquivos para serem carregados mais tarde. Na verdade, é como o nível 1, o tutorial, é carregado de um arquivo json.

A utilização de um paradigma orientado a objetos permitiu uma grande abstração e uma implementação com pouco, ou nenhum, acomplamento entre a parte lógica e a interface de usuário.

Porém, ainda podem haver melhorias no eficiencia e complexidade do tratamento das ações do usuário utilizando um Diagrama de Voronoi ou um algoritmo de pontos mais próximo, por exemplo. Isso, pois, a implementação atual usa um algoritmo de busca de força bruta para identificar em qual porta o usuário está clicando.


