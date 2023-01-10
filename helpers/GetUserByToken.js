import jwt from 'jsonwebtoken';
import User from '../models/User';

export default class GetUserByToken {
  static async handleGetUserByToken(token, req, res) {
    if (!token) {
      res.status(401).json({ message: 'Acesso negado!' });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
      const user = await User.findOne({ _id: userId });
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
