import { Card } from "./DataInterfaces";

export interface State {
    currentDeckId: string | null
    dealersCards: Card[],
    playersCards: Card[]
    winner: string;
    deckId: string;
}