import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'
const Posts = () => {
  const {posts} = useSelector(store => store.post);
  return (
    <div>
      {
        posts?.length > 0 ? posts.map((post) => (
          <Post key={post._id} post={post} />
        )) : (
          <div className='flex justify-center items-center h-[50vh] text-2xl font-semibold'>No Posts Yet</div>
        )
      }
      
    </div>
  )
}

export default Posts