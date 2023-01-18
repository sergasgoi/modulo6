var express = require('express');
var router = express.Router();
var productosModel = require('../../models/productosModel')

router.get('/', async function (req, res, next) {

    var productos = await productosModel.getProductos();

    res.render('admin/productos', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        productos
    });
});

router.get('/agregar', function (req, res, next){
    res.render('admin/agregar', {
        layout: 'admin/layout'
    });
});

router.get('/editar/:id', async function (req, res, next){
  
    var id = req.params.id;
    var data = await productosModel.getProductosById(id);

    res.render('admin/editar', {
        layout: 'admin/layout',
        data
    });

});

router.get('/delete/:id', async function(req, res, next){

    await productosModel.deleteProductos(req.params.id);
    res.redirect('/admin/productos');
    
});

router.post('/agregar', async function(req, res, next) {
    try{
        if(req.body.titulo != "" && req.body.imagen != "" && req.body.precio != ""){
            await productosModel.insertProductos(req.body);
            res.redirect('/admin/productos');
        }else{
            res.render('admin/agregar',{
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            });
        }
    }catch(error){
        console.log(error);
        res.render('admin/agregar',{
            layout: 'admin/layout',
            error: true,
            message: 'No se cargo la novedad'
        });
    }

});

router.post('/editar', async function(req, res, next) {

    try{
        if(req.body.titulo != "" && req.body.imagen != "" && req.body.precio != ""){
            await productosModel.editProductos(req.body, req.body.id);
            res.redirect('/admin/productos');
        }else{
            res.render('admin/editar',{
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            });
        }
    }catch(error){
        console.log(error);
        res.render('admin/editar',{
            layout: 'admin/layout',
            error: true,
            message: 'No se edito'
        });
    }

});





module.exports = router;