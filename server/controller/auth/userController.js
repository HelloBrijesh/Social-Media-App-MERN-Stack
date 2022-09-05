import { User } from "../../model";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_KEY } from "../../config";

const userController = {
  async user(req, res, next) {
    const user = await User.findOne({ _id: req.user._id }).select("-password -createdAt -updatedAt");

    let access_token = jwt.sign({ _id: user._id, email: user.email }, ACCESS_TOKEN_KEY, { expiresIn: "60s" });

    res.json({ name: user.name, access_token: access_token });
  },
};

export default userController;
