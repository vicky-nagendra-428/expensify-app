import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('Login page should be render sorrectly', () => {
    const login = jest.fn()
    const wrapper = shallow(<LoginPage startLogin={login}/>);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('button').simulate('click');
    expect(login).toHaveBeenCalledTimes(1);
})