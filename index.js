const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

/* Set up the public directory to access images */
app.use(express.static(__dirname + "/public"));

app.use(cors());

/**
 * Database Configuration
 */

/* Create db connection */
const connection = mysql.createConnection({
  /* These variables are subject to change */
  host: 'xq7t6tasopo9xxbs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: 'igpyrjuuad7knf4e',
  password: 'anr253fiwi03k4ef',
  database: 'nvz313l6uwnb5q53',
});

/* connect to db */
connection.connect(err => {
  if (err) throw err
  console.log('Connected to the database')
});

/**
 * Set up Mapping
 */

/* Listening port 4000 */
app.listen(4000, () => {
  console.log('LBP server listening on port 4000')
});

/* Basic Route - temporary, we don't really need it */
app.get('/', (req, res) => {
  res.send('Goto /articles to see article db');
});



app.get('/article', (req, res) => {
  const SELECT_ALL_ARTICLES = 'SELECT articleid, articleTitle, author, articlePic, date FROM article ORDER BY date DESC';
  connection.query(SELECT_ALL_ARTICLES, (err, results) => {
    if (err) throw err;
    return res.json({
      data: results
    })
  });
});

/** Temporary to view the table names */
app.get('/tables', (req, res) => {
  const SELECT_ALL_TABLES = 'show tables';
  connection.query(SELECT_ALL_TABLES, (err, results) => {
    if (err) throw err;
    return res.json({
      data: results
    })
  });
});

app.get('/article/getArticleByID', (req, res) => {
  const articleid = req.query;                       
  const GET_ARTICLE = 'SELECT * FROM articles WHERE ?' ;
  connection.query(GET_ARTICLE, articleid, (err, results) => {
    if (err) throw err;
    return res.json({
      data: results
    })
  });
});

/* Map to FAQ */
app.get('/FAQ', (req, res) => {
  const SELECT_ALL_FAQ = 'SELECT * FROM faq';
  connection.query(SELECT_ALL_FAQ, (err, results) => {
    if (err) throw err;
    return res.json({
      data: results
    })
  });
});