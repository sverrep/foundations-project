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

test("checking collidePlatformBottom method false case", () => {
    const player = setUpCollider(4,2, "Top");
    expect(player.collidePlatformBottom(3)).toBe(false);
})

test("checking collidePlatformBottom method true case", () => {
    const player = setUpCollider(1,3,"Top");
    expect(player.collidePlatformBottom(2)).toBe(true);
    expect(player.getTop()).toBe(2);
    expect(player.y_velocity).toBe(0);
})

test("checking collidePlatformLeft method false case", () => {
    const player = setUpCollider(1,3,"Right");
    expect(player.collidePlatformLeft(2)).toBe(false);
})

test("checking collidePlatformLeft method true case", () => {
    const player = setUpCollider(6,5,"Right");
    expect(player.collidePlatformLeft(5)).toBe(true);
    expect(player.getRight()).toBe(5);
    expect(player.x_velocity).toBe(0);
})

test("checking collidePlatformRight method false case", () => {
    const player = setUpCollider(3,2,"Left");
    expect(player.collidePlatformRight(2)).toBe(false);
})

test("checking collidePlatformRight method true case", () => {
    const player = setUpCollider(3,4,"Left");
    expect(player.collidePlatformRight(4)).toBe(true);
    expect(player.getLeft()).toBe(4);
    expect(player.x_velocity).toBe(0);
})

test("checking collidePlatformTop method false case", () => {
    const player = setUpCollider(3,8,"Bottom");
    expect(player.collidePlatformTop(6)).toBe(false);
})

test("checking collidePlatformTop method true case", () => {
    const player = setUpCollider(5,3,"Bottom");
    expect(player.collidePlatformTop(4)).toBe(true);
    expect(player.getBottom()).toBe((4-0.5));
    expect(player.x_velocity).toBe(0);
})

test("checking collide method 1 top case", () => {
    const player = setUpCollider(5, 3, "Bottom");
    player.collide(1, 1, 4, 64)
    expect(player.getBottom()).toBe((4-0.5));
    expect(player.x_velocity).toBe(0);
})

test("checking collide method 1 right case", () => {
    const player = setUpCollider(32, 100, "Left");
    player.collide(1, 4, 1, 64)
    expect(player.getLeft()).toBe(68);
    expect(player.x_velocity).toBe(0);
})

test("checking collide method 1 bottom case", () => {
    const player = setUpCollider(22, 76, "Top");
    player.collide(1, 1, 6, 64)
    expect(player.getTop()).toBe(70);
    expect(player.x_velocity).toBe(0);
})

test("checking collide method 1 left case", () => {
    const player = setUpCollider(7, 3, "Right");
    player.collide(1, 5, 1, 64)
    expect(player.getRight()).toBe(5);
    expect(player.x_velocity).toBe(0);
})

test("checking collide method 1 horizontal false case", () => {
    const player = setUpCollider(4, 3, "Right");
    player.collide(1, 5, 1, 64)
    expect(player.getRight()).toBe(4);
})

test("checking collide method 1 vertical false case", () => {
    const player = setUpCollider(22, 42, "Top");
    player.collide(1, 1, 6, 64)
    expect(player.getTop()).toBe(22);
})

test("checking collide method 2 true case", () => {
    const player = new Player(100, 575);
    controller.up = true;
    player.collide(2, 1, 1, 64)
    expect(player.y_velocity).toBe(-0.7);
    expect(player.jumping).toBe(true);
})

test("checking collide method 2 false case", () => {
    const player = new Player(100, 575);
    controller.up = false;
    player.collide(2, 1, 1, 64)
    expect(player.y_velocity).toBe(0);
    expect(player.jumping).toBe(false);
})

test("checking collide method 3 top case", () => {
    const player = setUpCollider(5, 3, "Bottom");
    player.collide(3, 1, 4, 64)
    expect(player.getBottom()).toBe((4-0.5));
    expect(player.x_velocity).toBe(0);
})

test("checking collide method 3 right case", () => {
    const player = setUpCollider(32, 100, "Left");
    player.collide(3, 4, 1, 64)
    expect(player.getLeft()).toBe(68);
    expect(player.x_velocity).toBe(0);
})

test("checking collide method 3 left case", () => {
    const player = setUpCollider(7, 3, "Right");
    player.collide(3, 5, 1, 64)
    expect(player.getRight()).toBe(5);
    expect(player.x_velocity).toBe(0);
})

test("checking collide method 3 horizontal false case", () => {
    const player = setUpCollider(4, 3, "Right");
    player.collide(3, 5, 1, 64)
    expect(player.getRight()).toBe(4);
})

test("checking collide method 3 top false case", () => {
    const player = setUpCollider(4, 2, "Bottom");
    player.collide(3, 1, 6, 64)
    expect(player.getBottom()).toBe(4);
})

function setUpCollider(x, x_old, direction){
    const player = new Player(100, 575);
    if (direction == "Top")
    {
        player.setTop(x);
        player.setOldTop(x_old);
    }
    else if (direction == "Right")
    {
        player.setRight(x);
        player.setOldRight(x_old);
    }
    else  if (direction == "Left")
    {
        player.setLeft(x);
        player.setOldLeft(x_old);
    }
    else if (direction == "Bottom")
    {
        player.setBottom(x);
        player.setOldBottom(x_old);
    }
    return player;
}

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