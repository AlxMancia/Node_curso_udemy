const { Router } = require('express');
const { check } = require('express-validator');
const { categoriesGet, categoryCreate, categoryGet, categoryUpdate, categoryDelete } = require('../controllers/categories');
const { categoryByIdExist } = require('../helpers/db-validators');
const { validateFields, validateJWT, isAdminRole, hasRole} = require('../middlewares')

const router = Router();

//todas las categorias Publico
router.get('/',categoriesGet);




//ID obtener una categoria - publico
router.get('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(categoryByIdExist),
    validateFields
],categoryGet)

//Crear categoria - cualquier persona con un token valido
router.post('/',[
    validateJWT,
    check('name','El nombre de la categoria es obligatorio').not().isEmpty(),
    validateFields
],categoryCreate)

//Actualizar categoria - privado - token valido
router.put('/:id',[
    validateJWT,
    hasRole('ADMIN_ROLE','USER_ROLE'),
    check('name','El nombre de la categoria es obligatorio').not().isEmpty(),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(categoryByIdExist),
    validateFields
], categoryUpdate);

//Borrar categoria - admin
router.delete('/:id',[
    validateJWT,
    hasRole('ADMIN_ROLE','USER_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(categoryByIdExist),
    validateFields
], categoryDelete)

module.exports = router;