const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
    
      body: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
    
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
 
    // db.User.belongsToMany(db.User, {
    //   foreignKey: 'followingId',
    //   as: 'Followers',
    //   through: 'Follow',
    // });
    // db.User.belongsToMany(db.User, {
    //   foreignKey: 'followerId',
    //   as: 'Followings',
    //   through: 'Follow',
    // });
  }
};