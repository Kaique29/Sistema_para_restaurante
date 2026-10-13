import { CardapioFabrica, CardapioItalianoFabrica, CardapioJaponesFabrica, CardapioHamburgueriaFabrica } from "./cardapio/cardapioFabrica";
import { PixFactory, CartaoFactory, DinheiroFactory } from "./pagamentos/pagamentosFabrica";
import { Pedido } from "./pedidos/Pedido";
import { PedidoBuilder } from "./pedidos/PedidoBuilder";
import { RepositorioPedidos } from "./repositorio/RepositorioPedidos";

// Mostra um pedido no terminal.
function mostrarPedido(pedido: Pedido): void {
  console.log("Pedido #" + pedido.id + " (" + pedido.data + ")");
  for (const item of pedido.itens) {
    console.log("  - " + item.nome + ": R$ " + item.preco);
  }
  console.log("  Endereço: " + pedido.endereco);
  if (pedido.cupom !== "") {
    console.log("  Cupom: " + pedido.cupom);
  }
  if (pedido.observacao !== "") {
    console.log("  Observação: " + pedido.observacao);
  }
  if (pedido.agendamento !== "") {
    console.log("  Agendado para: " + pedido.agendamento);
  }
  console.log("  Total: R$ " + pedido.calcularTotal());
  console.log("  " + pedido.pagamento);
}

// Abstract Factory: a fábrica do cardápio cria prato, bebida e sobremesa
// que combinam. Cada item vai para o Builder, que começa a montar o pedido.
function comecarPedido(cardapio: CardapioFabrica): PedidoBuilder {
  const prato = cardapio.criarPrato();
  const bebida = cardapio.criarBebida();
  const sobremesa = cardapio.criarSobremesa();

  return new PedidoBuilder()
    .adicionarItem(prato.nome, prato.preco)
    .adicionarItem(bebida.nome, bebida.preco)
    .adicionarItem(sobremesa.nome, sobremesa.preco);
}

// Singleton: sempre o mesmo repositório.
const repositorio = RepositorioPedidos.getInstance();

// Pedido 1: italiano, Pix, com cupom e observação (Builder com várias partes opcionais)
const pedido1 = comecarPedido(new CardapioItalianoFabrica())
  .comEndereco("Rua das Flores, 123")
  .comPagamento(new PixFactory())
  .comCupom("PRIMEIRA")
  .comObservacao("Sem cebola, por favor")
  .construir();
repositorio.salvar(pedido1);

// Pedido 2: japonês, cartão, agendado
const pedido2 = comecarPedido(new CardapioJaponesFabrica())
  .comEndereco("Av. Brasil, 500")
  .comPagamento(new CartaoFactory())
  .agendarPara("20:30")
  .construir();
repositorio.salvar(pedido2);

// Pedido 3: hamburgueria, dinheiro, sem nenhuma parte opcional
const pedido3 = comecarPedido(new CardapioHamburgueriaFabrica())
  .comEndereco("Rua do Sol, 77")
  .comPagamento(new DinheiroFactory())
  .construir();
repositorio.salvar(pedido3);

// Prototype: o cliente quer repetir o pedido 1.
// Clono e mudo só o necessário número novo, o cupom (que já foi usado)
// e o pagamento que agora é calculado de novo sem o desconto.
const repetido = pedido1.clonar();
repetido.id = repositorio.listar().length + 1;
repetido.cupom = "";
repetido.pagamento = new PixFactory().pagar(repetido.calcularTotal());
repositorio.salvar(repetido);

// Lista tudo o que ficou guardado
for (const pedido of repositorio.listar()) {
  mostrarPedido(pedido);
  console.log("");
}