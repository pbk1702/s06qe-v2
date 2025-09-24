import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router'

import Layout from '@/page/Layout';
import Main from '@/page/Main.jsx'
import About from '@/page/About.jsx'
import Services from './page/Services.jsx'
import Calc from './page/Calc.jsx'
import Contacts from './page/Contacts.jsx'
import Gallery from './page/Gallery.jsx'
import Blog from './page/Blog.jsx'
import Post from './page/Post.jsx'

const routes = [{
  path: "/",
  Component: Layout,
  children: [
    { index: true, Component: Main },
    { path: "about", Component: About },    
    { path: "services", Component: Services },    
    { path: "calc", Component: Calc },    
    { path: "contacts", Component: Contacts },    
    { path: "gallery", Component: Gallery },    
    { path: "blog", Component: Blog },
    { path: "posts/:id", Component: Post }    
  ]
}]
const router = createBrowserRouter( routes )

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={ router } />
  </StrictMode>,
)
