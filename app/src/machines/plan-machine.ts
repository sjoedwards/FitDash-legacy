import { Machine, assign, send } from 'xstate';

const loadPlans = ():Promise<any> => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({test:'test'});
    }, 2000);
  });
}

interface PlanStateSchema {
  states: {
    loading: {},
    loaded: {},
    error: {}
  }
}

interface PlanContext {
  data: object
}

type PlanEvent = {
  type: 'onDone',
  data: object
}

export default Machine<PlanContext, PlanStateSchema, PlanEvent>({
  id: 'plan',
  initial: 'loading',
  context: {
    data: undefined
  },
  states: {
    loading: {
      invoke: {
        id: 'load-plans',
        src: loadPlans,
        onDone: {
            target: 'loaded',
            actions: assign({ data: (_, event) => event.data})
        },
        onError: {
          target: 'error',
        }
      },
    },
    loaded: {
    },
    error: {},
  },
});