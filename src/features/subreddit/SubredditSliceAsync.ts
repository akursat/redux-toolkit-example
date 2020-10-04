import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPostsBySubredddit } from 'api/reddit'

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

export const fetchPosts = createAsyncThunk(
  'subreddit/fetchBySubreddit',
  async (subreddit: string) => {
    const posts = await fetchPostsBySubredddit(subreddit)
    return posts
  },
)

//same example using with createAsyncThunk
const subredditSlice = createSlice({
  name: 'subreddit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false
      state.items = action.payload.data.children.map((child: { data: any }) => child.data)
      state.lastUpdated = Date.now()
      state.error = null
    })
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export default subredditSlice.reducer
