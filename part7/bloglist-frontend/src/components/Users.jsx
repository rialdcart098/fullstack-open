import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const UserRow = ({ user }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>{user?.blogs ? user.blogs.length : 0}</td>
    </tr>
  )
}

const Users = () => {
  const users = useSelector((state) => state.users);
  return (
    <div>
      <h2 className='font-momo-trust-display text-3xl'>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {[...users].map(user => (
            <UserRow user={user} key={user.id} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Users;