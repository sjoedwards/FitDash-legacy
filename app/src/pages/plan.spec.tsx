import { shallow } from 'enzyme';
import React from 'React'

import Plan from './plan';

describe('Plan Page', () => {
  it('Asserts the text `Plan` is rendered', () => {
    const wrapper = shallow(<Plan />);
    expect(wrapper.text()).toContain('Plan')
  });
})