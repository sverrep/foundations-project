const { Player } = require("../classes/Player");
const { controller } = require("../variables/controller.js");

test("should output player class variables", () => {
    const player = new Player(100, 575);
    expect(player.x).toBe(100);
    expect(player.x_old).toBe(100);
    expect(player.y).toBe(575);
    expect(player.y_old).toBe(575);
});

test("testing isMoving function standing still case", () => {
    const player = new Player(100, 575);
    player.isMoving();
    expect(player.animation.frame_set).toStrictEqual([0]);
    expect(player.animation.delay).toBe(20);
})

test("testing isMoving function jumping case", () => {
    const player = new Player(100, 575);
    player.jumping = true;
    player.isMoving();
    expect(player.animation.frame_set).toStrictEqual(undefined);
    expect(player.animation.delay).toBe(undefined);
})

test("testing isMoving function moving left case", () => {
    const player = new Player(100, 575);
    setUpController(false, false);
    player.isMoving();
    expect(player.animation.frame_set).toStrictEqual([2,1,0]);
    expect(player.animation.delay).toBe(10);
    expect(player.x_velocity).toBe(-0.5);
    expect(player.isMovingRight).toBe(false);
})

test("testing isMoving function moving left jumping case", () => {
    const player = new Player(100, 575);
    player.jumping = true;
    setUpController(false, true);
    player.isMoving();
    expect(player.animation.frame_set).toStrictEqual(undefined);
    expect(player.animation.delay).toBe(undefined);
    expect(player.x_velocity).toBe(-0.5);
    expect(player.isMovingRight).toBe(false);
})

test("testing isMoving function moving right case", () => {
    const player = new Player(100, 575);
    setUpController(true, false);
    player.isMoving();
    expect(player.animation.frame_set).toStrictEqual([3,4,5]);
    expect(player.animation.delay).toBe(10);
    expect(player.x_velocity).toBe(0.5);
    expect(player.isMovingRight).toBe(true);
})

test("testing isMoving function moving right jumping case", () => {
    const player = new Player(100, 575);
    player.jumping = true;
    setUpController(true, true);
    player.isMoving();
    expect(player.animation.frame_set).toStrictEqual(undefined);
    expect(player.animation.delay).toBe(undefined);
    expect(player.x_velocity).toBe(0.5);
    expect(player.isMovingRight).toBe(true);
})

test("testing isJumping function true looking left case", () => {
    const player = new Player(100, 575);
    setUpController(false, true, player);
    player.isJumping();
    expect(player.animation.frame_set).toStrictEqual([3]);
    expect(player.animation.delay).toBe(10);
    expect(player.y_velocity).toBe(-20);
    expect(player.jumping).toBe(true);
})

test("testing isJumping function true looking right case", () => {
    const player = new Player(100, 575);
    setUpController(true, true, player);
    player.isJumping();
    expect(player.animation.frame_set).toStrictEqual([7]);
    expect(player.animation.delay).toBe(10);
    expect(player.y_velocity).toBe(-20);
    expect(player.jumping).toBe(true);
})

test("testing isJumping function true looking right case", () => {
    const player = new Player(100, 575);
    setUpController(true, false, player);
    player.isJumping();
    expect(player.animation.frame_set).toStrictEqual(undefined);
    expect(player.animation.delay).toBe(undefined);
    expect(player.y_velocity).toBe(0);
    expect(player.jumping).toBe(false);
})

test("testing isFallingOutOfBounds function false case", () => {
    const player = new Player(100, 575);
    player.jumping = true;
    player.y_velocity = 10;
    player.isMovingRight = false;
    player.isFallingOutOfBounds(1000);
    expect(player.jumping).toBe(true);
    expect(player.y_velocity).toBe(10);
    expect(player.isMovingRight).toBe(false);
})

test("testing isFallingOutOfBounds function true case", () => {
    const player = new Player(100, 575);
    player.jumping = true;
    player.y_velocity = 10;
    player.isFallingOutOfBounds(400);
    expect(player.jumping).toBe(false);
    expect(player.y_velocity).toBe(0);
    expect(player.isMovingRight).toBe(true);
})

test("testing isMovingOutOfBounds function false case", () => {
    const player = new Player(100, 575);
    player.isMovingOutOfBounds(400);
    expect(player.x).toBe(100);
})

test("testing isMovingOutOfBounds function true right side case", () => {
    const player = new Player(500, 575);
    player.isMovingOutOfBounds(400);
    expect(player.x).toBe(-60);
})

test("testing isMovingOutOfBounds function true left side case", () => {
    const player = new Player(-64, 575);
    player.isMovingOutOfBounds(400);
    expect(player.x).toBe(400);
})
    

function setUpController(movingRight, jump, player){
    player = player || undefined;
    if (movingRight)
    {
        controller.right = true;
        controller.left = false;
        if(player)
        {
            player.isMovingRight = true;
        }
    }
    else
    {
        controller.right = false;
        controller.left = true;
        if(player)
        {
            player.isMovingRight = false;
        }
    }
    if (jump) 
    {
        controller.up = true;
    }
    else
    {
        controller.up = false;
    }
}