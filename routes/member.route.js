const express = require('express');
const router = express.Router();
var sha1 = require('sha1');
var generator = require('generate-password');
const format = require('date-format');
const multer = require('multer');
const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;
var request = require('request');
var convertRupeesIntoWords = require('convert-rupees-into-words');
const knex = require('../knex/knex.js');
var DateDiff = require('date-diff');
var zeropad = require('zeropad');
var moment = require('moment');
var urlencode = require('urlencode');
var otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer');
var implode = require('implode')
var defaultImg = 'admin.png';


router.post('/checkcurrentpwd', (req, res, next) => {
    console.log(req.body);
    var memid = req.body.idvalue;
    var currentpwd = req.body.bname;
    var pwd = (sha1(currentpwd));
    console.log(pwd);
    console.log(memid);
    knex.select()
        .from('employee')
        .where({ password: pwd })
        .where({ idemployee: memid })
        .then(function(result) {
            console.log(result);
            if (result == undefined || result == '' || result == null) {
                console.log("hi")
                res.json({ status: false, });
            } else {
                console.log("bye")
                res.json({
                    result: result,
                    status: true,
                });
            }
        });
});

router.post('/changepwd', function(req, res) {
    console.log(req.body);
    const pwd = (sha1(req.body.cpwd));
    console.log(pwd);

    knex('employee')
        .where({ idemployee: req.body.idvalue })
        .update({
            password: pwd,
            orgpassword: req.body.cpwd
        })
        .then(function(result) {
            if (result == undefined || result == '' || result == null) {
                res.json({ message: "Not Update", status: false });
            } else {
                res.json({
                    result: result,
                    status: true,
                });
            }
        });
});
const azureStorage = new MulterAzureStorage({
    connectionString: 'DefaultEndpointsProtocol=https;AccountName=mindfinfiles;AccountKey=4NrEY0vfXnyvJVohjkXXcBLZDfYnCCUqO/HfnaTnhmiYAYxj0n9cbVRvheeNcvdEwJFnh4DhA1Uf7Uxbcq4ocw==;EndpointSuffix=core.windows.net',
    accessKey: '4NrEY0vfXnyvJVohjkXXcBLZDfYnCCUqO/HfnaTnhmiYAYxj0n9cbVRvheeNcvdEwJFnh4DhA1Uf7Uxbcq4ocw==',
    accountName: 'mindfinfiles',
    containerName: 'mindfin-docment-scan',
    containerAccessLevel: 'blob',
    urlExpirationTime: 60,
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf' || file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel' || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 'application/octet-stream' || 'application/zip') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: azureStorage,
    limits: {
        fileSize: 150 * 1024 * 1024
    },
    fileFilter: fileFilter,
});

router.post('/image-upload', upload.any(), (req, res) => {
    console.log(req.files)
    return res.json({ 'imageUrl': req.files });
});


module.exports = router;