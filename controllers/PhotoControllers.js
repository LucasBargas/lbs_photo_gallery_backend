import Photo from '../models/Photo';
import GetToken from '../helpers/GetToken';
import GetUserByToken from '../helpers/GetUserByToken';

export default class PhotoControllers {
  static async register(req, res) {
    const { categories } = req.body;

    try {
      const token = GetToken.handleGetToken(req);
      const user = await GetUserByToken.handleGetUserByToken(token, req, res);
      user.password = undefined;

      let singlePhoto = null;

      if (req.file) {
        singlePhoto = req.file.filename;
      }

      if (!singlePhoto) {
        res.status(422).json({
          message: 'Você precisa adicionar uma foto.',
        });
        return;
      }

      if (categories.length === 0) {
        res.status(422).json({
          message: 'Você precisa selecionar ao menos uma categoria.',
        });
        return;
      }

      const newPhoto = {
        photoId:
          Date.now() + String(Math.floor(Math.random() * 1000)).toString(),
        singlePhoto,
        categories,
        userPhoto: user.userPhoto,
        userId: user._id,
        userName: user.userName,
      };

      await Photo.create(newPhoto);
      res.status(200).json(newPhoto);
      return;
    } catch (error) {
      res
        .status(422)
        .json({ message: 'Houve um erro, tente novamente mais tarde!' });
      return;
    }
  }

  static async deletePhotoById(req, res) {
    const { id } = req.params;

    try {
      const token = GetToken.handleGetToken(req);
      const user = await GetUserByToken.handleGetUserByToken(token, req, res);

      const photo = await Photo.findOne({ photoId: id });

      if (!user._id.equals(photo.userId)) {
        res
          .status(422)
          .json({ message: 'Houve um erro, tente novamente mais tarde.' });
        return;
      }

      await Photo.deleteOne({ photoId: id });
      res.status(200).json({ message: 'Foto deletada com sucesso :(' });
      return;
    } catch (error) {
      res.status(422).json({
        message: 'Houve um erro, por favor tente novamente mais tarde.',
      });
      return;
    }
  }

  static async photosByUserName(req, res) {
    const { userName } = req.params;

    try {
      const photos = await Photo.find({ userName }).sort('-createdAt');

      if (photos.length === 0) {
        res.status(422).json({
          message: 'Ainda não há fotos cadastradas pelo usuário.',
        });
        return;
      }

      res.status(200).json(photos);
      return;
    } catch (error) {
      res.status(422).json({
        message: 'Houve um erro, por favor tente novamente mais tarde.',
      });
      return;
    }
  }

  static async allPhotos(req, res) {
    try {
      const photos = await Photo.find().sort('-createdAt');
      res.status(200).json(photos);
      return;
    } catch (error) {
      res.status(404).json({ message: 'Houve um erro.' });
      return;
    }
  }
}
