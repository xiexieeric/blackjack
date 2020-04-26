import { Card } from "../Models/DataInterfaces";

export enum ActionTypeKeys {
    START_GAME = "START_GAME",
    INIT_HANDS = "INIT_HANDS",
    HIT = "HIT",
    ADD_PLAYER_CARD = "ADD_PLAYER_CARD",
    END_AND_SCORE = "END_AND_SCORE"
}

interface StartGame {
    type: ActionTypeKeys.START_GAME
    name: string
}

interface InitHands {
    type: ActionTypeKeys.INIT_HANDS;
    dealersCards: Card[];
    playersCards: Card[];
    deckId: string;
}

interface AddPlayerCard {
    type: ActionTypeKeys.ADD_PLAYER_CARD,
    cards: Card[]
}

interface Hit {
    type: ActionTypeKeys.HIT
}

interface EndAndScore {
    type: ActionTypeKeys.END_AND_SCORE
}

export type ActionType = StartGame
    | InitHands
    | Hit
    | AddPlayerCard
    | EndAndScore