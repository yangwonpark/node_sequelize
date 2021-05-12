// 컨트롤러 역할
const db = require('../../models');

// 밑에 나오는 Products는 models/Products.js 에서 sequelize.defint('Products')(Products)와 일치한다

exports.get_products = ( _ , res) => {
    // res.render('admin/products.html',
    //     { message : "hello"}
    // );

    db.Products.findAll({

    }).then((products) => {
        res.render('admin/products.html', {
            // products : products
            products     // key = value 면 하나만 적어도 됌
        })
    });
}

exports.get_products_write = (req, res) => {
    res.render('admin/write.html');
}

exports.post_products_write = (req, res) => {
    // res.send(req.body);
    db.Products.create(req.body).then( () => {
        res.redirect('/admin/products');
    });
    // db.Products.create({
    //     name : req.body.name,
    //     price : req.body.price,
    //     description: req.body.description
    // }).then( () => {
    //     res.redirect('/admin/products');
    // });
}

exports.get_products_detail = ( req , res ) => {
    db.Products.findByPk(req.params.id).then( (product) => {
        res.render('admin/detail.html', { product: product });  
    });
};