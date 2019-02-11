import { shallow } from 'enzyme';
import React from 'React'

import Nav from './nav';

describe('Tests related to the nav', () => {
  it('Asserts 4 link components exist', () => {
    const wrapper = shallow(<Nav />);
    const links = wrapper.find('Link');
    expect(links).toHaveLength(4);
  })
})