import { AdminLayout } from "@/Layouts/AdminLayout";
import { PublicLayout } from "@/Layouts/PublicLayout";
import { AdminPage } from "@/pages/AdminPage";
import { BlogPage } from "@/pages/BlogPage";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {path: "home", element: <HomePage />},
      {path: "blog", element: <BlogPage />}
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/admin",
    element:
    // <ProtectedRoute>
      <AdminLayout>
        <AdminPage />
      </AdminLayout>
    // </ProtectedRoute>
  }
])
