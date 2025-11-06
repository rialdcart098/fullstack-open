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
    const [notification, setNotification] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext