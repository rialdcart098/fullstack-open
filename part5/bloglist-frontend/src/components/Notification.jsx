import { useEffect } from 'react'
const Notification = ({ notification, setNotification, good }) => {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  })
  if (!notification) return null
  const goodNotification = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  const badNotification = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }
  return (
    <div style={good ? goodNotification : badNotification}>
      {notification}
    </div>
  )
}

export default Notification