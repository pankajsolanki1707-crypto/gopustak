'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Edit,
  Save,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Eye,
  DollarSign,
  Package,
  Layers,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { ProductItem } from '@/components/ThreeBooksSection';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<any>({});
  const [saveStatus, setSaveStatus] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      emailInput.trim().toLowerCase() === 'gopustak@outlook.com' &&
      passwordInput === 'Pan@#17sol'
    ) {
      setIsAuthenticated(true);
      setAuthError('');
      loadData();
    } else {
      setAuthError('Invalid admin email or password.');
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (product: ProductItem) => {
    setEditProductId(product.id);
    setEditFormData({
      id: product.id,
      title: product.title,
      subtitle: product.subtitle || '',
      shortDescription: product.shortDescription,
      longDescription: product.longDescription,
      priceInRs: Math.round(product.priceInPaise / 100),
      mrpInRs: Math.round(product.mrpInPaise / 100),
      published: product.published !== false,
    });
    setSaveStatus('');
  };

  const handleSave = async () => {
    setSaveStatus('Saving changes...');
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editFormData.id,
          title: editFormData.title,
          subtitle: editFormData.subtitle,
          shortDescription: editFormData.shortDescription,
          longDescription: editFormData.longDescription,
          priceInPaise: Number(editFormData.priceInRs) * 100,
          mrpInPaise: Number(editFormData.mrpInRs) * 100,
          published: Boolean(editFormData.published),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSaveStatus('Changes saved successfully!');
        setEditProductId(null);
        loadData();
      } else {
        setSaveStatus(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setSaveStatus(`Save failed: ${err.message}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-100">
        <div className="bg-white p-8 rounded-2xl border border-slate-300 shadow-xl max-w-sm w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="h-16 w-16 rounded-2xl overflow-hidden bg-white p-1 shadow-md border border-slate-200 flex items-center justify-center mx-auto">
              <img src="/images/logo.png" alt="GOPUSTAK.IN" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Admin Control Panel</h1>
            <p className="text-xs text-slate-500">
              Manage product pricing, metadata & database products
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
                {authError}
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter admin email"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg text-sm font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow"
            >
              Sign In to Admin
            </button>
            <div className="text-center pt-2">
              <Link href="/" className="text-xs text-slate-500 hover:text-slate-800">
                ← Back to Storefront
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/" className="text-xs text-slate-500 hover:text-slate-800">
                ← Return to Storefront
              </Link>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              GoPustak Admin Dashboard
            </h1>
            <p className="text-xs text-slate-500">
              Database Product Management & Order Tracking
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>
        </div>

        {saveStatus && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm font-medium">
            {saveStatus}
          </div>
        )}

        {/* 3 Ebooks List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Active Ebooks in Database ({products.length} Products)
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Category: UPSC EPFO / APFC
            </span>
          </div>

          <div className="space-y-6">
            {products.map((product) => {
              const isEditing = editProductId === product.id;
              const priceInRs = Math.round(product.priceInPaise / 100);
              const mrpInRs = Math.round(product.mrpInPaise / 100);

              if (isEditing) {
                return (
                  <div key={product.id} className="p-6 rounded-2xl bg-amber-50/50 border-2 border-amber-400 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-800 uppercase">
                        Editing: {product.slug}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleSave}
                          className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow"
                        >
                          <Save className="w-3.5 h-3.5" /> Save Changes
                        </button>
                        <button
                          onClick={() => setEditProductId(null)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 text-slate-700 hover:bg-slate-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Product Title
                        </label>
                        <input
                          type="text"
                          value={editFormData.title}
                          onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                          className="w-full p-2 text-xs rounded border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Subtitle
                        </label>
                        <input
                          type="text"
                          value={editFormData.subtitle}
                          onChange={(e) => setEditFormData({ ...editFormData, subtitle: e.target.value })}
                          className="w-full p-2 text-xs rounded border border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Selling Price (₹)
                        </label>
                        <input
                          type="number"
                          value={editFormData.priceInRs}
                          onChange={(e) => setEditFormData({ ...editFormData, priceInRs: e.target.value })}
                          className="w-full p-2 text-xs rounded border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          MRP (₹)
                        </label>
                        <input
                          type="number"
                          value={editFormData.mrpInRs}
                          onChange={(e) => setEditFormData({ ...editFormData, mrpInRs: e.target.value })}
                          className="w-full p-2 text-xs rounded border border-slate-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Short Description
                      </label>
                      <textarea
                        rows={2}
                        value={editFormData.shortDescription}
                        onChange={(e) => setEditFormData({ ...editFormData, shortDescription: e.target.value })}
                        className="w-full p-2 text-xs rounded border border-slate-300"
                      />
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={product.id}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={product.coverImage}
                      alt={product.title}
                      className="w-16 h-22 object-cover rounded border border-slate-300 shadow shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                          {product.edition}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {product.language} • {product.pageCount || 'PDF'}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">
                        {product.title}
                      </h3>
                      {product.subtitle && (
                        <p className="text-xs text-amber-700 font-medium">{product.subtitle}</p>
                      )}
                      <p className="text-xs text-slate-600 line-clamp-2 max-w-xl">
                        {product.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                      <div className="text-lg font-black text-slate-900">₹{priceInRs}</div>
                      <div className="text-xs text-slate-400 line-through">MRP: ₹{mrpInRs}</div>
                    </div>

                    <button
                      onClick={() => startEdit(product)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow transition-all"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Edit Price & Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Recent Customer Orders & Entitlements ({orders.length})
            </h2>
          </div>

          {orders.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">
              No orders recorded yet. As customers buy books, their transactions and verified payment logs will appear here.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                    <th className="py-2.5 px-3">Order Ref</th>
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Ebook</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{o.orderRef}</td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-slate-900">{o.customerName}</div>
                        <div className="text-slate-400 text-[10px]">{o.customerEmail}</div>
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-800 line-clamp-1">{o.productTitle}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">₹{Math.round(o.amountInPaise / 100)}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            o.status === 'PAID'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">{new Date(o.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
