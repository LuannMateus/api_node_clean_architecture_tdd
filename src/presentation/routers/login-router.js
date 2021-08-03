const HttpResponse = require('../helpers/http-response')

class LoginRouter {
  route(httpRequest) {

    if (Object.keys(httpRequest).length === 0) {
      return HttpResponse.serverError()
    }

    const { email, password } = httpRequest

    if (!email) {
      return HttpResponse.badRequest('email')
    }

    if (!password) {
      return HttpResponse.badRequest('password')
    }
  }
}

module.exports = LoginRouter