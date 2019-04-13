# Calculadora

## Requerimentos

- [`Node.js`](https://nodejs.org/en/) >= 8.6.0

## Instruções de uso

O binário principal é o arquivo [`calculator`](https://github.com/kaisermann/expression-calculator/blob/master/calculator).

```shell
$ echo '2 + 10 / 2 * 4' | ./calculator
22

$ echo -e '2 + 10 / 2 * 4 \n 2+2' | ./calculator
22
4

$ echo -e '\n2 + 3 * 4 - 8\n18 - 5 + 2\n6 / 4 - 1\n7 - 6 / 2 * 4\n18 + 3 * 6 - 10 / 4 * 2 + 5.5 * 2\n4 + 5 / 2\n3 * 2\n5.01 * 4' | ./calculator
6
15
0.5
-5
42
6.5
6
20.04
```

## Desenvolvendo

Para alterar o código, é recomendado que todas as dependências de desenvolvimento sejam instaladas:

```shell
$ npm i
```

O código principal está disponível no diretório [`src`](https://github.com/kaisermann/expression-calculator/blob/master/src)

### Testes

Para rodar os testes, basta executar o comando:

```shell
$ npm run test
```

### Instruções do projeto

Você terá que criar um sistema que **avalie e compute o resultado** de uma **dada entrada com uma ou mais expressões matemáticas**.

#### Regras

A entrada provida deve ser no formato `<numero>( <operador> <numero>)+`, onde uma sequência de operações pode ser definida, por exemplo, `2 + 3 * 4 - 8`. As operações disponíveis são: soma (`+`), subtração (`-`), multiplicação (`*`) e divisão (`/`).

Uma dada entrada pode ter múltiplas linhas, onde cada linha representa uma expressão a ser solucionada. Nesse caso, cada operação deve ser calculada de forma independente, gerando uma linha de resultado por expressão. As operações devem ser computadas segundo a [ordem de precedência dos operadores](https://en.wikipedia.org/wiki/Order_of_operations#Definition).

##### Exemplos de entradas e saídas esperadas pelo seu programa

| Entrada                              | Saída             |
| ------------------------------------ | ----------------- |
| 2 + 3 \* 4 - 8                       | 6                 |
| 18 - 5 + 2                           | 15                |
| 6 / 4 - 1                            | 0.5               |
| 7 - 6 / 2 \* 4                       | -5                |
| 18 + 3 \* 6 - 10 / 4 \* 2 + 5.5 \* 2 | 42                |
| 4 + 5 / 2<br>3 \* 2<br>5.01 \* 4     | 6.5<br>6<br>20.04 |

#### Considerações gerais

A escolha da linguagem é deixada para você, utilize **a que você se sente mais confortável**. A entrada deverá ser por `STDIN` (_standard input_) e a saída por `STDOUT` (_standard output_) na linguagem que você escolher.

Forneça as instruções de instalação e execução do seu sistema, observaremos **principalmente seu _design_ de código**. Aspectos como coesão, baixo acoplamento e legibilidade são os principais pontos.

Escolha um dos desafios abaixo para resolver, caso já tenha participado do processo seletivo, por favor escolha um desafio diferente do que foi feito anteriormente.
