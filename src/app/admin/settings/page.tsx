import { prisma } from '@/lib/prisma'
import SettingsForm from './SettingsForm'

export default async function SettingsPage() {
  const eventSetting = await prisma.eventSetting.findFirst()

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Pengaturan Acara</h2>
      <p className="text-gray-500">Ubah informasi acara, lokasi, waktu, dan warna tema website.</p>
      
      <SettingsForm initialData={eventSetting} />
    </div>
  )
}
