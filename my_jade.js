var jade = require('jade'),
fs = require('fs');
//this data will be sent to jade template
var data = {
title: "Learning Node.js",
author: {
sachin4java: "@http://sachin4java.blogspot.in",
name: "Sachin Rane"
},
tags: ['express', 'node', 'javascript']
}

//read jade template and show html on console

fs.readFile('my_jade.jade', 'utf-8', function(error, source){
var template = jade.compile(source); //jade template static
var html = template(data) //inject the data into template
console.log(html) //generated html
});

//jade.render
console.log('*************jade.render************');
fs.readFile('my_jade.jade', 'utf-8', function(error, source){
var html = jade.render(source, data)
console.log(html)
});

console.log('*************jade.renderFile************');
//jade.renderFile

jade.renderFile('my_jade.jade', data, function(error, html){
console.log(html)
}); 
