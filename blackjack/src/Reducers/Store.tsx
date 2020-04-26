import { State } from "../Models/State";
import { ActionType, ActionTypeKeys } from "./Actions";
import { scoreGame } from "../Utilities/Helpers";

export var initialState: State = {
    currentDeckId: null,
    dealersCards: [],
    playersCards: [],
    winner: "",
    deckId: ""
}

export function rootReducer(state: State | undefined, action: ActionType): State {
    if(state === undefined) {
        return null as any;
    }
    switch(action.type) {
        case ActionTypeKeys.INIT_HANDS: {
            return {
                ...state,
                dealersCards: action.dealersCards,
                playersCards: action.playersCards,
                deckId: action.deckId,
                winner: ""
            }
        }
        case ActionTypeKeys.END_AND_SCORE: {
            return {
                ...state,
                winner: scoreGame(state.dealersCards, state.playersCards)
            }
        }
        case ActionTypeKeys.ADD_PLAYER_CARD: {
            return {
                ...state,
                playersCards: state.playersCards.concat(action.cards)
            }
        }
        default:
            return {
                ...state
            };
    }
}