import { Pipe, PipeTransform } from '@angular/core';
import { CardElement } from './card-element';

@Pipe({
  name: 'cardElementListFilter'
})
export class CardElementListFilterPipe implements PipeTransform {

  transform(cardElementList: CardElement [], card_id: string): CardElement [] {
    return cardElementList.filter(cardElement => cardElement.card_id === card_id);
  }

}
