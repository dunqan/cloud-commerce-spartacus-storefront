import { Observable } from 'rxjs';
import { SaveCartResult } from '../../../model/cart.model';

export abstract class SaveCartAdapter {
  /**
   * Abstract method used to save a cart
   *
   * @param userId
   * @param cartId
   * @param saveCartName
   * @param saveCartDescription
   */
  abstract saveCart(
    userId: string,
    cartId: string,
    fields?: { saveCartName?: string; saveCartDescription?: string }
  ): Observable<SaveCartResult>;
}
