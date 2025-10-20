import loginService from '../services/login'
import blogService from '../services/blogs'
import TextInput from './TextInput'
import { useState } from 'react'

const Login = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('user', JSON.stringify(user))
      console.log('user: ', user)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification({message: `Welcome back ${user.name}`, good: true})
    } catch {
      setNotification({message: 'Username or password is incorrect', good: false})
    }
  }
  return (
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
  )
}
export default Login