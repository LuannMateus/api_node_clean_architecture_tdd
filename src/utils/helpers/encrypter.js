const bcrypt = require('bcrypt')
const MissingParamError = require('../errors/missing-param-error')
const MisingParamError = require('../errors/missing-param-error')

class Encrypter {
  async compare (value, hash) {
    if (!value) {
      throw new MisingParamError('value')
    }

    if (!hash) {
      throw new MissingParamError('hash')
    }

    const isValid = await bcrypt.compare(value, hash)

    return isValid
  }
}

module.exports = Encrypter
