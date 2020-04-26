import { Card } from "../Models/DataInterfaces"

export function callApi<T>(url: string): Promise<T> {
    return fetch(url).then(response => {
        if(!response.ok) throw new Error(response.statusText)
        return response.json()
    })
}

export function initDeck(deckCount: number): Promise<NewDeckResp> {
    return callApi<NewDeckResp>(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCount}`);
}

export function drawCards(deckId: string, drawCount: number): Promise<DrawCardsResp> {
    return callApi<DrawCardsResp>(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${drawCount}`);
}


export interface NewDeckResp {
    deck_id: string;
    shuffled: boolean;
    remaining: number
}

export interface DrawCardsResp {
    cards: Card[];
    deck_id: string;
    remaining: number;
}