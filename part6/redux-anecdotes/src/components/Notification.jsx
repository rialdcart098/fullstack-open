import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { clearNotification } from '../reducers/notificationReducer.js'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const style = {
    display: notification ? '' : 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
      return () => clearTimeout(timer)
    }
  })
  return <div style={style}>{notification}</div>
}
export default Notification
