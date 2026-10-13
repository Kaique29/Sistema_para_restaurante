# Sistema de Pedidos de Restaurante (Delivery)

Esse é o meu trabalho de padrões criacionais, feito em TypeScript. O tema que caiu pra mim foi **pedidos de restaurante (delivery)**, então fiz um sistema pequeno que roda no terminal: o cliente escolhe um cardápio, monta o pedido, paga, o pedido fica salvo e depois ele pode repetir esse pedido.

A ideia não foi só fazer funcionar, mas usar cada padrão no lugar onde ele realmente resolve um problema. Os cinco padrões são: **Factory Method, Abstract Factory, Builder, Prototype e Singleton**.

## Como rodar

Precisa ter o [Node.js](https://nodejs.org) instalado. Depois:

```bash
npm install
npm start
```

Para só conferir se o código compila, sem rodar:

```bash
npm run typecheck
```

## O que o programa faz

Ele monta três pedidos de cardápios diferentes (italiano, japonês e hamburgueria), cada um pago de um jeito (Pix, cartão e dinheiro). Depois repete o primeiro pedido e lista tudo o que ficou guardado, mostrando itens, endereço, cupom, observação, agendamento, total e pagamento.

## Como o projeto está organizado

```
sistemarestaurante/
├── src/
│   ├── main.ts                        mostra o fluxo todo funcionando
│   ├── cardapio/
│   │   ├── itens.ts                   pratos, bebidas e sobremesas
│   │   └── cardapioFabrica.ts         Abstract Factory
│   ├── pagamentos/
│   │   ├── pagamento.ts               interface e formas de pagamento
│   │   └── pagamentosFabrica.ts       Factory Method
│   ├── pedidos/
│   │   ├── Pedido.ts                  a classe do pedido (Prototype: clonar)
│   │   └── PedidoBuilder.ts           Builder
│   └── repositorio/
│       └── RepositorioPedidos.ts      Singleton
├── docs/
│   ├── TEMA.md                        explica o tema que escolhi
│   └── PADROES.md                     onde cada padrão foi usado e por quê
└── README.md
```

## Onde cada padrão entra

| Padrão | Onde | Para que serve no sistema |
|---|---|---|
| Factory Method | `src/pagamentos/pagamentosFabrica.ts` | Cada forma de pagamento tem a sua fábrica, que decide qual pagamento criar, sem `if` no pedido |
| Singleton | `src/repositorio/RepositorioPedidos.ts` | Só existe um repositório, então todo mundo enxerga a mesma lista de pedidos |
| Abstract Factory | `src/cardapio/cardapioFabrica.ts` | Cada cozinha cria o prato, a bebida e a sobremesa que combinam entre si |
| Builder | `src/pedidos/PedidoBuilder.ts` | Monta o pedido aos poucos, já que várias partes são opcionais (cupom, observação, agendamento) |
| Prototype | `src/pedidos/Pedido.ts` | O método `clonar()` copia um pedido antigo para o cliente repetir |

## Andamento do trabalho

- [x] **Aula 1:** planejamento e `TEMA.md`
- [x] **Aula 2:** Factory Method e Singleton
- [x] **Aula 3:** Abstract Factory e Builder
- [x] **Aula 4:** Prototype e documentação final

## Documentação

- [docs/TEMA.md](docs/TEMA.md): o tema que escolhi e como pensei o sistema
- [docs/PADROES.md](docs/PADROES.md): onde cada padrão foi aplicado e por que ele faz sentido ali