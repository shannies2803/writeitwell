from playwright.sync_api import sync_playwright
import pathlib,atexit
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
        for L in ['en','zh']:
            pg.evaluate("h=>{location.hash=h}",L+'-vg');pg.wait_for_timeout(500);ov(L+'vg home')
            log.append(f'{W} {L} topics: '+str(pg.locator('.vg-topic').count()))
            pg.screenshot(path=f'r16-{L}-home-{W}.png')
            pg.locator('.vg-topic').nth(3).click();pg.wait_for_timeout(300);ov(L+'topic');pg.screenshot(path=f'r16-{L}-topic-{W}.png',full_page=True)
            pg.locator('#main .btn').nth(1).click();pg.wait_for_timeout(300)
            types=[]
            for i in range(12):
                c=pg.locator('#main .sp-card').last
                if pg.locator('.vg-opts button').count():
                    types.append('mcq');pg.locator('.vg-opts button').first.click()
                elif pg.locator('.vg-toks button').count():
                    types.append('fix');pg.locator('.vg-toks button').first.click();pg.wait_for_timeout(100);pg.fill('#main input.vg-in','x');pg.locator('#main .btn:has-text("Check"), #main .btn:has-text("检查")').last.click()
                elif pg.locator('#main textarea.vg-in').count():
                    types.append('trans');pg.fill('#main textarea.vg-in','abc');pg.locator('#main .btn:has-text("Check"), #main .btn:has-text("检查")').last.click();pg.wait_for_timeout(100)
                    if pg.locator('#main .btn:has-text("Not quite"), #main .btn:has-text("还不对")').count(): pg.locator('#main .btn:has-text("Not quite"), #main .btn:has-text("还不对")').click()
                elif pg.locator('#main input.vg-in').count():
                    types.append('fill');pg.fill('#main input.vg-in','x');pg.locator('#main .btn:has-text("Check"), #main .btn:has-text("检查")').last.click()
                else: break
                pg.wait_for_timeout(100)
                if i==0: pg.screenshot(path=f'r16-{L}-q-{W}.png')
                nx=pg.locator('#main .btn:has-text("Next"), #main .btn:has-text("See my score"), #main .btn:has-text("下一题"), #main .btn:has-text("看成绩")')
                if nx.count(): nx.last.click();pg.wait_for_timeout(100)
            log.append(f'{W} {L} types: '+','.join(types)+' end: '+pg.evaluate("(document.querySelector('#main .sp-card h3')||{}).innerText"))
            ov(L+'quiz')
            pg.evaluate("h=>{location.hash=h}",L+'-today');pg.wait_for_timeout(400);log.append(f'{W} {L} today cards: '+str(pg.locator('.vgToday').count())+str(pg.locator('.spToday').count()))
            pg.evaluate("h=>{location.hash=h}",L+'-vg');pg.wait_for_timeout(400);log.append(f'{W} {L} bank: '+pg.evaluate("document.querySelectorAll('.vg-grid .sp-card')[1].innerText.replace(/\\n/g,' ')"))
            pg.locator('.vg-grid .sp-card').first.locator('.btn').click();pg.wait_for_timeout(300);log.append(f'{W} {L} daily first: '+pg.evaluate("(document.querySelector('#main .sp-card .tag')||{}).innerText"))
        # spelling test tab
        pg.evaluate("location.hash='en-myspell'");pg.wait_for_timeout(400)
        pg.click('.sp-tabs [data-t=test]');pg.wait_for_timeout(200)
        pg.fill('.sp-card textarea','because\nfriend | My friend Ali lives next door.\nbeautiful');pg.click('.sp-card .sv');pg.wait_for_timeout(200)
        log.append(f'{W} test list: '+pg.evaluate("[...document.querySelectorAll('.sp-print li')].length+''"))
        pg.locator('#main .btn:has-text("Practice test")').click();pg.wait_for_timeout(300);ov('mock')
        log.append(f'{W} mock prompt: '+pg.inner_text('#main .sp-card .sp-sent'))
        pg.click('.sp-tabs [data-t=today]');pg.wait_for_timeout(200);log.append(f'{W} banner: '+pg.evaluate("(document.querySelector('#main .sp-card b')||{}).innerText"))
        pg.screenshot(path=f'r16-sptoday-{W}.png')
        pg.close()
    b.close()
