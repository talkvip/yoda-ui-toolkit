 
var cp = require('glob-cp');
cp.sync('./src/**/*.css', './dist/**/*.css');
cp.sync('./src/**/*.scss', './dist/**/*.scss');
