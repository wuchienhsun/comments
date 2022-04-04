import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import CommentsComponent from '../components/commentsComponent'
import useUserInfo from '../hooks/useUserInfo'
import { Comment } from '../type/type'

const Home: NextPage = () => {
  const [comments, setComments] = useState<Comment[]>([])

  const user = useUserInfo()

  useEffect(() => {
    // get comments
    axios
      .get('https://comments-app-v2.wuhsun.com/api/comment/list')
      .then((res) => {
        if (res.data.status === 'success') {
          setComments(res.data.data)
        }
      })
  }, [])

  return (
    <div className="ml-[49px] mr-[54px] mt-[38px]">
      <div className="text-[18px] font-bold">Discussion</div>

      <div className="mt-[31px] mb-[44px] flex items-center">
        <img
          id="avater"
          src={user.avatar}
          className="mr-[12px] h-[30px] w-[30px] rounded-[42.25px]"
        />

        <input
          id="addComment"
          className="mr-[13px] h-[30px] w-[542px] rounded-[4px] border-2 border-[#E5E5E5] placeholder:pl-[10px] placeholder:text-[11px] placeholder:font-[500] placeholder:text-[#8A8F9C]"
          type="text"
          placeholder="What are your thoughts?"
        />

        <button
          id="addCommentBtn"
          className="h-[30px] w-[83px] rounded-[4px] bg-[#7E34F6] text-[11px] font-bold text-white"
        >
          Comment
        </button>
      </div>
      <hr />

      <div id="comments">{CommentsComponent(comments, user)}</div>
    </div>
  )
}

export default Home
