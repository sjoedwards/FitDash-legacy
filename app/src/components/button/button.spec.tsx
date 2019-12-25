import React from 'react'
import {shallow} from 'enzyme';

import Button from './button';

let clickTest
beforeEach(() =>{
  clickTest = jest.fn();
})

afterEach(() => {
  clickTest.mockClear()
})

describe('Button tests', () => {
  it('Displays the correct title and calls the click function onClick', () => {
    const button = shallow(<Button title="test" action={() => clickTest()} />);
    expect(button.text()).toContain('test');
    button.simulate('click')
    expect(clickTest).toHaveBeenCalledTimes(1)
  })
})