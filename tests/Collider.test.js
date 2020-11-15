const { Collider } = require("../classes/Collider");
const { Player } = require("../classes/Player");
const collider = new Collider();


test("checking collidePlatformBottom method false case", () => {
    const player = setUpCollider(4,2, "Top");
    expect(collider.collidePlatformBottom(player,3)).toBe(false);
})

test("checking collidePlatformBottom method true case", () => {
    const player = setUpCollider(1,3,"Top");
    expect(collider.collidePlatformBottom(player, 2)).toBe(true);
    expect(player.getTop()).toBe(2);
    expect(player.y_velocity).toBe(0);
})

test("checking collidePlatformLeft method false case", () => {
    const player = setUpCollider(1,3,"Right");
    expect(collider.collidePlatformLeft(player,2)).toBe(false);
})

test("checking collidePlatformLeft method true case", () => {
    const player = setUpCollider(6,5,"Right");
    expect(collider.collidePlatformLeft(player, 5)).toBe(true);
    expect(player.getRight()).toBe(5);
    expect(player.x_velocity).toBe(0);
})

test("checking collidePlatformRight method false case", () => {
    const player = setUpCollider(3,2,"Left");
    expect(collider.collidePlatformRight(player,2)).toBe(false);
})

test("checking collidePlatformRight method true case", () => {
    const player = setUpCollider(3,4,"Left");
    expect(collider.collidePlatformRight(player, 4)).toBe(true);
    expect(player.getLeft()).toBe(4);
    expect(player.x_velocity).toBe(0);
})

test("checking collidePlatformTop method false case", () => {
    const player = setUpCollider(3,8,"Bottom");
    expect(collider.collidePlatformTop(player,6)).toBe(false);
})

test("checking collidePlatformTop method true case", () => {
    const player = setUpCollider(5,3,"Bottom");
    expect(collider.collidePlatformTop(player, 4)).toBe(true);
    expect(player.getBottom()).toBe((4-0.5));
    expect(player.x_velocity).toBe(0);
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
