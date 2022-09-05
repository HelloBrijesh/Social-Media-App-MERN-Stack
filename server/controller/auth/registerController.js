import { User, RefreshToken } from "../../model";
import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../config";
const registerController = {
  async register(req, res, next) {
    const registerSchema = new Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    });

    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { name, email, password } = req.body;

    try {
      const exist = await User.exists({ email: email });

      if (exist) {
        return res.json({ message: "Already exits" });
      }
    } catch (error) {
      return next(CustomErrorHandler.emailExists("This email is already registered"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    let access_token;
    let refresh_token;
    try {
      const result = await user.save();

      access_token = jwt.sign({ _id: result._id, email: result.email, name: result.name }, ACCESS_TOKEN_KEY, { expiresIn: "60s" });
      refresh_token = jwt.sign({ _id: result._id, email: result.email, name: result.name }, REFRESH_TOKEN_KEY, { expiresIn: "1y" });
      await RefreshToken.create({ token: refresh_token });
    } catch (error) {
      return next(error);
    }
    return res.json({ access_token, refresh_token, status: "success" });
  },
};

export default registerController;
