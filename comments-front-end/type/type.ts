export type Comment = {
  id: number
  userName: string
  avatar: string
  comment: string
  upvotes: number
  timestamp: string
  commentId: number | null
  subComments: Array<Comment>
}

export type User = {
  userName: string
  avatar: string
}

export type Info = {
  commentId: number | null
  avatar: string
  userName: string
}
