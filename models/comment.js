module.exports = function (sequelize, DataTypes) {
    const Comment = sequelize.define("Comment", {
      // The Comment cannot be null, images cannot be unique because multiple user can like same photo
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1] // IMPORTANT: need at least one char
        }
      }
    });
  
    Comment.associate = function(models) {
      // We're saying that a Comment should belong to an User
      // An Comment can't be created without an User due to the foreign key constraint (allowNull)
      Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });

      // We're saying that a Comment should belong to an Image
      // An Comment can't be created without an Image due to the foreign key constraint (allowNull)
      Comment.belongsTo(models.Image, {
        foreignKey: {
          allowNull: false
        }
      });
    };
     
    return Comment;
  };