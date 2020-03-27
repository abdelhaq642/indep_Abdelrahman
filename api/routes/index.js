const express = require('express');
const cors = require('cors');
const router = express.Router();
const mysql = require('mysql');
const app = express();

app.use(cors());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: 'mydb'
});

con.connect(err => {
  if (err) throw err;
  console.log("Connected!");
});

// console.log(con);

app.get('/', (req,res) => {
  res.send("Hello from index server")
});

app.get('/results', (req, res) => {
  const {text} = req.query;
  var search = {contentname: text, contentbody: text};
  con.query(
      'SELECT contentname,contentbody FROM content WHERE contentname LIKE ? OR contentbody LIKE ?',
      [search.contentname, search.contentbody],
      (err, result) => {
        if (err) {
          return res.send(err);
        } else {
          return res.json({
            data: result
          });
        }
      }
  );
});

app.listen(4000, () => {
  console.log('Server listening on port 4000')
});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
