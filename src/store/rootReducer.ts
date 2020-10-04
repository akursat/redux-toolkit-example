import { combineReducers } from '@reduxjs/toolkit'
import subreddit from 'features/subreddit/SubredditSliceAsync'
// import subreddit from 'features/subreddit/SubredditSlice'

const rootReducer = combineReducers({ subreddit })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
