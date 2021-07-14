module.exports = function (sequelize, DataTypes) {
  const Location = sequelize.define('Location', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    lat: {
      type: DataTypes.FLOAT
    },
    lng: {
      type: DataTypes.FLOAT
    },
    city: {
      type: DataTypes.FLOAT
    }
  })

  return Location
}
