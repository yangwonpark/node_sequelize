const express = require('express');
const router = express.Router();

function testMiddleware( req, res, next) {
    console.log('첫번째 미들웨어');
    next();     // 작업을 다음으로 넘겨줌
}

function testMiddleware2( req, res, next) {
    console.log('두번째 미들웨어');
    next();
}

// function loginRequired(req, res, next) {
//     if(로그인 X) {
        
//     } else {
//         next();
//     }
// }

router.get('/', testMiddleware, testMiddleware2, (req, res) => {
    res.send('admin 이후 url');
});

router.get('/products', (req, res) => {
    // res.send('admin products');             // text를 보여줌

    // render(뿌려줄 view 파일) => app.js에서 nunjucks로 선언한 path 이후의 경로만 적어주면 됨
    res.render('admin/products.html' , {
        message : `<h1>태그가 출력됩니다.</h1>`,          // 여기서 선언한 message => html 파일의 {{ message }}     뺵틱으로 묶어주면 html 태그 사용가능
        online : 'express'
    });        
});

router.get('/products/write', (req, res) => {
    res.render('admin/write.html');
});

router.post('/products/write', (req, res) => {
    res.send(req.body.name);        // input tag의 name 속성
});

module.exports = router;

