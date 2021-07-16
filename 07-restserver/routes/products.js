const { Router } = require('express');
const { check } = require('express-validator');
const { categoriesGet, categoryCreate, categoryGet, categoryUpdate, categoryDelete } = require('../controllers/categories');
const { productCreate, productGet, productsGet, productUpdate, productDelete } = require('../controllers/products');
const { categoryByIdExist, productByIdExist } = require('../helpers/db-validators');
const { validateFields, validateJWT, isAdminRole, hasRole} = require('../middlewares')

const router = Router();

//todos las categorias Publico
router.get('/',productsGet);


//ID obtener una categoria - publico
router.get('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(productByIdExist),
    validateFields
],productGet)


//Crear producto - cualquier persona con un token valido
router.post('/',[
    validateJWT,
    check('name','El nombre del product es obligatorio').not().isEmpty(),
    check('category','No es un id de mongo valido').isMongoId(),
    check('category').custom(categoryByIdExist),
    // check('description','La descripcion es obligatoria').not().isEmpty(),
    validateFields
],productCreate)

//Actualizar categoria - privado - token valido
router.put('/:id',[
    validateJWT,
    hasRole('ADMIN_ROLE','USER_ROLE'),
    check('name','El nombre del producto es obligatorio').not().isEmpty(),
    check('id').custom(productByIdExist),
    check('category').isMongoId(),
    validateFields
], productUpdate);


router.delete('/:id',[
    validateJWT,
    hasRole('ADMIN_ROLE','USER_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(productByIdExist),
    validateFields
], productDelete)


module.exports = router;
