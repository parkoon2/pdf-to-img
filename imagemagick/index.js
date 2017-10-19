const PDFConverter = require('./pdf2img.js').PDFConverter;
const path = require('path')

let converter = new PDFConverter();
let pdf = __dirname + path.sep + 'tmp/test.pdf';

converter.setOption({
    type: 'png',
    density: 300,
    outputdir: __dirname + path.sep + 'tmp',
    outputname : 'output'
});

converter.convert(pdf).then(function (success) {
    console.log(success)
}, function (err) {
    console.log(err)
})