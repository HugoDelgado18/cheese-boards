const { sequelize } = require("./db");
const { User, Cheese, Board } = require('./index');

describe(" User, Cheese, Board Models ", () => {

    beforeAll( async () => {
        await sequelize.sync({ force: true });
    } )

    test("User model", async () => {
        const testUser = await User.create({name: "Hugo", email: "abc@email.com"});

        expect(testUser).toBeDefined();
        expect(testUser.name).toBe("Hugo");
        expect(testUser.email).toBe("abc@email.com");
    })

    test("Cheese", async () => {
        const cheese1 = await Cheese.create({ title: "Swiss", description: "Switzerland" })

        expect(cheese1).toBeDefined();
        expect(cheese1.title).toBe("Swiss");
        expect(cheese1.description).toBe("Switzerland");
    })

    test("Board", async () => {
        const board1 = await Board.create({ type: "da house", description: "greater mixture", rating: 5 });

        expect(board1).toBeDefined();
        expect(board1.type).toBe("da house");
        expect(board1.description).toBe('greater mixture');
        expect(board1.rating).toBe(5);
    })

    test("multiple boards can be added to user", async () => {
        const testUser = await User.create({name: "Hugo", email: "abc@email.com"});

        const board1 = await Board.create({ type: "da house", description: "greater mixture", rating: 5 });
        const board2 = await Board.create({ type: "da casa", description: "decent mixture", rating: 3 });

        await testUser.addBoard([board1, board2]);

        expect(await testUser.getBoards()).toHaveLength(2);
    })

    test("Multi boards can be added to boards & multi chesses can be added to boards", async () => {
        const board1 = await Board.create({ type: "da house", description: "greater mixture", rating: 5 });
        const board2 = await Board.create({ type: "da casa", description: "decent mixture", rating: 3 });

        const cheese1 = await Cheese.create({ title: "Swiss", description: "Switzerland" });
        const cheese2 = await Cheese.create({ title: "Swiss", description: "Switzerland" });

        await board1.addCheese([cheese1, cheese2]);
        await cheese1.addBoard([board1, board2]);

        expect(await board1.countCheeses()).toBe(2);
        expect(await cheese1.countBoards()).toBe(2);
    })

    test("eager loading-- board can be loaded with cheeses", async () => {

        const cheeseInBoard = await Board.findAll({
            include: [
                { model: Cheese, as: "cheeses" }
            ]
        })

        const boardsInUser = await User.findAll({
            include: [
                { model: Board, as: "boards" }
            ]
        })

        const boardInCheese = await Cheese.findAll({
            include: [
                { model: Board, as: "boards" }
            ]
        })

        expect(cheeseInBoard).toBeDefined();
        expect(boardsInUser).toBeDefined();
        expect(boardInCheese).toBeDefined();  
    })

})

