import { configureStore, getDefaultMiddleware, ThunkAction, Action } from '@reduxjs/toolkit'
import rootReducer, { RootState } from 'store/rootReducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({}),
})

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  ;(module as any).hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store
