#!/usr/bin/env python3
"""Build the site: joins the engine, all content files and feature modules into ../index.html.
Run from this folder:  python3 build.py
"""
import os, re, glob
os.chdir(os.path.dirname(os.path.abspath(__file__)))
eng=open('engine.html',encoding='utf-8').read()
files=['art.js','icons.js','picsets1.js','picsets2.js','en-basics.js','en-banks.js','en-more1.js','en-more2.js','en-more3.js','en-more4.js','en-wb1.js','en-wb2.js','en-wb3.js','en-wb4.js','en-x1.js','en-x2.js','en-x3.js','en-x4.js','zh-basics.js','zh-banks.js','zh-more1.js','zh-more2.js','zh-more3.js','zh-more4.js','zh-wb1.js','zh-wb2.js','zh-wb3.js','zh-wb4.js','zh-x1.js','zh-x2.js','zh-x3.js','zh-x4.js','en-p1.js','en-p2.js','zh-p1.js','zh-p2.js','en-wb5.js','zh-wb5.js','en-x5.js','en-x6.js','en-x7.js','zh-x5.js','zh-x6.js','zh-x7.js','picsets3.js','picsets4.js','en-wb6.js','en-wb7.js','en-wb8.js','en-wb9.js','en-wb10.js','en-wb11.js','zh-wb6.js','zh-wb7.js','zh-wb8.js','zh-wb9.js','zh-wb10.js','zh-wb11.js','en-wb12.js','en-wb13.js','en-wb14.js','en-wb15.js','zh-wb12.js','zh-wb13.js','zh-wb14.js','zh-wb15.js','en-expert.js','zh-expert.js','spell-en-words-1.js','spell-en-words-2.js','spell-en-rules.js','spell-zh-words-1.js','spell-zh-words-2.js','spell-zh-groups.js']+sorted(__import__('glob').glob('vg-*.js'))+sorted(__import__('glob').glob('essays-*.js'))
data="\n".join(open(f,encoding='utf-8').read() for f in files)
assert '</script' not in data.lower()
mods=''.join(open(f,encoding='utf-8').read()+'\n' for f in ['features.js','games.js','features2.js','features3.js','spelling.js','vg.js','features4.js','features5.js'] if os.path.exists(f))
assert '</script' not in mods.lower()
out=eng.replace('/*__DATA__*/',data).replace('/*__MODULES__*/',mods)
HEAD='<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><link rel="manifest" href="/manifest.webmanifest"><link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"><meta name="theme-color" content="#3E7CD6"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style></head><body>\n'
page=HEAD+out+'\n</body></html>\n'
open('../index.html','w',encoding='utf-8').write(page)
import hashlib
ver=hashlib.sha1(page.encode('utf-8')).hexdigest()[:12]
open('../sw.js','w',encoding='utf-8').write(open('sw.template.js',encoding='utf-8').read().replace('__VERSION__',ver))
os.makedirs('../tools',exist_ok=True)
open('../tools/chk.js','w',encoding='utf-8').write("\n;\n".join(re.findall(r'<script>(.*?)</script>',out,re.S)))
open('../tools/preview.html','w',encoding='utf-8').write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+out+'</body></html>')
print("index.html:",len(out),"bytes")
