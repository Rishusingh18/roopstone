// src/app/admin/layout.tsx

import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen bg-[#F9FAFB]">
      {/* Sidebar - Fixed width */}
      <Sidebar user={session.user} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">
              Heritage Management
            </h1>
            <p className="text-sm text-[#6B7280]">
              Managing the legacy of Roop Stone Arts
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-[#111827]">
                {session.user?.name || 'Administrator'}
              </p>
              <p className="text-xs text-[#6B7280]">
                {session.user?.role?.replace('_', ' ').toUpperCase()}
              </p>
            </div>
          </div>
        </header>

        <section className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
          {children}
        </section>
      </main>
    </div>
  );
}
