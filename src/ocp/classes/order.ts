import { OrderStatus } from './interfaces/ordem-status';
import { Messaging } from '../services/messaging';
import { ShoppingCart } from './shopping-cart';
import { Persistency } from '../services/persistency';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCart,
    private readonly messaging: Messaging,
    private readonly persistency: Persistency,
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkOut(): void {
    if (this.cart.isEmpty()) {
      console.log('Seu carrinho está vazio');
      return;
    }

    this.messaging.sendMessage(
      `Seu pedido com total de ${this.cart.totalWithDiscount()} foi recebido!`,
    );

    this._orderStatus = 'closed';
    this.persistency.saveOrder();
    this.cart.clear();
  }
}
