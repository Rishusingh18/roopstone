// src/components/admin/Sidebar.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Users, 
  Settings2, 
  LayoutGrid, 
  FolderKanban, 
  Paintbrush, 
  LogOut,
  Gem
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: BarChart3 },
  { name: 'Leads', href: '/admin/leads', icon: Users },
  { name: 'Product Catalog', href: '/admin/products', icon: LayoutGrid },
  { name: 'Legacy Works', href: '/admin/projects', icon: FolderKanban },
  { name: 'Estimator Engine', href: '/admin/estimator', icon: Settings2, roles: ['super_admin'] },
  { name: 'Theme & Campaigns', href: '/admin/themes', icon: Paintbrush, roles: ['super_admin', 'marketing'] },
];

export default function Sidebar({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-[#E5E7EB] bg-white flex flex-col">
      <div className="p-6 border-b border-[#E5E7EB]">
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
          <Gem className="w-8 h-8 text-[#A855F7]" />
          <span className="text-xl font-bold tracking-tight text-[#111827]">
            R-S-A <span className="text-sm font-medium text-[#6B7280]">Admin</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          // Role check
          if (item.roles && !item.roles.includes(user?.role)) return null;

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                ? 'bg-[#F3E8FF] text-[#7E22CE]' 
                : 'text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827]'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-[#7E22CE]' : 'text-[#9CA3AF]'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#E5E7EB]">
        <button
          onClick={() => {/* TODO: NextAuth signOut */}}
          className="flex items-center w-full space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
