const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new Schema({ 
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  first_name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  profile: [
    {
      biography: {type: String},
      skills: [{type: String,}],
      links: [{type: String,}],
      subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    } 
  ]
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;