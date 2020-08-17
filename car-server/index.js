const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_CARS_QUERY = 'SELECT * FROM Car';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'weber',
    password: '5',
    database: 'react_sql'
});

connection.connect(err =>{
    if(err){
        return err;
    }
});

// console.log(connection);

app.use(cors());

app.get('/', (req, res) => {
    res.send('go to /cars to see car listing')
});

app.get('/cars/add', (req, res) => {
    const { name, price } = req.query;
//    console.log(name,price);
//    res.send('adding car');
    const INSERT_CARS_QUERY = `INSERT INTO Car (name, price) VALUES('${name}', '${price}')`;
    connection.query(INSERT_CARS_QUERY, (err, results) =>{
        if(err){
            return res.send(err);
        }
        else{
            return res.send('successfully added car');
        }
    });  
});

app.get('/cars', (req, res) =>{
    connection.query(SELECT_ALL_CARS_QUERY, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                data:results
            })
        }
    });
});


app.listen(4000, () => {
    console.log(`Car server listening on port 4000`)
});