module.exports = {
  development: {
    username: process.env.SEQUELIZE_USER,
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'r8slsdf3kfxci3fp',
    dialect: 'mysql',
    host: process.env.SEQUELIZE_HOST,
    port: 3306
  },
  test: {
    username: process.env.TU,
    password: process.env.TP || null,
    database: 'project2_test',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false
  },
  production: {
    host: process.env.SEQUELIZE_HOST,
    dialect: 'mysql'
  }
}
