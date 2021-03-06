import axios from 'axios'
import { useState } from 'react'
import { Info } from '../type/type'

function Input({ commentId, avatar, userName }: Info) {
  const [comment, setComment] = useState('')
  const addComment = () => {
    const data: {
      comment: string
      avatar: string
      userName: string
      commentId?: number
    } = {
      comment,
      avatar,
      userName,
    }

    if (commentId) {
      data.commentId = commentId
    }
    axios
      .post('https://comments-app-v2.wuhsun.com/api/comment/add', {
        ...data,
      })
      .then((res) => {
        if (res.data.status === 'success') {
          // call root to refresh page
          console.log('add success')
          // clear input
          setComment('')
        }
      })
  }
  return (
    <div className="mt-[10px] flex items-center">
      <img
        id="avater"
        src={avatar}
        className="mr-[12px] h-[30px] w-[30px] rounded-[42.25px]"
      />

      <input
        id="addComment"
        className="mr-[13px] h-[30px] w-[542px] rounded-[4px] border-2 border-[#E5E5E5] placeholder:pl-[10px] placeholder:text-[11px] placeholder:font-[500] placeholder:text-[#8A8F9C]"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="What are your thoughts?"
      />

      <button
        id="addCommentBtn"
        className="h-[30px] w-[83px] rounded-[4px] bg-[#7E34F6] text-[11px] font-bold text-white"
        onClick={addComment}
      >
        Comment
      </button>
    </div>
  )
}
export default Input
