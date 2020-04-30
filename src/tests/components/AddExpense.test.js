import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

test('render add an expense page', () => {
    const onSubmit = jest.fn();
    const history = {
        push: jest.fn()
    }
    const wrapper = shallow(<AddExpensePage onSubmit={onSubmit} history={history}/>);
    expect(wrapper).toMatchSnapshot();

})

test('add an expense', () => {
    const onSubmit = jest.fn();
    const history = {
        push: jest.fn()
    }
    const wrapper = shallow(<AddExpensePage onSubmit={onSubmit} history={history}/>);    
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0])
    expect(onSubmit).toHaveBeenLastCalledWith(expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith("/");
})