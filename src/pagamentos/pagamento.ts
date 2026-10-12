// Toda forma de pagamento precisa ter o método pagar().
// A "interface" é só uma lista do que a classe é obrigada a ter.
export interface Pagamento {
  pagar(valor: number): string;
}

export class PagamentoPix implements Pagamento {
  pagar(valor: number): string {
    return "Pix: R$ " + valor + " pago via QR Code";
  }
}

export class PagamentoCartao implements Pagamento {
  pagar(valor: number): string {
    return "Cartão: R$ " + valor + " aprovado";
  }
}

export class PagamentoDinheiro implements Pagamento {
  pagar(valor: number): string {
    return "Dinheiro: R$ " + valor + " pago na entrega";
  }
}