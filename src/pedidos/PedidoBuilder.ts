import { PagamentoFabrica } from "../pagamentos/pagamentosFabrica";
import { RepositorioPedidos } from "../repositorio/RepositorioPedidos";
import { ItemPedido, Pedido } from "./Pedido";

// BUILDER
//
// Monta o pedido aos poucos, um passo de cada vez. Só coloca o que precisa:
// cupom, observação e agendamento são opcionais.
// Cada passo devolve "this" (o próprio builder), por isso dá para
// encadear os passos um depois do outro.
export class PedidoBuilder {
  private itens: ItemPedido[] = [];
  private endereco: string = "";
  private formaDePagamento: PagamentoFabrica | null = null;
  private cupom: string = "";
  private observacao: string = "";
  private agendamento: string = "";

  adicionarItem(nome: string, preco: number): PedidoBuilder {
    this.itens.push({ nome: nome, preco: preco });
    return this;
  }

  comEndereco(endereco: string): PedidoBuilder {
    this.endereco = endereco;
    return this;
  }

  comPagamento(forma: PagamentoFabrica): PedidoBuilder {
    this.formaDePagamento = forma;
    return this;
  }

  comCupom(codigo: string): PedidoBuilder {
    this.cupom = codigo;
    return this;
  }

  comObservacao(texto: string): PedidoBuilder {
    this.observacao = texto;
    return this;
  }

  agendarPara(horario: string): PedidoBuilder {
    this.agendamento = horario;
    return this;
  }

  // Último passo: confere se o essencial foi preenchido e cria o pedido.
  construir(): Pedido {
    const forma = this.formaDePagamento;

    if (this.itens.length === 0) {
      throw new Error("O pedido precisa de pelo menos um item.");
    }
    if (this.endereco === "") {
      throw new Error("O pedido precisa de um endereço.");
    }
    if (forma === null) {
      throw new Error("O pedido precisa de uma forma de pagamento.");
    }

    const id = RepositorioPedidos.getInstance().listar().length + 1;
    const pedido = new Pedido(id, this.itens, this.endereco);
    pedido.cupom = this.cupom;
    pedido.observacao = this.observacao;
    pedido.agendamento = this.agendamento;
    pedido.pagamento = forma.pagar(pedido.calcularTotal());
    return pedido;
  }
}
