from playwright.sync_api import sync_playwright
import pathlib
url='file://'+str(pathlib.Path('preview.html').resolve())
with sync_playwright() as p:
    b=p.chromium.launch()
    for W in (390,1280):
        pg=b.new_page(viewport={'width':W,'height':860});pg.on('pageerror',lambda e:print('ERR',e))
        pg.goto(url);pg.wait_for_timeout(400)
        if pg.locator('#asGuest').count():pg.click('#asGuest')
        for h in ['en-funny','en-golden','en-funny','en-mystery','en-myspell']:
            pg.evaluate(f"location.hash='{h}'");pg.wait_for_timeout(300)
        pg.evaluate("location.hash='en-report'");pg.wait_for_timeout(600)
        print(W,pg.locator('.u8').inner_text()[:400].replace('\n',' | '))
        print(W,'overflow',pg.evaluate("document.documentElement.scrollWidth>innerWidth+1"))
        pg.locator('.u8').screenshot(path=f'r21-usage-{W}.png')
        pg.evaluate("location.hash='zh-report'");pg.wait_for_timeout(1200);print(W,'zh',pg.locator('.u8').count())
