const MongoHelper = require('../helpers/mongo-helper')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')
const { MissingParamError } = require('../../utils/errors/index')

let db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)

  return {
    userModel,
    sut
  }
}

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)

    db = await MongoHelper.getDb()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return null if no user is found', async () => {
    const { sut } = makeSut()

    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    const { sut, userModel } = makeSut()
    const userInserted = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })

    const fakeUser = await userModel.findOne({ _id: userInserted.insertedId })

    const user = await sut.load('valid_email@mail.com')

    expect(user).toEqual({ _id: fakeUser._id, password: fakeUser.password })
  })

  test('Should throw if no userModel is provided', async () => {
    const sut = new LoadUserByEmailRepository()

    const promise = sut.load('invalid_email@mail.com')
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()

    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })
})
