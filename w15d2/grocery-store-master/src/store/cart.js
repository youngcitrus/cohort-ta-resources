const ADD_ITEM = 'cart/addItem';
const REMOVE_ITEM = 'cart/removeItem';
const UPDATE_COUNT = 'cart/updateCount';

export const addItem = (itemId) => {
    return {
        type: ADD_ITEM,
        itemId
    }
}

export const updateCount = (itemId, count) => {
    if (count < 1) return removeItem(itemId);
    return {
        type: UPDATE_COUNT,
        itemId,
        count
    };
};

export const removeItem = (itemId) => {
    return {
        type: REMOVE_ITEM,
        itemId,
    };
};

const cartReducer = (state = {}, action) => {
    let newState={};
    switch(action.type) {
        case ADD_ITEM:
            return {...state, [action.itemId]: {id: action.itemId, count: 1}}
        case UPDATE_COUNT:
            newState = {...state};
            newState[action.itemId] = {...state[action.itemId], count: action.count}
            return newState;
        case REMOVE_ITEM:
            newState = {...state};
            delete newState[action.itemId];
            return newState;
        default:
            return state;
    }
};

export default cartReducer;