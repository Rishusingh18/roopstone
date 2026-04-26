// src/app/admin/dashboard/page.tsx

import { LeadService } from '@/modules/leads/LeadService';
import { ThemeService } from '@/modules/themes/ThemeService';
import { 
  Users, 
  MousePointerClick, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';

const leadService = new LeadService();
const themeService = new ThemeService();

export default async function DashboardPage() {
  // Fetch high-level stats (In real app, move to a DashboardService)
  const { total: totalLeads } = await leadService.listLeads({ limit: 1 });
  const activeTheme = await themeService.getActiveTheme();

  const stats = [
    { 
      label: 'Total Leads', 
      value: totalLeads, 
      icon: Users, 
      color: 'bg-blue-50 text-blue-600',
      description: '+12% from last week' 
    },
    { 
      label: 'Avg. Estimate', 
      value: '₹4.2L', 
      icon: MousePointerClick, 
      color: 'bg-emerald-50 text-emerald-600',
      description: 'Indicative pricing accuracy' 
    },
    { 
      label: 'Active Campaign', 
      value: activeTheme?.name || 'Default', 
      icon: Sparkles, 
      color: 'bg-purple-50 text-purple-600',
      description: activeTheme ? 'Running scheduled' : 'Standard branding'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center space-x-4 p-4 rounded-xl border border-[#F3F4F6] bg-white shadow-sm transition-hover hover:shadow-md">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-[#6B7280]">{stat.label}</p>
              <h3 className="text-2xl font-bold text-[#111827]">{stat.value}</h3>
              <p className="text-xs text-[#10B981] mt-1 font-medium">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Recent Leads & Quick Actions */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#111827]">Recent Inquiries</h2>
            <button className="text-sm font-medium text-[#7E22CE] hover:underline flex items-center">
              View All <ArrowUpRight className="ml-1 w-4 h-4" />
            </button>
          </div>
          <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white divide-y divide-[#F3F4F6]">
            {/* Placeholder for list - will be dynamically populated later */}
            <div className="p-12 text-center text-[#9CA3AF]">
              <p>Dynamic lead activity stream will appear here.</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#111827]">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: 'Upload New Product', href: '/admin/products/new' },
              { label: 'Update Estimated Pricing', href: '/admin/estimator' },
              { label: 'Create Campaign Sidebar', href: '/admin/themes/new' },
            ].map((action) => (
              <button 
                key={action.label}
                className="w-full text-left px-4 py-3 rounded-lg border border-[#E5E7EB] hover:border-[#D8B4FE] hover:bg-[#FDFCFE] transition-all group"
              >
                <p className="text-sm font-medium text-[#4B5563] group-hover:text-[#7E22CE]">
                  {action.label}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
