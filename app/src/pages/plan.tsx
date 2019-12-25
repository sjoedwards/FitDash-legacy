import React, {Fragment} from 'react';
import Button from '../components/button/button';
import { useMachine } from '@xstate/react';
import  planMachine from '../machines/plan-machine'

interface Props {
}

const handleClick = () => {

}

const renderLoading = () => (
  <p>loading...</p>
)

const renderPlan = (data:object) => (
  <p>Plan: {JSON.stringify(data)}</p>
)

const Plan = (props: Props) => {
  const [current, send] = useMachine(planMachine);
  return (
    <Fragment>
    <main>
      <p>State: {current.value}</p>
      <p>Context: {JSON.stringify(current.context, null, 1 )}</p>
    </main>
    <h2>Plan</h2>
    {current.value === 'loading' && renderLoading()}
    {current.context.data && renderPlan(current.context.data)}
    <Button title="Add Cycle" action={handleClick} />
  </Fragment>
  )
};

export default Plan;