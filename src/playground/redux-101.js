import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({ decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const reset = () => ({
    type: 'RESET'
});

const setCount = ({ setCount }) => ({
    type: 'SET',
    setCount
});

const store = createStore((state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT': {
            return {
                count: state.count + action.incrementBy
            }
        }
        case 'DECREMENT': {
            return {
                count: state.count - action.decrementBy
            }
        }
        case 'RESET': {
            return {
                count: 0
            }
        }
        case 'SET': {
            return {
                count: action.setCount
            }
        }
        default: {
            return state
        }
    }
});

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
})

// console.log(store.getState());

store.dispatch(incrementCount());

store.dispatch(incrementCount({ incrementBy: 5 }));

// unsubscribe(); // doesnt call the state change default function

store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 2}));
// console.log(store.getState());

store.dispatch(reset());
store.dispatch(setCount({ setCount: 100}));

// console.log(store.getState());