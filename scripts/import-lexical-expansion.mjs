/** Import exact lexical records from pinned, licensed Beida and Liu CLDF releases.
 * Run from the repository root. --research writes only .evidence outputs.
 */
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createServer } from 'vite';
const research = process.argv.includes('--research');
const sources = {
 liu: { repository:'https://github.com/lexibank/liusinitic', commit:'54f6742d9fa60315ae41b91d0d1e02f04036efb5', cache:'.evidence/min-expansion-2026/liusinitic-', prefix:'liu2007', year:2007, characterField:'Chinese_Characters', files:{'cldf/forms.csv':'7496caf7dd62373791d700c0eb05e154ed7f8d7f9c8a41fb5a9b060a07c70fca','cldf/parameters.csv':'6ea8a355d2dec1090010b6c2f77e806bf73b6231061be7dcf693721e8cf3d11d','cldf/languages.csv':'4e796ba750c9e93e86c2398a8bc4199b6501888b181276ca2c46de13575ccec0','LICENSE':'945fbcb37deca05bccd7c3ca0e261679f1f5373515504fdbad68f6f3cf6f49b9','metadata.json':'5bee3a101c177a54aec933c80b9bc6a1b7910806c90349c03fa8924239d96965','README.md':'f72ae8a62b460ab29c65407130dc04f8e82ee554600321136fcdbc9c8cd61828'}, citation:'Liu Lili, Wang Hongzhong and Bai Ying, 现代汉语方言核心词·特征词集 (2007), licensed Lexibank CLDF edition' },
 beida: { repository:'https://github.com/lexibank/beidasinitic', commit:'6bb8f57330f3b28c126a633f2c2adc6d01d0f555', cache:'.evidence/atlas-learning/beidasinitic/6bb8f57330f3b28c126a633f2c2adc6d01d0f555-', prefix:'beida1964', year:1964, characterField:'Benzi', files:{'cldf/forms.csv':'1e7e56677076da4936e2247fc08b5dc905f24030a115b87c0dbdde894481ca68','cldf/parameters.csv':'e08c90929466b1a2f0b8c9af035887719e9c8f2418c70d47a0557f0d4c57d6f9','cldf/languages.csv':'b6410c7d5038605a99576d5efb9ae8285efab4dcef5eac7c3e08f6d4a816bf6c','LICENSE':'945fbcb37deca05bccd7c3ca0e261679f1f5373515504fdbad68f6f3cf6f49b9','metadata.json':'2a10d1fd9331dab15d712479e57334a3ae6ec547116c1c00695be5e8262995de','README.md':'65395db5b3de6ae466ccfacc3c85295d3f866c9e0918c435fe013f1c0396d940'}, citation:'Beijing University, 汉语方言词汇 (1964), licensed Lexibank CLDF edition v5.1, DOI10.5281/zenodo.13149151' },
};
const localities=[
 {source:'liu', language:'Haerbin', id:'harbin', name:'Harbin', branch:'mandarin/northeastern', limit:1000},
 {source:'liu', language:'Rongcheng', id:'rongcheng-371082', name:'Rongcheng', branch:'mandarin/jiaoliao', limit:1000},
 {source:'liu', language:'Loudi', id:'loudi-study', name:'Loudi', branch:'xiang/loushao', limit:1000},
 {source:'beida', language:'Kunming', id:'kunming-study', name:'Kunming', branch:'mandarin/southwestern', limit:250},
];
const holds={
 'Kunming-401_man-1':'Written 男入 conflicts with man; unresolved glyph, not silently corrected.',
 'Kunming-387_mouth-1':'Written 阻 conflicts with mouth; unresolved glyph, not silently corrected.',
 'Kunming-115_firefly-1':'Written 蜜火蟲 and firefly transcription conflict; unresolved glyph, not repaired.',
 'Kunming-224_woolensweater-1':'Written 毛錢衣 conflicts with woolen sweater; unresolved glyph, not repaired.',
 'Kunming-223_jiaaocostume-1':'Written 裌祆 has an unresolved second character; no inferred correction.',
 'Kunming-109_earthworm-1':'Compound 蛐蟮 has only one supplied tone group tɕʰiʂã13; unresolved internal syllable tone, not repaired.',
 'Haerbin-100_throw-1':'Written 仍 conflicts with throw; possible transcription typo, not silently corrected.',
 'Haerbin-67_near-1':'Written 進 conflicts with near; possible transcription typo, not silently corrected.',
 'Rongcheng-67_near-1':'Written 進 conflicts with near; possible transcription typo, not silently corrected.',
 'Loudi-67_near-1':'Written 進 conflicts with near; possible transcription typo, not silently corrected.',
 'Haerbin-81_mather-1':'Source m44 has no vowel or syllabicity mark for 媽; unresolved source transcription, not repaired.',
};
const headingEdits={'mather':'mother','rightside':'right side','leftside':'left side','live(alive)':'live; be alive'};
function csv(text){
 const rows=[]; let fields=[],field='',quoted=false,line=1,start=1;
 for(let i=0;i<text.length;i++) {const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}else if(c===','&&!quoted){fields.push(field);field='';}else if(c==='\n'&&!quoted){fields.push(field.replace(/\r$/,''));rows.push({fields,line:start});fields=[];field='';start=line+1;}else field+=c;if(c==='\n')line++;}
 if(field||fields.length){fields.push(field);rows.push({fields,line:start});}const header=rows.shift().fields;return rows.map(r=>({...Object.fromEntries(header.map((h,i)=>[h,r.fields[i]??''])),line:r.line}));
}
for(const s of Object.values(sources)) {
 await mkdir(s.cache.slice(0,s.cache.lastIndexOf('/')), {recursive:true});
 for(const [file,hash] of Object.entries(s.files)) {
  const path=s.cache+file.replaceAll('/','_');let bytes;
  try{bytes=await readFile(path);}catch{const remote=`${s.repository.replace('github.com','raw.githubusercontent.com')}/${s.commit}/${file}`;const response=await fetch(remote);if(!response.ok)throw new Error(`Source HTTP ${response.status}: ${remote}`);bytes=Buffer.from(await response.arrayBuffer());if(createHash('sha256').update(bytes).digest('hex')!==hash)throw new Error('Source hash mismatch');await writeFile(path,bytes);}
  if(createHash('sha256').update(bytes).digest('hex')!==hash)throw new Error(`Pinned source changed: ${file}`);if(file.endsWith('.csv'))s[file]=csv(bytes.toString('utf8'));
 }
}
const editorial = {
  "harbin": {
    "sounds": [
      [
        "Tone distinguishes fish and rain",
        "Haerbin-174_fish-1",
        "In this published Harbin sample, 鱼 “fish” is [y²⁴] and 雨 “rain” is [y²¹³]. The vowel is identical; the supplied pitch contour distinguishes these two entries."
      ],
      [
        "Aspiration and place of articulation",
        "Haerbin-14_eat-1",
        "吃 “eat” is [tʂʰʅ⁴⁴], with an aspirated retroflex affricate. 水 “water” [ʂuei²¹³] begins with a fricative instead. These exact survey forms remain separate from Standard Mandarin textbook transcriptions."
      ]
    ],
    "culture": [
      [
        "Central Street’s shop signs",
        "A 2026 field study of Central Street and Saint Sophia’s surroundings documents Chinese, English and Russian in signs and commercial displays. The streetscape offers a visible record of Harbin’s multilingual history; it does not identify the speakers behind the lexical survey.",
        "PolyU · Gu, Li, Song & Hu · linguistic landscape field study · 2026",
        "https://www.polyu.edu.hk/lst/research/publications/journal-papers/2026/0611-chinese-city-with-russian-characteristics/"
      ],
      [
        "Bread, kvass and souvenir displays",
        "The same field study documents khleb bread, kvass and Matryoshka dolls among the goods that present Russian cultural associations to visitors around Central Street and Saint Sophia. These are observed urban cultural displays, not a claim that all Harbin households share the same traditions.",
        "Gu, Li, Song & Hu · Semiotica · 2026",
        "https://doi.org/10.1515/sem-2026-0017"
      ]
    ]
  },
  "rongcheng-371082": {
    "sounds": [
      [
        "One vowel, two supplied contours",
        "Rongcheng-174_fish-1",
        "The Rongcheng list records 鱼 “fish” [y⁵²] and 雨 “rain” [y²¹⁴]. Keep the rounded vowel [y] and the different pitch contours; HanLingo spells the vowel ü in both entries."
      ],
      [
        "A locally written eating verb",
        "Rongcheng-14_eat-1",
        "The source writes 歹 for “eat” and transcribes [tai²¹⁴]. This is the study’s local written form and lexical meaning, not the usual written-Chinese meaning of 歹. 喝 “drink” is separately recorded as [xa²¹⁴]."
      ]
    ],
    "culture": [
      [
        "Sea-grass roofs in Dongchudao",
        "Rongcheng’s coastal villages preserve stone houses roofed with dried eelgrass. An official heritage account describes Dongchudao’s houses and roof-building craft. Dongchudao is a wider Rongcheng cultural example; the lexical dataset does not identify it as the survey site.",
        "Weihai Development and Reform Commission · Rongcheng sea-grass houses · 2020",
        "https://www.ndrc.gov.cn/fggz/nyncjj/xczx/202009/t20200909_1237854.html"
      ],
      [
        "Grain Rain and the fishing season",
        "The national heritage record documents the Grain Rain sea ritual in Yuankuang village, Rongcheng. The observance follows seasonal fish migration and includes wishes for safe fishing. This village-specific tradition supplies regional context, not a location claim for the wordlist.",
        "China Intangible Cultural Heritage · Rongcheng fishermen’s sea ritual",
        "https://www.ihchina.cn/project_details/15092"
      ]
    ]
  },
  "loudi-study": {
    "sounds": [
      [
        "Voiced and voiceless stops",
        "Loudi-22_big-1",
        "大 “big” [da¹¹] has a voiced [d], while 打 “hit” [ta⁴²] has voiceless [t]. Both consonant and pitch differ. HanLingo keeps d and t distinct instead of rewriting the pair through Mandarin pinyin."
      ],
      [
        "One form for eating and drinking",
        "Loudi-14_eat-1",
        "The survey gives 喫 [tɕʰiɔ¹³] for both “eat” and “drink”. The repeated form is an attested lexical overlap, not two pronunciations. Meaning quizzes must not ask learners to choose one of these meanings against the other."
      ]
    ],
    "culture": [
      [
        "Dragon boats on the Lianshui",
        "Hunan’s sports bureau records a 2016 Loudi dragon-boat event on the Lianshui at the Second Bridge, with ten village and neighbourhood teams racing a 500-metre course. The source documents that event; it does not establish an unchanged annual schedule.",
        "Hunan Sports Bureau · Loudi Lianshui dragon boats · 2016",
        "https://tyj.hunan.gov.cn/tyj/xxgk/gzdt/sstyxw/201606/t20160607_3456671.html"
      ],
      [
        "Duanwu craft in the city library",
        "Loudi’s public library held sachet-making sessions for Duanwu in 2025, alongside family craft activities at the city museum. The documented programme connects seasonal customs with hands-on learning in city cultural venues.",
        "Hunan Culture and Tourism · Loudi Duanwu activities · 2025",
        "https://whhlyt.hunan.gov.cn/whhlyt/news/sxxw/202506/t20250604_33690847.html"
      ]
    ]
  },
  "kunming-study": {
    "sounds": [
      [
        "The survey’s food and household words",
        "Kunming-160_tomato-1",
        "The 1950s Kunming survey records 洋辣子 “tomato” [iã³¹ la¹³ tsɿ⁵³] and 洋堿 “soap” [iã³¹ tɕiɛ⁵³]. These are attested lexical choices in this dated sample; they are not claims that neighbouring places lack the same words."
      ],
      [
        "An aspirated retroflex beginning",
        "Kunming-505_eat-1",
        "吃 “eat” [tʂʰʅ³¹] and 茶 “tea” [tʂʰa³¹] share an aspirated retroflex affricate and the supplied rising contour. Their vowels differ. The CLDF edition’s IPA is retained, including its source-specific [ʅ]."
      ]
    ],
    "culture": [
      [
        "Music around Green Lake",
        "A 2024 account from Kunming’s ethnic-affairs commission describes more than twenty self-organised arts groups performing folk music, violin music and dance around Green Lake. The park is a shared city space; these performances do not establish any participant’s home language.",
        "Kunming Ethnic Affairs Commission · Green Lake · 2024",
        "https://mzzj.yn.gov.cn/html/2024/difangdongtai_0326/53256.html"
      ],
      [
        "The Dizang Temple stone pillar",
        "Kunming Municipal Museum displays the twelfth-century Dizang Temple stone pillar: seven tiers, eight sides and carved Buddhist figures. Its Chinese and Sanskrit inscriptions give visitors another way to encounter the city’s written and artistic past, separate from the modern lexical survey.",
        "Kunming Municipal Museum · The World of the Eight Classes · 2023",
        "https://www.kmmuseum.com/gzl.asp?act=20"
      ]
    ]
  }
};
const priority=new Map('water|rice|eat|drink|tea|fish|meat|egg|salt|sugar|oil|bread|noodles|tofu|milk|vegetable|potato|tomato|fruit|apple|orange|banana|pear|peach|grape|dog|cat|pig|cow|horse|chicken|bird|duck|sheep|goat|person|man|woman|child|father|mother|brother|sister|hand|foot|head|eye|ear|nose|mouth|tooth|hair|heart|sun|moon|star|rain|wind|snow|cloud|sky|fire|earth|mountain|river|tree|leaf|flower|grass|house|door|window|table|chair|bed|bowl|cup|chopsticks|spoon|knife|clothes|shoe|hat|soap|market|one|two|three|four|five|six|seven|eight|nine|ten|today|tomorrow|yesterday|year|day|night|morning|good|bad|big|small|long|short|hot|cold|new|old|white|black|red|yellow|green|blue|come|go|walk|run|sleep|sit|stand|buy|sell|give|see|hear|know|speak|read|write|laugh|cry'.split('|').map((v,i)=>[v,i]));
const v=await createServer({configFile:false,server:{middlewareMode:true},appType:'custom',optimizeDeps:{noDiscovery:true,include:[]}});
const packs=[],records=[],rejections=[];
try {
 const {convertIpa}=await v.ssrLoadModule('/src/data/romanization-method.ts');
 for(const place of localities){
  const s=sources[place.source], params=new Map(s['cldf/parameters.csv'].map(r=>[r.ID,r]));
  const language=s['cldf/languages.csv'].find(r=>r.ID===place.language);if(!language)throw new Error('Unresolved source locality');
  const candidates=s['cldf/forms.csv'].filter(r=>r.Language_ID===place.language).sort((a,b)=>{const score=r=>priority.get(params.get(r.Parameter_ID).Name.toLowerCase())??(1000+Number(params.get(r.Parameter_ID).Number||r.Parameter_ID.match(/^\d+/)?.[0]||0));return score(a)-score(b)||a.line-b.line;});
  const words=[],seen=new Set();
  for(const r of candidates){
   const reject=reason=>rejections.push({dataset:place.source,sourceId:r.ID,localityId:place.id,reason});
   if(holds[r.ID]){reject(holds[r.ID]);continue;}
   const han=r[s.characterField].replaceAll(' ','');
   if(!han||han.includes('囗')||!/^\p{Script=Han}+$/u.test(han)){reject('Unresolved local written form');continue;}
   if(r.Comment||r.Value!==r.Form){reject('Annotated or edited form');continue;}
   const syllables=r.Value.match(/[^⁰¹²³⁴⁵⁶⁷⁸⁹\s]+[¹²³⁴⁵]{1,3}/gu);
   if(!syllables||syllables.join('')!==r.Value.replaceAll(' ','')||/[⁰⁶⁷⁸⁹⁻*?/()[\]{}]/u.test(r.Value)){reject('Incomplete or marked tone notation');continue;}
   const ipa=`[${syllables.join(' ')}]`;
   try{convertIpa(ipa,'pitch-contour');}catch{reject('Unsupported source IPA');continue;}
   if(seen.has(r.Parameter_ID)){reject('Additional lexical alternative');continue;}
   seen.add(r.Parameter_ID);
   const english=headingEdits[params.get(r.Parameter_ID).Name]??params.get(r.Parameter_ID).Name;
   const id=`${s.prefix}-${r.ID}`;
   const scope=place.source==='beida'?'1950s survey · published 1964':'published 2007 · collection date unspecified';
   words.push({id,learningKind:'word',han,english,ipa,toneNotation:'pitch-contour',localityId:place.id,reading:'Published lexical survey',registerLabel:`${place.name} · ${scope}`,note:`Local written form and pronunciation from the ${s.year} study’s CLDF edition.${place.source==='beida'?' Its editors slightly adjusted IPA; this is the electronic edition’s transcription, not a facsimile of the printed book.':''} The source’s complete supplied pitch sequence is preserved; phrase tones are not replaced with guessed citation tones. No speaker age, exact recording address or present-day uniformity is inferred.`,source:{title:`${place.source==='beida'?'Beida 1964':'Liu, Wang & Bai 2007'} · ${r.ID} · CC BY 4.0`,url:`${s.repository}/blob/${s.commit}/cldf/forms.csv#L${r.line}`}});
   records.push({id,dataset:place.source,sourceId:r.ID,languageId:r.Language_ID,localityId:place.id,sourceValue:r.Value,sourceCharacters:r[s.characterField],characterField:s.characterField,parameterId:r.Parameter_ID,sourceEnglish:params.get(r.Parameter_ID).Name,line:r.line});
   if(words.length===place.limit)break;
  }
  const notes=editorial[place.id];
  const soundNotes=notes.sounds.map(([title,sourceId,text])=>{
   const word=words.find(w=>w.id===`${s.prefix}-${sourceId}`);if(!word)throw new Error(`Sound-note source not selected: ${sourceId}`);
   return {title,text,localityIds:[place.id],source:word.source};
  });
  const culture=notes.culture.map(([title,text,sourceTitle,url])=>({title,text,localityIds:[place.id],source:{title:sourceTitle,url}}));
  const resources=[{title:`${place.name} lexical survey`,description:`${s.citation}. Exact city label ${place.language}; collection ${place.source==='beida'?'in the 1950s':'date unspecified'}. This is a lexical questionnaire, not new recordings or a complete present-day course.`,localityIds:[place.id],kind:'Study',url:`${s.repository}/tree/${s.commit}`},...culture.map(c=>({title:c.title,description:c.text,localityIds:[place.id],kind:'Culture',url:c.source.url}))];
  packs.push({branchId:place.branch,words,soundNotes,culture,resources});
 }
}finally{await v.close();}
const out=research?'.evidence/lexical-next/lexical-expansion.ts':'src/data/learning/lexical-expansion.ts';
const ledger=research?'.evidence/lexical-next/lexical-expansion-provenance.json':'docs/lexical-expansion-provenance.json';
await writeFile(out,'// Generated by scripts/import-lexical-expansion.mjs. Licensed CLDF records; see docs/LEXICAL-EXPANSION-SOURCES.md.\nimport type { BranchLearning } from "./types";\nexport const lexicalExpansionLearning: BranchLearning[] = '+JSON.stringify(packs,null,2)+';\n');
await writeFile(ledger,JSON.stringify({sources:Object.fromEntries(Object.entries(sources).map(([id,s])=>[id,{repository:s.repository,commit:s.commit,citation:s.citation,license:'CC BY 4.0',hashes:s.files}])),localities,holds,headingEdits,records,rejections},null,2)+'\n');
console.log(packs.map(p=>[p.words[0]?.localityId,p.words.length]));
