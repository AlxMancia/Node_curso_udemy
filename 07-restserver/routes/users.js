const { Router } = require('express');
const { check } = require('express-validator');

// const { validateFields } = require('../middlewares/validate-fields');
// const { validateJWT }    = require('../middlewares/validateJWT');
// const { isAdminRole, hasRole }    = require('../middlewares/validateRole');
const { validateFields, validateJWT, isAdminRole, hasRole} = require('../middlewares')


const { isRoleValid, emailExist, userByIdExist } = require('../helpers/db-validators');

const { usersGet, usersPost, usersPut, usersDelete, usersPatch } = require('../controllers/users');

const router = Router();

router.get('/',  usersGet );


router.post('/', [
    check('name','El nombres es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y ser mas de seis letras').isLength({ min: 6 }),
    check('email','Email no valido').isEmail(),
    check('email').custom(emailExist),
    //check('role','No es rol permitido').isIn(['ADMIN_ROL','USER_ROL']), 
    // check('role').custom(isRoleValid),
    check('role').custom(isRoleValid),
    // check('role').custom( async (role = '')=>{
    //     const roleExist = await Role.findOne({role});
    //     if(!roleExist){
    //         throw new Error(`EL rol ${ role } no esta registrado en la base de datos`);
    //     }
    // }),
    validateFields
], usersPost);



//el :id agarra lo que viene de la url y en el controlador se agarra para trabajarlo
router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(userByIdExist),
    check('role').custom(isRoleValid),
    validateFields
], usersPut);


router.delete('/:id',[
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE','USER_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(userByIdExist),
    validateFields,
],  usersDelete);


router.patch('/', usersPatch);




module.exports = router;