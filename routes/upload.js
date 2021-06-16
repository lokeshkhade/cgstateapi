var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
multer = require('multer');
var db = require('../dbconnection');
const DIR = './uploads';
/* GET users listing. */
let storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, DIR);
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({ storage: storage });
router.post('/', upload.single('file'), function(req, res, next) {


    if (!req.file) {
        message = "Error! in image upload."
        res.json([{ message: message, status: 'error' }]);

    } else {
        fs.mkdir(req.body.folder_name, { recursive: true }, function(err) {
            if (err) {
                console.log(err)
            } else {
                fs.rename('./uploads/' + req.file.filename, req.body.folder_name + req.file.filename, function(err) {
                    console.log(err);
                });
            }
        })


        message = "Successfully! uploaded";
        res.json({ message: message, status: 'success', filepath: req.body.folder_name.replace('./uploads/', '') + req.file.filename });
    }
});

router.post('/insert', function(req, res, next) {
    var data = req.body;
    db.query('INSERT INTO upload_data(menu_code,dept_id,linkname,menu_tab_linkurl,issuedate,validitydate) VALUES (?,?,?,?,?,?)', [data.menu_code, data.dept_id, data.linkname, data.menu_tab_linkurl, data.issuedate, data.validitydate], function(error, results, fields) {
        if (error) throw error;
        res.json(results.insertId);
        console.log('The solution is: ', results[0]);
    });
})

router.post('/uploadBase', function(req, res, next) {

    let base64Image = req.body.baseImage.split(';base64,').pop();

    let filename = Date.now() + '.png';
    let path = req.body.folder_name + filename;
    fs.writeFile(path, base64Image, { encoding: 'base64' }, function(err) {
        message = "Successfully! uploaded";
        res.json({ message: message, status: 'success', filepath: req.body.folder_name.replace('./uploads/', '') + filename });
    });
})


module.exports = router;