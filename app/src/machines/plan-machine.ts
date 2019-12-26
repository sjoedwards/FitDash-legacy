import { Machine, assign, send } from 'xstate';

const loadPlans = (ctx: PlanContext):Promise<any> => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(ctx.plan);
    }, 2000);
  });
}

const addCycle = ():Promise<any> => {
  return new Promise<object>((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Cycle 1'
      });
    }, 2000);
  })
}

interface PlanStateSchema {
  states: {
    loading: {},
    loaded: {},
    error: {},
    addingCycle: {}
  }
}

interface PlanContext {
  plan: {
    cycles: Array<object>
  }
}

type PlanEvent = {
  type: 'onDone',
  data: object
} | {
  type: 'ADD_CYCLE',
  data: object
}

export default Machine<PlanContext, PlanStateSchema, PlanEvent>({
  id: 'plan',
  initial: 'loading',
  context: {
    plan: {
      cycles: []
    }
  },
  on: {
    'ADD_CYCLE': {
      target: 'addingCycle'
    }
  },
  states: {
    loading: {
      invoke: {
        id: 'load-plans',
        src: loadPlans,
        onDone: {
            target: 'loaded',
            actions: assign({ plan: (_, event) => event.data})
        },
        onError: {
          target: 'error',
        }
      },
    },
    loaded: {},
    error: {},
    addingCycle: {
      invoke: {
        id: 'add-cycle',
        src: addCycle,
        onDone: {
          target: 'loaded',
          actions: assign((ctx:PlanContext, event:PlanEvent) => {
            const test = [...ctx.plan.cycles, event.data];
            return {...ctx, plan: {...ctx.plan, cycles: [...ctx.plan.cycles, event.data] }}
          })
        },
      },
    }
  },
});