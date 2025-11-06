import NotificationContext from '../NotificationContext'
import { useContext } from 'react'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const { notification, setNotification } = useContext(NotificationContext)
  if (!notification) return null
  setTimeout(() => {
    setNotification({ type: 'CLEAR' })
  }, 5000) // 5 seconds

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
