import { Card } from "../Models/DataInterfaces";

export function scoreGame(dealersCards: Card[], playersCards: Card[]): string {
    let dealersScore = scoreHand(dealersCards);
    let playersScore = scoreHand(playersCards);

    if(playersScore > 21 || playersScore <= dealersScore)
        return "DEALER";
    else
        return "PLAYER"
}

export function hasBust(dealersCards: Card[], playersCards: Card[]): boolean {
    let playersScore = scoreHand(playersCards);
    let dealersScore = scoreHand(dealersCards);
    return playersScore > 21 || dealersScore > 21;
}

export function scoreHand(hand: Card[]) {
    let value = 0;
    hand.forEach(card => {
        if(card.value === 'JACK' || card.value === 'QUEEN' || card.value === 'KING')
            value += 10;
        else if(card.value !== "ACE") {
            value += Number(card.value)
        }
        else if(value + 11 > 21){
            value += 1;
        }
        else {
            value += 11;
        }
    });
    return value;
}