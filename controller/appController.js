module.exports = function (db) {
  return {
    // Get all examples
    getExamples: function (req, res) {
      db.Example.findAll({ where: { UserId: req.session.passport.user.id } }).then(function (dbExamples) {
        res.json(dbExamples)
      })
    },
    // Create a new example
    createExample: function (req, res) {
      db.Example.create(req.body).then(function (dbExample) {
        res.json(dbExample)
      })
    },
    // Delete an example by id
    deleteExample: function (req, res) {
      db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
        res.json(dbExample)
      })
    }
  }
}

////google api search, US city data needs uploaded////
//need to update local host to jawsdb once space is available///

// const mysql = require('mysql');

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "password",
//     database: "cityTest"
//   });
  
//   con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT * FROM cityInfo ORDER BY RAND() LIMIT 1;", function(err, result, fields){
//       if (err) throw err;
//       console.log(result)
//       result.forEach(r => {
//         console.log(`${r.state_name} is the answer. ${r.lat},${r.lng} is the coordinates`)
        
//       });
//     })
//   });