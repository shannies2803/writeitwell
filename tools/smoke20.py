from playwright.sync_api import sync_playwright
import pathlib,atexit
url='file://'+str(pathlib.Path('preview.html').resolve())
log=[];atexit.register(lambda: print('\n'.join(log)))
with sync_playwright() as p:
    b=p.chromium.launch()
    for W in (390,1280):
        pg=b.new_page(viewport={'width':W,'height':860})
        pg.on('pageerror',lambda e:log.append('PAGEERR '+str(e)))
        pg.route("http*://**",lambda r:r.abort())
        pg.goto(url);pg.wait_for_timeout(500)
        if pg.locator('#asGuest').count():pg.click('#asGuest')
        ov=lambda h: log.append(f'{W} OV {h}') if pg.evaluate("document.documentElement.scrollWidth>innerWidth+1") else None
        pg.evaluate("location.hash='en-golden'");pg.wait_for_timeout(500);ov('golden')
        log.append(f"{W} w7 card: {pg.locator('#w7').count()} pool: {pg.locator('#w7 .w7pool button').count()}")
        bt=pg.locator('#w7 .w7pool button')
        ph=[bt.nth(i).inner_text() for i in range(3)]
        for i in range(3): bt.nth(i).click()
        tas=pg.locator('#w7 textarea')
        tas.nth(0).fill(f"On the last day of school, I wrote {ph[0]} in my diary.")
        tas.nth(1).fill("this has no phrase")
        tas.nth(2).fill(f"My grandmother smiled and said {ph[2]} to all of us.")
        pg.click('#w7 .ck');pg.wait_for_timeout(200)
        log.append(f"{W} use3 phrases {ph} fb: "+" | ".join(pg.locator('#w7 .rows .fb').all_inner_texts()))
        tas.nth(1).fill(f"When the bell rang, {ph[1]} was all I could think about.")
        pg.click('#w7 .ck');pg.wait_for_timeout(300);log.append(f"{W} use3 after fix: "+pg.locator('#w7 .all').inner_text())
        if W==390:pg.locator('#w7').screenshot(path='r20-use3-390.png')
        pg.click('#w7 [data-tab=pa]');pg.wait_for_timeout(200)
        pws=[pg.locator('#w7 .w7pool button').nth(i).get_attribute('data-w') for i in range(3)]
        pg.fill('#w7 textarea',"It was a bright Saturday morning. "+". ".join(f"Suddenly {w} filled my mind and I could not stop smiling at my brother and sister" for w in pws)+". We laughed all the way home and Mum said it was the best day ever.")
        pg.wait_for_timeout(200);log.append(f"{W} para meta: "+pg.locator('#w7 .w7meta').inner_text()+" used="+str(pg.locator('#w7 .w7pool button.used').count()))
        pg.click('#w7 .dn');pg.wait_for_timeout(200);log.append(f"{W} para fb: "+pg.locator('#w7 .w7body > .fb').inner_text())
        # save some chips then review
        pg.evaluate("location.hash='en-similes'");pg.wait_for_timeout(500)
        for i in range(4):pg.locator('#main .chip').nth(i*3).click()
        pg.evaluate("location.hash='en-mywords'");pg.wait_for_timeout(500);ov('mywords')
        log.append(f"{W} review: "+pg.locator('.w7 p b').first.inner_text())
        pg.click('.w7 .st');pg.wait_for_timeout(200)
        for k in range(4):
            if pg.locator('.w7 .sk').count():pg.click('.w7 .sk');pg.wait_for_timeout(100)
            if pg.locator('.w7 button:has-text("Next")').count():pg.click('.w7 button:has-text("Next")');pg.wait_for_timeout(100)
        log.append(f"{W} review end: "+pg.locator('.w7').first.inner_text()[:60].replace('\n',' '))
        log.append(f"{W} my sentences items: {pg.locator('.w7sent li').count()}")
        # today
        pg.evaluate("location.hash='en-today'");pg.wait_for_timeout(500);ov('today')
        log.append(f"{W} d5: "+pg.locator('.d4ring').first.inner_text()+" write done="+str(pg.locator('.d4 [data-k=write].done').count()))
        if W==390:pg.locator('.d4card').first.screenshot(path='r20-d5-390.png')
        pg.evaluate("location.hash='en-home'");pg.wait_for_timeout(400);log.append(f"{W} qlinks: {pg.locator('.qlinks button').count()}");ov('home')
        # exam
        pg.evaluate("location.hash='en-exam'");pg.wait_for_timeout(600);ov('exam choose')
        if W==390:pg.screenshot(path='r20-exam-choose-390.png',full_page=False)
        pg.locator('figure[data-s]').first.click();pg.wait_for_timeout(600);ov('exam work')
        log.append(f"{W} exam timer: "+pg.locator('.w7timer').inner_text().replace('\n',' '))
        txt="It was a sunny Saturday morning. Then I went to the hawker centre with my family. Then I saw a wallet. Then I picked it up.\n\nMy heart was pounding. I is very scared. \"What should I do?\" I said. Mum said we should return it.\n\nWe walked to the police post. The officer said thank you. I said it was nothing.\n\nI felt as light as a feather. I learnt that honesty is the best policy."
        pg.fill('.comp',txt);pg.wait_for_timeout(200)
        pg.screenshot(path=f'r20-exam-work-{W}.png',full_page=True)
        pg.click('.fin');pg.wait_for_timeout(400);ov('exam mark')
        log.append(f"{W} hints: "+" | ".join(pg.locator('.w7hints li').all_inner_texts()))
        segs=pg.locator('.w7seg');n=segs.count()
        for i in range(n):segs.nth(i).locator('button').nth(2 if i%3 else 1).click()
        log.append(f"{W} score: "+pg.locator('.w7score').inner_text())
        pg.click('.sv');pg.wait_for_timeout(300);log.append(f"{W} saved: "+pg.locator('.w7 .fb').last.inner_text())
        pg.screenshot(path=f'r20-exam-mark-{W}.png',full_page=True)
        pg.evaluate("location.hash='en-exam'");pg.wait_for_timeout(500);log.append(f"{W} history rows: {pg.locator('[data-h]').count()}")
        # picwords
        pg.evaluate("location.hash='en-picwords'");pg.wait_for_timeout(500);ov('picwords')
        for k in range(10):
            q=pg.locator('.w7opts button');
            if not q.count():break
            # click all until ok
            for j in range(3):
                bb=pg.locator('.w7opts button').nth(j)
                if bb.is_enabled():bb.click();pg.wait_for_timeout(80)
                if pg.locator('.w7opts button.ok').count():break
            pg.wait_for_timeout(1250)
        log.append(f"{W} picwords end: "+pg.locator('.w7').inner_text()[:60].replace('\n',' '))
        pg.click('[data-tab=se]');pg.wait_for_timeout(300);hw=pg.locator('.w7pool button').first.get_attribute('data-w')
        pg.fill('.w7 textarea',f"I can see a {hw} in the picture.");pg.click('.w7 .ck');pg.wait_for_timeout(200);log.append(f"{W} picsent: "+pg.locator('.w7 .fb').inner_text())
        if W==390:pg.screenshot(path='r20-picsent-390.png')
        # zh pinyin modes
        pg.evaluate("location.hash='zh-haoju'");pg.wait_for_timeout(1500);ov('zh-haoju')
        log.append(f"{W} zh w7: {pg.locator('#w7').count()} pybtn: "+pg.inner_text('#pyBtn'))
        pg.click('#pyBtn');pg.wait_for_timeout(300);log.append(f"{W} after1: "+pg.inner_text('#pyBtn')+" hard="+str(pg.evaluate("document.documentElement.classList.contains('pyhard')"))+" e="+str(pg.locator('#main .pc.e').count())+" h="+str(pg.locator('#main .pc.h').count()))
        if W==390:pg.screenshot(path='r20-zh-hard-390.png')
        pg.click('#pyBtn');pg.wait_for_timeout(200);log.append(f"{W} after2 nopy="+str(pg.evaluate("document.documentElement.classList.contains('nopy')")))
        pg.click('#pyBtn');pg.wait_for_timeout(200);log.append(f"{W} after3: "+pg.inner_text('#pyBtn'))
        pg.evaluate("location.hash='zh-exam'");pg.wait_for_timeout(1000);ov('zh-exam')
        pg.evaluate("location.hash='zh-picwords'");pg.wait_for_timeout(800);ov('zh-picwords')
        pg.evaluate("location.hash='en-vg'");pg.wait_for_timeout(500)
    # prop contact sheet
    pg=b.new_page(viewport={'width':1280,'height':900});pg.goto(url);pg.wait_for_timeout(400)
    if pg.locator('#asGuest').count():pg.click('#asGuest')
    pg.evaluate("location.hash='en-picwords'");pg.wait_for_timeout(400)
