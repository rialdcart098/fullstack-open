import {useSelector} from "react-redux";
import Login from "./Login.jsx";
import {logOut} from "../reducers/authReducer.js";
import {setNotification} from "../reducers/notificationReducer.js";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);
  const handleLogOut = () => {
    dispatch(logOut())
    dispatch(setNotification({ message: "Logged out successfully", good: true }, 5));
  };
  return (
    <nav className="row-span-1 h-full">
      <div className="bg-amber-200 grid grid-cols-3 h-full p-1 gap-3 place-items-center">
        <Link to='/' className="p-3 w-full text-center text-4xl font-black font-momo-trust-display">Blogs</Link>
        <Link to='/users' className="p-3 w-full text-center text-4xl font-black font-momo-trust-display">Users</Link>
        {user && (
          <div className="col-span-1 flex justify-end items-center gap-3">
            <p>{user.name} logged in</p>
            <button onClick={handleLogOut}>Logout</button>
          </div>
        )}
        {!user && (
          <Login />
        )}
      </div>
    </nav>
  )
}
export default Navbar;