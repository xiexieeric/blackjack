import React from 'react';
import {connect} from "react-redux";
import { ActionTypeKeys } from '../Reducers/Actions';
import { Card } from '../Models/DataInterfaces';
import Hand from './Hand';

interface Props {
	dealersCards: Card[],
	playersCards: Card[]
	winner: string;
	deckId: string;
}

interface DispatchProps {
	startNewGame(): any;
	hit(): any;
	endAndScore(): any;
}

class Blackjack extends React.PureComponent<Props & DispatchProps> {
	startGame = () => {
		this.props.startNewGame();
	}

	handleHit = () => {
		this.props.hit();
	}

	handleStand = () => {
		this.props.endAndScore();
	}

	render(): JSX.Element {
		// Cannot issue player actions if
		let disablePlayerActions = 
			this.props.deckId === "" // No game has been initialized
			|| this.props.winner !== "" // There is a winner

		return (
			<div className="Blackjack">
				<nav>
					<button onClick={this.startGame}>Start New Game</button>
				</nav>
				{this.props.winner && 
					<h2 className="winner-text">WINNER: {this.props.winner}</h2>
				}
				<Hand playerName={"Dealer"}
					playersCards={this.props.dealersCards}	
				/>
				<Hand playerName={"Player"}
					playersCards={this.props.playersCards}	
				/>
				<br></br>
				<div>
					<button onClick={this.handleHit} disabled={disablePlayerActions}>Hit</button>
					<button onClick={this.handleStand} disabled={disablePlayerActions}>Stand</button>
				</div>
			</div>
		)
	}
}

export default connect<Props, DispatchProps>((state: any) => ({
	winner: state.winner,
	dealersCards: state.dealersCards,
	playersCards: state.playersCards,
	deckId: state.deckId
}), (dispatch): DispatchProps => ({
	startNewGame() {
		dispatch({type: ActionTypeKeys.START_GAME})
	},
	hit() {
		dispatch({type: ActionTypeKeys.HIT})
	},
	endAndScore() {
		dispatch({type: ActionTypeKeys.END_AND_SCORE})
	},
}))(Blackjack)