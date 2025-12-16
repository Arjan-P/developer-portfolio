import {createBrowserRouter} from "react-router-dom"
import App from '../App'
import Home from '../pages/Home'
import Blog from '../pages/Blog'
import BlogHome from "../pages/BlogHome"
import Posts from "../pages/Posts" 
import Login from "../pages/Login"
import ProtectedRotue from "../components/ProtectedRoute"
import AdminLayout from "../pages/admin/AdminLayout"
import Dashboard from "../pages/admin/Dashboard"
import AddPost from "../pages/admin/AddPost"
import EditPost from "../pages/admin/EditPost"


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "blog",
        element: <Blog />,
        children: [
          { path: "", element: <BlogHome />},
          { path: "posts/:id", element: <Posts /> },
        ],
      },
      { path: "login", element: <Login /> },
      {
        path: "admin",
        element: (
          <ProtectedRotue>
            <AdminLayout />
          </ProtectedRotue>
        ),
        children: [
          {path: "", element: <Dashboard />},
          {path: "add", element: <AddPost />},
          {path: "edit/:id", element: <EditPost />}
        ]
     },
    ],
  },
]);
