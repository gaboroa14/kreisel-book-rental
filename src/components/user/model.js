import { DataTypes } from 'sequelize'

export const dataUser = {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATEONLY
  },
  userType: {
    type: DataTypes.CHAR(1) //Administrador (A), Cliente (C)
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}
