import "regenerator-runtime";
const puppeteer = require("puppeteer");

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

test("tests that button to go to game works", async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 180,
        defaultViewport: {width: 1920, height: 1080,},
        args: ["--window-size=1920,1080"]
    });
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:5500/index.html");
    await page.click("#link");
    await browser.close();
},)