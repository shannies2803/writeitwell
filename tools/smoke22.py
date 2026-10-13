from playwright.sync_api import sync_playwright
import pathlib,json
url='file://'+str(pathlib.Path('preview.html').resolve())
TXT='''One day me and my freind went to the park becuase it was a sunny day. We was very happy. i saw a dog. It's tail was wagging.

Then we play football. Then my friend kick the ball very hard and it went to the road. Then a car come and nearly hit him. I was very scared!!! "Watch out" I shouted. He did not went back. My mom said "Be careful".

After that we go to home. I learnt that we must be more carefull then before. It was a bad day but also a good day and we was tired and we slept'''
ZH='''今天是星期六，我和妈妈去公园玩。然后我们看到很多花。然后我们去买冰淇淋。然后我很高兴的跑过去。
妈妈说：“慢一点！”我跑的很快，结果摔倒了。我很难过。
最后我明白了做事要小心'''
with sync_playwright() as p:
    b=p.chromium.launch()
    for W in (390,1280):
        pg=b.new_page(viewport={'width':W,'height':900});pg.on('pageerror',lambda e:print('ERR',e))
        pg.goto(url);pg.wait_for_timeout(400)
        if pg.locator('#asGuest').count():pg.click('#asGuest')
        pg.evaluate("location.hash='en-home'");pg.wait_for_timeout(300);print(W,'qlinks',pg.locator('.qlinks button').count())
        pg.evaluate("location.hash='en-check'");pg.wait_for_timeout(500)
        pg.click('[data-lv="3"]');pg.fill('.ckin',TXT);pg.click('.ck9 .go');pg.wait_for_timeout(500)
        print(W,'overflow',pg.evaluate("document.documentElement.scrollWidth>innerWidth+1"))
        if W==390:
            for li in pg.locator('.cklist li').all():print('  -',li.inner_text().replace('\n',' | ')[:170])
            print('GOOD:',pg.locator('.ckgood').inner_text().replace('\n',' | '))
            print('TIPS:',pg.locator('.res').inner_text().split('Ideas to make it better')[-1][:300].replace('\n',' | '))
            pg.screenshot(path='r22-check-390.png',full_page=False)
            pg.locator('.res .sp-card').first.screenshot(path='r22-annot-390.png')
            n0=pg.locator('.cklist li').count();pg.locator('[data-fix]').first.click();pg.wait_for_timeout(300);print('after fix',n0,'->',pg.locator('.cklist li').count(),'|',pg.input_value('.ckin')[:40])
            pg.click('.addsp');pg.wait_for_timeout(200);print('addsp:',pg.locator('.spmsg').inner_text(),json.loads(pg.evaluate("Object.entries(localStorage).filter(([k])=>k.startsWith('wiw2-spell-en'))[0]?.[1]||'{}'")).get('custom'))
            pg.evaluate("location.hash='en-report'");pg.wait_for_timeout(500);print('report ck card:',pg.locator('.ck9').count())
        pg.evaluate("location.hash='zh-check'");pg.wait_for_timeout(1200);pg.fill('.ckin',ZH);pg.click('.ck9 .go');pg.wait_for_timeout(1500)
        print(W,'zh overflow',pg.evaluate("document.documentElement.scrollWidth>innerWidth+1"))
        if W==390:
            for li in pg.locator('.cklist li').all():print('  -',pg.evaluate("e=>e.textContent",li.element_handle())[:140])
            pg.screenshot(path='r22-zh-390.png')
