import {createBrowserRouter} from "react-router-dom"
import App from '../App'
import Home from '../pages/Home'
import Posts from "../pages/Posts" 

export const router = createBrowserRouter([
  {
  path: "/",
  element: <App />,
  children: [
  {path:"", element:<Home />},
  {path:"posts/:id", element: <Posts />},
],},
])
