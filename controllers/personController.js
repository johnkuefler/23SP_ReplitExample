const Person = require('../models/person');

exports.create = async function(req, res) {
  let person = new Person({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
  });

  try {
    await person.save();
    res.render('form-submit-confirm', person);
  } catch (err) {
    console.log(err);
  }
};

exports.getall = async function(req, res) {
  try {
    var returnedPeople = await Person.find({});
    console.log(returnedPeople);
    res.render('index', { persons: returnedPeople });
  } catch (err) {
    console.log(err);
  }
};