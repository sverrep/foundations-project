import "regenerator-runtime";
const puppeteer = require("puppeteer");

afterAll((done) =>{
    done();
})

test('take screenshot of home page', async () => {
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 180,
        defaultViewport: {width: 1920, height: 1080,},
        args: ["--window-size=1920,1080"]
    });
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:5500/index.html");
    await page.screenshot({
        path: './tests/screenshots/golden/home.png',
        fullpage: true,
        type: 'png',
    });
    await browser.close();
});

test('take screenshot of game page', async () => {
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 180,
        defaultViewport: {width: 1920, height: 1080,},
        args: ["--window-size=1920,1080"]
    });
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:5500/game.html");
    await page.screenshot({
        path: './tests/screenshots/golden/game.png',
        fullpage: true,
        type: 'png',
    });
    await browser.close();
});


