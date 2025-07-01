import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './Layout.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { Auth } from './pages/Auth.jsx'
import { Link } from './pages/Link.jsx'
import RedirectLink from './pages/RedirectLink.jsx'
import Landing from './pages/Landing.jsx'
import UrlProvider from './Context.jsx'
import RequireAuth from './components/RequireAuth.jsx'

const router= createBrowserRouter(
  [
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path:'',
          element:<Landing/>
        },
        {
          path:'dashboard',
          element:<RequireAuth>
            <Dashboard/>
          </RequireAuth>
          
        },
        {
          path:'auth',
          element:<Auth/>
        },
        {
          path:'link/:id',
          element:<RequireAuth>
            <Link/>
          </RequireAuth>
          
          
        },
        {
          path:':id',
          element:<RedirectLink/>
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UrlProvider>
       <RouterProvider router={router}/>
    </UrlProvider>
   
  </StrictMode>,
)
