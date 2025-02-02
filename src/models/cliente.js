module.exports = (sequelize, DataTypes) => {
    const Cliente = sequelize.define("Cliente", {
      cpf: { type: DataTypes.STRING, primaryKey: true },
      nome: { type: DataTypes.STRING, allowNull: false },
      idade: { type: DataTypes.INTEGER, allowNull: false },
      telefone: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      rg: { type: DataTypes.STRING, allowNull: false }
    });
  
    Cliente.associate = (models) => {
      Cliente.hasMany(models.Produto, { foreignKey: "fk_Cliente_CPF", as: "produtos" });
    };
  
    return Cliente;
  };