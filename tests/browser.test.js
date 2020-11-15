import "regenerator-runtime";
const puppeteer = require("puppeteer");
const pixelmatch = require("pixelmatch");
const fs = require('fs'),
    PNG = require("pngjs").PNG;

afterAll((done) =>{
    done();
})

test("test that home page launches", async() => {
    const browser = await setUpBrowser();
    const page = await setUpPage(browser, "index");
    await page.goto("http://127.0.0.1:5500/index.html");
    await browser.close();
})

test("test that title on home page is correct", async() => {
    const browser = await setUpBrowser();
    const page = await setUpPage(browser, "index");
    const title = await page.title();
    expect(title).toBe("Foundations Game");
    await browser.close();
})

test("tests that button to go to game works", async () => {
    const browser = await setUpBrowser();
    const page = await setUpPage(browser, "index");
    await page.click("#link");
    await browser.close();
})

test("test that all input keys work", async() => {
    const browser = await setUpBrowser();
    const page = await setUpPage(browser, "game");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("ArrowUp");
    await browser.close();
}, 30000)

test("compare home page screenshot to actual", async () => {
    const browser = await setUpBrowser();
    const page = await setUpPage(browser, "index");
    await page.screenshot({
        path: './tests/screenshots/testing/home.png',
        fullpage: true,
        type: 'png',
    });
    compareScreenshots("home");
    await browser.close();
})

test("compare game page screenshot to actual", async () => {
    const browser = await setUpBrowser();
    const page = await setUpPage(browser, "game");
    await page.screenshot({
        path: './tests/screenshots/testing/game.png',
        fullpage: true,
        type: 'png',
    });
    compareScreenshots("game");
    await browser.close();
})

async function setUpBrowser(){
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 180,
        defaultViewport: {width: 1920, height: 1080,},
        args: ["--window-size=1920,1080"]
    });
    return browser;
}

async function setUpPage(browser, pageName){
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:5500/${pageName}.html`);
    return page;
}

function compareScreenshots(fileName) {
    return new Promise((resolve, reject) => {
        const img1 = fs.createReadStream(`./tests/screenshots/testing/${fileName}.png`).pipe(new PNG()).on('parsed', doneReading);
        const img2 = fs.createReadStream(`./tests/screenshots/golden/${fileName}.png`).pipe(new PNG()).on('parsed', doneReading);
        
        let filesRead = 0;
        function doneReading() {
            if (++filesRead < 2) return;

            expect(img1.width).toEqual(img2.width);
            expect(img1.height).toEqual(img2.height);

            const diff = new PNG({width: img1.width, height: img2.height});
            const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height,{threshold: 0.1});

            expect(numDiffPixels).toEqual(0);
            resolve();
        }
    });
};