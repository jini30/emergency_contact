const express = require('express');
const router = express.Router();
const Detail = require('../models/detail');
const QRCode = require('qrcode');

const PORT = 3000;

router.get('/', (req, res) => 
    {
        res.render('home');
    }
);

router.get('/details/:id', (req, res) => 
    {
        const id = req.params.id;
        Detail.findById(id).then((details) =>
            {
                if(details)
                {
                    res.render('details', 
                        {
                            details
                        }
                    );
                }
                else
                {
                    res.redirect('/');
                }
            }
        ).catch((err) => 
            {
                console.log(err);
            }
        );
    }
);

router.post('/generate', (req, res) => 
    {
        const name = req.body.name;
        const phone_number = parseInt(req.body.phone);
        const age = parseInt(req.body.age);
        const b_group = req.body.blood.trim().toLowerCase();
        let address = req.body.area + ', ' + req.body.city;
        address += ', ' + req.body.state + ', ' + req.body.postcode;
        
        const newDetails = new Detail(
            {
                name, 
                phone_number,
                age,
                b_group,
                address
            }
        );
        newDetails.save().then((user) => 
            {
                const id = user._id;
                const url = `http://localhost:${PORT}/details/${id}`;
                console.log(url);
                QRCode.toDataURL(url, (err, qrUrl) => 
                    {
                        if(err)
                        {
                            console.log(err);
                            res.redirect('/');
                        }
                        res.render('success', 
                            {
                                url: qrUrl
                            }
                        );
                    }
                )
            }
        ).catch((err) => 
            {
                console.log(err);
            }
        );
    }
);

module.exports = router;