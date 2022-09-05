import { RefreshToken } from "../../model";

const logoutController = {
  async logout(req, res, next) {
    const { refresh_token } = req.body;
    let result;
    try {
      result = await RefreshToken.deleteOne({ token: refresh_token });
    } catch (error) {
      return next(new Error("Something wrong went in database"));
    }
    res.json(result);
  },
};
export default logoutController;
