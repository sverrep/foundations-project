const { Collider } = require("../classes/Collider");
const { Player } = require("../classes/Player");

test("checking collidePlatformBottom method", () => {
    const collider = new Collider();
    const player = new Player(100, 575);
    player.setTop(4);
    player.setOldTop(2);
    expect(collider.collidePlatformBottom(player,3)).toBe(false);

    player.setTop(1);
    player.setOldTop(3);
    expect(collider.collidePlatformBottom(player, 2)).toBe(true);
    expect(player.getTop()).toBe(2);
    expect(player.y_velocity).toBe(0);
})

test("checking collidePlatformLeft method", () => {
    const collider = new Collider();
    const player = new Player(100, 575);
    player.setRight(1);
    player.setOldRight(3);
    expect(collider.collidePlatformLeft(player,2)).toBe(false);

    player.setRight(6);
    player.setOldRight(5);
    expect(collider.collidePlatformLeft(player, 5)).toBe(true);
    expect(player.getRight()).toBe(5);
    expect(player.x_velocity).toBe(0);
})

test("checking collidePlatformRight method", () => {
    const collider = new Collider();
    const player = new Player(100, 575);
    player.setLeft(3);
    player.setOldLeft(2);
    expect(collider.collidePlatformRight(player,2)).toBe(false);

    player.setLeft(3);
    player.setOldLeft(4);
    expect(collider.collidePlatformRight(player, 4)).toBe(true);
    expect(player.getLeft()).toBe(4);
    expect(player.x_velocity).toBe(0);
})

test("checking collidePlatformTop method", () => {
    const collider = new Collider();
    const player = new Player(100, 575);
    player.setBottom(3);
    player.setOldBottom(8);
    expect(collider.collidePlatformTop(player,6)).toBe(false);

    player.setBottom(5);
    player.setOldBottom(3);
    expect(collider.collidePlatformTop(player, 4)).toBe(true);
    expect(player.getBottom()).toBe((4-0.5));
    expect(player.x_velocity).toBe(0);
})

