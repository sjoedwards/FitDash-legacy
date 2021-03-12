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

export interface PlanContext {
  plan: {
    cycles: Array<object>
  }
}

export default Machine<PlanContext, any, any>({
  id: 'plan-machine',
  initial: 'loading',
  context: {
    plan: {
      cycles: []
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
    loaded: {
      on: {
        'ADD_CYCLE': {
          target: 'addingCycle'
        }
      },
    },
    error: {},
    addingCycle: {
      invoke: {
        id: 'add-cycle',
        src: addCycle,
        onDone: {
          target: 'loaded',
          actions: assign({
            plan: (ctx, event) => ({...ctx.plan, cycles: [...ctx.plan.cycles, event.data]})
          })
        },
      },
    }
  },
})

