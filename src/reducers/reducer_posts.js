import { FETCH_POSTS } from '../actions';
import { FETCH_POST } from '../actions';
import { DELETE_POST } from '../actions';

export default function(state = {}, action){
    switch(action.type){
        case DELETE_POST:
            delete state[action.payload];
            return state;
        case FETCH_POST:
            const post = action.payload.data;
            return { ...state, [ post.id ] : post };
        case FETCH_POSTS:
            return action.payload.data.reduce((prev, curr) => {
                prev[curr.id] = curr;
                return prev;
            }, {});
        default:
            return state;
    }
}