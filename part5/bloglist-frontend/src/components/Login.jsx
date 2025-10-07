import loginService from '../services/login'
import TextInput from './TextInput'
import { useState } from 'react'

const Login = ({ setUser, setNotification, setGood }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      setGood(true)
      setNotification(`Welcome back ${user.name}`)
    } catch {
      setGood(false)
      setNotification('Username or password is incorrect')
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