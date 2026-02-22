import { PublicLayout } from "@/Layouts/PublicLayout";
import { BlogPage } from "@/pages/BlogPage";
import { HomePage } from "@/pages/HomePage";
import { PostPage } from "@/pages/PostPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index:true,
        element: (
          <HomePage />
        )
      },
      {
        path: "blog",
        element: (
          <BlogPage />
        )
      },
      {
        path: "blog/:id",
        element: (
          <PostPage />
        )
      }
    ]
  }
]);
