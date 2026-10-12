import { PagamentoFabrica, PixFactory, CartaoFactory, DinheiroFactory } from "./pagamentos/pagamentosFabrica";
import { Pedido } from "./pedidos/Pedido";
import { RepositorioPedidos } from "./repositorio/RepositorioPedidos";

// Faz um pedido cria paga e salva.
function fazerPedido(nome: string, preco: number, formaDePagamento: PagamentoFabrica): void {
  // Singleton sempre o mesmo repositório
  const repositorio = RepositorioPedidos.getInstance();

  const id = repositorio.listar().length + 1;
  const pedido = new Pedido(id, [{ nome: nome, preco: preco }]);

  // Factory Method a fábrica escolhida decide como pagar
  pedido.pagamento = formaDePagamento.pagar(pedido.calcularTotal());

  repositorio.salvar(pedido);
}

// Mesma função três formas de pagamento diferentes
fazerPedido("Pizza", 42.5, new PixFactory());
fazerPedido("Sushi", 89.9, new CartaoFactory());
fazerPedido("Hambúrguer", 28, new DinheiroFactory());

// mesmo repositório 3 pedidos continuam lá 
const repositorio = RepositorioPedidos.getInstance();
for (const pedido of repositorio.listar()) {
  console.log("Pedido #" + pedido.id + " | " + pedido.pagamento);
}