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

    
})

