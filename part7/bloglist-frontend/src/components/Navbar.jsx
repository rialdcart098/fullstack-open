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
      <div className="bg-gray-950 grid grid-cols-3 h-full p-1 gap-3 place-items-center border-b-1 border-b-blue-300">
        <Link to='/' className="hover:text-blue-300 transition-all ease-in-out text-blue-200 p-3 w-full text-center text-4xl font-black font-momo-trust-display">Blogs</Link>
        <Link to='/users' className="hover:text-blue-300 transition-all ease-in-out text-blue-200 p-3 w-full text-center text-4xl font-black font-momo-trust-display">Users</Link>
        {user && (
          <div className="col-span-1 flex justify-end items-center gap-3">
            <p className='text-blue-300 font-medium select-none'>{user.name} logged in</p>
            <button onClick={handleLogOut}
              className='cursor-pointer bg-blue-300 text-gray-800 p-2 rounded-xl font-medium hover:drop-shadow-[0_0_6px_rgba(191,219,254,1)] transition-all ease-in-out'
            >
              Logout
            </button>
          </div>
        )}
        {!user && (
          <Link to='/login' className="text-blue-200 p-3 w-full text-center text-4xl font-black font-momo-trust-display">Login</Link>
        )}
      </div>
    </nav>
  )
}
export default Navbar;