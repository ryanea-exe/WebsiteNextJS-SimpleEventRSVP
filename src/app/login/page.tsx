import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-500 mt-2">Silakan masukkan password untuk mengakses dashboard admin.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
