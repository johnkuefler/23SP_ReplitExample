const Person = require('../models/person');
const excel = require('exceljs');

exports.exportExcel = async function(req, res) {
  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet('Persons');

  let persons = await Person.find({});
  worksheet.columns = [
    { header: 'First Name', key: 'firstName', width: 10 },
    { header: 'Last Name', key: 'lastName', width: 10 },
    { header: 'Date of Birth', key: 'dateOfBirth', width: 10 },
  ]
  worksheet.addRows(persons);

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  );
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=' + 'persons.xlsx',
  );
  return workbook.xlsx.write(res).then(function() {
    res.status(200).end();
  });
}

exports.exportCsv = async function(req, res) {
  let persons = await Person.find({});

  let csv = 'First Name, Last Name, Date of Birth\r\n';
  persons.forEach((person) => {
    csv += person.firstName + ',';
    csv += person.lastName + ',';
    csv += person.dateOfBirth + '\r\n';
  })

  res.header('Content-Type', 'text/csv');
  res.attachment('output.csv');
  return res.send(csv);
}

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