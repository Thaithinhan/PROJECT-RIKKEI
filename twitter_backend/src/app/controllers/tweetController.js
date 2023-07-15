const Tweet = require('../models/schemas/tweet.schemas');
const Following = require('../models/schemas/following.schemas');

const createTweet = async (req, res) => {
  const userId_tweet = req.userId;
  const { type, content, parentId } = req.body;
  const medias = req.files.map((file) => file.url); // Lấy đường dẫn của các hình ảnh
  // console.log(1111111,medias);

  try {
    // Kiểm tra nếu trường medias không tồn tại trong req.body, gán giá trị mặc định là null
    const mediaArray = medias || null;
    const tweetParentId = parentId || null;

    // Tạo một đối tượng tweet mới theo current user
    const newTweet = new Tweet({
      userId_tweet,
      type,
      content,
      medias: mediaArray,
      parentId: tweetParentId,
    });

    // Lưu tweet mới vào cơ sở dữ liệu
    const savedTweet = await newTweet.save();

    res.status(200).json({ success: true, message: 'Tweet created successfully', tweet: savedTweet });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create tweet', error });
  }
};

// RENDER TWEET CHO CURRENT USERS
const getTweetForCurrentUser = async (req, res) => {
  const userId = req.userId;

  try {
    // Lấy danh sách tweet của người dùng hiện tại dựa trên userId
    const tweets = await Tweet.find({ userId_tweet: userId }).sort('-createdAt').populate('userId_tweet');

    res.status(200).json({ success: true, tweets });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get tweets', error });
  }
};

// RENDER NEW TWEET CHO CURRENT USERS
const getAllTweetByTime = async (req, res) => {
  const userId = req.userId;

  try {
    // Lấy danh sách người mà người dùng hiện tại đang theo dõi từ bảng Following
    const followings = await Following.find({ current_userId: userId });

    // Tạo một mảng chứa danh sách userId mà người dùng hiện tại đang theo dõi
    const followingIds = followings.map((following) => following.followed_userId);

    // Thêm userId của người dùng hiện tại vào danh sách
    followingIds.push(userId);

    // Lấy các tweets của người dùng hiện tại và những người mà họ đang theo dõi,
    // hoặc các tweet có lượt like trên 50, sắp xếp theo thời gian tạo (mới nhất)
    const tweets = await Tweet.find({
      $or: [{ userId_tweet: { $in: followingIds } }, { likes: { $gt: 50 } }],
    })
      .sort('-createdAt')
      .populate('userId_tweet');

    res.status(200).json({ success: true, tweets });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get tweets', error });
  }
};

//RENDER TWEETS THEO ID
const getAllTweetByIdUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Tìm kiếm tất cả các tweets của một người dùng dựa trên userId được cung cấp
    const tweets = await Tweet.find({ userId_tweet: userId }).sort('-createdAt').populate('userId_tweet');

    res.status(200).json({ success: true, tweets });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get tweets', error });
  }
};

//RENDER TWEET BY TWEET ID
const getTweetByIdTweet = async (req, res) => {
  const tweetId = req.params.id;

  try {
    // Tìm kiếm tất cả các tweets của một người dùng dựa trên userId được cung cấp
    const tweet = await Tweet.findById(tweetId).populate('userId_tweet');

    // Kiểm tra nếu không tìm thấy tweet
    if (!tweet) {
      return res.status(404).json({ success: false, message: 'Tweet not found' });
    }

    res.status(200).json({ success: true, tweet });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get tweets', error });
  }
};

module.exports = { createTweet, getTweetForCurrentUser, getAllTweetByTime, getAllTweetByIdUser, getTweetByIdTweet };
