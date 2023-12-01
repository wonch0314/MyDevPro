import { createBrowserRouter } from 'react-router-dom'
import HomeView from '@/views/HomeView'
import LoginView from '@/views/LoginView'
import RouteView from '@/views/RouteView'
import NotFoundView from '@/views/error/NotFoundView'
import ErrorView from '../views/error/ErrorView'

const router = createBrowserRouter([
  {
    path: '/',
    name: 'home',
    element: HomeView({ loginCheck: true, authCheck: false })
  },
  // 로그인
  {
    path: '/login',
    name: 'login',
    element: LoginView(),
    meta: { loginCheck: false, authCheck: false, layout: 'HeaderAndNoMenuLayout' }
  },

  {
    path: '/om',
    children: [
      {
        path: ':dept1',
        element: RouteView(),
        meta: { loginCheck: true, authCheck: true },
        children: [
          {
            path: ':dept2',
            name: 'RouteView()2',
            element: RouteView(),
            meta: { loginCheck: true, authCheck: true },
            children: [
              {
                path: ':dept3',
                name: 'RouteView()3',
                element: RouteView(),
                meta: { loginCheck: true, authCheck: true },
                children: [
                  {
                    path: ':dept4',
                    name: 'RouteView()4',
                    element: RouteView(),
                    meta: { loginCheck: true, authCheck: true }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  // error Page
  { path: '/error', element: ErrorView() },
  {
    path: '/*',
    element: NotFoundView(),
    meta: { loginCheck: false, authCheck: false, layout: 'HeaderAndNoMenuLayout' }
  }
])
export default router

// 이동 때 마다 Navigation Guard

// 로그인 체크
// 권한 체크
