const express = require("express");
const multer = require('multer');
const fs = require('fs');

const {
    addCarrier,
    getCarriers,
    getSingleCarrier,
    updateSingleCarrier,
    deleteSingleCarrier,
    uploadCarrierLogo,
    getCarrierLogo
} = require("../controllers/carriers");

const router = express.Router();

router.post('/', addCarrier);

router.get('/', getCarriers);

router.get('/:id', getSingleCarrier);

router.patch('/:id', updateSingleCarrier);

router.delete('/:id', deleteSingleCarrier);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = `files/carriers/${req.params.id}`;
      fs.mkdirSync(folder, { recursive: true });
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      cb(null, req.params.id);
    }
  });
  
  const upload = multer({ storage: storage });

router.post('/upload/:id', upload.single('image'), uploadCarrierLogo);

router.get('/image/:id', getCarrierLogo);

module.exports = router;