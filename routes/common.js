var express = require('express');
var router = express.Router();
var common = require('../models/common');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-login');
const CryptoJS = require('crypto-js');
const key = '&World709rrt';
var db = require('../dbconnection');
var bcrypt = require('bcryptjs');

router.get('/getBlock/:district_code', function(req, res) {
    common.getBlock(req.params.district_code, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/checkUsernameExist/:username', function(req, res) {
    common.checkUsernameExist(req.params.username, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/getDistrict', function(req, res) {
    common.getDistrict(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});


router.get('/dept', function(req, res) {
    common.getdept(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});



router.get('/deptidbydomainname/:domain_name', function(req, res) {
    common.getdeptidbydomainname(req.params.domain_name, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
router.get('/noticeboard', function(req, res) {
    common.getnoticeboard(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/uploadmenu', function(req, res) {
    common.getuploadmenu(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/directory/:designation_id', function(req, res, next) {
    common.getdirectory(req.params.designation_id, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });

});

router.get('/designation', function(req, res) {
    common.getdesignation(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/userid/:dept_id', function(req, res, next) {
    common.getuserid(req.params.dept_id, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });

});

router.get('/dept/:dept_id', function(req, res, next) {
    common.getdeptdata(req.params.dept_id, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });

});


router.get('/organization', function(req, res) {
    common.getorganization(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});



router.get('/impinformation', function(req, res) {
    common.getimpinformation(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/scheme', function(req, res) {
    common.getscheme(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/deptlinks/:dept_id', function(req, res, next) {
    common.deptlinks(req.params.dept_id, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });

});


router.get('/deptlinksbytype/:dept_id/:menu_code', function(req, res, next) {
    common.deptlinksbytype(req.params.dept_id, req.params.menu_code, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});



router.get('/getPatientsByDate', checkAuth, function(req, res) {
    common.getPatientsByDate(req.query, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/getCountDetails', checkAuth, function(req, res) {
    common.getCountDetails(req.query, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/getHealthCenter/:district_code', checkAuth, function(req, res) {
    common.getHealthCenter(req.params.district_code, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
router.get('/getDashboardCount/:SHC_id', checkAuth, function(req, res) {
    common.getDashboardCount(req.params.SHC_id, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows[0]);
        }
    });
});

router.put('/updateAction', checkAuth, function(req, res) {

    common.updateAction(req.body, function(err, rows1) {
        if (err) {
            res.json(err);
        } else {
            res.json({ success: true, message: 'Updtaed Success.' });
        }
    });
});


router.put('/updateRevisit', checkAuth, function(req, res) {

    common.updateRevisit(req.body, function(err, rows1) {
        if (err) {
            res.json(err);
        } else {
            res.json({ success: true, message: 'Updation Success.' });
        }
    });
});

router.post('/insert/:table_name', function(req, res, next) {
    var data = req.body;
    var query = "insert into ?? set ?";
    var tablename = req.params.table_name;
    db.query(query, [tablename, data], function(error, results, fields) {
        if (error) throw error;
        res.json(results);

    });
});

router.put('/update/:table_name', function(req, res, next) {
    var data = req.body;
    var query = "UPDATE ?? set ? WHERE dept_id=?";
    var tablename = req.params.table_name;

    db.query(query, [tablename, data, data.dept_id], function(error, results, fields) {
        if (error) throw error;
        res.json(results);

    });
});

router.post('/insertdept/:table_name', function(req, res, next) {
    var data = req.body;
    var query = "insert into ?? set ?";
    var tablename = req.params.table_name;
    db.query(query, [tablename, data], function(error, results, fields) {
        if (error) throw error;
        res.json(results.insertId);
        db.query('INSERT INTO mas_users(dept_id,password,role,user_name) VALUES (?,?,?,?)', [results.insertId, '$2y$12$nDVW0JM9PUtfNkZs0o5/f.WBtOvisMisvrxZgxMj/9Rc907h7tQAa', 3, 'Department Admin']),
            function(error, rows, fields) {
                if (error) throw error;
                // let userid=rows.insertId;
                res.json(rows.insertId);
            }

    });
});



router.post('/insertdept', function(req, res, next) {
    var data = req.body;
    db.query('INSERT INTO mas_dept(deptname_en,deptname_hn,domain_name) VALUES (?,?,?)', [data.deptname_en, date.deptname_hn, data.domain_name], function(error, results, fields) {
        if (error) throw error;
        res.json(results.insertId);
        db.query('INSERT INTO mas_users(dept_id,password,role) VALUES (?,?,?)', [results.insertId, '$2y$12$nDVW0JM9PUtfNkZs0o5/f.WBtOvisMisvrxZgxMj/9Rc907h7tQAa', 2]),
            function(error, rows, fields) {
                if (error) throw error;
                // let userid=rows.insertId;
                res.json(rows.insertId);
            }
    });
});



//#region for ALL USERS
router.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    // var password = CryptoJS.AES.decrypt(req.body.password, key).toString(CryptoJS.enc.Utf8);
    common.login(username, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            if (!rows.length) {
                res.json({
                    success: 0,
                    message: `Wrong credential.`
                })
            } else {

                let user = JSON.parse(JSON.stringify(rows[0]));

                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if (err) {
                        return res.json({
                            success: 0,
                            message: `Wrong credential.`
                        });
                    } else if (result) {
                        let response = {
                            username: user.user_name,
                            role: user.role,
                            dept_id: user.dept_id,
                            dept_foldername: user.domain_name,
                            deptname_en: user.deptname_en,
                            deptname_hn: user.deptname_hn


                        }
                        const token = jwt.sign(response, 'SECreTIsAlwaYSSecRET');
                        res.json({ token: token, success: 1, role: user.role, message: 'Login Success' });
                    } else {
                        res.json({
                            success: 0,
                            message: `Wrong credential.`
                        })
                    }
                });
            }
        }
    });

});

router.put('/changepassword', checkAuth, function(req, res) {

    var deNEWpassword = CryptoJS.AES.decrypt(req.body.Newpassword, key).toString(CryptoJS.enc.Utf8);
    var depassword = CryptoJS.AES.decrypt(req.body.password, key).toString(CryptoJS.enc.Utf8);

    common.getCurrentpassword(req.body.username, req.body.UserTypeCode, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            if (depassword == rows[0].password) {
                common.changepassword(deNEWpassword, req.body.username, req.body.UserTypeCode, function(err, rows1) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json({ success: true, message: 'password changed.' });
                    }
                });
            } else {
                res.json({ success: false, message: 'वर्तमान पासवर्ड गलत है !' });
            }
        }
    });
});
//#endregion ALL USERS





module.exports = router;