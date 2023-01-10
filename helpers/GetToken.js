export default class GetToken {
  static handleGetToken(req) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      return token;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
