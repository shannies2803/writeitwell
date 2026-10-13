from playwright.sync_api import sync_playwright
import pathlib,atexit,time
url='file://'+str(pathlib.Path('preview.html').resolve())
log=[];atexit.register(lambda: print('\n'.join(log)))
NEW=['en-helping','en-accidents','en-mystery','en-fantasy','en-gadgets','en-getaround','en-choices','en-funny','en-timewords','en-colours']
with sync_playwright() as p:
    b=p.chromium.launch()
    for W in (390,1280):
        pg=b.new_page(viewport={'width':W,'height':860})
        pg.on('pageerror',lambda e:log.append('PAGEERR '+str(e)))
        pg.route("http*://**",lambda r:r.abort())   # offline: nothing from the internet
        pg.goto(url);pg.wait_for_timeout(500)
        if pg.locator('#asGuest').count():pg.click('#asGuest')
        ov=lambda h: log.append(f'{W} OV {h}') if pg.evaluate("document.documentElement.scrollWidth>innerWidth+1") else None
        log.append(f'{W} pinyinPro bundled: '+str(pg.evaluate("!!window.pinyinPro")))
        for u in NEW+['en-golden','en-feelings','en-idioms2']:
            pg.evaluate(f"location.hash='{u}'");pg.wait_for_timeout(350);ov(u)
            log.append(f"{W} {u}: "+pg.evaluate("document.querySelector('#main h2')?.innerText")+' chips='+str(pg.locator('#main .chip').count()))
        pg.evaluate("location.hash='en-home'");pg.wait_for_timeout(400)
        log.append(f"{W} home lists new: "+str(pg.evaluate("['Funny moments','Mystery'].map(t=>document.querySelector('#main').innerText.includes(t))")))
        if W==390:pg.screenshot(path='r19-en-funny-390.png')
        # Chinese
        t=time.time();pg.evaluate("location.hash='zh-feelings'");pg.wait_for_timeout(1500);ov('zh-feelings')
        log.append(f"{W} zh-feelings pc spans: {pg.locator('#main .pc').count()} leftover-han-text: "+str(pg.evaluate("(()=>{const w=document.createTreeWalker(document.getElementById('main'),NodeFilter.SHOW_TEXT);let n=0;while(w.nextNode()){const x=w.currentNode;if(/[\\u4e00-\\u9fff]/.test(x.nodeValue)&&!x.parentNode.closest('.pc,ruby,textarea,script,style'))n++}return n})()")))
        pg.screenshot(path=f'r19-zh-feel-{W}.png')
        c=pg.locator('#main .chip').first;txt=c.evaluate("e=>e.textContent");log.append(f'{W} chip textContent clean: {txt}')
        for h in ['zh-chuxue','zh-haoju','zh-chengyu2','zh-essays','zh-vg','zh-myspell','zh-home']:
            pg.evaluate(f"location.hash='{h}'");pg.wait_for_timeout(900);ov(h);log.append(f"{W} {h}: pc={pg.locator('#main .pc').count()}")
        pg.screenshot(path=f'r19-zh-home-{W}.png')
        pg.evaluate("location.hash='zh-essays'");pg.wait_for_timeout(500)
        if pg.locator('#main .esscard').count():
            pg.locator('#main .esscard').first.click();pg.wait_for_timeout(1000);ov('essay');log.append(f"{W} essay pc={pg.locator('#main article .pc').count()} oldbtn={pg.locator('#main .row button:has-text(\"拼音\")').count()}");pg.screenshot(path=f'r19-zh-essay-{W}.png')
        pg.click('#pyBtn');pg.wait_for_timeout(200);log.append(f"{W} toggle off nopy: "+str(pg.evaluate("document.documentElement.classList.contains('nopy')")));pg.click('#pyBtn')
        pg.evaluate("location.hash='en-home'");pg.wait_for_timeout(300)
