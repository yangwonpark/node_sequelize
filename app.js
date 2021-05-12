const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const db = require('./models');     // 폴더만 넣고 뒤에 js를 생략하면 index.js를 불러온다

class App {
    constructor() {

        this.app = express();

        // db 접속
        this.dbConnection();

        // 뷰엔진 세팅
        this.setViewEngine();

        // 미들웨어 세팅
        this.setMiddleWare();

        // 정적 디렉토리 추가
        this.setStatic();

        // 로컬 변수
        this.setLocals();

        // 라우팅
        this.getRouting();

        // 404
        this.status404();

        // 에러처리
        this.errorHandler();
    }

    dbConnection() {
        db.sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .then(() => {
            console.log('DB Sync complete.');
            // return db.sequelize.sync();         // sequelize.sync() : Sequelize가 초기화 될 때 DB에 필요한 테이블을 생성하는 함수
        })
        .catch(err => {
            console.log('Unable to connect to the database:', err);
        });
    }

    setViewEngine() {
        nunjucks.configure('template', {
            autoescape: true,
            express: this.app
        });
    }

    setMiddleWare() {
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded());
    }

    setStatic() {
        this.app.use('/uploads', express.static('uploads'));
    }

    setLocals() {
        this.app.use( (req, res, next) => {
            this.app.locals.isLogin = true;
            this.app.locals.req_path = req.path;
            next();
        });
    }

    getRouting() {
        this.app.use(require('./controllers'));
    }

    status404() {
        this.app.use(( req, res, _ ) => {
            res.status(404).render('common/404.html');
        });
    }

    errorHandler() {
        this.app.use( (err, req, res, _ ) => {
            res.status(500).render('common/500.html');
        });
    }
}

module.exports = new App().app;