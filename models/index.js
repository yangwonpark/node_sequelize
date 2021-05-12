let Sequelize = require('sequelize');
let path = require('path');
let fs = require('fs');
let dotenv = require('dotenv');

dotenv.config();    // LOAD CONFIG

const sequelize = new Sequelize(process.env.DATABASE,
    process.env.DB_USER, process.env.DB_PASSWORD, {
        host:process.env.DB_HOST,
        dialect: 'mysql',
        timezone: '+09:00',         // 한국 시간
        operatorsAliases: Sequelize.Op,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });

let db = [];

// index.js를 제외하고 모든 js 파일을 싱크를 걸어서 table을 생성
fs.readdirSync(__dirname)
    .filter(file => {
        return file.indexOf('.js')&& file !== 'index.js'        
    })
    .forEach(file => {
        let model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

// 외래키 세팅해주는 부분
Object.keys(db).forEach(modelName => {                          
    if("associate" in db[modelName]){
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;











