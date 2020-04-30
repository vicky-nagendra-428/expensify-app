import React from 'react';
import { shallow } from 'enzyme';
// import toJSON from 'enzyme-to-json';
import Header from '../../components/Header';

test('should render Header', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper).toMatchSnapshot();
    // console.log(renderer.getRenderOutput())
})