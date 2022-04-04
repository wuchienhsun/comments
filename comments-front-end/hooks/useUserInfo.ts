import axios from 'axios'
import { useEffect, useState } from 'react'
import { User } from '../type/type'

function useUserInfo() {
  const [userInfo, setUserInfo] = useState<User>({ userName: '', avatar: '' })

  useEffect(() => {
    const fetchUserInfo = async () => {
      axios.get('https://comments-app-v2.wuhsun.com/api/user').then((res) => {
        setUserInfo(res.data)
      })
    }
    fetchUserInfo()
  }, [])

  return userInfo
}

export default useUserInfo
