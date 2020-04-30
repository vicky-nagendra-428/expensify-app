import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListItem } from '../../components/ExpenseListItem';

test('expense list item', () => {
    const item = {
        id: '1',
        description: 'description',
        amount: 120,
        createdAt: 0
    }
    const wrapper = shallow(<ExpenseListItem {...item}/>);
    expect(wrapper).toMatchSnapshot();
})