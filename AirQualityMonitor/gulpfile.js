/// <binding BeforeBuild='default' />
var gulp = require('gulp');
var run = require('gulp-run');

function webpack(cb) {
    run("webpack").exec();
    cb();
}

exports.default = webpack;