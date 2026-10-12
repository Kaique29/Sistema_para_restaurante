// Um item do pedido: nome e preço.
export interface ItemPedido {
  nome: string;
  preco: number;
}

export class Pedido {
  id: number;
  itens: ItemPedido[];
  pagamento: string = "";

  constructor(id: number, itens: ItemPedido[]) {
    this.id = id;
    this.itens = itens;
  }

  // Soma o preço de todos os itens.
  calcularTotal(): number {
    let total = 0;
    for (const item of this.itens) {
      total = total + item.preco;
    }
    return total;
  }
}