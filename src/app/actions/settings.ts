'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateSettings(prevState: any, formData: FormData) {
  try {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const eventDate = formData.get('eventDate') as string
    const location = formData.get('location') as string
    const themeColor = formData.get('themeColor') as string
    const coverImageUrl = formData.get('coverImageUrl') as string

    if (!title || !eventDate || !location) {
      return { success: false, error: 'Judul, Tanggal, dan Lokasi wajib diisi' }
    }

    const setting = await prisma.eventSetting.findFirst()
    
    if (setting) {
      await prisma.eventSetting.update({
        where: { id: setting.id },
        data: {
          title,
          description,
          eventDate: new Date(eventDate),
          location,
          themeColor: themeColor || '#000000',
          coverImageUrl: coverImageUrl || null,
        }
      })
    } else {
      await prisma.eventSetting.create({
        data: {
          title,
          description,
          eventDate: new Date(eventDate),
          location,
          themeColor: themeColor || '#000000',
          coverImageUrl: coverImageUrl || null,
        }
      })
    }

    // Revalidate paths so the changes reflect immediately
    revalidatePath('/')
    revalidatePath('/admin')
    revalidatePath('/admin/settings')
    
    return { success: true, message: 'Pengaturan acara berhasil diperbarui!' }
  } catch (error: any) {
    console.error('Error updating settings:', error)
    return { success: false, error: 'Terjadi kesalahan saat menyimpan pengaturan.' }
  }
}
