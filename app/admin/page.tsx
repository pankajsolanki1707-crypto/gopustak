'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  ShoppingBag,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  PlusCircle,
  Edit,
  Trash2,
  LogOut,
  UploadCloud,
  FileUp,
  Image as ImageIcon,
  X,
} from 'lucide-react';

interface AdminProduct {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  shortDescription: string;
  longDescription: string;
  coverImage: string;
  pdfFileName: string;
  language: string;
  format: string;
  pageCount?: string | null;
  edition: string;
  priceInPaise: number;
  mrpInPaise: number;
  category: string;
  displayOrder: number;
  published: boolean;
  highlights: string[];
}

interface AdminOrder {
  id: string;
  orderRef: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  productTitle: string;
  amountInPaise: number;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('');

  // Upload States
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

  const addCoverInputRef = useRef<HTMLInputElement>(null);
  const addPdfInputRef = useRef<HTMLInputElement>(null);
  const editCoverInputRef = useRef<HTMLInputElement>(null);
  const editPdfInputRef = useRef<HTMLInputElement>(null);

  // Edit Product State
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<{
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    shortDescription: string;
    longDescription: string;
    coverImage: string;
    pdfFileName: string;
    language: string;
    edition: string;
    pageCount: string;
    priceInRs: number | string;
    mrpInRs: number | string;
    published: boolean;
  }>({
    id: '',
    slug: '',
    title: '',
    subtitle: '',
    shortDescription: '',
    longDescription: '',
    coverImage: '',
    pdfFileName: '',
    language: 'English',
    edition: '2026 Edition',
    pageCount: '',
    priceInRs: 99,
    mrpInRs: 299,
    published: true,
  });

  // Add Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProductData, setNewProductData] = useState<{
    title: string;
    subtitle: string;
    slug: string;
    priceInRs: number | string;
    mrpInRs: number | string;
    language: string;
    edition: string;
    pageCount: string;
    shortDescription: string;
    longDescription: string;
    coverImage: string;
    pdfFileName: string;
    category: string;
    published: boolean;
  }>({
    title: '',
    subtitle: '',
    slug: '',
    priceInRs: 99,
    mrpInRs: 299,
    language: 'English',
    edition: '2026 Edition',
    pageCount: '250+ Pages (PDF)',
    shortDescription: '',
    longDescription: '',
    coverImage: '/covers/cover-product-2.png',
    pdfFileName: 'EP_GUIDE_ENG.pdf',
    category: 'UPSC EPFO / APFC',
    published: true,
  });

  // Check persistent session on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAuth = sessionStorage.getItem('gopustak_admin_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
        loadData();
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput.trim(),
          password: passwordInput.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('gopustak_admin_auth', 'true');
        }
        loadData();
      } else {
        setAuthError(data.error || 'Invalid credentials. Please verify your email and password.');
      }
    } catch (err: any) {
      setAuthError('Connection error. Please verify network and try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('gopustak_admin_auth');
    }
    setEmailInput('');
    setPasswordInput('');
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Upload handler for cover images & PDF ebooks from local computer
  const handleFileUpload = async (file: File, type: 'cover' | 'pdf', isEditing = false) => {
    if (!file) return;
    if (type === 'cover') setIsUploadingCover(true);
    if (type === 'pdf') setIsUploadingPdf(true);
    setUploadFeedback(`Uploading ${file.name}...`);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setUploadFeedback(`✓ ${file.name} uploaded successfully!`);
        if (type === 'cover') {
          if (isEditing) {
            setEditFormData((prev) => ({ ...prev, coverImage: data.url }));
          } else {
            setNewProductData((prev) => ({ ...prev, coverImage: data.url }));
          }
        } else if (type === 'pdf') {
          if (isEditing) {
            setEditFormData((prev) => ({ ...prev, pdfFileName: data.filename }));
          } else {
            setNewProductData((prev) => ({ ...prev, pdfFileName: data.filename }));
          }
        }
      } else {
        setUploadFeedback(`Upload error: ${data.error}`);
      }
    } catch (err: any) {
      setUploadFeedback(`Upload failed: ${err.message}`);
    } finally {
      setIsUploadingCover(false);
      setIsUploadingPdf(false);
    }
  };

  const startEdit = (product: AdminProduct) => {
    setEditProductId(product.id);
    setEditFormData({
      id: product.id,
      slug: product.slug,
      title: product.title,
      subtitle: product.subtitle || '',
      shortDescription: product.shortDescription,
      longDescription: product.longDescription,
      coverImage: product.coverImage,
      pdfFileName: product.pdfFileName,
      language: product.language,
      edition: product.edition,
      pageCount: product.pageCount || '',
      priceInRs: Math.round(product.priceInPaise / 100),
      mrpInRs: Math.round(product.mrpInPaise / 100),
      published: product.published !== false,
    });
    setSaveStatus('');
    setUploadFeedback(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('Saving changes to database...');

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editFormData.id,
          slug: editFormData.slug,
          title: editFormData.title,
          subtitle: editFormData.subtitle,
          shortDescription: editFormData.shortDescription,
          longDescription: editFormData.longDescription,
          coverImage: editFormData.coverImage,
          pdfFileName: editFormData.pdfFileName,
          language: editFormData.language,
          edition: editFormData.edition,
          pageCount: editFormData.pageCount,
          priceInPaise: Math.round(Number(editFormData.priceInRs) * 100),
          mrpInPaise: Math.round(Number(editFormData.mrpInRs) * 100),
          published: Boolean(editFormData.published),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSaveStatus(`✓ Saved successfully! Price updated to ₹${editFormData.priceInRs} (MRP: ₹${editFormData.mrpInRs})`);
        setEditProductId(null);
        await loadData();
      } else {
        setSaveStatus(`Error saving: ${data.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      setSaveStatus(`Save failed: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (productId: string, productTitle: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove "${productTitle}" from the database?`);
    if (!confirmDelete) return;

    setSaveStatus('Removing product...');
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          id: productId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSaveStatus(`✓ Removed "${productTitle}" successfully.`);
        await loadData();
      } else {
        setSaveStatus(`Delete error: ${data.error}`);
      }
    } catch (err: any) {
      setSaveStatus(`Delete failed: ${err.message}`);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus('Creating new ebook in database...');

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          title: newProductData.title,
          subtitle: newProductData.subtitle,
          slug: newProductData.slug || newProductData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          priceInPaise: Math.round(Number(newProductData.priceInRs) * 100),
          mrpInPaise: Math.round(Number(newProductData.mrpInRs) * 100),
          language: newProductData.language,
          edition: newProductData.edition,
          pageCount: newProductData.pageCount,
          shortDescription: newProductData.shortDescription,
          longDescription: newProductData.longDescription || newProductData.shortDescription,
          coverImage: newProductData.coverImage,
          pdfFileName: newProductData.pdfFileName,
          category: newProductData.category,
          published: Boolean(newProductData.published),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSaveStatus(`✓ Created "${newProductData.title}" successfully!`);
        setIsAddModalOpen(false);
        setNewProductData({
          title: '',
          subtitle: '',
          slug: '',
          priceInRs: 99,
          mrpInRs: 299,
          language: 'English',
          edition: '2026 Edition',
          pageCount: '250+ Pages (PDF)',
          shortDescription: '',
          longDescription: '',
          coverImage: '/covers/cover-product-2.png',
          pdfFileName: 'EP_GUIDE_ENG.pdf',
          category: 'UPSC EPFO / APFC',
          published: true,
        });
        await loadData();
      } else {
        setSaveStatus(`Error adding product: ${data.error}`);
      }
    } catch (err: any) {
      setSaveStatus(`Add product failed: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-950 text-white">
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl max-w-sm w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="h-16 w-16 rounded-2xl overflow-hidden bg-white p-1 shadow-lg border border-slate-700 flex items-center justify-center mx-auto">
              <img src="/images/logo.png" alt="GOPUSTAK.IN" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl font-extrabold text-white">Admin Control Panel</h1>
            <p className="text-xs text-slate-400">
              Manage product pricing, catalog & orders
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 rounded-xl bg-red-500/10 text-red-400 text-xs border border-red-500/20">
                {authError}
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Email / Username
              </label>
              <input
                type="text"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter email or username"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder-slate-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {isLoggingIn ? 'Verifying...' : 'Unlock Admin Panel'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div className="flex items-center space-x-3.5">
            <div className="h-12 w-12 rounded-2xl overflow-hidden bg-white p-1 shadow flex items-center justify-center shrink-0 border border-slate-700">
              <img src="/images/logo.png" alt="GoPustak" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                <span>GoPustak Admin Panel</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-semibold">
                  Live Production
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage live catalog pricing, upload covers/PDFs, and monitor customer orders
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all active:scale-95 whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4" />
              Add New Ebook
            </button>

            <button
              onClick={loadData}
              disabled={isLoading}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-red-500/20 hover:text-red-300 text-slate-300 border border-slate-700 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Global Action Status Banner */}
        {saveStatus && (
          <div
            className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 border shadow-lg animate-in fade-in duration-200 ${
              saveStatus.includes('✓')
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-950/80 text-amber-300 border-amber-500/30'
            }`}
          >
            {saveStatus.includes('✓') ? <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" /> : <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />}
            <span>{saveStatus}</span>
          </div>
        )}

        {/* Upload Feedback Banner */}
        {uploadFeedback && (
          <div className="p-3.5 rounded-xl bg-slate-900 border border-sky-500/30 text-sky-300 text-xs font-medium flex items-center justify-between">
            <span>{uploadFeedback}</span>
            <button onClick={() => setUploadFeedback(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Products Management List */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Ebook Catalog & Pricing</span>
                <span className="text-xs bg-slate-800 text-amber-400 px-2.5 py-0.5 rounded-full font-mono">
                  {products.length} Products
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Edit prices, change book metadata, or upload new book covers and PDFs directly from your computer
              </p>
            </div>
            <Link
              href="/"
              target="_blank"
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              View Live Website →
            </Link>
          </div>

          <div className="space-y-4">
            {products.map((product) => {
              const isEditing = editProductId === product.id;
              const priceInRs = Math.round(product.priceInPaise / 100);
              const mrpInRs = Math.round(product.mrpInPaise / 100);

              if (isEditing) {
                return (
                  <div
                    key={product.id}
                    className="p-6 rounded-2xl bg-slate-950 border-2 border-amber-500/50 shadow-xl space-y-5 animate-in fade-in duration-200"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                        <Edit className="w-4 h-4" />
                        <span>Editing: {product.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditProductId(null)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={isSaving}
                          className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow active:scale-95"
                        >
                          <Save className="w-3.5 h-3.5" />
                          {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Product Title
                        </label>
                        <input
                          type="text"
                          value={editFormData.title}
                          onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                          className="w-full p-2.5 text-xs rounded-xl border border-slate-700 bg-slate-900 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Subtitle
                        </label>
                        <input
                          type="text"
                          value={editFormData.subtitle}
                          onChange={(e) => setEditFormData({ ...editFormData, subtitle: e.target.value })}
                          className="w-full p-2.5 text-xs rounded-xl border border-slate-700 bg-slate-900 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Selling Price (₹)
                        </label>
                        <input
                          type="number"
                          value={editFormData.priceInRs}
                          onChange={(e) => setEditFormData({ ...editFormData, priceInRs: e.target.value })}
                          className="w-full p-2.5 text-xs rounded-xl border border-slate-700 bg-slate-900 text-white font-bold text-amber-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          MRP (₹)
                        </label>
                        <input
                          type="number"
                          value={editFormData.mrpInRs}
                          onChange={(e) => setEditFormData({ ...editFormData, mrpInRs: e.target.value })}
                          className="w-full p-2.5 text-xs rounded-xl border border-slate-700 bg-slate-900 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Edition
                        </label>
                        <input
                          type="text"
                          value={editFormData.edition}
                          onChange={(e) => setEditFormData({ ...editFormData, edition: e.target.value })}
                          className="w-full p-2.5 text-xs rounded-xl border border-slate-700 bg-slate-900 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Short Description
                      </label>
                      <textarea
                        rows={2}
                        value={editFormData.shortDescription}
                        onChange={(e) => setEditFormData({ ...editFormData, shortDescription: e.target.value })}
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-700 bg-slate-900 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    {/* Local File Upload Section for Edit Mode */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                      {/* Cover Upload */}
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                            <span>Book Cover Image</span>
                          </label>
                          <span className="text-[10px] text-slate-500 font-mono line-clamp-1 max-w-[140px]">
                            {editFormData.coverImage}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          {editFormData.coverImage && (
                            <img
                              src={editFormData.coverImage}
                              alt="Cover preview"
                              className="w-12 h-16 object-cover rounded border border-slate-700 shrink-0"
                            />
                          )}
                          <div className="flex-1 space-y-1.5">
                            <input
                              type="file"
                              ref={editCoverInputRef}
                              accept="image/png,image/jpeg,image/webp"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(file, 'cover', true);
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => editCoverInputRef.current?.click()}
                              disabled={isUploadingCover}
                              className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5"
                            >
                              <UploadCloud className="w-3.5 h-3.5 text-amber-400" />
                              <span>{isUploadingCover ? 'Uploading Cover...' : 'Upload New Cover from PC'}</span>
                            </button>
                            <input
                              type="text"
                              value={editFormData.coverImage}
                              onChange={(e) => setEditFormData({ ...editFormData, coverImage: e.target.value })}
                              placeholder="/covers/cover-product-1.png"
                              className="w-full p-1.5 text-[11px] rounded border border-slate-700 bg-slate-950 text-slate-300 font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      {/* PDF Upload */}
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                            <FileUp className="w-3.5 h-3.5 text-sky-400" />
                            <span>Private PDF Ebook</span>
                          </label>
                          <span className="text-[10px] text-slate-500 font-mono line-clamp-1 max-w-[140px]">
                            {editFormData.pdfFileName}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <input
                            type="file"
                            ref={editPdfInputRef}
                            accept="application/pdf"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(file, 'pdf', true);
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => editPdfInputRef.current?.click()}
                            disabled={isUploadingPdf}
                            className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5"
                          >
                            <FileUp className="w-3.5 h-3.5 text-sky-400" />
                            <span>{isUploadingPdf ? 'Uploading PDF...' : 'Upload New PDF Ebook from PC'}</span>
                          </button>
                          <input
                            type="text"
                            value={editFormData.pdfFileName}
                            onChange={(e) => setEditFormData({ ...editFormData, pdfFileName: e.target.value })}
                            placeholder="EP_GUIDE_ENG.pdf"
                            className="w-full p-1.5 text-[11px] rounded border border-slate-700 bg-slate-950 text-slate-300 font-mono"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                );
              }

              return (
                <div
                  key={product.id}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={product.coverImage}
                      alt={product.title}
                      className="w-16 h-22 object-cover rounded-lg border border-slate-700 shadow shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                          {product.edition}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {product.language} • {product.pageCount || 'Full Ebook'}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white leading-snug">
                        {product.title}
                      </h3>
                      {product.subtitle && (
                        <p className="text-xs font-semibold text-amber-500">
                          {product.subtitle}
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono pt-1">
                        <span>PDF: <strong className="text-slate-400">{product.pdfFileName}</strong></span>
                        <span>•</span>
                        <span>Slug: <strong className="text-slate-400">/{product.slug}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                    <div className="text-right">
                      <div className="text-xl font-black text-amber-400">₹{priceInRs}</div>
                      <div className="text-xs text-slate-500 line-through">MRP: ₹{mrpInRs}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(product)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all active:scale-95"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(product.id, product.title)}
                        title="Remove Product"
                        className="p-2.5 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white">
              Recent Customer Orders & Entitlements ({orders.length})
            </h2>
          </div>

          {orders.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">
              No orders recorded yet. As customers buy books, their transactions and verified payment logs will appear here.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-3">Order Ref</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Ebook</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-white">{o.orderRef}</td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-white">{o.customerName}</div>
                        <div className="text-slate-400 text-[10px]">{o.customerEmail}</div>
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-300 line-clamp-1">{o.productTitle}</td>
                      <td className="py-3 px-3 font-bold text-amber-400">₹{Math.round(o.amountInPaise / 100)}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            o.status === 'PAID'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-400">{new Date(o.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* Add New Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto preview-modal-bg flex items-center justify-center p-4">
          <div className="relative bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Add New Ebook to Storefront</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Book Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. UPSC EPFO Special Subjects"
                    value={newProductData.title}
                    onChange={(e) => setNewProductData({ ...newProductData, title: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Complete Study Notes & Practice"
                    value={newProductData.subtitle}
                    onChange={(e) => setNewProductData({ ...newProductData, subtitle: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    URL Slug <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. upsc-epfo-mock-tests"
                    value={newProductData.slug}
                    onChange={(e) => setNewProductData({ ...newProductData, slug: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Selling Price (₹) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={newProductData.priceInRs}
                    onChange={(e) => setNewProductData({ ...newProductData, priceInRs: Number(e.target.value) })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white font-bold text-amber-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    MRP (₹) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={newProductData.mrpInRs}
                    onChange={(e) => setNewProductData({ ...newProductData, mrpInRs: Number(e.target.value) })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Language
                  </label>
                  <input
                    type="text"
                    value={newProductData.language}
                    onChange={(e) => setNewProductData({ ...newProductData, language: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Edition
                  </label>
                  <input
                    type="text"
                    value={newProductData.edition}
                    onChange={(e) => setNewProductData({ ...newProductData, edition: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Page Count / Format
                  </label>
                  <input
                    type="text"
                    value={newProductData.pageCount}
                    onChange={(e) => setNewProductData({ ...newProductData, pageCount: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Short Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Summary of what the ebook covers..."
                  value={newProductData.shortDescription}
                  onChange={(e) => setNewProductData({ ...newProductData, shortDescription: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* Local File Upload Section for Add Ebook Modal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                {/* Cover Image Upload from Computer */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>Book Cover Image</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    {newProductData.coverImage && (
                      <img
                        src={newProductData.coverImage}
                        alt="Cover preview"
                        className="w-12 h-16 object-cover rounded border border-slate-700 shrink-0"
                      />
                    )}
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="file"
                        ref={addCoverInputRef}
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, 'cover', false);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => addCoverInputRef.current?.click()}
                        disabled={isUploadingCover}
                        className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5"
                      >
                        <UploadCloud className="w-3.5 h-3.5 text-amber-400" />
                        <span>{isUploadingCover ? 'Uploading Cover...' : 'Choose Image from PC'}</span>
                      </button>
                      <input
                        type="text"
                        value={newProductData.coverImage}
                        onChange={(e) => setNewProductData({ ...newProductData, coverImage: e.target.value })}
                        placeholder="/covers/cover-product-2.png"
                        className="w-full p-1.5 text-[11px] rounded border border-slate-700 bg-slate-900 text-slate-300 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* PDF Ebook Upload from Computer */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <FileUp className="w-3.5 h-3.5 text-sky-400" />
                      <span>Private PDF Ebook File</span>
                    </label>
                  </div>

                  <div className="space-y-1.5">
                    <input
                      type="file"
                      ref={addPdfInputRef}
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'pdf', false);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => addPdfInputRef.current?.click()}
                      disabled={isUploadingPdf}
                      className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5"
                    >
                      <FileUp className="w-3.5 h-3.5 text-sky-400" />
                      <span>{isUploadingPdf ? 'Uploading PDF...' : 'Choose PDF from PC'}</span>
                    </button>
                    <input
                      type="text"
                      value={newProductData.pdfFileName}
                      onChange={(e) => setNewProductData({ ...newProductData, pdfFileName: e.target.value })}
                      placeholder="EP_GUIDE_ENG.pdf"
                      className="w-full p-1.5 text-[11px] rounded border border-slate-700 bg-slate-900 text-slate-300 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md active:scale-95 disabled:opacity-70"
                >
                  {isSaving ? 'Creating...' : 'Save & Publish Ebook'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
