
const { Player } = require("../classes/Player.js");
const { render } = require("../functions/render.js");
const { loop } = require("../game.js");
jest.mock("../classes/Player.js");
jest.mock("../functions/render.js");

test("unit testing loop function", () => {
    const mockPlayerInstance = Player.mock.instances[0];
    const mockCollideObject = mockPlayerInstance.collideObject;
    const mockIsJumping = mockPlayerInstance.isJumping;
    const mockIsMoving = mockPlayerInstance.isMoving;
    const mockUpdatePlayer = mockPlayerInstance.updatePlayer;
    const mockIsFallingOutOfBounds = mockPlayerInstance.isFallingOutOfBounds;
    const mockisMovingOutOfBounds = mockPlayerInstance.isMovingOutOfBounds;
    loop();
    expect(mockCollideObject).toHaveBeenCalledTimes(1);
    expect(mockIsJumping).toHaveBeenCalledTimes(1);
    expect(mockIsMoving).toHaveBeenCalledTimes(1);
    expect(mockUpdatePlayer).toHaveBeenCalledTimes(1);
    expect(mockIsFallingOutOfBounds).toHaveBeenCalledTimes(1);
    expect(mockisMovingOutOfBounds).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenCalledTimes(1);
});

