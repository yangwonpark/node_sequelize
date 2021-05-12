// admin url + 미들웨어를 매핑하는 역할
// 여기서 만드는 get, post 등의 메소드 방식을 admin.ctrl.js에서 제어한다

const { Router } = require('express');
const router = Router();
const ctrl = require('./admin.ctrl');

router.get('/products', ctrl.get_products);

router.get('/products/write', ctrl.get_products_write);

router.post('/products/write', ctrl.post_products_write);

router.get('/products/detail/:id', ctrl.get_products_detail );

// 실제 edit.html을 만들진않고, write.html을 재활용한다
router.get('/products/edit/:id', ctrl.get_products_edit);

router.post('/products/edit/:id', ctrl.post_products_edit);

router.get('/products/delete/:id', ctrl.get_products_delete);

module.exports = router;