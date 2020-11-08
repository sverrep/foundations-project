import "regenerator-runtime";
const puppeteer = require("puppeteer");
const pixelmatch = require("pixelmatch");
const fs = require('fs'),
    PNG = require("pngjs").PNG;

afterAll((done) =>{
    done();
})

test("test that home page launches", async() => {
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 180,
        defaultViewport: {width: 1920, height: 1080,},
        args: ["--window-size=1920,1080"]
    });
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:5500/index.html");
    await browser.close();
})

test("test that title on home page is correct", async() => {
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 180,
        defaultViewport: {width: 1920, height: 1080,},
        args: ["--window-size=1920,1080"]
    });
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:5500/index.html");
    const title = await page.title();
    expect(title).toBe("Foundations Game");
    await browser.close();
})

test("tests that button to go to game works", async () => {
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 180,
        defaultViewport: {width: 1920, height: 1080,},
        args: ["--window-size=1920,1080"]
    });
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:5500/index.html");
    await page.click("#link");
    await browser.close();
})

test("compare home page screenshot to actual", async () => {
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 180,
        defaultViewport: {width: 1920, height: 1080,},
        args: ["--window-size=1920,1080"]
    });
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:5500/index.html");
    await page.screenshot({
        path: './tests/screenshots/testing/home.png',
        fullpage: true,
        type: 'png',
    });
    compareScreenshots("home");
    await browser.close();
})

test("compare game page screenshot to actual", async () => {
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 180,
        defaultViewport: {width: 1920, height: 1080,},
        args: ["--window-size=1920,1080"]
    });
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:5500/game.html");
    await page.screenshot({
        path: './tests/screenshots/testing/game.png',
        fullpage: true,
        type: 'png',
    });
    compareScreenshots("game");
    await browser.close();
})


function compareScreenshots(fileName) {
    return new Promise((resolve, reject) => {
        const img1 = fs.createReadStream(`./tests/screenshots/testing/${fileName}.png`).pipe(new PNG()).on('parsed', doneReading);
        const img2 = fs.createReadStream(`./tests/screenshots/golden/${fileName}.png`).pipe(new PNG()).on('parsed', doneReading);
        
        let filesRead = 0;
        function doneReading() {
            // Wait until both files are read.
            if (++filesRead < 2) return;

            // The files should be the same size.
            expect(img1.width).toEqual(img2.width);
            expect(img1.height).toEqual(img2.height);

            // Do the visual diff.
            const diff = new PNG({width: img1.width, height: img2.height});
            const numDiffPixels = pixelmatch(
                img1.data, img2.data, diff.data, img1.width, img1.height,
                {threshold: 0.1});

            // The files should look the same.
            expect(numDiffPixels).toEqual(0);
            resolve();
        }
    });
};