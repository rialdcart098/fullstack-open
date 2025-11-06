import { useReducer } from 'react'
import { createContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type){
        case 'NOTIFY':
            return action.payload          
        case 'CLEAR':
            return ''
    }
}

const NotificationContext = createContext()

export const NotificationProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const notify = notification => {
    return {
        type: 'NOTIFY',
        payload: notification
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR'
    }
}

export default NotificationContext