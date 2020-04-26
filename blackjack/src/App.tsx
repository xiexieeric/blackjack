import React from "react";
import { Provider } from "react-redux";
import { Store, compose } from "redux";
import './App.css';
import 'redux';
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer, initialState } from "./Reducers/Store";
import rootSaga from "./Sagas/RootSaga";
import GameRoot from "./Components/Blackjack";
import { State } from "./Models/State";

class App extends React.PureComponent {
	private store: Store<State>;

	constructor(props: any) {
		super(props);
		const sagaMiddleware = createSagaMiddleware();
		const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
		this.store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(rootSaga);
	}

	render(): JSX.Element {
		return (
			<Provider store={this.store}>
				<div className="App">
					<GameRoot/>
				</div>
			</Provider>
		)
	}
}

export default App;
