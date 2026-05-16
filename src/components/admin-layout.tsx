import { AdminSidebar } from "./app-sidebar";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-[240px_1fr]">
      <AdminSidebar />
      <main className="bg-[#F4F2EC]">
        <div className="max-w-[1280px] px-12 py-9">{children}</div>
      </main>
    </div>
  );
}
