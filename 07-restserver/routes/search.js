const { Router } = require('express');
const { search } = require('../controllers/search');

const router = Router();

router.get('/:colecciones/:termino',search);

module.exports = router;