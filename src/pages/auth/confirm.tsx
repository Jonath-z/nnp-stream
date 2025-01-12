import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/services/supabase'
import { EmailOtpType } from '@supabase/supabase-js'
import { useSearchParams } from 'next/navigation'


export default function AuthConfirm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {

    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type')
    if (token_hash && type) {
      supabase.auth.verifyOtp({ token_hash, type: type as EmailOtpType })
        .then(({ data: { session }, error }) => {
          if (error) {
            console.error('Error verifying magic link:', error.message)
          } else if (session) {
            router.push('/') 
          }
        })
    }
  }, [router.query])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-center">Verifying your magic link...</p>
    </div>
  )
}
