import { configureStore } from '@reduxjs/toolkit'

import homeSlice from './homeSlice/homeSlice.js'

export const store = configureStore({
  reducer: {
    home:homeSlice,
  },
})

