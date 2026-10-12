# Tema: Delivery de Restaurante

## O que é o sistema

O tema que caiu pra mim foi o de pedidos de restaurante (delivery). Vou fazer um sistema pequeno, que roda no terminal, parecido com um app de delivery: o cliente escolhe o que quer comer, monta o pedido, paga e o pedido fica salvo. Depois ele ainda pode repetir um pedido que já fez, sem precisar montar tudo de novo.

Não vou fazer tela nem banco de dados. A ideia é focar em como os objetos são criados, que é o assunto do trabalho.

## Como o pedido funciona, do começo ao fim

1. O cliente escolhe um cardápio (italiano, japonês ou hamburgueria).
2. Ele monta o pedido: escolhe os itens, coloca o endereço e, se quiser, cupom e observação.
3. Escolhe como vai pagar: Pix, cartão ou dinheiro.
4. O pedido é confirmado e fica guardado.
5. Mais tarde, ele pode repetir esse pedido.

## O que existe no sistema

- **Cardápio:** cada tipo de comida tem o seu, com prato, bebida e sobremesa.
- **Pedido:** os itens, o endereço, a forma de pagamento e, às vezes, cupom e observação.
- **Pagamento:** Pix, cartão ou dinheiro.
- **Repositório de pedidos:** o lugar onde todos os pedidos ficam guardados.

## Onde vou usar cada padrão

**Factory Method nos pagamentos.** Cada forma de pagamento (Pix, cartão, dinheiro) vai ter a sua fábrica, e é ela que decide qual pagamento criar. Assim o pedido não precisa de um monte de `if` para cada tipo de pagamento, e se eu quiser adicionar o boleto depois é só criar mais uma fábrica. Fica na pasta `src/pagamentos`.

**Singleton no repositório de pedidos.** Só pode existir um repositório no sistema inteiro. Se existissem dois, cada parte do programa ia enxergar uma lista de pedidos diferente e ia dar confusão. Fica na pasta `src/repositorio`.

**Abstract Factory nos cardápios.** Cada tipo de cozinha tem uma fábrica que cria o prato, a bebida e a sobremesa que combinam entre si. Assim não acontece de aparecer sushi com sobremesa de pizza no mesmo cardápio. Fica na pasta `src/cardapio`.

**Builder na montagem do pedido.** O pedido tem muita coisa e boa parte é opcional (cupom, observação, agendamento). Com o Builder eu monto o pedido aos poucos, só colocando o que precisa, em vez de ter um construtor gigante cheio de parâmetros vazios. Fica na pasta `src/pedidos`.

**Prototype para repetir o pedido.** Quando o cliente quer pedir de novo a mesma coisa, eu copio (clono) o pedido antigo e mudo só o que precisa, como o número e a data. Também fica na pasta `src/pedidos`.

## Como os padrões se juntam

Não são cinco coisas soltas, todos fazem parte do mesmo pedido:

- a **Abstract Factory** cria os itens do cardápio escolhido;
- o **Builder** monta o pedido com esses itens;
- o **Factory Method** cria o pagamento;
- o **Singleton** guarda o pedido confirmado;
- o **Prototype** copia um pedido guardado para repeti-lo.

## Plano das aulas

- **Aula 1:** planejar tudo (este documento) e fazer o primeiro commit.
- **Aula 2:** Factory Method e Singleton.
- **Aula 3:** Abstract Factory e Builder, ligando tudo no mesmo sistema.
- **Aula 4:** Prototype, revisar o código e escrever o `PADROES.md`.