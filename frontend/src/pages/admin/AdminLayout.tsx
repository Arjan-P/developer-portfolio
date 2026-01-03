import { useEffect } from "react"
import { Link, Outlet } from "react-router-dom"

export default function AdminLayout() {
  useEffect(() => {
    document.title = "Admin";
  }, []);
  return (
    <div>
      <h1>Admin Panel</h1>
      <nav>
        <Link to="/admin">Dashboard</Link> |{" "}
        <Link to="/admin/add">Add Article</Link>
      </nav>

      <hr/>

      <Outlet />
    </div>
  )
}
