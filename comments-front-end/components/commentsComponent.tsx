import { Comment, User } from '../type/type'
import CommentComponent from './commentComponent'

function CommentsComponent(comments: Comment[], user: User, level = 0) {
  const recursive = (cs: Comment[]) => {
    if (cs && cs.length) {
      return cs.map((c, index) => {
        return <div key={index}>{CommentsComponent([c], user, level + 1)}</div>
      })
    }
  }
  const divStyle = {
    marginLeft: level === 0 ? '0px' : '40px',
  }

  return (
    <div style={divStyle}>
      {comments.map((comment, index) => {
        return (
          <div className="flex pt-[31px]" key={index}>
            <div
              style={{
                height: comment.subComments.length > 0 ? 'auto' : '0px',
                position: 'relative',
                left: '16px',
                top: '10px',
                zIndex: -1,
              }}
              className="h-[100px] w-[2px] bg-[#EAEAEA]"
            ></div>
            <div>
              {comment ? (
                <CommentComponent
                  id={comment.id}
                  userName={comment.userName}
                  avatar={comment.avatar}
                  comment={comment.comment}
                  upvotes={comment.upvotes}
                  timestamp={comment.timestamp}
                  commentId={comment.commentId}
                  currentUser={user}
                />
              ) : null}
              {recursive(comment.subComments)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default CommentsComponent
