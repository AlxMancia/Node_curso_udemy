const { Router } = require('express');
const { check } = require('express-validator');
const { loadFiles, updateImg, showImg } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const { validateFields } = require('../middlewares/validate-fields');
const { validateFileToUpload } = require('../middlewares/validateFile');

const router = Router();

router.post('/', validateFileToUpload, loadFiles);

router.put('/:coleccion/:id',[
    validateFileToUpload,
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c,['users','products']) ),
    validateFields
],updateImg)

router.get('/:coleccion/:id',[
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c,['users','products']) ),
    validateFields
],showImg)

module.exports = router;