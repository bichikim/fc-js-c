
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: 'variable/variable',
        component: () => import('pages/variable/variable'),
      },
      {
        path: 'variable/calculate',
        component: () => import('pages/variable/calculate'),
      },
      {
        path: 'variable/type',
        component: () => import('pages/variable/type'),
      },
      {
        path: 'flow/if',
        component: () => import('pages/flow/if'),
      },
      {
        path: 'flow/loop',
        component: () => import('pages/flow/loop'),
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
