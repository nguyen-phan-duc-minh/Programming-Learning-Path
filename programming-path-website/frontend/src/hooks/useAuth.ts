import { useRouter } from 'next/navigation'
import { storageService } from '@/services/storage.service'

export function useAuth() {
  const router = useRouter()

  const isAuthenticated = (): boolean => {
    return !!storageService.getAuthToken()
  }

  const login = (token: string) => {
    storageService.setAuthToken(token)
  }

  const logout = () => {
    storageService.clearAll()
    router.push('/')
  }

  const requireAuth = () => {
    if (!isAuthenticated()) {
      router.push('/auth')
      return false
    }
    return true
  }

  return {
    isAuthenticated,
    login,
    logout,
    requireAuth,
    getToken: storageService.getAuthToken,
  }
}
