const UserSchema = require('../models/schemas/users.schemas'); //schemas User model
const FollowingSchema = require('../models/schemas/following.schemas');
const bcrypt = require('bcrypt'); //encode password
const jwt = require('jsonwebtoken');
const secret_key = require('../../configs/jwt.configs');
const generateAccessToken = require('../utils/accessToken');
const sendRegistrationEmail = require('../utils/mailer');
const mongoose = require('mongoose');
// const { router } = require('../app');

//REGISTER Users
const register = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    console.log('req', req.body);
    //Encode password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserSchema({ fullname, username, email, password: hashedPassword });

    const savedUser = await newUser.save();

    //Gửi email
    await sendRegistrationEmail(savedUser);

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' + ' ' + error });
  }
};

//LOGIN Users

const login = async (req, res) => {
  try {
    // Xác thực thông tin đăng nhập
    const { email, password } = req.body;
    const user = await UserSchema.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Tạo access token
    const accessToken = generateAccessToken(user._id);

    // Trả về access token trong phản hồi
    // console.log(accessToken);
    res.status(200).json({ accessToken, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error loggin user' + ' ' + error });
  }
};

//GET ALL Users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserSchema.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting all users', error);
    res.status(500).json({ error: 'Error getting all users' });
  }
};

//GET ME PROFILE
const getMeProfile = async (req, res) => {
  try {
    const userId = req.userId; // Lấy thông tin người dùng từ access token
    // console.log(222222, userId);
    const user = await UserSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user profile', error);
    res.status(500).json({ error: 'Error getting user profile' });
  }
};

//Get Suggest Follow
const suggestFollow = async (req, res) => {
  try {
    const userId = req.userId; // Lấy thông tin người dùng từ access token
    // console.log(222222, userId);
    const suggestedUsers = await UserSchema.aggregate([
      // Bước 1: Tìm tất cả người dùng chưa được theo dõi và không phải là người dùng hiện tại
      {
        $match: {
          _id: { $ne: mongoose.Types.ObjectId.createFromHexString(userId) },
        },
      },
      // Bước 2: Thêm trường "isFollowed" để kiểm tra xem người dùng hiện tại đã theo dõi người dùng này hay chưa
      {
        $lookup: {
          from: 'Following',
          let: { followedUserId: '$_id', currentUser: mongoose.Types.ObjectId.createFromHexString(userId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$followed_userId', '$$followedUserId'] },
                    { $eq: ['$current_userId', '$$currentUser'] },
                  ],
                },
              },
            },
          ],
          as: 'isFollowed',
        },
      },
      // Bước 3: Loại bỏ người dùng đã được theo dõi
      {
        $match: {
          isFollowed: { $eq: [] },
        },
      },
      // Bước 4: Sắp xếp theo thời gian tạo ngược dần
      {
        $sort: {
          createdAt: -1,
        },
      },
      // Bước 5: Giới hạn số lượng kết quả gợi ý
      {
        $limit: 10,
      },
    ]);
    res.status(200).json(suggestedUsers);
  } catch (error) {
    console.error('Error getting suggested users', error);
    res.status(500).json({ error: 'Error getting suggested users' });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Lấy thông tin người dùng url
    console.log(222222, userId);
    const user = await UserSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user profile', error);
    res.status(500).json({ error: 'Error getting user profile' });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getMeProfile,
  suggestFollow,
  getUserById,
};
