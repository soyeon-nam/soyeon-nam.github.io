import fs from 'node:fs';
import path from 'node:path';

// posts/ 를 읽어 virtual:posts 모듈로 제공한다.
// 배포 빌드에서는 draft 시리즈/글을 번들에서 아예 제외한다. (dev에서는 모두 포함)
function posts() {
  const id = 'virtual:posts';
  const dir = path.resolve('posts');
  let isBuild = false;
  return {
    name: 'posts',
    configResolved: c => { isBuild = c.command === 'build'; },
    resolveId: s => (s === id ? '\0' + id : null),
    load(resolved) {
      if (resolved !== '\0' + id) return;
      this.addWatchFile(dir);
      const files = {}, seriesFiles = {};
      for (const s of fs.readdirSync(dir, { withFileTypes: true })) {
        if (!s.isDirectory()) continue;
        const sf = path.join(dir, s.name, '_series.json');
        if (!fs.existsSync(sf)) continue;
        this.addWatchFile(sf);
        const meta = JSON.parse(fs.readFileSync(sf, 'utf8'));
        if (isBuild && meta.draft) continue;
        seriesFiles[`${s.name}/_series.json`] = meta;
        for (const f of fs.readdirSync(path.join(dir, s.name)).filter(f => f.endsWith('.md')).sort()) {
          const p = path.join(dir, s.name, f);
          this.addWatchFile(p);
          const raw = fs.readFileSync(p, 'utf8');
          if (isBuild && /^draft:\s*true\s*$/m.test(raw.split(/\r?\n---/)[0])) continue;
          files[`${s.name}/${f}`] = raw;
        }
      }
      return `export const files = ${JSON.stringify(files)};\nexport const seriesFiles = ${JSON.stringify(seriesFiles)};`;
    },
  };
}

export default { plugins: [posts()] };
