// Um item do pedido: nome e preço.
export interface ItemPedido {
  nome: string;
  preco: number;
}

export class Pedido {
  id: number;
  itens: ItemPedido[];
  endereco: string;
  pagamento: string = "";
  cupom: string = "";
  observacao: string = "";
  agendamento: string = "";
  data: string;

  constructor(id: number, itens: ItemPedido[], endereco: string) {
    this.id = id;
    this.itens = itens;
    this.endereco = endereco;
    this.data = new Date().toLocaleString("pt-BR");
  }

  // Soma o preço dos itens. O cupom PRIMEIRA dá 10% de desconto.
  calcularTotal(): number {
    let total = 0;
    for (const item of this.itens) {
      total = total + item.preco;
    }
    if (this.cupom === "PRIMEIRA") {
      total = total * 0.9;
    }
    return Math.round(total * 100) / 100;
  }

  // PROTOTYPE
  //
  // Cria uma CÓPIA deste pedido. É assim que o cliente repete um pedido:
  // em vez de montar tudo de novo, clona o antigo e muda só o necessário.
  //
  // Atenção: a lista de itens também precisa ser copiada, item por item.
  // Se eu só passasse "this.itens", o pedido novo e o antigo dividiriam a
  // mesma lista, e mexer em um mudaria o outro.
  clonar(): Pedido {
    const itensCopiados: ItemPedido[] = [];
    for (const item of this.itens) {
      itensCopiados.push({ nome: item.nome, preco: item.preco });
    }

    // O construtor já gera a data de agora, então a cópia tem data nova.
    const copia = new Pedido(this.id, itensCopiados, this.endereco);
    copia.pagamento = this.pagamento;
    copia.cupom = this.cupom;
    copia.observacao = this.observacao;
    copia.agendamento = this.agendamento;
    return copia;
  }
}