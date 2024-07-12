const express = require('express');
const mongoose = require('mongoose');
// const flash = require('flash');

const PORT = 3000;

app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://mp348730:169430@nodepractice.titz43a.mongodb.net/node?retryWrites=true&w=majority&appName=nodepractice';
mongoose.connect(dbURI).then(() => 
    {
        console.log('connected to db');
        app.listen(PORT, console.log(`Server started on port ${PORT}`));
    }
).catch((err) =>
    {
        console.log(err);
    }
);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded(
        {
            extended: true
        }
    )
);

// Connect flash
// app.use(flash());

// // Global vars
// app.use((req, res, next) => 
//     {
//         res.locals.success_msg = req.flash('success_msg');
//         res.locals.error_msg = req.flash('error_msg');
//         next();
//     }
// );

app.use('/', require('./routes/routes'));