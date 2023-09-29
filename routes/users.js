const express = require("express");

const multer = require('multer');
const fs = require('fs');

const {
    addUser,
    getUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    uploadUserPhoto,
    getUserPhoto
} = require("../controllers/users");

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getSingleUser);
router.post('/', addUser);
router.patch('/:id', updateSingleUser);
router.delete('/:id', deleteSingleUser);



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = `files/users/${req.params.id}`;
      fs.mkdirSync(folder, { recursive: true });
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      cb(null, req.params.id);
    }
  });
  
  const upload = multer({ storage: storage });

router.post('/upload/:id', upload.single('image'), uploadUserPhoto);

router.get('/image/:id', getUserPhoto);


module.exports = router;