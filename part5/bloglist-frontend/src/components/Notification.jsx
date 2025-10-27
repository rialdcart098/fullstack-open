import { useEffect } from 'react'
const Notification = ({ notification, setNotification }) => {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  })
  if (!notification) return null
  const notificationStyle = {
    color: notification.good? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  return (
    <div style={notificationStyle} className={notification.good? 'notification-good' : 'notification-bad'}>
      {notification.message}
    </div>
  )
}

export default Notification