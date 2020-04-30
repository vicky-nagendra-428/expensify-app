import { addExpense, editExpense, removeExpense } from './../../actions/expenses';

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

test('edit expense with passed values', () => {
    const input = {
        description: 'desc', 
        note: 'note', 
        amount: 10, 
        createdAt: 101
    }
    const result = addExpense(input)
    expect(result).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...input,
            id: expect.any(String)
        }
    })
})

test('edit expense with passed values', () => {
    const expected = {
        description: '', 
        note: '', 
        amount: 0, 
        createdAt: 0
    }
    const result = addExpense()
    expect(result).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expected,
            id: expect.any(String)
        }
    })
})