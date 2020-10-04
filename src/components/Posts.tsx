import React from 'react'

interface IPosts {
  posts: Array<any>
}

export const Posts = ({ posts }: IPosts) => (
  <ul>
    {posts.map((post, i) => (
      <li key={i}>{post.title}</li>
    ))}
  </ul>
)
