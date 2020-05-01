import expensesSum from '../../selectors/expensesSum';

const expenses = [
    {
        description: 'exp1',
        note: 'exp2',
        amount: 100,
        createdAt: 0
    },
    {
        description: 'exp1',
        note: 'exp2',
        amount: 200,
        createdAt: 0
    },
    {
        description: 'exp1',
        note: 'exp2',
        amount: 300,
        createdAt: 0
    }
]

test('when there are no expenses 0 should be returned', () => {
    const result = expensesSum([]);
    expect(result).toBe(0);
})

test('when there are valid expenses sum should be returned', () => {
    const result = expensesSum(expenses);
    expect(result).toBe(600);
})