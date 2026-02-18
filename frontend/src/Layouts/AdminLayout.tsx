import type { ReactNode } from "react";

export function AdminLayout({children}: {children: ReactNode}) {
  return (
    <div className="bg-background">
      {children}
    </div>
  )
}
