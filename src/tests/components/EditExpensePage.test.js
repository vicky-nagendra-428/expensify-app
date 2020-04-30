import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

test('check edit expense page render', () => {
    const onSubmit = jest.fn();
    const history = {
        push: jest.fn()
    }
    const expense = expenses[0]
    const onClick = jest.fn();
    const wrapper = shallow(<EditExpensePage onSubmit={onSubmit} history={history} onClick={onClick} expense={expense}/>)
    expect(wrapper).toMatchSnapshot();

})

test('edit expense and check events', () => {
    const onSubmit = jest.fn();
    const history = {
        push: jest.fn()
    }
    const expense = expenses[0]
    const onClick = jest.fn();
    const wrapper = shallow(<EditExpensePage onSubmit={onSubmit} history={history} onClick={onClick} expense={expense}/>)
    wrapper.find('ExpenseForm').prop('onSubmit')(expense);
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(onSubmit).toHaveBeenLastCalledWith(expense.id, expense)

})

test('remove expense and check events', () => {
    const onSubmit = jest.fn();
    const history = {
        push: jest.fn()
    }
    const expense = expenses[0]
    const onClick = jest.fn();
    const wrapper = shallow(<EditExpensePage onSubmit={onSubmit} history={history} onClick={onClick} expense={expense}/>)
    wrapper.find('button').prop('onClick')({id: expense.id});
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(onClick).toHaveBeenLastCalledWith({id: expense.id})

})