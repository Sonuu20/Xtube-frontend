// Mock data for tweets
let mockTweets = [
  {
    id: "1",
    author: {
      id: "current-user",
      name: "John Doe",
      username: "johndoe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Just launched my new video on X-tube! Check it out and let me know what you think. #content #creator",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    likeCount: 15,
    likedByCurrentUser: false,
  },
  {
    id: "2",
    author: {
      id: "user-2",
      name: "Jane Smith",
      username: "janesmith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "I'm loving the new features on X-tube! The combination of video content and social interaction is exactly what I've been looking for. Who else is enjoying it?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    likeCount: 42,
    likedByCurrentUser: true,
  },
  {
    id: "3",
    author: {
      id: "user-3",
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Just hit 1000 subscribers! Thank you to everyone who has supported my channel. New content coming soon!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    likeCount: 89,
    likedByCurrentUser: false,
  },
  {
    id: "4",
    author: {
      id: "current-user",
      name: "John Doe",
      username: "johndoe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Working on a new series about web development. What topics would you like me to cover?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    likeCount: 27,
    likedByCurrentUser: false,
  },
  {
    id: "5",
    author: {
      id: "user-5",
      name: "Sarah Williams",
      username: "sarahw",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Just watched an amazing tutorial on X-tube about digital art. If you're interested in learning, I highly recommend checking out @artmaster's channel!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
    likeCount: 53,
    likedByCurrentUser: false,
  },
];

// Get all tweets sorted by timestamp (newest first)
export function getMockTweets() {
  return [...mockTweets].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
}

// Add a new tweet
export function addMockTweet(content) {
  const newTweet = {
    id: `tweet-${Date.now()}`,
    author: {
      id: "current-user",
      name: "John Doe",
      username: "johndoe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content,
    timestamp: new Date().toISOString(),
    likeCount: 0,
    likedByCurrentUser: false,
  };

  mockTweets = [newTweet, ...mockTweets];
  return newTweet;
}

// Like a tweet
export function likeTweet(tweetId) {
  const tweet = mockTweets.find((t) => t.id === tweetId);
  if (tweet) {
    tweet.likedByCurrentUser = true;
    tweet.likeCount += 1;
  }
  return tweet;
}

// Unlike a tweet
export function unlikeTweet(tweetId) {
  const tweet = mockTweets.find((t) => t.id === tweetId);
  if (tweet) {
    tweet.likedByCurrentUser = false;
    tweet.likeCount = Math.max(0, tweet.likeCount - 1);
  }
  return tweet;
}

// Update a tweet
export function updateTweet(tweetId, content) {
  const tweet = mockTweets.find((t) => t.id === tweetId);
  if (tweet) {
    tweet.content = content;
    // In a real app, you might also update the timestamp or add an "edited" flag
  }
  return tweet;
}

// Delete a tweet
export function deleteTweet(tweetId) {
  mockTweets = mockTweets.filter((t) => t.id !== tweetId);
  return tweetId;
}
