'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitRsvp } from '../actions/rsvp'

function SubmitButton({ themeColor }: { themeColor: string }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-4 rounded-md text-white font-medium transition-all hover:opacity-90 disabled:opacity-70 flex justify-center items-center mt-6"
      style={{ backgroundColor: themeColor }}
    >
      {pending ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : 'Kirim RSVP'}
    </button>
  )
}

const initialState = {
  success: false,
  message: '',
  error: ''
}

export default function RsvpForm({ themeColor }: { themeColor: string }) {
  const [state, formAction] = useActionState(submitRsvp, initialState)

  if (state?.success) {
    return (
      <div className="bg-green-50 p-8 rounded-xl text-center border border-green-200 shadow-sm max-w-md mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-green-800 mb-2">Berhasil!</h3>
        <p className="text-green-700">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5 w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-left">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md text-sm flex items-start">
          <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{state.error}</span>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-20 focus:outline-none focus:border-gray-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-20 focus:outline-none focus:border-gray-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Apakah Anda akan hadir?</label>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center justify-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
            <input type="radio" name="isAttending" value="true" required className="sr-only" />
            <span className="font-medium text-gray-900">Ya, Hadir</span>
          </label>
          <label className="flex items-center justify-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-red-500 has-[:checked]:bg-red-50">
            <input type="radio" name="isAttending" value="false" required className="sr-only" />
            <span className="font-medium text-gray-900">Tidak Bisa</span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Pesan (Opsional)</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-20 focus:outline-none focus:border-gray-500 transition-colors"
          placeholder="Ada ucapan atau pertanyaan?"
        ></textarea>
      </div>

      <SubmitButton themeColor={themeColor} />
    </form>
  )
}
