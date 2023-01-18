var pool = require('./bd');

async function getProductos() {
    var query = 'select * from productos';
    var datos = await pool.query(query);
    return datos;

}

async function insertProductos(obj){
    try{
        var query = 'insert into productos set ?';
        var datos = await pool.query(query, [obj]);
        return datos;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

async function getProductosById(id){

    var query = 'select * from productos where id=?';
    var datos = await pool.query(query, [id]);
    return datos[0];

}

async function editProductos(obj, id){

    var query = 'update productos set ? where id=?';
    var datos = await pool.query(query, [obj, id]);
    return datos;

}

async function deleteProductos(id){
    var query = 'delete from productos where id=?';
    var datos = await pool.query(query, [id]);
    return datos;
}

module.exports = {getProductos, insertProductos, getProductosById, editProductos, deleteProductos};