
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense, editExpense, removeExpense } from './actions/expenses';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

const store = configureStore();

store.subscribe(() => {
    
    const state = store.getState();
    // const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(state);
});

const expenseOne = store.dispatch(addExpense({ description: 'food bill', amount: 200, createdAt: 1200}));
store.dispatch(addExpense({ description: 'water bill', amount: 100, createdAt: 1100}));
store.dispatch(addExpense({ description: 'rent', amount: 500, createdAt: 100}));

// setTimeout(() => {
//     store.dispatch(setTextFilter('bill'));
// }, 1000);

setTimeout(() => {
    store.dispatch(sortByAmount());
}, 3000);

// const idToRemove = expenseOne.expense.id;

// store.dispatch(editExpense(idToRemove, { amount: 400}));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());
// store.dispatch(sortByAmount());
// // store.dispatch(sortByDate());

// store.dispatch(setStartDate(120));
// store.dispatch(setEndDate(1200));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));