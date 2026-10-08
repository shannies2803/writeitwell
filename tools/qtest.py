from playwright.sync_api import sync_playwright
import pathlib
url='file://'+str(pathlib.Path('preview.html').resolve())
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':390,'height':860});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(url);pg.wait_for_timeout(600)
    if pg.locator('#asGuest').count():pg.click('#asGuest')
    pg.evaluate("location.hash='en-home'");pg.wait_for_timeout(500);print('home links',pg.locator('.qlinks button').count())
    pg.locator('.qlinks [data-q=myspell]').click();pg.wait_for_timeout(400);print(pg.evaluate("location.hash"),pg.inner_text('#main h2'))
    pg.evaluate("location.hash='zh-today'");pg.wait_for_timeout(500);print('today links',pg.locator('.qlinks button').count());pg.screenshot(path='q.png')
    print('ov',pg.evaluate("document.documentElement.scrollWidth>innerWidth+1"),errs[:2]);b.close()
