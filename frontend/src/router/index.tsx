import { PageTransition } from "@/components/PageTransition";
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
        index: true,
        element: (
          <PageTransition>
            <HomePage />
          </PageTransition>
        )
      },
      {
        path: "blog",
        element: (
          <PageTransition>
            <BlogPage />
          </PageTransition>
        )
      },
      {
        path: "blog/:id",
        element: (
          <PageTransition>
            <PostPage />
          </PageTransition>
        )
      }
    ]
  }
]);
