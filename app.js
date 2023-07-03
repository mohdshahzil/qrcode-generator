const express = require('express');
const ejs = require('ejs');
const path = require('path');
const qrcode = require('qrcode');

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.get("/", (req, res) => {
    res.render('index.ejs');
})

app.post('/scan',(req,res)=>{
    const inputText = req.body.text;
    console.log(inputText);
    qrcode.toDataURL(inputText,(err,src)=>{
        res.render('scan.ejs',{
            qr_code: src
            
        });
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});