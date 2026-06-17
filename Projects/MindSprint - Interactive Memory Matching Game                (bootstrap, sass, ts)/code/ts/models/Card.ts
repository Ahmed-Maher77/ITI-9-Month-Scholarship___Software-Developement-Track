import ICard from "../interfaces/ICard.js";


class Card implements ICard {
  id: number;
  value: string;
  isFlipped = false;
  isMatched = false;
  isActive = false;

  // Initializes one card instance with its id and visual value.
  constructor(id: number, value: string) {
    this.id = id;
    this.value = value;
  }

  // Toggles flip state only when the card is active and not already matched.
  flip() {
    if (!this.isActive || this.isMatched) return;
    this.isFlipped = !this.isFlipped;
  }
}


export default Card;