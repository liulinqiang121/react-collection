import {createStore} from 'redux'
import actions from './action'

const reducer = (state={username:''},action) => {
    switch(action.type) {
        case 'login': return {username: action.username};
        case 'logout': return {username: ''};
        default: return {username: ''}
    }
}

const store  = createStore(reducer);
export default store;