import CustomErrorHandler from "../services/CustomErrorHandler";
import Joi from "joi";
import { RefreshToken } from "../model";
import jwt from "jsonwebtoken";
import { REFRESH_TOKEN_KEY } from "../config";

const auth = async (req, res, next) => {
  const refreshtokenSchema = new Joi.object({
    refresh_token: Joi.string().required(),
    access_token: Joi.string().required(),
  });

  const { error } = refreshtokenSchema.validate(req.body);

  if (error) {
    return next(CustomErrorHandler.unAuthorized("Tokens are not valid"));
  }
  const { refresh_token, access_token } = req.body;

  try {
    const refreshtoken = await RefreshToken.findOne({ token: refresh_token });
    if (!refreshtoken) {
      return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
    }

    const { _id, email } = await jwt.verify(refresh_token, REFRESH_TOKEN_KEY);
    const user = {
      _id,
      email,
    };
    req.user = user;
    return next();
  } catch (error) {
    return next(CustomErroHandler.unAuthorized("User not found"));
  }
};

export default auth;
