import jwt from 'jsonwebtoken';

export default class CreateUserToken {
  static async handleCreateUserToken(user, req, res) {
    // Create a token
    const token = jwt.sign(
      {
        name: user.name,
        id: user._id,
      },
      process.env.JWT_SECRET,
    );

    // Return token
    res.status(200).json({
      message: 'Você está autenticado',
      token,
      userId: user._id,
    });
  }
}
