var express = require('express');
var router = express.Router();

const folderView	 = __path_views + 'pages/dashboard/';

router.get('/', function(req, res, next) {
  res.render(`${folderView}index`, { pageTitle: 'Dashboard Page', 'courseName': '<p>NodeJS</p>' });
});

module.exports = router;
