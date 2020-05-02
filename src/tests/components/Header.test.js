import React from 'react';
import { shallow } from 'enzyme';
// import toJSON from 'enzyme-to-json';
import { Header } from '../../components/Header';

test('should render Header', () => {
    const logout = jest.fn();
    const wrapper = shallow(<Header startLogout={logout}/>)
    expect(wrapper).toMatchSnapshot();
    wrapper.find('button').simulate('click');
    expect(logout).toHaveBeenCalledTimes(1);
    
})