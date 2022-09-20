import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)} />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)} />
        </div>
        <button type="submit" id="blog-add-button">Create</button>
      </form>
    </div>
  )
}

export default BlogForm