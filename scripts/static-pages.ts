import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import type { Plugin } from 'vite';
import { publicPaths, staticPaths } from '../src/static-paths';

export function staticPages(): Plugin {
  let outputDirectory: string;
  return {
    name: 'hanlingo-static-pages',
    apply: 'build',
    configResolved(config) { outputDirectory = resolve(config.root, config.build.outDir); },
    async closeBundle() {
      const html = await readFile(join(outputDirectory, 'index.html'), 'utf8');
      for (const path of staticPaths().filter(path => path !== '/')) {
        const directory = join(outputDirectory, path.slice(1));
        await mkdir(directory, {recursive: true});
        await writeFile(join(directory, 'index.html'), html);
      }
      // Unknown paths retain a genuine 404 while the app offers its normal recovery links.
      await writeFile(join(outputDirectory, '404.html'), html);
      const domain = (await readFile(join(outputDirectory, 'CNAME'), 'utf8')).trim();
      const urls = publicPaths().map(path => `  <url><loc>https://${domain}${path === '/' ? '/' : `${path}/`}</loc></url>`).join('\n');
      await writeFile(join(outputDirectory, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
      await writeFile(join(outputDirectory, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: https://${domain}/sitemap.xml\n`);
      const sourceCommit = execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
      await writeFile(join(outputDirectory, 'release.json'), JSON.stringify({sourceCommit,builtAt:new Date().toISOString()},null,2)+'\n');
      console.log(`Generated ${staticPaths().length} static entry points for ${domain}.`);
    },
  };
}
