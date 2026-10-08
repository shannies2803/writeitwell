from playwright.sync_api import sync_playwright
import pathlib,atexit,json
url='file://'+str(pathlib.Path('preview.html').resolve())
log=[];atexit.register(lambda: print('\n'.join(log)))
with sync_playwright() as p:
    b=p.chromium.launch()
    for W in (390,1280):
        pg=b.new_page(viewport={'width':W,'height':860})
        pg.on('pageerror',lambda e:log.append('PAGEERR '+str(e)))
        pg.goto(url);pg.wait_for_timeout(500)
        if pg.locator('#asGuest').count():pg.click('#asGuest')
        ov=lambda h: log.append(f'{W} OV {h}') if pg.evaluate("document.documentElement.scrollWidth>innerWidth+1") else None
        pg.evaluate("location.hash='en-today'");pg.wait_for_timeout(500);log.append(f'{W} today card: '+pg.evaluate("(document.querySelector('.spToday')||{}).innerText"))
        pg.evaluate("location.hash='en-spelling'");pg.wait_for_timeout(300);log.append(f'{W} old spelling unit h2: '+pg.inner_text('#main h2'))
        pg.evaluate("location.hash='en-myspell'");pg.wait_for_timeout(400);ov('myspell');pg.screenshot(path=f'r15-sp-{W}.png')
        log.append(f'{W} stats: '+pg.inner_text('.sp-stats').replace('\n',' '))
        pg.click('.sp-card .btn');pg.wait_for_timeout(400);pg.screenshot(path=f'r15-learn-{W}.png');ov('learn')
        w=pg.inner_text('.sp-word');log.append(f'{W} first word: {w}')
        pg.click('text=Cover it and write it');pg.wait_for_timeout(300);pg.screenshot(path=f'r15-test-{W}.png')
        pg.fill('.sp-in',w);pg.click('.sp-card .btn:has-text("Check")');pg.wait_for_timeout(200);log.append(f'{W} fb: '+pg.inner_text('.fb'))
        pg.click('.sp-card .btn:has-text("Continue")');pg.wait_for_timeout(300)
        w2=pg.inner_text('.sp-word');pg.click('text=Cover it and write it');pg.wait_for_timeout(200)
        pg.fill('.sp-in',w2[:-1]+'x');pg.click('.sp-card .btn:has-text("Check")');pg.wait_for_timeout(200)
        log.append(f'{W} wrong diff: '+pg.inner_text('.sp-diff'));pg.screenshot(path=f'r15-wrong-{W}.png',full_page=True);ov('wrong')
        ins=pg.locator('.sp-card input.sp-in:not([disabled])')
        for k in range(ins.count()): ins.nth(k).fill(w2)
        log.append(f'{W} cont enabled: '+str(pg.locator('.sp-card .btn:has-text("Continue")').is_enabled()))
        # finish quickly: loop through remaining
        for step in range(30):
            if pg.locator('h3:has-text("done")').count(): break
            if pg.locator('text=Cover it and write it').count():
                pg.click('text=Cover it and write it');pg.wait_for_timeout(100)
            c=pg.locator('.sp-card .btn:has-text("Continue"):not([disabled])')
            if c.count(): c.first.click();pg.wait_for_timeout(100);continue
            if pg.locator('.sp-in:not([disabled])').count():
                tgt=pg.evaluate("(()=>{const s=JSON.parse(localStorage.getItem('wiw2-spell-en:guest'));return null})()")
                # answer with correct by reading blank? use word from DICT via sentence: give up and type wrong then fix
                pg.fill('.sp-in','zzz');pg.click('.sp-card .btn:has-text("Check")');pg.wait_for_timeout(100)
                word=pg.inner_text('.sp-card .sp-word')
                ins=pg.locator('.sp-card input.sp-in:not([disabled])')
                for k in range(ins.count()): ins.nth(k).fill(word)
        log.append(f'{W} finished: '+str(pg.locator('h3:has-text("done")').count()))
        pg.screenshot(path=f'r15-done-{W}.png')
        for tb in ['mine','rules','homo','card','prog','how']:
            pg.click(f'.sp-tabs [data-t={tb}]');pg.wait_for_timeout(300);ov(tb)
            if tb=='homo':
                pg.locator('details.sp-card summary').first.click();pg.wait_for_timeout(200);pg.locator('.sp-mcq button').first.click();pg.wait_for_timeout(100)
            if tb=='rules':
                pg.locator('details.sp-card summary').first.click();pg.wait_for_timeout(100);pg.locator('details.sp-card[open] .btn:has-text("Practise")').click();pg.wait_for_timeout(200)
            if tb=='mine':
                pg.fill('.sp-card textarea','separate | Keep them separate. | There is a rat in sep-a-rat-e.');pg.click('.sp-card .ad');pg.wait_for_timeout(200)
                log.append(f'{W} mine: '+pg.inner_text('.sp-card .msg'))
            pg.screenshot(path=f'r15-{tb}-{W}.png',full_page=False)
        log.append(f'{W} card items: '+str(pg.evaluate("1")))
        # Chinese
        pg.click('#lang-zh');pg.wait_for_timeout(500);log.append(f'{W} twin: '+pg.evaluate("location.hash"))
        pg.click('.sp-tabs [data-t=today]');pg.wait_for_timeout(200)
        pg.click('.sp-card .btn');pg.wait_for_timeout(400);pg.screenshot(path=f'r15-zhlearn-{W}.png');ov('zhlearn')
        pg.click('text=盖住，写一写');pg.wait_for_timeout(300)
        box=pg.locator('.tzg canvas').first.bounding_box()
        pg.mouse.move(box['x']+20,box['y']+20);pg.mouse.down();pg.mouse.move(box['x']+80,box['y']+80);pg.mouse.up()
        pg.click('text=写好了，对答案');pg.wait_for_timeout(200);pg.screenshot(path=f'r15-zhreveal-{W}.png');ov('zhreveal')
        pg.click('text=我写错了');pg.wait_for_timeout(200);log.append(f'{W} zh copy pads: '+str(pg.locator('.tzg-row').count()))
        pg.click('.sp-tabs [data-t=rules]');pg.wait_for_timeout(300)
        pg.locator('details.sp-card summary').first.click();pg.locator('details.sp-card[open] .btn').first.click();pg.wait_for_timeout(200);pg.locator('.sp-mcq button').first.click();pg.wait_for_timeout(100)
        pg.screenshot(path=f'r15-zhgroups-{W}.png');ov('zhgroups')
        pg.close()
    b.close()
