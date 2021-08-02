import React, { useEffect, useState } from 'react'
import AddNewPostBtn from './AddNewPostBtn'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

const Posts: React.FC = () => {
  const defaultNewPost = { title: '', body: '' }
  const [posts, setPosts] = useState<Post[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [newPost, setNewPost] = useState(defaultNewPost)

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(data => setPosts(data))
  }, [])

  const handleClickAddPost = () => {
    setIsFormOpen(true)
  }

  const handleClickCancel = () => {
    setIsFormOpen(false)
    setNewPost(defaultNewPost)
  }

  const handleChangeNewPost = (type: "title" | "body") => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target
    if (type === "title") {
      setNewPost({
        ...newPost,
        title: value
      })
    } else if (type === "body") {
      setNewPost({
        ...newPost,
        body: value
      })
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(newPost)
      }
    )
      .then(response => response.json())
      .then(data => {
        setPosts([
          ...posts,
          data
        ])
        setIsFormOpen(false)
        setNewPost(defaultNewPost)
      })
  }

  return (
    <div>
      {!isFormOpen && <AddNewPostBtn onClick={handleClickAddPost} />}

      {isFormOpen &&
        <form onSubmit={handleSubmit}>
          <h3>New Post</h3>
          <input type="text" placeholder="Title" value={newPost.title} onChange={handleChangeNewPost("title")} />
          <br />
          <br />
          <textarea placeholder="Body" value={newPost.body} onChange={handleChangeNewPost("body")}></textarea>
          <br />
          <br />

          <button type="submit">Submit</button>
          <button type="button" onClick={handleClickCancel}>Cancel</button>
        </form>
      }

      <h1>Posts</h1>

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Posts