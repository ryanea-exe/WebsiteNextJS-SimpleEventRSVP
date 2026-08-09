import { prisma } from '@/lib/prisma'
import RsvpForm from './components/RsvpForm'

export default async function Home() {
  const eventSetting = await prisma.eventSetting.findFirst()

  if (!eventSetting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center p-10 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5 text-gray-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Acara Belum Diatur</h1>
          <p className="text-gray-500 text-sm">Silakan jalankan database seeder atau atur konfigurasi acara di dashboard admin.</p>
        </div>
      </div>
    )
  }

  const { title, description, eventDate, location, themeColor, coverImageUrl } = eventSetting

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-black selection:text-white" style={{ '--theme-color': themeColor } as React.CSSProperties}>
      {/* Hero Section */}
      <header 
        className="relative py-28 px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ backgroundColor: themeColor }}
      >
        {coverImageUrl && (
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img src={coverImageUrl} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="relative z-20 max-w-4xl mx-auto text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg leading-tight">{title}</h1>
          <p className="text-lg md:text-2xl font-medium opacity-90 drop-shadow-md max-w-2xl mx-auto">{description}</p>
        </div>
        
        {/* Decorative divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent z-20"></div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-20 -mt-8 relative z-30">
        
        {/* Info Cards */}
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
          <div className="bg-white rounded-2xl shadow-md p-8 flex-1 flex flex-col items-center text-center border border-gray-100 transform transition-transform hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Waktu Pelaksanaan</h3>
            <p className="text-gray-600 font-medium">
              {new Date(eventDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {new Date(eventDate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-8 flex-1 flex flex-col items-center text-center border border-gray-100 transform transition-transform hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Lokasi Acara</h3>
            <p className="text-gray-600 font-medium">{location}</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="mb-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
            RSVP Online
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Konfirmasi Kehadiran</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">Mohon isi form di bawah ini untuk mengonfirmasi kehadiran Anda agar kami dapat mempersiapkan acara dengan baik.</p>
        </div>
        
        <RsvpForm themeColor={themeColor} />
      </main>
      
      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-200">
        <p>&copy; {new Date().getFullYear()} {title}. All rights reserved.</p>
      </footer>
    </div>
  )
}
