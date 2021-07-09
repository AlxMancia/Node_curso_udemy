const { Router } = require('express');
const { usersGet, usersPost, usersPut, usersDelete, usersPatch } = require('../controllers/users');
const router = Router();

router.get('/',  usersGet );

//el :id agarra lo que viene de la url y en el controlador se agarra para trabajarlo
router.put('/:id', usersPut);

router.post('/',  usersPost);

router.delete('/',  usersDelete);

router.patch('/', usersPatch);




module.exports = router;