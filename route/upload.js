const crypto = require('crypto');
const mime = require('mime');
const express = require('express');
const router = express.Router();
const multer = require('multer');
var path = require('path');
var appDir = path.dirname(require.main.filename);

var storage = multer.diskStorage({
   destination: function(req, file, cb) {
      cb(null, `${appDir}/uploads/images`);
   },
   filename: function(req, file, cb) {
      cb(null, file.originalname);
      // crypto.pseudoRandomBytes(16, function(err, raw) {
      //    cb(
      //       null,
      //       "name" + Date.now() + '.' + mime.extension(file.mimetype)
      //    );
      // });
   }
});

const upload = multer({ storage: storage }).any('file');

router.post('/', (req, res, next) => {
   upload(req, res, err => {
      if (err) {
         res.json(err);
      } else {
         res.json({
            succes: 'Image has been uploaded'
         });
      }
      next();
   });
});

module.exports = router;
