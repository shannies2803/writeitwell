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
        pg.screenshot(path=f'r6-home-{W}.png')
        ids=pg.evaluate("(window.CONTENT_PARTS||[]).flatMap(p=>p.units.map(u=>u.id)).concat(['en-picstories','zh-picstories','en-today','zh-today','en-home','zh-home'])")
        for i in ids:
            pg.evaluate("h=>{location.hash=h}",i); pg.wait_for_timeout(40)
            if pg.evaluate("location.hash.slice(1)")!=i: log.append(f'{W} MISS '+i)
            if pg.evaluate("document.documentElement.scrollWidth>window.innerWidth+1"): log.append(f'{W} overflow '+i)
        if W==390:
            pg.evaluate("location.hash='en-picstories'");pg.wait_for_timeout(300)
            pg.screenshot(path='r6-picgrid.png',full_page=False)
            pg.locator('.piccard').nth(2).click();pg.wait_for_timeout(300)
            pg.screenshot(path='r6-order.png',full_page=False)
            # solve order: need correct order; click thumbnails by matching scene? use evaluate: pool order unknown -> brute force via data
            for k in range(4):
                n=pg.locator('.picpool [data-k]').count()
                if not n: break
                pg.locator('.picpool [data-k]').first.click();pg.wait_for_timeout(50)
            log.append('order fb: '+pg.inner_text('#main .runner .fb'))
            pg.evaluate("location.hash='zh-feelings'");pg.wait_for_timeout(300)
            pg.screenshot(path='r6-faces.png',full_page=False)
            pg.evaluate("location.hash='en-senses'");pg.wait_for_timeout(300)
            pg.locator('#main .pill').nth(1).click();pg.wait_for_timeout(100)
            pg.screenshot(path='r6-senses.png',full_page=False)
        else:
            pg.evaluate("location.hash='en-picstories'");pg.wait_for_timeout(300)
            pg.locator('.piccard').first.click();pg.wait_for_timeout(300)
            pg.locator('#main .dotsbar button').nth(1).click();pg.wait_for_timeout(200)
            pg.screenshot(path='r6-panel.png',full_page=False)
            pg.evaluate("location.hash='zh-studio'");pg.wait_for_timeout(300)
            pg.select_option('#main select','pic:ps-wallet');pg.wait_for_timeout(200)
            pg.screenshot(path='r6-studio.png',full_page=False)
            pg.evaluate("localStorage.setItem('wiw2-stage:guest','\"A\"');localStorage.removeItem('wiw2-mix:guest');location.hash='en-today'");pg.wait_for_timeout(300)
            pg.screenshot(path='r6-today.png',full_page=True)
        pg.close()
    b.close()
