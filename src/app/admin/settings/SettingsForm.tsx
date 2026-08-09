'use client'

import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import { updateSettings } from '@/app/actions/settings'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { EventSetting } from '@prisma/client'

// Use a fallback for useActionState since React 18 / Next 14 handles it via useActionState
// or if it's older Next 14 it might be useFormState.
import { useFormState } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? 'Menyimpan...' : 'Simpan Pengaturan'}
    </Button>
  )
}

function formatDateForInput(date: Date | string | undefined | null) {
  if (!date) return ''
  const d = new Date(date)
  // Format for datetime-local: YYYY-MM-DDThh:mm
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export default function SettingsForm({ initialData }: { initialData: EventSetting | null }) {
  const [state, formAction] = useFormState(updateSettings, null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Acara</CardTitle>
        <CardDescription>
          Informasi ini akan ditampilkan di halaman depan publik.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          {state?.success && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
              {state.message}
            </div>
          )}
          {state?.success === false && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {state.error}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Acara *</Label>
              <Input 
                id="title" 
                name="title" 
                defaultValue={initialData?.title} 
                required 
                placeholder="Contoh: Pernikahan Budi & Ani"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="eventDate">Waktu Pelaksanaan *</Label>
              <Input 
                id="eventDate" 
                name="eventDate" 
                type="datetime-local" 
                defaultValue={formatDateForInput(initialData?.eventDate)} 
                required 
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Deskripsi Acara</Label>
              <textarea 
                id="description" 
                name="description" 
                defaultValue={initialData?.description}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Deskripsi singkat mengenai acara"
                rows={4}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="location">Lokasi Acara *</Label>
              <Input 
                id="location" 
                name="location" 
                defaultValue={initialData?.location} 
                required 
                placeholder="Contoh: Gedung Serbaguna, Jl. Melati No. 1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="themeColor">Warna Tema (Hex Code) *</Label>
              <div className="flex gap-3">
                <Input 
                  id="colorPicker"
                  type="color"
                  className="w-16 p-1 h-10"
                  defaultValue={initialData?.themeColor || '#000000'}
                  onChange={(e) => {
                    const input = document.getElementById('themeColor') as HTMLInputElement
                    if (input) input.value = e.target.value
                  }}
                />
                <Input 
                  id="themeColor" 
                  name="themeColor" 
                  defaultValue={initialData?.themeColor || '#000000'} 
                  required
                  placeholder="#000000"
                  pattern="^#[0-9A-Fa-f]{6}$"
                  title="Gunakan format Hex Code, contoh: #FF0000"
                />
              </div>
              <p className="text-xs text-gray-500">Pilih warna atau ketik kode HEX. Warna ini digunakan di halaman publik.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImageUrl">URL Cover Image</Label>
              <Input 
                id="coverImageUrl" 
                name="coverImageUrl" 
                defaultValue={initialData?.coverImageUrl || ''} 
                type="url"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-gray-500">Kosongkan jika tidak ingin menggunakan gambar cover (opsional).</p>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
