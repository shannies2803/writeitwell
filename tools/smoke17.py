from playwright.sync_api import sync_playwright
import pathlib,atexit
url='file://'+str(pathlib.Path('preview.html').resolve())
log=[];atexit.register(lambda: print('\n'.join(log)))
with sync_playwright() as p:
    b=p.chromium.launch()
    for W in (390,1280):
        pg=b.new_page(viewport={'width':W,'height':860})
        pg.on('pageerror',lambda e:log.append('PAGEERR '+str(e)))
        pg.route("**/pinyin-pro*/**",lambda r:r.fulfill(path='pinyin-local.js',content_type='application/javascript'))
        pg.goto(url);pg.wait_for_timeout(500)
        if pg.locator('#asGuest').count():pg.click('#asGuest')
        ov=lambda h: log.append(f'{W} OV {h}') if pg.evaluate("document.documentElement.scrollWidth>innerWidth+1") else None
        pg.evaluate("location.hash='en-today'");pg.wait_for_timeout(500);ov('today')
        log.append(f'{W} d4: '+str(pg.locator('.d4card').count())+' likes: '+str(pg.locator('.likes').count()))
        pg.screenshot(path=f'r18-today-{W}.png')
        pg.locator('.likes [data-l=science]').click();pg.locator('.likes [data-l=performing]').click()
        pg.click('.d4card .tmr');pg.wait_for_timeout(1200);log.append(f'{W} timer: '+pg.inner_text('.ftimer b'));pg.click('.ftimer .sp')
        pg.evaluate("location.hash='en-home'");pg.wait_for_timeout(500);ov('home');log.append(f'{W} home d4 {pg.locator(".d4card").count()} suggest: '+pg.evaluate("[...document.querySelectorAll('#main h3')].map(h=>h.innerText).filter(x=>x.includes('like')).join()"))
        pg.screenshot(path=f'r18-home-{W}.png')
        # read a bank -> d4 read
        pg.evaluate("location.hash='en-feelings'");pg.wait_for_timeout(400);pg.locator('.readtick button').click();pg.wait_for_timeout(200)
        pg.evaluate("location.hash='en-today'");pg.wait_for_timeout(400);log.append(f'{W} d4 done: '+str(pg.locator('.d4 button.done').count()))
        # report
        pg.evaluate("location.hash='en-report'");pg.wait_for_timeout(500);ov('report');pg.screenshot(path=f'r18-report-{W}.png',full_page=True)
        pg.fill('.rwW','Ice cream');pg.fill('.rwN','5');pg.locator('.sp-card:has(.rwW) button').click();pg.wait_for_timeout(200)
        log.append(f'{W} reward: '+pg.evaluate("(document.querySelector('.rw')||{}).innerText"))
        pg.locator('#main .btn:has-text("certificate")').click();pg.wait_for_timeout(300);ov('cert');pg.screenshot(path=f'r18-cert-{W}.png')
        # library short + picked
        pg.evaluate("location.hash='en-essays'");pg.wait_for_timeout(400);log.append(f'{W} short toggle: '+str(pg.locator('.shortt').count())+' picked: '+pg.evaluate("[...document.querySelectorAll('.picked .tag')].map(x=>x.innerText).join(' | ')"))
        pg.locator('.shortt input').check();pg.wait_for_timeout(300);log.append(f'{W} short cards: '+str(pg.locator('.esslist .esscard').count()))
        # word book page
        pg.evaluate("location.hash='en-mywords'");pg.wait_for_timeout(300);ov('mywords');log.append(f'{W} wb rows: '+str(pg.locator('.wbpage .row').count()))
        # easy read
        pg.click('#easyBtn');pg.wait_for_timeout(200);log.append(f'{W} easy: '+str(pg.evaluate("document.documentElement.classList.contains('easyread')")));pg.click('#easyBtn')
        # find
        pg.evaluate("location.hash='en-find'");pg.wait_for_timeout(300);pg.fill('#findIn','because');pg.wait_for_timeout(400);log.append(f'{W} find extra: '+pg.evaluate("(document.querySelector('.findextra')||{}).innerText||''")[:120].replace('\n',' '))
        pg.fill('#findIn','plural');pg.wait_for_timeout(300);
        if pg.locator('.findextra [data-vg]').count():
            pg.locator('.findextra [data-vg]').first.click();pg.wait_for_timeout(400);log.append(f'{W} vg open: '+pg.evaluate("location.hash")+' '+pg.inner_text('#main h2'))
        # vg paper & sprint
        pg.evaluate("location.hash='en-today'");pg.wait_for_timeout(200);pg.evaluate("location.hash='en-vg'");pg.wait_for_timeout(500)
        log.append(f'{W} vg cards: '+pg.evaluate("[...document.querySelectorAll('.vg-grid > .sp-card h3')].map(x=>x.innerText).join(' | ')"))
        pg.locator('.sp-card:has-text("Practice paper") .btn').click();pg.wait_for_timeout(300);ov('paper')
        for i in range(25):
            if pg.locator('.vg-opts button').count(): pg.locator('.vg-opts button').first.click();pg.wait_for_timeout(50)
            elif pg.locator('#main input.vg-in').count(): pg.fill('#main input.vg-in','x')
            n=pg.locator('#main .sp-card .btn:has-text("Next")')
            if n.count(): n.click();pg.wait_for_timeout(50)
            else: break
        pg.locator('#main .btn:has-text("Finish and mark")').click();pg.wait_for_timeout(300);log.append(f'{W} paper: '+pg.evaluate("(document.querySelector('#main .sp-card h3')||{}).innerText")+' '+pg.evaluate("(document.querySelector('#main .sp-card p b')||{}).innerText"))
        pg.screenshot(path=f'r18-paper-{W}.png');ov('paperres')
        pg.locator('#main .btn:has-text("All topics")').last.click();pg.wait_for_timeout(300)
        pg.locator('.sp-card:has-text("60-second") .btn').click();pg.wait_for_timeout(200)
        for i in range(5): 
            pg.keyboard.press('1');pg.wait_for_timeout(1200)
        log.append(f'{W} sprint ok: '+pg.inner_text('.sp-card .ok'))
        # zh pinyin for stage A in vg
        pg.evaluate("localStorage.setItem('wiw2-stage:guest',JSON.stringify('A'))");pg.click('#lang-zh');pg.wait_for_timeout(400)
        pg.evaluate("location.hash='zh-vg'");pg.wait_for_timeout(400);pg.locator('.vg-topic').first.click();pg.wait_for_timeout(300);pg.locator('#main .btn').nth(1).click();pg.wait_for_timeout(1500)
        log.append(f'{W} zh vg ruby: '+str(pg.locator('#main .vg-q ruby').count()));pg.screenshot(path=f'r18-zhpy-{W}.png')
        pg.evaluate("location.hash='zh-myspell'");pg.wait_for_timeout(300);pg.locator('.sp-card .btn').first.click();pg.wait_for_timeout(300);log.append(f'{W} slow btn: '+str(pg.locator('#main button:has-text("慢速")').count()))
        pg.click('#starsTop');pg.wait_for_timeout(300);log.append(f'{W} earn: '+str(pg.locator('#panel .earn').count()))
        pg.close()
    b.close()
