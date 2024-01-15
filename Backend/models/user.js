const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  }
});

userSchema.pre('save', async function (next) {           //purpose of this hook is to hash the user's password before saving it
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);             //This hashed password is then assigned to the user.password field.
  user.confirmPassword = await bcrypt.hash(user.confirmPassword, salt);
  next();                                                               //next() is a function that, when invoked, passes control to the next middleware in the stack
});

userSchema.methods.comparePassword = async function (candidatePassword) {      //bcrypt.compare to check if the provided password matches the stored hashed password
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
