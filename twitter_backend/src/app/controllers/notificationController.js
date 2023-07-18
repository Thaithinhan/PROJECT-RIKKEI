const Notification = require('../models/schemas/notification.schemas');

const createNotification = async ({ sender, receiver, type, tweetId }) => {
  try {
    const notification = new Notification({
      sender,
      receiver,
      type,
      tweetId,
    });

    await notification.save();

    // Không còn res.status(200).json nữa
    return { success: true, notification };
  } catch (error) {
    // Không còn res.status(500).json nữa
    console.error(error.message);
    return { success: false, error: error.message };
  }
};

//Lấy notification
const getNotifications = async (req, res) => {
  const { receiver } = req.params;

  try {
    const notifications = await Notification.find({ receiver }).populate('sender');

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createNotification, getNotifications };
