const { Player } = require("../classes/Player");

test("should output player class variables", () => {
    const player = new Player(100, 575);
    expect(player.x).toBe(100);
    expect(player.x_old).toBe(100);
    expect(player.y).toBe(575);
    expect(player.y_old).toBe(575);
});