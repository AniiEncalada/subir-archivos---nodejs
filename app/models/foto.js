module.exports = function (sequelize, Sequelize) {
    var Archivo = sequelize.define('archivo', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING(100)
        }
    },{
        freezeTableName: true
    });
    return Archivo;
};