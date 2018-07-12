import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import multer from 'multer';
import PythonShell from 'python-shell';
import { mkdir } from 'fs';

/* eslint-disable no-console */

var fileUploadName = "";
var directory = "";

var upload = multer({ dest: 'uploads' });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    fileUploadName = Date.now() + '-' + file.originalname;
    cb(null, fileUploadName)
  }
});

var upload = multer({ storage: storage }).single('file');

const port = 3000;
const app = express();
const compiler = webpack(config);


app.post('/fileupload', function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      res.send(err);
    }
    
    try {
      directory = 'uploads/' + fileUploadName + '-Frames';
      mkdir(directory);
    } catch (err) {
      console.log(err)
    }
    res.sendStatus(200).end('File upload successful');

  });
});

app.get('/extract', function (req, res) {
  let options = {
    scriptPath: path.join(__dirname),
    pythonPath: 'uploads/Python36/python',
    args: ['-vid', 'uploads/' + fileUploadName, '-dir', directory]
  }

  try {

    var pyshell = new PythonShell('ExtractFramesFromVideo.py', options);
  }
  catch (err) {
    console.log("error = " + err);
  }

  let ImagesData = [];
  let count = 1;
  pyshell.on('message', function (message) {
    var randomnumber = (count / 2 == 0 ? 2 : 1);
    ImagesData.push({
      img: message,
      title: 'Image' + count.toString(),
      author: 'author' + count.toString(),
      cols: randomnumber,
    });
    count++;
  })

  pyshell.end(function (err, code, signal) {
    if (err) console.log("error = " + err);
    console.log('The exit code was: ' + code);
    console.log('The exit signal was: ' + signal);
    console.log('finished');
    res.status(200).json(ImagesData);
  });

});



app.post('/evaluate', function (req, res) {
  res.setHeader('Content-Type', 'text/event-stream');
  let options = {
    scriptPath: (path.join(__dirname, '/neural-image-assessment')),
    pythonPath: 'uploads/Python36/python',
    args: ['-dir', directory]
  }

  try {

    var pyshell = new PythonShell('evaluate_mobilenet.py', options);
  }

  catch (err) {
    console.log("error = " + err);
  }

  //let display = [];
  pyshell.on('message', function (message) {
    /*display.push({
      line: message,
    });
    console.log(message);*/
    res.write(message);
    res.flushHeaders();
  });

  pyshell.end(function (err, code, signal) {
    if (err) console.log("error = " + err);
    console.log('The exit code was: ' + code);
    console.log('The exit signal was: ' + signal);
    console.log('finished');
    res.end();

  });


});


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(express.static(path.join(__dirname, '../')));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});


app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});