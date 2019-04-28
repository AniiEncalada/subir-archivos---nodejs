var express = require('express');
var router = express.Router();

//Controllers
var foto = require('../app/controllers/fotoController');
var Foto = new foto();

/* GET home page. */
router.get('/', Foto.verFoto);
router.post('/', Foto.guardarArchivo);

module.exports = router;
