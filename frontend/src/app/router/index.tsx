import { createBrowserRouter } from "react-router-dom";

import { PublicLayout } from "@/app/layouts/PublicLayout";
import { BlogPage } from "@/routes/BlogPage";
import { HomePage } from "@/routes/HomePage";
import { PostPage } from "@/routes/PostPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "blog/:id",
        element: <PostPage />,
      },
    ],
  },
]);
