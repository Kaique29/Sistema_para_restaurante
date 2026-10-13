import {
  Prato, Bebida, Sobremesa,
  PizzaMargherita, SucoDeUva, Tiramisu,
  ComboSushi, ChaVerde, Mochi,
  XBurger, Refrigerante, Milkshake,
} from "./itens";

// ABSTRACT FACTORY
//
// Parecido com o Factory Method, mas aqui a fábrica cria uma FAMÍLIA de
// objetos que combinam entre si: um prato, uma bebida e uma sobremesa.
// Cada fábrica filha cria a família de uma cozinha, então nunca vai
// aparecer sushi junto com sobremesa de hamburgueria.
export abstract class CardapioFabrica {
  abstract criarPrato(): Prato;
  abstract criarBebida(): Bebida;
  abstract criarSobremesa(): Sobremesa;
}

export class CardapioItalianoFabrica extends CardapioFabrica {
  criarPrato(): Prato {
    return new PizzaMargherita();
  }
  criarBebida(): Bebida {
    return new SucoDeUva();
  }
  criarSobremesa(): Sobremesa {
    return new Tiramisu();
  }
}

export class CardapioJaponesFabrica extends CardapioFabrica {
  criarPrato(): Prato {
    return new ComboSushi();
  }
  criarBebida(): Bebida {
    return new ChaVerde();
  }
  criarSobremesa(): Sobremesa {
    return new Mochi();
  }
}

export class CardapioHamburgueriaFabrica extends CardapioFabrica {
  criarPrato(): Prato {
    return new XBurger();
  }
  criarBebida(): Bebida {
    return new Refrigerante();
  }
  criarSobremesa(): Sobremesa {
    return new Milkshake();
  }
}