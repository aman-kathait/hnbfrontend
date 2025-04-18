import React from 'react'
import { MoreHorizontal } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import Comment from './Comment'
import { toast } from 'sonner'
import { setPosts } from '@/redux/postSlice'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
const CommentDialog = ({open, setOpen}) => {
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector(store => store.post);
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  }

  const sendMessageHandler = async () => {

    try {
      const res = await axios.post(`http://localhost:8000/api/v1/post/${selectedPost?._id}/comment`, { text }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map(p =>
          p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-full md:max-w-2/3 sm:max-w-9xl p-2 flex flex-col sm:flex-row h-2/3 sm:h-2/3 justify-between"
      >
        {/* Image Section */}
        <div className="w-full sm:w-1/2">
          <img
            src={selectedPost?.image}
            alt="post_img"
            className="w-full h-48 sm:h-full object-cover sm:rounded-l-lg"
          />
        </div>

        {/* Comments Section */}
        <div className="flex-1 flex flex-col justify-between">
          {/* User Info and Options */}
          <div className="flex items-center justify-between p-4">
            <div className="flex gap-3 items-center">
              <Link>
                <Avatar>
                  <AvatarImage src={selectedPost?.author?.profilePicture}/>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <Link className="font-semibold text-xs sm:text-sm">{selectedPost?.author?.username}</Link>
                {/* <span className="text-gray-600 text-sm">Bio here...</span> */}
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <MoreHorizontal className="cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="flex flex-col items-center text-sm text-center">
                <div className="cursor-pointer w-full text-[#ED4956] font-bold">
                  Unfollow
                </div>
                <div className="cursor-pointer w-full">Add to favorites</div>
              </DialogContent>
            </Dialog>
          </div>
          <hr />

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-12rem)] sm:max-h-96 p-4">
            {
              (selectedPost?.comments || []).map((comment) => <Comment key={comment._id} comment={comment} />)
            }
          </div>

          {/* Add Comment Input */}
          <div className="p-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={text}
                onChange={changeEventHandler}
                placeholder="Add a comment.."
                className="w-full outline-none border text-xs sm:text-sm border-gray-300 p-2 rounded"
              />
              <Button
                disabled={!text.trim()}
                onClick={sendMessageHandler}
                variant="outline"
                className="text-blue-600 hover:text-blue-800"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentDialog