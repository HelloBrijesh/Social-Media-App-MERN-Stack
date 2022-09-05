import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { User, RefreshToken } from "../../model";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginController = {
  async login(req, res, next) {
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    });

    const { error } = loginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (!user) {
        return next(CustomErrorHandler.wrongCredential("Username or Password is wrong"));
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return next(CustomErrorHandler.wrongCredential("Username or password is wrong"));
      }

      let access_token = jwt.sign({ _id: user._id, email: user.email }, ACCESS_TOKEN_KEY, { expiresIn: "60s" });
      let refresh_token = jwt.sign({ _id: user._id, email: user.email }, REFRESH_TOKEN_KEY, { expiresIn: "1y" });

      await RefreshToken.create({ token: refresh_token });

      return res.json({ status: "success", access_token: access_token, refresh_token: refresh_token });
    } catch (error) {
      return next(error);
    }
  },
};

export default loginController;
