'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { loginAction } from '@/app/actions/auth'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Memeriksa...' : 'Masuk'}
    </Button>
  )
}

export default function LoginForm() {
  const [state, formAction] = useActionState(loginAction, null)

  return (
    <Card>
      <form action={formAction}>
        <CardContent className="pt-6 space-y-4">
          {state?.success === false && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
              {state.error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              placeholder="Masukkan password admin"
            />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  )
}
