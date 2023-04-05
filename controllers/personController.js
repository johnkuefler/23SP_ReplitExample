const Person = require('../models/person');

exports.create = async function(req, res) {
  let person = new Person({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
  });

  try {
    await person.save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};

exports.update_get = async function(req, res) {
  var person = await Person.findOne({ _id: req.query.id });
  res.render('update', person);
}

exports.update = async function(req, res) {
  const updateData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
  };

  var result = await Person.findOneAndUpdate({ _id: req.body.id }, updateData)
  res.redirect('/');
}

exports.delete = async function(req, res) {
  console.log(req.query);
  await Person.findOneAndDelete({ _id: req.query.id });
  res.redirect('/');
}

exports.getall = async function(req, res) {
  try {
    var returnedPeople = await Person.find({});
    console.log(returnedPeople);
    res.render('index', { persons: returnedPeople });
  } catch (err) {
    console.log(err);
  }
};