// Os 3 tipos de item que existem em qualquer cardápio.
// Todos têm nome e preço.
export interface Prato {
  nome: string;
  preco: number;
}

export interface Bebida {
  nome: string;
  preco: number;
}

export interface Sobremesa {
  nome: string;
  preco: number;
}

// ---------- Cozinha italiana ----------
export class PizzaMargherita implements Prato {
  nome: string = "Pizza Margherita";
  preco: number = 42;
}

export class SucoDeUva implements Bebida {
  nome: string = "Suco de uva";
  preco: number = 9;
}

export class Tiramisu implements Sobremesa {
  nome: string = "Tiramisù";
  preco: number = 18;
}

// ---------- Cozinha japonesa ----------
export class ComboSushi implements Prato {
  nome: string = "Combo Sushi";
  preco: number = 89.9;
}

export class ChaVerde implements Bebida {
  nome: string = "Chá verde";
  preco: number = 8;
}

export class Mochi implements Sobremesa {
  nome: string = "Mochi";
  preco: number = 15;
}

// ---------- Hamburgueria ----------
export class XBurger implements Prato {
  nome: string = "X-Burger";
  preco: number = 28;
}

export class Refrigerante implements Bebida {
  nome: string = "Refrigerante";
  preco: number = 7;
}

export class Milkshake implements Sobremesa {
  nome: string = "Milkshake";
  preco: number = 16;
}