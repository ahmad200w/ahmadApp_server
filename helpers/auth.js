const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  try {

    if (!password || typeof password !== 'string') {
      throw new Error('Invalid password input');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    console.error('Error hashing password:', err.message);
    throw new Error('Failed to hash password');
  }
};

const comparePassword = async (password, hashed) => {
  try {
    if (!password || typeof password !== 'string' || !hashed || typeof hashed !== 'string') {
      throw new Error('Invalid input for password comparison');
    }
    const result = await bcrypt.compare(password, hashed);
    return result;
  } catch (err) {
    console.error('Error comparing password:', err.message);
    throw new Error('Failed to compare password');
  }
};

module.exports = {
  hashPassword,
  comparePassword
};