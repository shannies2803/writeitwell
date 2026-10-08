from playwright.sync_api import sync_playwright
import pathlib,atexit
url='file://'+str(pathlib.Path('preview.html').resolve())
log=[];atexit.register(lambda: print('\n'.join(log)))
with sync_playwright() as p:
    b=p.chromium.launch()
    for W in (390,1280):
        pg=b.new_page(viewport={'width':W,'height':900})
        pg.on('pageerror',lambda e:log.append('PAGEERR '+str(e)))
        pg.on('console',lambda m: log.append('CONSOLE '+m.text) if m.type in('error','warning') and 'ERR_TUNNEL' not in m.text else None)
        pg.goto(url);pg.wait_for_timeout(500)
        if pg.locator('#asGuest').count():pg.click('#asGuest')
        log.append(f'{W} landing: '+pg.evaluate("location.hash"))
        pg.screenshot(path=f'r7-home-{W}.png',full_page=True)
        pg.click('#secTabs [data-sec=learn]');pg.wait_for_timeout(200);log.append(f'{W} learn: '+pg.evaluate("location.hash"))
        pg.click('#secTabs [data-sec=practice]');pg.wait_for_timeout(200);log.append(f'{W} practice: '+pg.evaluate("location.hash"))
        pg.click('#secTabs [data-sec=read]');pg.wait_for_timeout(200)
        pg.locator('.bankcard .btn').first.click();pg.wait_for_timeout(200);log.append(f'{W} bank: '+pg.evaluate("location.hash"))
        pg.screenshot(path=f'r7-bank-{W}.png',full_page=False)
        pg.click('#lang-zh');pg.wait_for_timeout(300);log.append(f'{W} zh: '+pg.evaluate("location.hash"))
        pg.evaluate("location.hash='zh-home'");pg.wait_for_timeout(300)
        pg.screenshot(path=f'r7-zhhome-{W}.png',full_page=False)
        if W==390:
            pg.click('#menuBtn');pg.wait_for_timeout(200);pg.screenshot(path='r7-menu.png')
        pg.close()
    b.close()
