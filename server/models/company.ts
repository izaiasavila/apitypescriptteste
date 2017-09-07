export default function (sequelize, DataTypes) {

  const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  return Company;
}
