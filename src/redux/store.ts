import { configureStore } from '@reduxjs/toolkit'
import scholarSlice from '@src/redux/reducers/scholarSlice'

const store = configureStore({
  reducer: {
    scholars: scholarSlice,
  },
})
export default store

export type RootState = ReturnType<typeof store.getState>
