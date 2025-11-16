import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const UserRow = ({ user, index }) => {
  const placement =
    index === 0 ? 'bg-amber-200' :
      index === 1 ? 'bg-gray-600' :
        index === 2 ? 'bg-orange-800' :
          index === 3 || index === 4 ? 'bg-blue-500' :
            'bg-gray-500';
  return (
    <tr className={`${placement} text-center font-bold font-momo-trust-display`}>
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
      <h2 className='font-momo-trust-display text-4xl text-center text-blue-500'>Top Users</h2>
      <table className='bg-orange'>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {[...users]
            .sort((a, b) => b.blogs.length - a.blogs.length)
            .slice(0, 10)
            .map((user, index) => (
              <UserRow
                user={user}
                key={user.id}
                index={index}
              />
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Users;