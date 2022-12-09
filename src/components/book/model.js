import { DataTypes } from 'sequelize'

export const dataBook = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  authorName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  availability: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reservations: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fare: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}
