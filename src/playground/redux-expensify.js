import { createStore, combineReducers } from 'redux';
import { v1 as uuidv1 } from 'uuid';

const demoState = {
    expenses: [
        {
            id: 'id',
            description: 'description of expense',
            note: 'some note',
            amount: 5000,
            createdAt: 0
        }
    ],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
}

const addExpense = (
    { 
        description = '', note = '', amount = 0, createdAt = 0 
    } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuidv1(),
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense = ( { id } ) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const expensesReducerDefault = [];
const expensesReducer = (state = expensesReducerDefault, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE': {
            return [...state, action.expense];
        }
        case 'REMOVE_EXPENSE': {
            return state.filter(({ id }) => id !== action.id );
        }
        case 'EDIT_EXPENSE': {
            return state.map((expense) => {
                if(expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            });
        }
        default:
            return state;
    }
};

const filtersReducerDefault = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const setTextFilter = ( text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
    sortBy: 'amount'
})

const sortByDate = () => ({
    type: 'SORT_BY_AMOUNT',
    sortBy: 'date'
})

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

const filtersReducer = (state = filtersReducerDefault, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER': {
            const { text } = action
            return {
                ...state,
                text
            }
        }
        case 'SORT_BY_AMOUNT': {
            return { ...state, sortBy: action.sortBy}
        }
        case 'SORT_BY_DATE': {
            return { ...state, sortBy: action.sortBy}
        }
        case 'SET_START_DATE': {
            return { ...state, startDate: action.startDate}
        }
        case 'SET_END_DATE': {
            return { ...state, endDate: action.endDate}
        }
        default:
            return state;
    }
}

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDt = typeof startDate !== 'number' || expense.createdAt >= startDate
        const endDt = typeof endDate !== 'number' || expense.createdAt <= endDate
        const textMatch = expense.description.toLowerCase().includes(text)

        return startDt && endDt && textMatch
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        } else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        } else {
            return 0;
        }
    })
};

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    console.log(state);
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'aprilRent', amount: 200, createdAt: 1200}));
const expenseTwo = store.dispatch(addExpense({ description: 'food', amount: 300, createdAt: 400}));

// const idToRemove = expenseOne.expense.id;

// store.dispatch(editExpense(idToRemove, { amount: 400}));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

store.dispatch(setStartDate(120));
// store.dispatch(setStartDate());
store.dispatch(setEndDate(1200));
// store.dispatch(setEndDate());

// store.dispatch(removeExpense({id: '2'}));


