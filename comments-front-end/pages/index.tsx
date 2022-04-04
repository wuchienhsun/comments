import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import CommentsComponent from '../components/commentsComponent'
import useUserInfo from '../hooks/useUserInfo'
import { Comment } from '../type/type'
import { io, Socket } from 'socket.io-client'
import Input from '../components/input'

const Home: NextPage = () => {
  const [ws, setWs] = useState<Socket | null>(null)
  const [comments, setComments] = useState<Comment[]>([])

  const user = useUserInfo()

  const connectWebSocket = () => {
    if (ws === null) {
      const socket = io('https://comments-app-v2.wuhsun.com')

      setWs(socket)
    }
  }

  const initWebSocket = () => {
    ws?.on('connect', () => {
      console.log('connect socketId', ws.id)
    })

    ws?.on('disconnect', () => {
      console.log('disconnect')
    })
    ws?.on('reload', () => {
      reload()
    })
  }

  const reload = () => {
    getComments()
  }

  function getComments() {
    axios
      .get('https://comments-app-v2.wuhsun.com/api/comment/list')
      .then((res) => {
        if (res.data.status === 'success') {
          setComments(res.data.data)
        }
      })
  }

  useEffect(() => {
    // setup socket
    if (ws === null) {
      connectWebSocket()
    }
    getComments()
  }, [])

  useEffect(() => {
    if (ws) {
      console.log('success connect!')
      initWebSocket()
    }
  }, [ws])

  return (
    <div className="ml-[49px] mr-[54px] mt-[38px]">
      <div className="text-[18px] font-bold">Discussion</div>

      <Input userName={user.userName} avatar={user.avatar} commentId={null} />
      <hr />

      <div id="comments">{CommentsComponent(comments, user)}</div>
    </div>
  )
}

export default Home
