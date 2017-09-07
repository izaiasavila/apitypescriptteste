"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    var Company = sequelize.define('Company', {
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
exports.default = default_1;
