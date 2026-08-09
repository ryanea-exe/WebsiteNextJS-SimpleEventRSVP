import Link from 'next/link'
import { ReactNode } from 'react'
import { logoutAction } from '@/app/actions/auth'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
            Daftar Tamu
          </Link>
          <Link href="/admin/settings" className="block px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
            Pengaturan Acara
          </Link>
          <div className="pt-4 mt-4 border-t border-gray-100">
            <Link href="/" className="block px-4 py-2 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50">
              Lihat Website
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="w-full text-left block px-4 py-2 mt-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50">
                Logout
              </button>
            </form>
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
