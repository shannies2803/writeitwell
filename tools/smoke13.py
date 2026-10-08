from playwright.sync_api import sync_playwright
import pathlib,atexit
url='file://'+str(pathlib.Path('preview.html').resolve())
log=[];atexit.register(lambda: print('\n'.join(log)))
with sync_playwright() as p:
    b=p.chromium.launch()
    for W in (390,1280):
        pg=b.new_page(viewport={'width':W,'height':860})
        pg.on('pageerror',lambda e:log.append('PAGEERR '+str(e)))
        pg.goto(url);pg.wait_for_timeout(600)
        if pg.locator('#asGuest').count():pg.click('#asGuest')
        ov=lambda h: log.append(f'{W} OV {h}') if pg.evaluate("document.documentElement.scrollWidth>innerWidth+1") else None
        # library default level
        pg.evaluate("location.hash='en-essays'");pg.wait_for_timeout(400);ov('lib')
        log.append(f'{W} lib pressed: '+pg.evaluate("[...document.querySelectorAll('#liblv .pill[aria-pressed=true]')].map(b=>b.innerText).join()")+' cards '+str(pg.locator('#main .esscard').count()))
        pg.locator('#main .esscard').first.click();pg.wait_for_timeout(400);ov('essay')
        log.append(f'{W} tools: '+pg.evaluate("[...document.querySelector('#main .row').querySelectorAll('button')].map(b=>b.innerText).join(' / ')"))
        pg.locator('article.essay mark').first.click();pg.wait_for_timeout(200)
        log.append(f'{W} pop: '+str(pg.locator('.mpop').count()))
        pg.screenshot(path=f'r13-pop-{W}.png')
        pg.locator('.mpop .sv').click();pg.wait_for_timeout(200)
        pg.locator('#main button:has-text("Plot map")').click();pg.wait_for_timeout(300)
        pg.screenshot(path=f'r13-plot-{W}.png');ov('plot')
        log.append(f'{W} quiz qs: '+str(pg.locator('.quizq').count())+' more: '+str(pg.locator('.morelike .esscard').count()))
        # answer quiz correctly via data
        pg.evaluate("""()=>{}""")
        pg.locator('.quizq').first.scroll_into_view_if_needed();pg.screenshot(path=f'r13-quiz-{W}.png')
        # bank page
        pg.evaluate("location.hash='en-feelings'");pg.wait_for_timeout(500);ov('bank')
        log.append(f'{W} bank print: '+str(pg.locator('.prbtn').count())+' read: '+str(pg.locator('.readtick button').count()))
        pg.locator('.readtick button').click();pg.wait_for_timeout(200)
        log.append(f'{W} read disabled: '+str(pg.locator('.readtick button').is_disabled()))
        # language twin
        pg.click('#lang-zh' if pg.locator('#lang-zh').count() else '.lang button[data-lang=zh]');pg.wait_for_timeout(500)
        log.append(f'{W} twin: '+pg.evaluate("location.hash"))
        pg.evaluate("location.hash='zh-gaochao'");pg.wait_for_timeout(300)
        pg.click('.lang button[data-lang=en]');pg.wait_for_timeout(400);log.append(f'{W} twin2: '+pg.evaluate("location.hash"))
        pg.evaluate("location.hash='en-homelife'");pg.wait_for_timeout(300);log.append(f'{W} homelife: '+pg.evaluate("document.querySelector('#main h2').innerText"))
        for h in ['en-spinner','zh-spinner','en-memo','zh-memo']:
            pg.evaluate("h=>{location.hash=h}",h);pg.wait_for_timeout(400);ov(h);pg.screenshot(path=f'r13-{h}-{W}.png')
        pg.evaluate("location.hash='en-spinner'");pg.wait_for_timeout(300)
        pg.click('.spinb');pg.wait_for_timeout(900);log.append(f'{W} spin: '+pg.inner_text('.sum'))
        pg.click('.wr');pg.wait_for_timeout(500);log.append(f'{W} studio topic: '+pg.evaluate("document.querySelector('#main select').selectedOptions[0].textContent.slice(0,80)"))
        pg.evaluate("location.hash='en-memo'");pg.wait_for_timeout(300)
        s=pg.inner_text('.memo .shown');pg.click('.memo .rd');pg.wait_for_timeout(200)
        pg.fill('.memo textarea',s);pg.click('.memo .ck');pg.wait_for_timeout(200);log.append(f'{W} memo fb: '+pg.inner_text('.memo .fb'))
        pg.screenshot(path=f'r13-memo2-{W}.png')
        pg.evaluate("location.hash='en-home'");pg.wait_for_timeout(400);log.append(f'{W} essday: '+pg.evaluate("(document.querySelector('.essday .tag')||{}).innerText"))
        pg.close()
    b.close()
