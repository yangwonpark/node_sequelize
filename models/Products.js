const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define('Products',
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            name: {type: DataTypes.STRING},
            price: {type: DataTypes.INTEGER},
            description: {type: DataTypes.TEXT}
        }
    );

    // Products에 dateFormat이라는 함수를 추가
    // Arrow function에서 return문 이외의 로직이 없으면 {}, return 생략가능
    Products.prototype.dateFormat = (date) => moment(date).format('YYYY-MM-DD');
    
    // Products.prototype.dateFormat = (date) => {
    //     return moment(date).format('YYYY-MM-DD');
    // }

    return Products;
}