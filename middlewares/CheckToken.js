import jwt from 'jsonwebtoken';
import GetToken from '../helpers/GetToken';

export default class CheckToken {
  static async handleCheckToken(req, res, next) {
    try {
      if (!req.headers.authorization) {
        res.status(401).json({ message: 'Acesso negado!' });
        return;
      }

      const token = GetToken.handleGetToken(req);

      if (!token) {
        res.status(401).json({ message: 'Acesso negado!' });
        return;
      }

      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).json({ message: 'O Token é inválido!' });
      return;
    }
  }
}
