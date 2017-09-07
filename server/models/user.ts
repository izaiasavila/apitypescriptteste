import * as bcrypt from 'bcrypt';

export default function (sequelize, DataTypes) {

  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    subname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    company: belongsTo('Company')
  });

  User.beforeCreate((user) => {
    return hashPassword(user);
  });

  User.beforeUpdate((user) => {
    return hashPassword(user);
  });

  //User.belongsTo(); // Will add company_uuid to user

  function hashPassword(user) {
    const salt = bcrypt.genSaltSync(10);
    user.set('password', bcrypt.hashSync(user.password, salt));
  }

  return User;
}
