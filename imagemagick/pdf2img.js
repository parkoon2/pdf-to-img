'use strict'

const path = require('path');
const exec = require('child_process').exec;;
const fs = require('fs')
const Async = require('async');

function PDFConverter() { }

PDFConverter.prototype = {

    setOption : function (option) {
        this.option = option || {};
        this.type = option.type || 'png';
        this.density = option.density || 300;
        this.outputdir = option.outputdir || __dirname + path.sep + 'tmp';
        this.outputname = option.outputname || 'output';
    },

    convert : function (pdf, callback) {
        let self = this;
        return new Promise(function (resolve, reject) {

            Async.waterfall([
                function (next) {
                    isFileEixist(pdf) ? next() : resolve('Cannot find output dirctory');
                },
                function (next) {
                    isFileEixist(pdf) ? next() : resolve('Cannot find PDF file');
                },
                function (next) {
                    let convertCmd = `magisck convert -density ${self.density} ${pdf} ${self.outputdir}${path.sep}${self.outputname}-%d.${self.type}`
                    console.log(convertCmd)
                        exec(convertCmd, function (err, stdout, stderr) {
                            err ? reject('Command Error (you have to install Imagemagick & Ghostscript)') : resolve('Convert done!');
                        });
                }
            ])

        })
        // PDF 파일이 존재하는지 체크

    }
}

const isFileEixist = function (pdf) {
    try {
        return fs.statSync(pdf).isFile();
    } catch(e) {
        return false;
    }
}

const isDirEixist = function (dir) {
    try {
        return fs.statSync(dir).isDirectory();
    } catch(e) {
        return false;
    }
}


exports.PDFConverter = PDFConverter; 