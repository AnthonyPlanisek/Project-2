module.exports = function (sequelize, DataTypes) {
  const Location = sequelize.define('Location', {
    id: {
      type: DataTypes.INTEGER
    },
    lat: {
      type: DataTypes.INTEGER
    },
    lng: {
      type: DataTypes.INTEGER
    },
    city: {
      type: DataTypes.STRING
    }
  })

  return Location
}
