import { takeLatest, select, put } from "redux-saga/effects"
import { ActionTypeKeys, ActionType } from "../Reducers/Actions";
import { hasBust } from "../Utilities/Helpers";
import { State } from "../Models/State";
import { NewDeckResp, DrawCardsResp, drawCards, initDeck } from "../Utilities/WebApi";

export default function* () {
    yield takeLatest([ActionTypeKeys.START_GAME], startNewGame);
    yield takeLatest([ActionTypeKeys.HIT], hitMe)
}

function* startNewGame() {
    // Get a new set of cards
    var newDeck: NewDeckResp = yield initDeck(6);

    // Deal the dealer
    var dealersCards: DrawCardsResp = yield drawCards(newDeck.deck_id, 2);

    // Deal the player
    var playersCards: DrawCardsResp = yield drawCards(newDeck.deck_id, 2);

    yield put<ActionType>({
        type: ActionTypeKeys.INIT_HANDS, 
        dealersCards: dealersCards.cards, 
        playersCards: playersCards.cards,
        deckId: newDeck.deck_id
    });

    if(hasBust(dealersCards.cards, playersCards.cards)) {
        yield put<ActionType>({
            type: ActionTypeKeys.END_AND_SCORE
        })
    }
}

function* hitMe() {
    // Get current deckId
    var state: State = yield select(s => s);

    // Deal a card to the player
    var newCard: DrawCardsResp = yield drawCards(state.deckId, 1);

    yield put<ActionType>({
        type: ActionTypeKeys.ADD_PLAYER_CARD, 
        cards: newCard.cards
    });

    if(hasBust(state.dealersCards, state.playersCards.concat(newCard.cards))) {
        yield put<ActionType>({
            type: ActionTypeKeys.END_AND_SCORE
        })
    }
}