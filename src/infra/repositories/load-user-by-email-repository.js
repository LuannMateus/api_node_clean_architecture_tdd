class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    const user = await this.userModel.findOne(
      { email },
      { projection: { password: 1 } }
    ) ?? null

    return user
  }
}

module.exports = LoadUserByEmailRepository
