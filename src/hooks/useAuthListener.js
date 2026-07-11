import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '../database/firebase'
import { setUser } from '../redux/slices/authSlice'

export const useAuthListener = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(setUser(null))
        return
      }

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      )
    })

    return unsubscribe
  }, [dispatch])
}