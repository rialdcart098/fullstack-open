import { useEffect } from 'react'

const Notification = ({ message, error, setMessage }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('')
            }, 5000)
            return () => clearTimeout(timer)
        }
    })
    if (!message) {
        return null
    }

    return (
        <div className={error ? 'error' : 'notification'}>
            {message}
        </div>
    )
}

export default Notification