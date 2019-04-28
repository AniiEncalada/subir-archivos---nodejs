'use strict';
var models = require('../models/index');
var Foto = models.archivo;
var uuidv4 = require('uuid/v4');

// Manejo de archivo
var fs = require('fs');
// 1MB en bits
var maxFileSize = 2 * 1024 * 1024;
// Extensiones de archivo
var extensiones = ["jpg", "png", "pdf", "docx"];
var formidable = require('formidable');

class fotoController {
    // Guardar Archivo
    guardarArchivo(req, res, next) {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var extension = files.archivo.name.split(".").pop().toLowerCase();
            if (extensiones.includes(extension)) {
                // pop.- obtiene el ultimo dato del arreglo
                if (files.archivo.size <= maxFileSize) {
                    var nombre = uuidv4() + "." + extension;
                    fs.rename(files.archivo.path, "public/archivo/" + nombre, function (err) {
                        if (err) next(err);
                        Foto.create({ nombre: nombre }).then(newFoto => {
                            if (!newFoto) {
                                req.flash('info', 'Error al guardar', false);
                            } else {
                                req.flash('info', 'Guardado con exito', false);
                            }
                        });
                    });
                } else {
                    fotoController.eliminar(files.archivo.path);
                    req.flash('info', 'Error, el archivo es demasiado grande.', false);
                    console.log('Error, el archivo es demasiado grande.');
                }
            } else {
                fotoController.eliminar(files.archivo.path);
                req.flash('info', 'Error de extensión.', false);
                console.log('Error de extensión, solamente se admite imágenes.');
            }
            res.redirect("/");
        });
    }

    verFoto(req, res) {
        res.render('index', {
            titulo: 'Archivos ',
            external: req.params.external
        });
    }

    static eliminar(link) {
        fs.exists(link, function (exists) {
            if (exists) {
                console.log("file exists Deleting now...");
                fs.unlinkSync(link);
            } else {
                console.log("No se borro" + link);
            }
        });
    }
}
module.exports = fotoController;