import UserModel from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'


// Registering a new User
export const registerUser = async (req, res) => {


  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass
  const newUser = new UserModel(req.body);
  const {username} = req.body

  try {

    const oldUser = await UserModel.findOne({username})

    if(oldUser) {
      return res.status(400).json({message: "Tên người dùng đã được đăng ký"})
    }

    const user = await newUser.save();
    const token = jwt.sign({
      username: user.username,
      id: user._id
    }, process.env.JWT_KEY, {expiresIn: '1h'})
    res.status(200).json({newUser, token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// login User

export const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await UserModel.findOne({username: username})


        if(user)
        {
            const validity = await bcrypt.compare(password, user.password)


            if (!validity) {
              res.status(400).json("Sai mật khẩu");
            } else {
              const token = jwt.sign(
                { 
                  username: user.username, 
                  id: user._id 
                },
                  process.env.JWT_KEY,
                { expiresIn: "1h" }
              );
              res.status(200).json({ user, token });
            }
        }
        else{
            res.status(404).json("Tài khoản không tồn tại")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}