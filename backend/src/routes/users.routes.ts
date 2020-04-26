import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../service/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthentidated';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../service/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// patch é usado para alterar uma única informação. Put é usado para várias.
// upload.single -> informa que será feito upload de um único arquivo e 'avatar é o nome do campo'
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: req.user.id,
        filename: req.file.filename,
      });

      delete user.password;

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },
);

export default usersRouter;
