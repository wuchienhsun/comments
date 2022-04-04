import axios from 'axios'
import { useEffect, useState } from 'react'

import { timeSince } from '../lib'
import { User } from '../type/type'
import Input from './input'

function CommentComponent({
  avatar,
  userName,
  timestamp,
  upvotes,
  id,
  comment,
  currentUser,
}: {
  avatar: string
  userName: string
  timestamp: string
  upvotes: number
  id: number
  comment: string
  commentId: number | null
  currentUser: User
}) {
  const [reply, setReply] = useState(false)
  const [vote, setVote] = useState(upvotes)

  useEffect(() => {
    setVote(upvotes)
  }, [upvotes])

  const updateReply = () => {
    setReply(!reply)
  }

  const updateVote = () => {
    axios
      .post('https://comments-app-v2.wuhsun.com/api/upvote/add', {
        commentId: id,
      })
      .then((res) => {
        if (res.data.status === 'success') {
          setVote(vote + 1)
        }
      })
  }

  return (
    <div className="flex">
      {/* user img */}
      <div>
        <img
          className="z-50 mr-[11px] h-[30px] w-[30px] rounded-[42.25px]"
          src={avatar}
          alt="avatar"
        />
        {/* line */}
      </div>
      {/* main content */}
      <div>
        <div className="flex items-center">
          {/* user name */}
          <div className="mr-[5px] text-[13px] font-[600] text-[#21293C]">
            {userName}
          </div>
          {/* time */}
          <div className="text-[11px] font-[400] text-[#4B587C]">
            {`・${timeSince(timestamp)}`}
          </div>
        </div>
        {/* comment */}
        <div className="w-[643px] text-[13px] font-[400] text-[#21293C]">
          {comment}
        </div>
        {/* action */}
        <div className="mt-[14px] flex items-center">
          {/* upvote */}
          <button
            onClick={updateVote}
            className="mr-[28px] text-[11px] font-[600] text-[#4B587C]"
          >
            {`▲ ${vote === 0 ? '' : vote} Upvote`}
          </button>
          <button
            onClick={updateReply}
            className="text-[11px] font-[600] text-[#4B587C]"
          >
            Reply
          </button>
        </div>
        {reply ? (
          <Input
            userName={currentUser.userName}
            avatar={currentUser.avatar}
            commentId={id}
          />
        ) : null}
      </div>
    </div>
  )
}
export default CommentComponent
