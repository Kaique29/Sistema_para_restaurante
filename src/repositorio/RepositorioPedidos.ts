import { Pedido } from "../pedidos/Pedido";

export class RepositorioPedidos {
  private static instancia: RepositorioPedidos | null = null;

  private pedidos: Pedido[] = [];

  private constructor() {}

  static getInstance(): RepositorioPedidos {
    if (RepositorioPedidos.instancia === null) {
      RepositorioPedidos.instancia = new RepositorioPedidos();
    }
    return RepositorioPedidos.instancia;
  }

  salvar(pedido: Pedido): void {
    this.pedidos.push(pedido);
  }

  listar(): Pedido[] {
    return this.pedidos;
  }
}