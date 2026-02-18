import WebGPUBackground from "@/components/WebGPUBackground";
import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <>
      <WebGPUBackground />
      <div className="content">
        <Outlet />
      </div>
    </>
  )
}
