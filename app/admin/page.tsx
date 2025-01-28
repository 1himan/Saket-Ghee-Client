"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Users,
  ShoppingBag,
  Package,
  Home,
  Bell,
} from "lucide-react";
import axios from "axios";
import Link from "next/link";

interface Statistics {
  totalSales?: number;
  totalOrders?: number;
  activeCustomers?: number;
  pendingDeliveries?: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface Order {
  id: number;
  customer: string;
  status: string;
  total: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === "dashboard" && <DashboardPage />}
        {activeTab === "products" && <ProductManagementPage />}
        {activeTab === "orders" && <OrderManagementPage />}
        {activeTab === "customers" && <UserManagementPage />}
        {activeTab === "inventory" && <InventoryManagementPage />}
      </div>
    </div>
  );
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-64 bg-white">
      <div className="p-4 flex items-center space-x-2">
        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
          <Home size={20} />
          <h2 className="text-xl font-bold">
            <Link href={"/"}>Go back to home</Link>{" "}
          </h2>
        </button>
      </div>
      <nav className="p-4">
        <SidebarLink
          icon={<BarChart />}
          label="Dashboard"
          active={activeTab === "dashboard"}
          onClick={() => setActiveTab("dashboard")}
        />
        <SidebarLink
          icon={<ShoppingBag />}
          label="Orders"
          active={activeTab === "orders"}
          onClick={() => setActiveTab("orders")}
        />
        <SidebarLink
          icon={<Package />}
          label="Products"
          active={activeTab === "products"}
          onClick={() => setActiveTab("products")}
        />
        <SidebarLink
          icon={<Users />}
          label="Customers"
          active={activeTab === "customers"}
          onClick={() => setActiveTab("customers")}
        />
        <SidebarLink
          icon={<Bell />}
          label="Inventory"
          active={activeTab === "inventory"}
          onClick={() => setActiveTab("inventory")}
        />
      </nav>
    </div>
  );
}

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function SidebarLink({ icon, label, active, onClick }: SidebarLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg mb-1 ${
        active ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// Dashboard Page
function DashboardPage() {
  const [statistics, setStatistics] = useState<Statistics>({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/statistics").then((response) => {
      setStatistics(response.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <StatCard title="Total Sales" value={statistics.totalSales} />
        <StatCard title="Total Orders" value={statistics.totalOrders} />
        <StatCard title="Active Customers" value={statistics.activeCustomers} />
        <StatCard
          title="Pending Deliveries"
          value={statistics.pendingDeliveries}
        />
      </div>
    </div>
  );
}

// Product Management Page
function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Product Management</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Add Product
      </button>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-sm border"
          >
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p>{product.description}</p>
            <p className="font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Order Management Page
function OrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Order Management</h1>
      <div className="mt-6">
        <table className="w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.status}</td>
                <td>${order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// User Management Page
function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">User Management</h1>
      <div className="mt-6">
        <ul>
          {users.map((user) => (
            <li key={user.id} className="border-b py-2">
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Inventory Management Page
function InventoryManagementPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/inventory").then((response) => {
      setInventory(response.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Inventory Management</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-sm border"
          >
            <h2 className="font-semibold text-lg">{item.name}</h2>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Utility Component: Stat Card
interface StatCardProps {
  title: string;
  value?: number;
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}

export default AdminDashboard;
