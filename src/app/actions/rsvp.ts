'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function submitRsvp(prevState: any, formData: FormData) {
  try {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const isAttending = formData.get('isAttending') === 'true'
    const message = formData.get('message') as string

    if (!name || !email) {
      return { success: false, error: 'Nama dan Email wajib diisi' }
    }

    await prisma.guest.create({
      data: {
        name,
        email,
        isAttending,
        message: message || undefined,
      }
    })

    revalidatePath('/admin')
    return { success: true, message: 'RSVP berhasil dikirim. Terima kasih!' }
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { success: false, error: 'Email ini sudah terdaftar. Anda sudah melakukan RSVP.' }
    }
    return { success: false, error: 'Terjadi kesalahan saat menyimpan data. Silakan coba lagi.' }
  }
}
