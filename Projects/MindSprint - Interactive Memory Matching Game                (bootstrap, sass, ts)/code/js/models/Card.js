class Card {
    id;
    value;
    isFlipped = false;
    isMatched = false;
    isActive = false;
    // Initializes one card instance with its id and visual value.
    constructor(id, value) {
        this.id = id;
        this.value = value;
    }
    // Toggles flip state only when the card is active and not already matched.
    flip() {
        if (!this.isActive || this.isMatched)
            return;
        this.isFlipped = !this.isFlipped;
    }
}
export default Card;
//# sourceMappingURL=Card.js.map