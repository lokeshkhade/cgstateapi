var db = require('../dbconnection');
var common = {

    getBlock: function(district_code, callback) {
        db.query(`SELECT DISTINCT BlockCode,BlockName FROM alldistrictblocksofcgs WHERE DistrictCode=? ORDER BY BlockName ASC`, [district_code], callback);
    },
    getuserid: function(dept_id, callback) {
        db.query(`select * from mas_users where dept_id  = ?`, [dept_id], callback);
    },

    getdeptdata: function(dept_id, callback) {
        db.query(`select * from mas_dept where dept_id  = ?`, [dept_id], callback);
    },

    getdeptidbydomainname: function(domain_name, callback) {
        db.query(`Select dept_id from mas_dept where domain_name  = ?`, [domain_name], callback);
    },
    getDistrict: function(callback) {
        db.query(`SELECT DISTINCT DistrictCode,DistrictName FROM alldistrictblocksofcgs ORDER BY DistrictName ASC`, callback);
    },
    getdept: function(callback) {
        db.query(`SELECT *, '' as sn from mas_dept`, callback);
    },
    getnoticeboard: function(callback) {
        db.query(`select * from upload_data LIMIT 5`, callback);
    },

    getuploadmenu: function(callback) {
        db.query(`select * from mas_menu where  uploadflag = 'Y'  and flag='Y'`, callback);
    },

    getdesignation: function(callback) {
        db.query(`select designation_id,designation_name_hindi from mst_designation`, callback);
    },

    getorganization: function(callback) {
        db.query(`select org_name,org_link from main_org_table where org_type = 'E'`, callback);
    },


    getimpinformation: function(callback) {
        db.query(`select * from main_importantlink`, callback);
    },


    getscheme: function(callback) {
        db.query(`select * from main_scheme`, callback);
    },

    getdirectory: function(designation_id, callback) {
        if (designation_id != 0) {
            db.query(`SELECT '' as sn, cd.name, md.designation_name_hindi, cd.cont_office_no,cd.office_address  FROM contact_details cd INNER JOIN mst_designation md ON cd.department_id = md.department_id WHERE md.is_active='Y' AND  md.designation_id = ?`, [designation_id], callback);
        } else {
            db.query(`SELECT '' as sn, cd.name, md.designation_name_hindi, cd.cont_office_no,cd.office_address  FROM contact_details cd INNER JOIN mst_designation md ON cd.department_id = md.department_id WHERE md.is_active='Y'`, callback);
        }
    },

    deptlinks: function(dept_id, callback) {
        if (dept_id != 0) {
            db.query(`select *,'' as sn from upload_data where dept_id  = ?`, [dept_id], callback);
        } else {
            db.query(`select *,'' as sn from upload_data `, callback);
        }

    },

    deptlinksbytype: function(dept_id, menu_code, callback) {
        db.query(`select *,'' as sn from upload_data where dept_id  = ? and menu_code = ?`, [dept_id, menu_code], callback);
    },


    checkUsernameExist: function(username, callback) {
        db.query(`SELECT COUNT(*) AS notavail FROM users u WHERE u.username=?`, [username], callback);
    },
    getDashboardCount: function(SHC_id, callback) {
        db.query(`SELECT TH.SHC_id
        ,(select count(*) from tbl_HomeCare where TH.SHC_id=tbl_HomeCare.SHC_id) AS total
        ,(select count(*) from tbl_HomeCare where TH.SHC_id=tbl_HomeCare.SHC_id and Kit_given='Y') AS Kit_given
        ,(select count(*) from tbl_HomeCare where TH.SHC_id=tbl_HomeCare.SHC_id and Untracable='Y') AS Untracable
        ,(select count(*) from tbl_HomeCare where TH.SHC_id=tbl_HomeCare.SHC_id and HospCcode is not NULL) AS Hospitalize
         ,(select count(*) from tbl_HomeCare where TH.SHC_id=tbl_HomeCare.SHC_id and Death_date is not NULL) AS Death
        FROM tbl_HomeCare TH  where TH.SHC_id='${SHC_id}' GROUP BY TH.SHC_id`, callback);
    },


    //#region All USER
    login: function(username, callback) {
        db.query(`select d.domain_name,  d.deptname_en,d.deptname_hn, u.password, u.user_id, u.user_name, u.dept_id, u.role from mas_users u left JOIN mas_dept d ON u.dept_id=d.dept_id WHERE u.user_id=?`, [username], callback);
    },

    getCurrentPassword: function(UserID, UserTypeCode, callback) {

        return db.query(`select Password from T_lgn WHERE UserID = ${UserID} AND UserTypeCode = ${UserTypeCode}`, callback);

    },
    changePassword: function(Password, UserID, UserTypeCode, callback) {

        return db.query(
            `update T_lgn set Password = ${Password} where UserID = ${UserID} AND UserTypeCode = ${UserTypeCode}`,
            callback);
    },
    //#endregion USER
};
module.exports = common;