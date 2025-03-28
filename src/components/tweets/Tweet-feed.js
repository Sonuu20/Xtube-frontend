"use client"

import { useState, useEffect } from "react"
import { TweetCard } from "./Tweet-card"
import { getMockTweets, likeTweet, unlikeTweet, deleteTweet, updateTweet } from "@/lib/data"

export function TweetFeed() {
  const [tweets, setTweets] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch tweets on component mount
  useEffect(() => {
    const fetchTweets = async () => {
      setIsLoading(true)
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const fetchedTweets = getMockTweets()
      setTweets(fetchedTweets)
      setIsLoading(false)
    }

    fetchTweets()
  }, [])

  // Handle like/unlike tweet
  const handleLikeToggle = (tweetId) => {
    setTweets((prevTweets) =>
      prevTweets.map((tweet) => {
        if (tweet.id === tweetId) {
          const isLiked = tweet.likedByCurrentUser

          if (isLiked) {
            unlikeTweet(tweetId)
            return {
              ...tweet,
              likedByCurrentUser: false,
              likeCount: tweet.likeCount - 1,
            }
          } else {
            likeTweet(tweetId)
            return {
              ...tweet,
              likedByCurrentUser: true,
              likeCount: tweet.likeCount + 1,
            }
          }
        }
        return tweet
      }),
    )
  }

  // Handle delete tweet
  const handleDelete = (tweetId) => {
    deleteTweet(tweetId)
    setTweets((prevTweets) => prevTweets.filter((tweet) => tweet.id !== tweetId))
  }

  // Handle update tweet
  const handleUpdate = (tweetId, content) => {
    updateTweet(tweetId, content)
    setTweets((prevTweets) => prevTweets.map((tweet) => (tweet.id === tweetId ? { ...tweet, content } : tweet)))
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-muted animate-pulse"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 w-1/4 bg-muted animate-pulse rounded"></div>
                <div className="h-3 w-1/5 bg-muted animate-pulse rounded"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-muted animate-pulse rounded"></div>
              <div className="h-4 bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (tweets.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg">
        <p className="text-muted-foreground">No tweets yet. Be the first to tweet!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tweets.map((tweet) => (
        <TweetCard
          key={tweet.id}
          tweet={tweet}
          onLikeToggle={handleLikeToggle}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  )
}

