import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../models/User';
import Photo from '../models/Photo';
import EmailRegex from '../helpers/EmailRegex';
import CreateUserToken from '../helpers/CreateUserToken';
import GetToken from '../helpers/GetToken';
import GetUserByToken from '../helpers/GetUserByToken';

export default class UserControllers {
  static async registerUser(req, res) {
    const {
      firstName,
      secondName,
      contact,
      email,
      userName,
      password,
      confirmPassword,
    } = req.body;

    try {
      if (!firstName) {
        res.status(422).json({ message: 'O primeiro nome é obrigatório.' });
        return;
      }

      if (!secondName) {
        res.status(422).json({ message: 'O segundo nome é obrigatório.' });
        return;
      }

      if (!contact) {
        res.status(422).json({ message: 'O número de contato é obrigatório.' });
        return;
      }

      if (!email) {
        res.status(422).json({ message: 'O email é obrigatório.' });
        return;
      }

      if (!EmailRegex.handleEmailRegex(email)) {
        res
          .status(422)
          .json({ message: 'Insira, por favor, um email válido.' });
        return;
      }

      const emailAlreadyUsed = await User.findOne({ email });

      if (emailAlreadyUsed) {
        res.status(422).json({
          message: 'Usuário já cadastrado! Por favor, insira outro email.',
        });
        return;
      }

      if (!userName) {
        res
          .status(422)
          .json({ message: 'Você precisa definir um nome de usuário.' });
        return;
      }

      if (userName && userName.includes('.com')) {
        res
          .status(422)
          .json({ message: 'O nome de usuário não pode incluir ".com".' });
        return;
      }

      if (userName && userName.includes('-')) {
        res.status(422).json({
          message:
            'O nome de usuário não pode incluir hífens(-), somente sublinhado(_).',
        });
        return;
      }

      if (userName && /[A-Z]/.test(userName)) {
        res.status(422).json({
          message:
            'O nome de usuário não pode conter letras maiúsculas, por favor, use somente minúsculas.',
        });
        return;
      }

      if (userName && /\s/g.test(userName)) {
        res
          .status(422)
          .json({ message: 'O nome de usuário não pode incluir espaços.' });
        return;
      }

      const userNameAlreadyUsed = await User.findOne({ userName });

      if (userNameAlreadyUsed) {
        res.status(422).json({
          message:
            'Usuário já cadastrado! Por favor, insira outro nome de usuário.',
        });
        return;
      }

      if (!password) {
        res.status(422).json({ message: 'A senha é obrigatória.' });
        return;
      }

      if (password && password.length < 6) {
        res
          .status(422)
          .json({ message: 'A senha precisa ter no mímino 6 caracteres.' });
        return;
      }

      if (!confirmPassword) {
        res
          .status(422)
          .json({ message: 'A confirmação de senha é obrigatória.' });
        return;
      }

      if (password !== confirmPassword) {
        res.status(422).json({
          message: 'A senha e a confirmação de senha precisam ser iguais.',
        });
        return;
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        firstName,
        secondName,
        contact,
        email,
        userName,
        password: passwordHash,
      });

      if (!newUser) {
        res.status(422).json({
          message: 'Houve um erro, por favor tente novamente mais tarde aqui.',
        });
        return;
      }

      await CreateUserToken.handleCreateUserToken(newUser, req, res);
      return;
    } catch (error) {
      res.status(422).json({
        message: 'Houve um erro, por favor tente novamente mais tarde.',
      });
      return;
    }
  }

  static async loginUser(req, res) {
    const { userIdentifier, password } = req.body;

    try {
      let userTypeAccess;
      let user;

      if (!userIdentifier) {
        res.status(422).json({ message: 'O usuário/email é obrigatório.' });
        return;
      }

      userTypeAccess = userIdentifier.includes('.com') ? 'email' : 'userName';

      if (
        userTypeAccess === 'email' &&
        !EmailRegex.handleEmailRegex(userIdentifier)
      ) {
        res.status(422).json({ message: 'O email é inválido.' });
        return;
      }

      if (!password) {
        res.status(422).json({ message: 'A senha é obrigatória.' });
        return;
      }

      user =
        userTypeAccess === 'email'
          ? await User.findOne({ email: userIdentifier })
          : await User.findOne({ userName: userIdentifier });

      if (!user) {
        res.status(422).json({
          message: 'Não há usuário cadastrado com este email/nome de usuário.',
        });
        return;
      }

      // Check if password match with db password
      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        res.status(422).json({
          message: 'A senha inserida é inválida.',
        });
        return;
      }

      await CreateUserToken.handleCreateUserToken(user, req, res);
      return;
    } catch (error) {
      res.status(422).json({
        message: 'Houve um erro, por favor tente novamente mais tarde.',
      });
      return;
    }
  }

  static async editUser(req, res) {
    const {
      firstName,
      secondName,
      contact,
      bio,
      email,
      password,
      confirmPassword,
    } = req.body;

    try {
      const token = GetToken.handleGetToken(req);
      const user = await GetUserByToken.handleGetUserByToken(token, req, res);

      let userPhoto = null;

      if (req.file) {
        userPhoto = req.file.filename;
      }

      if (userPhoto) {
        user.userPhoto = userPhoto;
      }

      if (!firstName) {
        res.status(422).json({ message: 'O primeiro nome é obrigatório.' });
        return;
      }

      user.firstName = firstName;

      if (!secondName) {
        res.status(422).json({ message: 'O segundo nome é obrigatório.' });
        return;
      }

      user.secondName = secondName;

      if (!contact) {
        res.status(422).json({ message: 'O número de contato é obrigatório.' });
        return;
      }

      user.contact = contact;

      if (bio) {
        user.bio = bio;
      }

      const emailAlreadyUsed = await User.findOne({ email });

      if (!email) {
        res.status(422).json({ message: 'O email é obrigatório.' });
        return;
      }

      if (email && email !== user.email && emailAlreadyUsed) {
        res.status(422).json({
          message: 'Usuário já cadastrado! Por favor, insira outro email.',
        });
        return;
      }

      if (!EmailRegex.handleEmailRegex(email)) {
        res
          .status(422)
          .json({ message: 'Insira, por favor, uma email válido.' });
        return;
      }

      user.email = email;

      if (password && password.length < 6) {
        res
          .status(422)
          .json({ message: 'A senha precisa ter no mímino 6 caracteres.' });
        return;
      }

      if (password && !confirmPassword) {
        res.status(422).json({
          message: 'A confirmação de senha é obrigatória.',
        });
        return;
      }

      if (confirmPassword && !password) {
        res.status(422).json({
          message: 'A senha é obrigatória.',
        });
        return;
      }

      if (password && confirmPassword && password !== confirmPassword) {
        res.status(422).json({
          message: 'A senha e a confirmação de senha precisam ser iguais.',
        });
        return;
      }

      if (password && confirmPassword && password === confirmPassword) {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        user.password = passwordHash;
      }

      await user.save();
      res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
      return;
    } catch (error) {
      res.status(422).json({
        message: 'Houve um erro, por favor tente novamente mais tarde.',
      });
      return;
    }
  }

  static async deleteUser(req, res) {
    try {
      const token = GetToken.handleGetToken(req);
      const user = await GetUserByToken.handleGetUserByToken(token, req, res);

      await User.findByIdAndDelete(mongoose.Types.ObjectId(user._id));
      await Photo.deleteMany({ userId: user._id });
      res.status(200).json({ message: 'Usuário deletado :(' });
      return;
    } catch (error) {
      res.status(422).json({
        message: 'Houve um erro, por favor tente novamente mais tarde.',
      });
      return;
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.find().select('-password').sort('createdAt');
      res.status(200).json(users);
      return;
    } catch (error) {
      res.status(422).json({
        message: 'Houve um erro, por favor tente novamente mais tarde.',
      });
      return;
    }
  }

  static async getAuthUser(req, res) {
    try {
      const token = GetToken.handleGetToken(req);
      const user = await GetUserByToken.handleGetUserByToken(token, req, res);
      user.password = undefined;

      res.status(200).json(user);
      return;
    } catch (error) {
      res.status(422).json({
        message: 'Houve um erro, por favor tente novamente mais tarde.',
      });
      return;
    }
  }

  static async getUserByUserName(req, res) {
    const { userName } = req.params;

    try {
      const userByUserName = await User.findOne({ userName }).select(
        '-password',
      );

      if (!userByUserName) {
        res.status(404).json({ message: 'Usuário não encontrado.' });
        return;
      }

      res.status(200).json(userByUserName);
      return;
    } catch (error) {
      res.status(422).json({
        message: 'Houve um erro, por favor tente novamente mais tarde.',
      });
      return;
    }
  }
}
