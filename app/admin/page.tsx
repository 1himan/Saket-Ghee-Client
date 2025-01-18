'use client'

import React, { useState, ReactNode } from 'react'
import {
  BarChart,
  Users,
  ShoppingBag,
  Package,
  Settings,
  CreditCard,
  Bell,
} from 'lucide-react'

interface SidebarLinkProps {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard')

  // Dummy data
  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', status: 'Delivered', amount: '$129.99' },
    { id: '#ORD-002', customer: 'Jane Smith', status: 'Processing', amount: '$89.99' },
    { id: '#ORD-003', customer: 'Mike Johnson', status: 'Pending', amount: '$199.99' },
  ]

  const statistics = {
    totalSales: '$12,845',
    totalOrders: '284',
    activeCustomers: '1,421',
    pendingDeliveries: '38'
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="p-4">
          <SidebarLink 
            icon={<BarChart />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarLink 
            icon={<ShoppingBag />} 
            label="Orders" 
            active={activeTab === 'orders'} 
            onClick={() => setActiveTab('orders')} 
          />
          <SidebarLink 
            icon={<Package />} 
            label="Products" 
            active={activeTab === 'products'} 
            onClick={() => setActiveTab('products')} 
          />
          <SidebarLink 
            icon={<Users />} 
            label="Customers" 
            active={activeTab === 'customers'} 
            onClick={() => setActiveTab('customers')} 
          />
          <SidebarLink 
            icon={<Settings />} 
            label="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell size={20} />
              </button>
              <div className="flex items-center space-x-2">
                <img 
                  src="https://ui-avatars.com/api/?name=Admin+User" 
                  alt="Admin" 
                  className="w-8 h-8 rounded-full"
                />
                <span>Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard title="Total Sales" value={statistics.totalSales} icon={<CreditCard />} />
            <StatCard title="Total Orders" value={statistics.totalOrders} icon={<ShoppingBag />} />
            <StatCard title="Active Customers" value={statistics.activeCustomers} icon={<Users />} />
            <StatCard title="Pending Deliveries" value={statistics.pendingDeliveries} icon={<Package />} />
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
            </div>
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-4">Order ID</th>
                    <th className="pb-4">Customer</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-t">
                      <td className="py-4">{order.id}</td>
                      <td className="py-4">{order.customer}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// Sidebar Link Component
function SidebarLink({ icon, label, active, onClick }: SidebarLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg mb-1 ${
        active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

// Stat Card Component
function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="text-gray-400">{icon}</div>
      </div>
    </div>
  )
}
