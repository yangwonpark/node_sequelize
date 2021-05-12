// 컨트롤러 역할
const db = require('../../models');

exports.get_products = ( _ , res) => {
    // res.render('admin/products.html',
    //     { message : "hello"}
    // );

    db.Products.findAll({

    }).then((productList) => {
        res.render('admin/products.html', {
            // productList : productList
            productList     // key = value 면 하나만 적어도 됌
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