import { Pagamento, PagamentoPix, PagamentoCartao, PagamentoDinheiro } from "./pagamento";

// FACTORY METHOD
//
// "abstract" quer dizer: esta classe é só um modelo, não dá para usar direto.
// Ela diz "toda fábrica de pagamento TEM que ter o método criarPagamento()",
// mas quem decide O QUE criar são as classes filhas (abaixo).
export abstract class PagamentoFabrica {
  abstract criarPagamento(): Pagamento;

  // Este método funciona para qualquer forma de pagamento:
  // ele pede para a classe filha criar o pagamento e depois paga.
  pagar(valor: number): string {
    const pagamento = this.criarPagamento();
    return pagamento.pagar(valor);
  }
}

// Cada classe filha escolhe qual pagamento criar.
export class PixFactory extends PagamentoFabrica {
  criarPagamento(): Pagamento {
    return new PagamentoPix();
  }
}

export class CartaoFactory extends PagamentoFabrica {
  criarPagamento(): Pagamento {
    return new PagamentoCartao();
  }
}

export class DinheiroFactory extends PagamentoFabrica {
  criarPagamento(): Pagamento {
    return new PagamentoDinheiro();
  }
}