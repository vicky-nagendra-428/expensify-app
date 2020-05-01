import expenseReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import expensesReducer from '../../reducers/expenses';

test('set expenses should set the expenses to state', () => {
    const input = expenses;
    const state = []
    const result = expensesReducer(state, { type: 'SET_EXPENSES', expenses: input});
    expect(result).toEqual(input);
})