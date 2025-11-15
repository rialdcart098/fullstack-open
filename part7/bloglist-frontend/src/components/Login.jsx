import TextInput from "./TextInput.jsx";
import {useEffect, useState} from "react";
import { setNotification } from "../reducers/notificationReducer.js";
import { useDispatch } from "react-redux";
import {loginUser} from "../reducers/authReducer.js";
import { useField } from "../hooks.js";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const { clear: clearUsername, ...username } = useField("text", "username");
  const { clear: clearPassword, ...password } = useField("password", "password");
  const [, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) navigate('/');
  }, [navigate])

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await dispatch(loginUser(username.value, password.value));
      setVisible(false);
      clearUsername();
      clearPassword();
      dispatch(setNotification({ message: `Welcome back ${user.name}`, good: true }, 5));
      navigate('/')
    } catch {
      dispatch(setNotification({
        message: "Username or password is incorrect",
        good: false,
      }, 5000));
    }
  };
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-center gap-4 p-20 h-100 w-full max-w-md bg-gray-500 rounded-md shadow-lg shadow-black'>
        <h2 className='text-blue-950 font-black text-3xl font-momo-trust-display'>Log In</h2>
        <form onSubmit={handleLogin}>
          <TextInput className='mb-4 mt-4 p-2 shadow-inner w-full'
            {...username}
          />
          <TextInput className='mb-4 p-2 shadow-inner w-full'
            {...password}
          />
          <button type="submit" className='w-full'>Log In</button>
        </form>
      </div>
    </div>
  );
};
export default Login;
