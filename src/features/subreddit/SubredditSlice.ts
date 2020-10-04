import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchPostsBySubredddit } from 'api/reddit'
import { AppThunk } from 'store/store'

export interface PostState {
  loading: boolean
  error: string | null
  items: any[]
  lastUpdated: number | undefined
}
const initialState: PostState = {
  items: [],
  loading: false,
  error: null,
  lastUpdated: undefined,
}

//same example using with reducers
const subredditSlice = createSlice({
  name: 'subreddit',
  initialState,
  reducers: {
    getPostsStart: (state) => {
      state.loading = true
      state.error = null
    },
    getPostsSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false
      state.items = action.payload.data.children.map((child: { data: any }) => child.data)
      state.lastUpdated = Date.now()
      state.error = null
    },
    getPostsFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
  },
})
export const { getPostsStart, getPostsSuccess, getPostsFailure } = subredditSlice.actions
export default subredditSlice.reducer

export const fetchPosts = (subreddit: string): AppThunk => async (dispatch) => {
  try {
    dispatch(getPostsStart())
    const posts = await fetchPostsBySubredddit(subreddit)
    dispatch(getPostsSuccess(posts))
  } catch (err) {
    dispatch(getPostsFailure(err.toString()))
  }
}
