import loginService from '../services/login'
import blogService from '../services/blogs'
import TextInput from './TextInput'
import Togglable from "./Togglable";
import { useState } from 'react'

const Login = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('user', JSON.stringify(user))
      console.log('user: ', user)
      blogService.setToken(user.token)
      setUser(user)
      setVisible(false)
      setUsername('')
      setPassword('')
      setNotification({message: `Welcome back ${user.name}`, good: true})
    } catch {
      setNotification({message: 'Username or password is incorrect', good: false})
    }
  }
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
  )
}
export default Login