import { addExpense, editExpense, removeExpense, startAddExpense, setExpense, startSetExpenses } from './../../actions/expenses';
import configMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';
import expenses from '../fixtures/expenses';

const createMockStore = configMockStore([thunk]);

beforeEach((done) => {
    const expensesData = [];
    expenses.forEach(({ id, description, amount, note, createdAt}) => {
        expensesData[id] = { description, note, amount, createdAt}
    });
    db.ref('expenses').set(expensesData).then(() => done());
})

test('test remove expense', () => {
    const result = removeExpense({ id: '123'});
    expect(result).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123'
    })
})

test('test edit expense', () => {
    const result = editExpense('123', { description: 'editedDescription'});
    expect(result).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123',
        updates: {
            description: 'editedDescription'
        }
    })
})

test('Add expense with passed values', () => {
    const input = {
        id: 'abc123',
        description: 'desc', 
        note: 'note', 
        amount: 10, 
        createdAt: 101
    }
    const result = addExpense(input)
    expect(result).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...input
        }
    })
})
//done is used in async calls,.. the test case is not completed unless done is executed
test('startAddExpense', (done) => {
    const store = createMockStore({});
    const expense = {
        description: 'mouse',
        amount: 3000,
        note: 'created mouse',
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expense)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expense
            }
        })

        return db.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual({
            ...expense
        })
        done();
    });
    
})

test('startAddExpense default values', (done) => {
    const store = createMockStore({});
    const expense = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }
    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expense
            }
        })

        return db.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual({
            ...expense
        })
        done();
    });
    
})

test('set expense should return correct data', () => {
    const input = expenses;
    const result = setExpense(input);
    expect(result).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('start set expenses shouls fetch the data from db', (done) => {
    const store = createMockStore({})
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        })
        done()
    })
})