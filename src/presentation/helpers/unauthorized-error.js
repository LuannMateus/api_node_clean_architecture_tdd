class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized')
    this.name = 'Unauthorized'
  }
}

module.exports = UnauthorizedError
