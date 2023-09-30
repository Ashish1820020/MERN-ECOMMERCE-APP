
const bcrypt = require('bcrypt')

async function hashPassword (password){
    try {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}



async function comparePassword (password, hashedPassword){
  return bcrypt.compare(hashedPassword, password);
}

module.exports = {hashPassword, comparePassword};