const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      reference_image_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
          validData(altura) {
            if (!altura || !altura.imperial || !altura.metric) {
              throw new Error('Altura must have imperial and metric properties.');
            }
          },
      },
    },
    weight: {
        type: DataTypes.JSON,
        allowNull: false, 
        validate: {
          validData(peso) {
            if (!peso || !peso.imperial || !peso.metric) {
              throw new Error('Peso must have imperial and metric properties.');
            }
          },
      },
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
