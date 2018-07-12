import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducer from '../reducers/reducer'

export default function configureStore(initialState) {
    return createStore(
        Reducer,
        initialState,
        applyMiddleware(thunk)
    );
}