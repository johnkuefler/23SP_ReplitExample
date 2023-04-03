const mongoose = require('mongoose');

const { Schema } = mongoose;

const personSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
});

const Person = mongoose.model('persons', personSchema);

module.exports = Person;
