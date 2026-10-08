from playwright.sync_api import sync_playwright
import pathlib,atexit
url='file://'+str(pathlib.Path('preview.html').resolve())
log=[];atexit.register(lambda: print('\n'.join(log)))
OV="""()=>{const W=innerWidth;const r=[];document.querySelectorAll('#main *, header *, .topline *').forEach(e=>{const b=e.getBoundingClientRect();if(b.right>W+1&&b.width>0)r.push(e.tagName+'.'+e.className+' '+Math.round(b.right))});return r.slice(0,6)}"""
with sync_playwright() as p:
    b=p.chromium.launch()
    for W in (390,1280):
        pg=b.new_page(viewport={'width':W,'height':900})
        pg.on('pageerror',lambda e:log.append(f'PAGEERR '+str(e)))
        pg.on('console',lambda m: log.append('CONSOLE '+m.text) if m.type in('error',) and 'ERR_TUNNEL' not in m.text and 'net::' not in m.text else None)
        pg.goto(url);pg.wait_for_timeout(600)
        if pg.locator('#asGuest').count():pg.click('#asGuest')
        for h in ['en-home','en-studio']:
            pg.evaluate("h=>{location.hash=h}",h);pg.wait_for_timeout(300)
            if pg.evaluate("document.documentElement.scrollWidth>innerWidth+1"): log.append(f'{W} OV {h} '+str(pg.evaluate(OV)))
        for h in ['en-find','zh-find','en-games','zh-games','en-dictation','zh-dictation']:
            pg.evaluate("h=>{location.hash=h}",h);pg.wait_for_timeout(300)
            t=pg.evaluate("document.querySelector('#main').innerText.slice(0,80).replace(/\\n/g,' | ')")
            log.append(f'{W} {h}: {t}')
            if pg.evaluate("document.documentElement.scrollWidth>innerWidth+1"): log.append(f'{W} OV {h} '+str(pg.evaluate(OV)))
            pg.screenshot(path=f'r8-{h}-{W}.png')
        # find
        pg.evaluate("location.hash='en-find'");pg.wait_for_timeout(200)
        inp=pg.locator('#main input').first
        inp.fill('happy');pg.wait_for_timeout(400)
        log.append(f'{W} find results: '+str(pg.evaluate("document.querySelector('#main').innerText.length")))
        pg.screenshot(path=f'r8-findres-{W}.png')
        # essay
        eid=pg.evaluate("ESSAYS.find(e=>e.lang=='zh').id")
        pg.evaluate("location.hash='zh-essays'");pg.wait_for_timeout(300)
        pg.evaluate("id=>openEssay&&openEssay(id)",eid) if pg.evaluate("typeof openEssay")=='function' else None
        pg.wait_for_timeout(500)
        log.append(f'{W} essay hash '+pg.evaluate("location.hash")+' btns: '+pg.evaluate("[...document.querySelectorAll('#main button')].map(b=>b.innerText.trim()).filter(Boolean).slice(0,14).join(' / ')"))
        pg.screenshot(path=f'r8-essay-{W}.png')
        if pg.evaluate("document.documentElement.scrollWidth>innerWidth+1"): log.append(f'{W} OV essay '+str(pg.evaluate(OV)))
        # studio
        pg.evaluate("location.hash='en-studio'");pg.wait_for_timeout(400)
        log.append(f'{W} studio btns: '+pg.evaluate("[...document.querySelectorAll('#main button')].map(b=>b.innerText.trim()).filter(Boolean).slice(0,30).join(' / ')"))
        pg.screenshot(path=f'r8-studio-{W}.png',full_page=True)
        pg.evaluate("location.hash='en-home'");pg.wait_for_timeout(400)
        pg.screenshot(path=f'r8-home-{W}.png',full_page=False)
        pg.evaluate("location.hash='en-today'");pg.wait_for_timeout(400)
        pg.screenshot(path=f'r8-today-{W}.png',full_page=True)
        pg.close()
    b.close()
