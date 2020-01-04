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
} | {
  type: 'CHANGE_ROUTE_PLAN',
  data: object
}


export interface RouterContext {
  plan: {
    cycles: Array<object>
  }
}

export interface RouterState {
  states: {
    home: {},
    plan: {
      states: {
        loading: {},
        loaded: {},
        error: {},
        addingCycle: {}
      }
    }
  }
}

export type RouterEvent =
  PlanEvent


export default Machine<RouterContext, RouterState, RouterEvent>({
  id: 'router',
  initial: 'home',
  context: {
    plan: {
      cycles: []
    }
  },
  states: {
    home: {
      on: {
        'CHANGE_ROUTE_PLAN': {
          target: 'plan'
        }
      },
    },
    plan: {
      initial: 'loading',
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
                actions: assign((ctx:PlanContext, event:PlanEvent) => {
                  return {...ctx, plan: {...ctx.plan, cycles: [...ctx.plan.cycles, event.data] }}
                })
              },
            },
          }
        },
      }
    }
  })

