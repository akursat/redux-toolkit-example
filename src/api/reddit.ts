export async function fetchPostsBySubredddit(subreddit: string) {
  const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`).then((response) =>
    response.json(),
  )
  return response
}
