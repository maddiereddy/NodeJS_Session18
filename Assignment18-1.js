/*
  Creates a node js program using event emitter to read contents of a file
  and prints its contents to the console as wells as handle error using
  event emitter
*/

var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var fs = require('fs');

//Start reading and emit print event when done, emit error event, if error occurred
emitter.on('start_read',function(file_name){
  console.log("Started Reading file....");
  fs.readFile(file_name, 'utf8', function (err,data) {
    if (err) {
      emitter.emit('error','from_read');
    }
    else{
	  console.log("Done Reading file....");
	  emitter.emit('print_content',data);
    }
  });
});

//Start printing content of file when reading is done and emit event as done.
emitter.on('print_content',function(data){
  console.log("Printing content of file....");
  console.log(data);
  emitter.emit('done');
});

//if any error emit event ‘error’
emitter.on('error',function(type){
  console.log("Faced error while "+type);
  emitter.emit('done');
});

//At ‘done’ event, assume the operation is over
emitter.on('done',function(){
  console.log("Ok its done !");
});

//Emit event to start reading file.
emitter.emit('start_read','input.txt');
