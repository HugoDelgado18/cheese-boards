const { User } = require('./Models/User');
const { Board } = require('./Models/Board');
const { Cheese } = require('./Models/Cheese');

Board.belongsTo(User);
User.hasMany(Board);

Board.belongsToMany(Cheese, { through: "board_cheese" });
Cheese.belongsToMany(Board, { through: "board_cheese" });



module.exports = {
    User,
    Board,
    Cheese
}