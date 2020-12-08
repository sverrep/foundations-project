const { Animation } = require("../classes/Animation");

test("should output animation class parameters", () => {
    const animation = new Animation(1, 3);
    expect(animation.frame_set).toBe(1);
    expect(animation.delay).toBe(3);
});

test("checks if receving data", () => {
    const animation = new Animation();
    expect(animation.frame_set).toBe(undefined);
    expect(animation.delay).toBe(undefined);
});

test("checks if change method changes correct variables", () => {
    const animation = new Animation(1,3);
    animation.change(2,4);
    expect(animation.frame_set).toBe(2);
    expect(animation.delay).toBe(4);
})

test("check that change method does not pass if frame set is the same", () => {
    const animation = new Animation(1,3)
    animation.change(1,7);
    expect(animation.frame_set).toBe(1);
    expect(animation.delay).toBe(3);
})

test("check if statement in updateAnimation function", () => {
    const animation = new Animation([1,2],2);
    animation.updateAnimation();
    expect(animation.count).toBe(1);
    expect(animation.frame_index).toBe(0);
    expect(animation.frame).toBe(0);
    animation.updateAnimation();
    expect(animation.count).toBe(0);
    expect(animation.frame_index).toBe(1);
    expect(animation.frame).toBe(2);

})