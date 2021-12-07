const express = require('express');
const morgan = require('morgan');
const multer = require('multer');

// Initializations
const app = express();

// Settings
app.set('port', 3000);

// Middlewares
app.use(morgan());

// Start the server
app.listen(app.get('port'), () =>{
    console.log('Server on port:', app.get('port'));
});