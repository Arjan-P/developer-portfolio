import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function BlogLayout() {
  useEffect(() => {
    document.title = "Blog";
  }, []);
  return <Outlet />
}
