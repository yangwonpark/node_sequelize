// 대분류 URL + 폴더 위치
const {Router} = require('express');
const router = Router();
                            // 폴더명
router.use('/admin', require('./admin'));

module.exports = router;