# Primeiro Commit e esse não é IA

# Sistema De gestão de Pedidos (Delivery)

# Padrões usados no projeto

Aqui eu explico onde cada um dos cinco padrões criacionais entrou no meu sistema de delivery e por que ele faz sentido naquele ponto. Todos fazem parte do mesmo fluxo, que está no `src/main.ts`: escolher o cardápio, montar o pedido, pagar, salvar e, depois, repetir o pedido.

## Factory Method

**Onde:** `src/pagamentos/pagamentosFabrica.ts` (a classe `PagamentoFabrica` e as filhas `PixFactory`, `CartaoFactory` e `DinheiroFactory`). As formas de pagamento em si estão em `src/pagamentos/pagamento.ts`.

**Problema que resolve:** o pedido pode ser pago de três jeitos (Pix, cartão e dinheiro), e cada jeito é um objeto diferente. Sem o padrão, o código do pedido teria um `if` para cada forma de pagamento e eu precisaria mexer nele toda vez que quisesse aceitar uma forma nova.

**Por que faz sentido aqui:** a classe `PagamentoFabrica` tem o método `criarPagamento()`, e quem decide qual pagamento criar é cada classe filha. O método `pagar()` funciona para qualquer uma delas sem saber qual é. Se eu quiser aceitar boleto, é só criar uma fábrica nova, sem mexer no resto.

## Singleton

**Onde:** `src/repositorio/RepositorioPedidos.ts`

**Problema que resolve:** todos os pedidos precisam ficar guardados no mesmo lugar. Se duas partes do programa criassem repositórios diferentes, cada uma enxergaria uma lista diferente e pedidos iam sumir.

**Por que faz sentido aqui:** o construtor da classe é `private`, então ninguém consegue fazer `new RepositorioPedidos()`. O único jeito de pegar o repositório é com `getInstance()`, que cria na primeira vez e depois devolve sempre o mesmo. Assim o Builder e o `main.ts` usam o mesmo repositório.

## Abstract Factory

**Onde:** `src/cardapio/cardapioFabrica.ts` (a classe `CardapioFabrica` e as filhas `CardapioItalianoFabrica`, `CardapioJaponesFabrica` e `CardapioHamburgueriaFabrica`). Os itens em si (pratos, bebidas e sobremesas) estão em `src/cardapio/itens.ts`.

**Problema que resolve:** cada tipo de cozinha tem o seu prato, a sua bebida e a sua sobremesa, e eles precisam combinar. Não faz sentido um pedido com sushi, suco de uva e milkshake.

**Por que faz sentido aqui:** cada fábrica filha cria a família inteira de uma cozinha (prato, bebida e sobremesa). Escolhendo a fábrica, eu já garanto que os três itens combinam. A diferença para o Factory Method é que aqui a fábrica cria vários objetos que andam juntos, e não só um.

## Builder

**Onde:** `src/pedidos/PedidoBuilder.ts`

**Problema que resolve:** o pedido tem muitas partes (itens, endereço, forma de pagamento, cupom, observação e horário agendado) e várias são opcionais. Um construtor com tudo isso teria uma lista enorme de parâmetros, e eu teria que passar valores vazios para o que não uso.

**Por que faz sentido aqui:** o Builder monta o pedido passo a passo, e eu só chamo os passos que preciso (`comCupom`, `agendarPara`...). No final, o `construir()` confere se o essencial foi preenchido (itens, endereço e pagamento) e só então cria o `Pedido`. O pedido 3 do `main.ts` não usa nenhuma parte opcional e o 1 usa várias, com o mesmo código.

## Prototype

**Onde:** `src/pedidos/Pedido.ts`, no método `clonar()`

**Problema que resolve:** o cliente quer repetir um pedido que já fez. Montar tudo do zero de novo seria repetir o trabalho, já que quase tudo continua igual.

**Por que faz sentido aqui:** o `clonar()` faz uma cópia do pedido, incluindo a lista de itens (copiada item por item, para a cópia não dividir a lista com o original). Depois eu só mudo o que precisa: o número do pedido, o cupom que já foi usado e o pagamento. A data já vem nova, porque o construtor gera a data de agora.

## Como eles se juntam

No `src/main.ts`, o fluxo passa pelos cinco padrões:

1. A **Abstract Factory** cria o prato, a bebida e a sobremesa do cardápio escolhido.
2. O **Builder** monta o pedido com esses itens, mais endereço, cupom e o que mais for preciso.
3. O **Factory Method** cria a forma de pagamento que o Builder usa para pagar o pedido.
4. O **Singleton** guarda o pedido confirmado, e o próprio Builder o consulta para saber o número do próximo pedido.
5. O **Prototype** clona um pedido guardado para o cliente repetir.
