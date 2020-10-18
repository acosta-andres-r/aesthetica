module.exports = function (sequelize, DataTypes) {
  const Image = sequelize.define("Image", {
    // The imageURL cannot be null, images cannot be unique because multiple user can like same photo
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    // The public ID cannot be null
    public_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Image.associate = function(models) {
    // We're saying that a Image should belong to an User
    // An Image can't be created without an Author due to the foreign key constraint (allowNull)
    Image.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Image;
};