import reducerComment from "./commentSlice";
import reducerFollow from "./followSlice";
import reducerTweet from "./tweetSlice";
import reducerUser from "./userSlice";

const rootReuducer = {
  users: reducerUser,
  follow: reducerFollow,
  tweet: reducerTweet,
  comment: reducerComment,
};

export default rootReuducer;