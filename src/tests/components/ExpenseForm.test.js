import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import toJson from 'enzyme-to-json';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('test expense form', () => {
    const wrapper = shallow(<ExpenseForm />)
    // expect(toJson(wrapper)).toMatchSnapshot();
})

test('invalid submit form', () => {
    const wrapper = shallow(<ExpenseForm />);
    // expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    // expect(wrapper).toMatchSnapshot();
})

test('should set description on change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = 'desc';
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('description')).toBe(value);
})

test('shoudl call on submit when submit the form', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    })
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        note: expenses[0].note,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt
    });
})

test('onDate change test', () => {
    const now = moment()
    const wrapper = shallow(<ExpenseForm/>);
    // expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now)
    expect(wrapper.state('createdAt')).toEqual(now);
})

test('should set focused on change', () => {
    const focused = true
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused })
    expect(wrapper.state('calendarFocused')).toBe(focused);
})