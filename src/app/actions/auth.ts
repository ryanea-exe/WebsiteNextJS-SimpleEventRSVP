'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(prevState: any, formData: FormData) {
  const password = formData.get('password') as string
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!password) {
    return { success: false, error: 'Password wajib diisi.' }
  }

  if (password === adminPassword) {
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day
    })
    
    redirect('/admin')
  } else {
    return { success: false, error: 'Password salah!' }
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  redirect('/login')
}
