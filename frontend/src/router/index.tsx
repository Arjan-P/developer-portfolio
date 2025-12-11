import {createBrowserRouter} from "react-router-dom"
import App from '../App'
import Home from '../pages/Home'
import Posts from "../pages/Posts" 
import Login from "../pages/Login"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path:"", element: <Home />},
      {path:"posts/:id", element: <Posts />},
      {path:"admin", element: <Login />}
    ],
  },
])
