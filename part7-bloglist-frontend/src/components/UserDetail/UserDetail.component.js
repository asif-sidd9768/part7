import { ListGroup } from 'react-bootstrap'

const UserDetail = ({ user }) => {

  if(!user){
    return null
  }
  return (
    <div>
      <h2 className="mt-3">{user.name}</h2>
      {/* {console.log('u === ', user)} */}
      <hr style={{ width: '200px' }}/>
      <h4 className="mt-3">Added blogs</h4>
      <ListGroup>
        {
          user.blogs.map(blog => {
            return(
              <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
            )
          })
        }
      </ListGroup>
    </div>
  )
}

export default UserDetail