from playwright.sync_api import sync_playwright
import time
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={'width':390,'height':860});pg=ctx.new_page()
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('http://localhost:8765/');pg.wait_for_timeout(1500)
    if pg.locator('#asGuest').count():pg.click('#asGuest')
    pg.wait_for_timeout(4000)
    print('sw ready:',pg.evaluate("navigator.serviceWorker.controller?'controlled':'not yet'"),pg.evaluate("navigator.serviceWorker.getRegistration().then(r=>r&&r.active?r.active.state:'none')"))
    pg.reload();pg.wait_for_timeout(1500);print('controlled after reload:',pg.evaluate("!!navigator.serviceWorker.controller"))
    ctx.set_offline(True);pg.reload();pg.wait_for_timeout(2000);print('offline title:',pg.title(),'h2:',pg.evaluate("(document.querySelector('#main h2')||{}).innerText"))
    ctx.set_offline(False)
    # essay deep link
    pg.goto('http://localhost:8765/#zh-essays/zh-kindness-01');pg.wait_for_timeout(1500);print('deep link:',pg.evaluate("location.hash"),pg.evaluate("(document.querySelector('article.essay h3')||{}).innerText"))
    pg.locator('#main .btn:has-text("复制链接")').count() and print('copy link btn ok')
    print('sound btn:',pg.locator('#sndBtn').count(),'errors:',errs[:3])
    b.close()
