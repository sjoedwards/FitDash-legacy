import React from 'react';

interface Props {
  title: String,
  action: Function
}

const Button = (props: Props) => (
  <button onClick={() => props.action()}>
    {props.title}
  </button>
);

export default Button;