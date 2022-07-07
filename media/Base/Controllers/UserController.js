import UserModel from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'


// get all user
export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find()

    users = users.map((user) => {
      const { password, ...otherDetails} = user._doc
      return otherDetails
    })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error)
  }
}

// get a User
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("Người dùng không tồn tại");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// // update a user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentUserAdminStatus, password } = req.body;

  if (id === _id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      const token = jwt.sign(
        {
          username: user.username, 
          id: user._id
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h"
        }
      )
      res.status(200).json({user, token});

        
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Bạn chỉ có thể truy cập vào hồ sơ riêng của bạn");
  }
};

// // Delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdminStatus } = req.body;

  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("Xóa người dùng thành công");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Bạn chỉ có thể xóa hồ sơ của chính mình");
  }
};

// // Follow a User
export const followUser = async (req, res) => {
  const id = req.params.id;

  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("không thể follow chính bạn");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("Đang follow");
      } else {
        res.status(403).json("Đã Follow");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

// // UnFollow a User
export const UnFollowUser = async (req, res) => {
  const id = req.params.id;

  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Đây là bạn");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (followUser.followers.includes(_id)) {
        await followUser.updateOne({ $pull: { followers: _id } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("Đã bỏ follow");
      } else {
        res.status(403).json("Chưa follow");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
