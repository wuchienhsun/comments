import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [user, setUser] = useState({ userName: '', avatar: '' })
  useEffect(() => {
    // get user
    // get comments
    axios.get('http://localhost:3000/api/user').then((res) => {
      console.log('res', res)
      setUser(res.data)
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

      <div id="comments" className="mt-[40px]"></div>
    </div>
  )
}

export default Home
