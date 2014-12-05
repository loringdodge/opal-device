// var User = require("./userModel");

// module.exports = {
//   //Grab single user
//   findUser: function(req, res) {
//     User.findById(req.params.id, function(err, user){
//       if (err) return handleError(res, err);
//       if (!user) return res.send(404);
//       return res.json(user);
//     });
//   },
//   //Grab all users
//   findAll: function(req, res) {
//     User.find(function(err, users) {
//       if (err) {
//         return handleError(res, err);
//       }
//       return res.json(200, users);
//     });
//   },
//   //Add new user to DB
//   createUser: function(req, res) {
//     User.create(req.body, function (err, user) {
//       if (err) return handleError(res, err);
//       return res.json(201, user);
//     });
//   }
// };

// function handleError(res, err) {
//   return res.send (500, err);
// }
