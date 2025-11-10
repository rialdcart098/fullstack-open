import loginService from "../services/login.js";
import blogService from "../services/blogs.js";
import TextInput from "./TextInput.jsx";
import Togglable from "./Togglable.jsx";
import { useState } from "react";
import { setNotification } from "../reducers/notificationReducer.js";
import { useDispatch } from "react-redux";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      console.log("user: ", user);
      blogService.setToken(user.token);
      setUser(user);
      setVisible(false);
      setUsername("");
      setPassword("");
      dispatch(setNotification({ message: `Welcome back ${user.name}`, good: true }, 5));
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
          type="text"
          value={username}
          name="Username"
          setValue={setUsername}
        />
        <TextInput
          type="password"
          value={password}
          name="Password"
          setValue={setPassword}
        />
        <button type="submit">Log In</button>
      </form>
    </Togglable>
  );
};
export default Login;
