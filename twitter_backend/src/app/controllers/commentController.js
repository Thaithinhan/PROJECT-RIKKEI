const Tweet = require('../models/schemas/tweet.schemas');
const Following = require('../models/schemas/following.schemas');

//TẠO COMMNET MỚI
const createComment = async (req, res) => {
  const userId_tweet = req.userId;
  const { content, parentId, medias } = req.body;

  try {
    const newComment = new Tweet({
      userId_tweet,
      type: 'comment',
      content,
      parentId,
      medias,
    });

    const savedComment = await newComment.save();

    res.status(200).json({ success: true, message: 'Comment created successfully', comment: savedComment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create comment', error });
  }
};

//LẤY HẾT TẤT CẢ COMMENT CỦA 1 BÀI TWEET
const getCommentsByTweetId = async (req, res) => {
  const parentId = req.params.parentid;
  console.log(1111,parentId);

  try {
    const comments = await Tweet.find({ parentId, type: 'comment' }).sort('-createdAt').populate('userId_tweet');

    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get comments', error });
  }
};

module.exports = { createComment, getCommentsByTweetId };
