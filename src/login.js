
// Signup-router
const express = require('express')
const router = express.Router()

module.exports = () => {
  const route = new SignUpRouter()
  router.post('/signup', ExpressRouterAdapter.adapt(route))
}

class ExpressRouterAdapter {
  static adapt(router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }

      const httpResponse = await router.route(httpRequest)

      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}

// Presentation
class SignUpRouter {
  async route(httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body
    const user = new SignUpUseCase().signUp(email, password, repeatPassword)

    return {
      statusCode: 200,
      body: user
    }
  }
}

// Domain
// SignUp use case
class SignUpUseCase {
  async signUp(email, password, repeatPassword) {
    if (password === repeatPassword) {
      new AddAccountRepository().add(email, password)
    }
  }
}

// Infra
// Create user
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

class AddAccountRepository {
  async add(email, password) {
    const user = await AccountModel.create({ email, password })
    return user
  }
}
