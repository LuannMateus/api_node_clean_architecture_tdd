module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://root:root@localhost:27017/CleanNode?authSource=admin',
  tokenSecret: process.env.TOKEN_SECRET || 'secret',
  port: process.env.PORT || 5858
}
