var handlebars = require('handlebars'),
fs = require('fs');
//this data will be sent to handlebars template
var data = {
title: "learning node js", //intentionally given in small case to use with custom helper resgietred
author: {
sachin4java: "@http://sachin4java.blogspot.in",
name: "Sachin Rane"
},
tags: ['express', 'node', 'javascript']
}

//read jade template and show html on console

fs.readFile('hanedlebars.html', 'utf-8', function(error, source){
//register handle bar
	
handlebars.registerHelper('custom_title', function(title){
		var words = title.split(' ');
		for (var i = 0; i < words.length; i++) {
		if (words[i].length > 4) {
		words[i] = words[i][0].toUpperCase() + words[i].substr(1);
		}
		}
		title = words.join(' ');
		return title;
		})
	
	
var template = handlebars.compile(source); 
var html = template(data) //inject the data into template
console.log(html) //generated html
});

