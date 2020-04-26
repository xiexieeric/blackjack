import React from 'react';
import { Card } from '../Models/DataInterfaces';
import { scoreHand } from '../Utilities/Helpers';

interface Props {
    playerName: string;
	playersCards: Card[],
}

export default class Hand extends React.PureComponent<Props> {
	render(): JSX.Element {
		return (
			<div key={this.props.playerName} className="Hand">
				<div>
					<h2>{this.props.playerName}:</h2>
					{this.props.playersCards.map((card,idx) => (
						<img key={idx} src={card.image} alt={card.value}/>
					))}
					<div>
						<strong>Score: </strong><span>{scoreHand(this.props.playersCards)}</span>
					</div>
				</div>
			</div>
		)
	}
}