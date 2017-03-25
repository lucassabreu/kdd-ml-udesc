KNN Simples
===========

Foi desenvolvido um programa para calcular o melhor K classificador usando KNN. Pra este desenvolvimento foi usada o dataset Iris (http://archive.ics.uci.edu/ml/datasets/Iris).

No programa o mesmo é separado em três datasets menores, mas proporcionais em número de itens por classe, um para treinamento (25%), um para avaliação (25%) e outro para teste (50%), usando uma semente para distribuir os elementos ([random-seed](https://www.npmjs.com/package/random-seed)).

Esse conjunto foi tratado conforme a regra sugerida no método 1 (melhor K, melhor dataset treinamento, testar contra dataset de testes, percental de acertos retornado ao final), sendo executado para 30 sementes (fonte: `run-knn-sugerido.js`).

Os resultados atingidos foram (classificados da menor para maior precisão):

Seed    | Precisão
--------|----------
test-30	| 87,179487
test-4	| 88,461538
test-15	| 91,025641
test-16	| 91,025641
test-17	| 91,025641
test-20	| 92,307692
test-28	| 92,307692
test-3	| 92,307692
test-5	| 92,307692
test-6	| 92,307692
test-9	| 92,307692
test-11	| 93,589744
test-19	| 93,589744
test-23	| 93,589744
test-24	| 93,589744
test-26	| 93,589744
test-27	| 93,589744
test-29	| 93,589744
test-7	| 93,589744
test-12	| 94,871795
test-13	| 94,871795
test-25	| 94,871795
test-1	| 96,153846
test-10	| 96,153846
test-14	| 96,153846
test-2	| 96,153846
test-8	| 96,153846
test-18	| 97,435897
test-22	| 97,435897
test-21	| 98,717949

A média desse conjunto é 93,68% com um desvio padrão de 2,56%.

Para o médoto 2, mudei as etapas para partindo dos datasets gerados da semente, procurar o melhor dataset de treinamento para os K de 1 a 9, depois com esses 5 conjuntos procurei o melhor K para cada um, por fim guardei o melhor K e dataset de Treinamento dessa ultima saída.

Os resultados para 30 sementes foram como abaixo:

Seed    | Precisão
--------|----------
test-27	| 87,179487
test-30	| 87,179487
test-4	| 88,461538
test-17	| 91,025641
test-15	| 92,307692
test-20	| 92,307692
test-23	| 92,307692
test-25	| 92,307692
test-26	| 92,307692
test-28	| 92,307692
test-9	| 92,307692
test-14	| 93,589744
test-19	| 93,589744
test-5	| 93,589744
test-6	| 93,589744
test-1	| 94,871795
test-10	| 94,871795
test-11	| 94,871795
test-13	| 94,871795
test-24	| 94,871795
test-29	| 94,871795
test-8	| 94,871795
test-16	| 96,153846
test-22	| 96,153846
test-3	| 96,153846
test-7	| 96,153846
test-12	| 97,435897
test-18	| 97,435897
test-2	| 97,435897
test-21	| 98,717949

A média desse conjunto foi 93,80% com um desvio de 2,83%.

Comparando os resultados o programa sugerido gerou resultado com variação de 91,11% a 96,24%, enquanto o Método 2 gerou resultado variando de 90,96% a 96,64%.

Dessa forma embora o Método 2 tenha um resultado um pouco melhor na precisão, ele tem uma variação que o torna menos efetivo, enquando o Sugerido se mostra mais previsível, sendo assim melhor.

O código do projeto pode ser encontrado em https://github.com/lucassabreu/knn-ml-udesc

Como Executar Esse Projeto
--------------------------

É necessário ter o `node` e `npm` instalados, uma vez os tendo entre na pasta do projeto e execute o comando `npm install` para baixar as dependências. Por fim execute o script `cli/run.sh` e o mesmo irá executar os dois métodos e mostrar os retornos.

Após a primeira execução não seja necessário executar `npm install` podendo ser executado apenas o `cli/node.sh`

