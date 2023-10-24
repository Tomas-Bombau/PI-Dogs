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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      life_span: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
          validData(weight) {
            if (!weight || !weight.imperial || !weight.metric) {
              throw new Error(
                "weight must have imperial and metric properties."
              );
            }
          },
        },
      },
      height: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
          validData(height) {
            if (!height || !height.imperial || !height.metric) {
              throw new Error(
                "height must have imperial and metric properties."
              );
            }
          },
        },
      },
      reference_image_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
