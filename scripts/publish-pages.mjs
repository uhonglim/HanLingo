import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const run = (program, args, cwd = process.cwd()) => execFileSync(program, args, {cwd, stdio:'inherit'});
const read = (...args) => execFileSync('git', args, {encoding:'utf8'}).trim();
if (read('status','--porcelain')) throw new Error('Commit intended source changes before publishing.');
const sourceCommit=read('rev-parse','HEAD');
run('npm',['test']);
run('npm',['run','build']);
const release=JSON.parse(await readFile('dist/release.json','utf8'));
if (release.sourceCommit !== sourceCommit) throw new Error('Built source commit does not match HEAD.');
const remote=read('remote','get-url','origin');
const existing=read('ls-remote','--heads','origin','gh-pages');
const temporary=await mkdtemp(join(tmpdir(),'hanlingo-pages-'));
try {
  const checkout=join(temporary,'publish');
  if(existing) run('git',['clone','--depth','1','--single-branch','--branch','gh-pages',remote,checkout]);
  else {run('git',['init','--initial-branch=gh-pages',checkout]);run('git',['remote','add','origin',remote],checkout);}
  if(existing) run('git',['rm','-r','--ignore-unmatch','.'],checkout);
  await cp('dist',checkout,{recursive:true});
  run('git',['add','--all'],checkout);
  run('git',['commit','-m',`Publish HanLingo from ${sourceCommit}`],checkout);
  run('git',['push','origin','HEAD:gh-pages'],checkout);
  console.log(`Published artifact branch for source ${sourceCommit}. Verify GitHub Pages deployment and HTTPS before announcing release.`);
} finally { await rm(temporary,{recursive:true,force:true}); }
