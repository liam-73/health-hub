const express = require('express');
const multer = require('multer');

const router = new express.Router();

// authentication
const auth = require('../authentication/auth');

// handlers
const userHandlers = require('../handlers/user.handler');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/img'
  ) {
    cb(null, true);
  }
  cb(null, false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 },
});

router.use(auth);

router.post('/', upload.single('profile'), userHandlers.addUser);

router.get('/', userHandlers.getUsers);

router.get('/:id', userHandlers.getUserById);

router.patch('/:id', upload.single('profile'), userHandlers.editUser);

router.delete('/:id', userHandlers.deleteUser);

router.get('/rates', userHandlers.getUsersByDate);

module.exports = router;
