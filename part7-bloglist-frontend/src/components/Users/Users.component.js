import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Users = () => {
  const userObj = useSelector(state => state.user)
  console.log(userObj)

  if(!userObj.users){
    return null
  }

  return (
    <div className="mt-3">
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {userObj.users.map(user =>
            <tr key={user.id}>
              <td>
                <Link style={{ textDecoration: 'none' }} to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users