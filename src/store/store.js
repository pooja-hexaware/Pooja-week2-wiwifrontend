import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import menuSlice from '../components/store/dataslice'

let middlewares = []
if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
        collapsed: (getState, action, logEntry) => !logEntry.error,
    })
    middlewares.push(logger)
}
export default configureStore({
    reducer: {
        menuItems:menuSlice
    },
    middleware: (getDefaultMiddleware) =>
            
        getDefaultMiddleware({serializableCheck:false}),
    devTools: process.env.NODE_ENV !== 'production',
})
