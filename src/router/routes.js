
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: 'variable/variable',
        component: () => import('pages/variable/variable.vue'),
      },
      {
        path: 'variable/change-memory',
        component: () => import('pages/variable/change-memory.vue'),
      },
      {
        path: 'variable/calculate',
        component: () => import('pages/variable/calculate.vue'),
      },
      {
        path: 'variable/type',
        component: () => import('pages/variable/type.vue'),
      },
      {
        path: 'closure/get',
        component: () => import('pages/closure/get.vue'),
      },
      {
        path: 'closure/scope',
        component: () => import('pages/closure/scope.vue'),
      },
      {
        path: 'closure/closure',
        component: () => import('pages/closure/closure.vue'),
      },
      {
        path: 'flow/flow',
        component: () => import('pages/flow/flow.vue'),
      },
      {
        path: 'flow/if',
        component: () => import('pages/flow/if.vue'),
      },
      {
        path: 'flow/loop',
        component: () => import('pages/flow/loop.vue'),
      },
      {
        path: 'function/function',
        component: () => import('pages/function/function.vue'),
      },
      {
        path: 'function/object',
        component: () => import('pages/function/object.vue'),
      },
      {
        path: 'function/class',
        component: () => import('pages/function/class.vue'),
      },
      {
        path: 'deep-dive/symbol',
        component: () => import('pages/deep-dive/symbol.vue'),
      },
      {
        path: 'deep-dive/prototype',
        component: () => import('pages/deep-dive/prototype.vue'),
      },
      {
        path: 'deep-dive/error',
        component: () => import('pages/deep-dive/error.vue'),
      },
      {
        path: 'deep-dive/destructuring-assignment',
        component: () => import('pages/deep-dive/destructuring-assignment.vue'),
      },
      {
        path: 'deep-dive/hoisting',
        component: () => import('pages/deep-dive/hoisting.vue'),
      },
    ]
  },
  {
    path: '/tests',
    component: () => import('layouts/TestLayout.vue'),
    children: [
      {
        path: 'line-variable',
        component: () => import('pages/tests/LineVariable.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
