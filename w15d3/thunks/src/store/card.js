// import { cards } from '../cards.json';
// Action Type Definitions
const SET_RANDOM_CARD = 'cards/SET_RANDOM_CARD';

//Action Creators
export const setRandomCard = (payload) => ({
    type: SET_RANDOM_CARD,
    payload,
});

//Thunk Creators
/*************  TO DO #4 & #9 ******************/
export const getRandomCard = () => async (dispatch) => {
    // const randInt = () => Math.floor(Math.random() * cards.length);
    // dispatch(setRandomCard(cards[randInt()]));

    // Can use params from first and second function
    // First is any params you need when you call the Thunk Creator
    // The second is always dispatch
    // Usually this is async if you want to fetch
    /* A Thunk Creator is a function that returns another function that 
    will eventually/hopefully dispatch an action. */
    const res = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
    const data = await res.json();
    dispatch(setRandomCard(data.cards[0]));
};

// Define an initial state
const initState = {
    code: 'AH',
    image: 'https://deckofcardsapi.com/static/img/AH.png',
    images: {
        svg: 'https://deckofcardsapi.com/static/img/AH.svg',
        png: 'https://deckofcardsapi.com/static/img/AH.png',
    },
    value: 'ACE',
    suit: 'HEARTS',
};
//Reducer
const cardReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_RANDOM_CARD:
            return action.payload;
        default:
            return state;
    }
};

export default cardReducer;
