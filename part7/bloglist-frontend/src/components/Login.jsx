import TextInput from "./TextInput.jsx";
import Togglable from "./Togglable.jsx";
import { useState } from "react";
import { setNotification } from "../reducers/notificationReducer.js";
import { useDispatch } from "react-redux";
import {loginUser} from "../reducers/authReducer.js";
import { useField } from "../hooks.js";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const { clear: clearUsername, ...username } = useField("text", "username");
  const { clear: clearPassword, ...password } = useField("password", "password");
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <Togglable
      visible={visible}
      toggleVisibility={() => setVisible(!visible)}
      buttonLabel="Log In"
    >
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <TextInput
          {...username}
        />
        <TextInput
          {...password}
        />
        <button type="submit">Log In</button>
      </form>
    </Togglable>
  );
};
export default Login;
