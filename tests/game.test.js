import "regenerator-runtime";
const puppeteer = require("puppeteer");

afterAll((done) =>{
    done();
})

test("test that all input keys work", async() => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 200,
        defaultViewport: {width: 1920, height: 1080,},
        args: ["--window-size=1920,1080"]
    });
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:5500/game.html");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("ArrowUp");
    await browser.close();
    
}, 30000)