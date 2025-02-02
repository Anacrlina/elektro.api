module.exports = (sequelize, DataTypes) => {
    const Produto = sequelize.define("Produto", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      preco: { type: DataTypes.FLOAT, allowNull: false },
      marca: { type: DataTypes.STRING, allowNull: false },
      modelo: { type: DataTypes.STRING, allowNull: false },
      qualidade: { type: DataTypes.STRING, allowNull: false },
      referencias: { type: DataTypes.STRING, allowNull: false },
      fabricacao: { type: DataTypes.DATE, allowNull: false },
      fk_Cliente_CPF: { 
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: "Clientes", key: "cpf" }
      }
    });
  
    Produto.associate = (models) => {
      Produto.belongsTo(models.Cliente, { foreignKey: "fk_Cliente_CPF", as: "cliente" });
    };
  
    return Produto;
  };