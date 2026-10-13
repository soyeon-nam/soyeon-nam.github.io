import './style.css';
import './palettes.css';

import { files, seriesFiles } from 'virtual:posts';
function parsePost(path, raw) {
  const [, head, body] = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta = {};
  for (const line of head.split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  const [introRaw, ...chunks] = body.replace(/<!--[\s\S]*?-->/g, "").split(/^## /m);
  const intro = introRaw.replace(/^# .*\n/m, '').trim();
  const sections = chunks.map(chunk => {
    const [title, ...rest] = chunk.split('\n');
    return [title.trim(), rest.join('\n').trim()];
  });
  return {
    ...meta,
    id: path.split('/').pop().replace(/\.md$/, '').replace(/^\d+-/, ''),
    series: path.split('/').slice(-2, -1)[0],
    tags: (meta.tags || '').replace(/^\[|\]$/g, '').split(',').map(t => t.trim()).filter(Boolean),
    draft: meta.draft === 'true',
    intro,
    sections,
  };
}
const series = Object.entries(seriesFiles).map(([path, meta]) => ({ id: path.split('/').slice(-2, -1)[0], ...meta }));
const allPosts = Object.entries(files).map(([path, raw]) => parsePost(path, raw));
const ids = new Set();
for (const p of allPosts) {
  if (ids.has(p.id)) throw new Error(`중복된 글 id: ${p.id}`);
  ids.add(p.id);
}
const posts = allPosts.filter(p => series.some(s => s.id === p.series));
const categories = ['전체', ...new Set(posts.map(p => p.category))];
const icon = (name) => ({search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>'}[name]);
const svg = name => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">${icon(name)}</svg>`;
const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let category='전체', query='', limit=4;
function art(p,small=false){if(p.image)return `<div class="art has-image ${small?'small':''}"><img src="${import.meta.env.BASE_URL}images/${p.image}" alt="" loading="lazy"/></div>`;return `<div class="art image-placeholder ${small?'small':''}" aria-hidden="true"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5"/><path d="m3 17 5-5 4 4 4-6 5 7"/></svg><span>ARTICLE IMAGE</span></div>`;}
function header(){return `<header class="header"><a class="brand" href="#">AI 기술노트<span class="brand-dot">.</span></a><nav aria-label="주 메뉴"><a href="#about" class="${location.hash==='#about'?'active':''}">소개</a><a href="#" class="${!location.hash||location.hash==='#'?'active':''}">아티클</a><a href="#series" class="${location.hash==='#series'?'active':''}">시리즈</a></nav><button class="search-toggle" aria-label="검색 열기">${svg('search')}</button></header>`;}
function footer(){return `<footer><span>© ${new Date().getFullYear()} AI 기술노트.</span><a class="top" href="#" aria-label="맨 위로">↑</a></footer>`;}
function seriesCard(s){return `<a class="series-card" href="#series/${s.id}"><div class="series-art series-title tone-${s.color}"><span>${s.label}</span><strong>${esc(s.name)}</strong></div><div class="series-info"><h3>${s.name}</h3><p>${s.desc}</p><span>아티클 ${posts.filter(p=>p.series===s.id).length}개 ${svg('arrow')}</span></div></a>`;}
function postCard(p){return `<a class="post" href="#post/${p.id}">${art(p)}<div class="post-content"><span class="post-category">${p.category}</span><h3>${p.title}</h3>${p.description?`<p>${p.description}</p>`:''}<div class="post-meta"><time datetime="${p.date}">${p.date.replaceAll('-','. ')}</time></div></div></a>`;}
function renderList(){let filtered=posts.filter(p=>(category==='전체'||category===p.category)&&`${p.title} ${p.description||''} ${p.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>b.date.localeCompare(a.date));document.querySelector('#post-list').innerHTML=filtered.length?filtered.slice(0,limit).map(postCard).join(''):'<div class="empty">찾는 글이 없어요.<p>다른 검색어나 주제를 선택해 보세요.</p></div>';document.querySelector('#count').textContent=filtered.length;const more=document.querySelector('#more');more.hidden=filtered.length<=limit;document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('selected',b.dataset.category===category);b.setAttribute('aria-pressed',b.dataset.category===category);});}
function home(){return `<div class="home-grid"><aside><div class="section-heading"><h2>시리즈</h2><a href="#series" aria-label="모든 시리즈 보기">${svg('arrow')}</a></div><p class="aside-desc">하나의 주제, 차곡차곡 쌓이는 이야기.</p>${series.map(seriesCard).join('')}</aside><section class="articles"><div class="section-heading"><h2>전체 아티클 <span id="count"></span></h2><span class="sort">↓ 최신순</span></div><div class="filters" aria-label="주제 필터">${categories.map(c=>`<button class="filter" data-category="${c}">${c}</button>`).join('')}</div><div id="search-box" class="search-box" hidden><label for="search-input">아티클 검색</label><div>${svg('search')}<input id="search-input" placeholder="궁금한 기술이나 키워드를 검색하세요" value="${esc(query)}"/><button id="clear-search" aria-label="검색어 지우기">${svg('close')}</button></div></div><div id="post-list"></div><button id="more" class="more">아티클 더 보기 <span>↓</span></button></section></div>`;}
function seriesPosts(s){const list=posts.filter(p=>p.series===s.id);return s.order==='newest'?[...list].sort((a,b)=>b.date.localeCompare(a.date)||b.id.localeCompare(a.id)):list;}
function seriesPage(id){const s=series.find(s=>s.id===id);if(id&&!s)return '<section class="page"><h1>시리즈를 찾을 수 없어요.</h1><a href="#series">시리즈 목록으로 돌아가기 →</a></section>';return s?`<section class="page"><a class="back" href="#series">← 모든 시리즈</a><div class="eyebrow">AI TECH NOTES SERIES</div><h1>${s.name}</h1><p class="page-desc">${s.desc}</p><div class="series-posts">${seriesPosts(s).map(postCard).join('')}</div></section>`:`<section class="page"><div class="eyebrow">LEARN ONE CHAPTER AT A TIME</div><h1>시리즈<span>.</span></h1><p class="page-desc">하나의 주제를 깊이 있게, 차곡차곡 쌓이는 이야기.</p><div class="series-grid">${series.map(seriesCard).join('')}</div></section>`;}
function flow(t){const steps=t.trim().split('\n').filter(Boolean).map((l,i)=>{const [a,...b]=l.split('|');return `<div class="flow-step"><i>${i+1}</i><div><b>${esc(a.trim())}</b>${b.length?`<span>${esc(b.join('|').trim())}</span>`:''}</div></div>`});return `<div class="flow">${steps.join('<div class="flow-arrow">↓</div>')}</div>`}
const inline = t => esc(t).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>');
function list(lines,toc){const items=[];for(const l of lines){let m;if(m=l.match(/^(\d+\.|[-*])\s+(.*)/))items.push({ol:/\d/.test(m[1]),text:m[2],subs:[]});else if(items.length&&(m=l.match(/^\s+[-*]\s+(.*)/)))items.at(-1).subs.push(m[1]);else if(items.length)items.at(-1).text+=' '+l.trim();}const tag=items[0].ol?'ol':'ul';return `<${tag}>${items.map(it=>{const j=toc?toc.findIndex(([t])=>t.replace(/^\d+\.\s*/,'')===it.text.trim()):-1;const body=j>=0?`<a href="#section-${j}" data-goto="section-${j}">${inline(it.text)}</a>`:inline(it.text);return `<li>${body}${it.subs.length?`<ul>${it.subs.map(x=>`<li>${inline(x)}</li>`).join('')}</ul>`:''}</li>`}).join('')}</${tag}>`}
function table(lines){const row=l=>l.trim().replace(/^\||\|$/g,'').split('|').map(c=>c.trim());const [h,,...r]=lines;return `<div class="table-wrap"><table><thead><tr>${row(h).map(c=>`<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${r.map(l=>`<tr>${row(l).map(c=>`<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
function block(t,toc){const lines=t.split('\n');if(/^### /.test(t))return `<h3>${inline(t.slice(4).trim())}</h3>`;if(/^---+$/.test(t))return '<hr>';if(lines.length>2&&lines.every(l=>l.trim().startsWith('|')))return table(lines);if(/^(\d+\.|[-*])\s/.test(t))return list(lines,toc);return `<p>${inline(t)}</p>`}
function renderBody(body,toc){const parts=body.split(/^```([^\n]*)\n([\s\S]*?)^```[ \t]*$/m);let out='';for(let i=0;i<parts.length;i+=3){out+=parts[i].split(/\n{2,}/).map(t=>t.trim()?block(t.trim(),toc):'').join('');if(i+2<parts.length){const code=parts[i+2].replace(/\n$/,'');out+=parts[i+1].trim()==='flow'?flow(code):`<pre class="figure">${esc(code)}</pre>`}}return out}
document.addEventListener('click',e=>{const a=e.target.closest('[data-goto]');if(!a)return;e.preventDefault();document.getElementById(a.dataset.goto)?.scrollIntoView({behavior:'smooth'})});
function article(id){const p=posts.find(p=>p.id===id);if(!p)return '<section class="page"><h1>글을 찾을 수 없어요.</h1><a href="#">목록으로 돌아가기 →</a></section>';return `<article class="article-page"><a class="back" href="#">← 아티클 목록</a><span class="post-category">${p.category}</span><h1>${p.title}</h1>${p.description?`<p class="lede">${p.description}</p>`:''}<div class="post-meta"><time>${p.date.replaceAll('-','. ')}</time></div>${p.image?'':art(p)}<div class="article-body">${p.intro?renderBody(p.intro):''}${p.sections.map(([title,body],i)=>`<section id="section-${i}"><h2>${esc(title)}</h2>${renderBody(body,title==='목차'?p.sections:null)}</section>`).join('')}<div class="tags">${p.tags.map(t=>`<span>#${t}</span>`).join('')}</div>${seriesNav(p)}<a class="back" href="#">← 다른 아티클 읽기</a></div></article>`;}
function seriesNav(p){const s=series.find(s=>s.id===p.series),list=posts.filter(x=>x.series===p.series),i=list.indexOf(p),prev=list[i-1],next=list[i+1];return `<div class="article-series"><span>이 글이 포함된 시리즈 (${i+1}/${list.length})</span><a href="#series/${p.series}">${s.name} →</a>${prev?`<a href="#post/${prev.id}">← 이전 글: ${esc(prev.title)}</a>`:''}${next?`<a href="#post/${next.id}">다음 글: ${esc(next.title)} →</a>`:''}</div>`;}
function about(){return `<section class="page about-page"><h1>안녕하세요,<br>남소연입니다<span>.</span></h1></section>`;}
function render(){const [route,id]=location.hash.slice(1).split("/").map(decodeURIComponent);document.querySelector('#app').innerHTML=header()+`<main>${route==='post'?article(id):route==='series'?seriesPage(id):route==='about'?about():home()}</main>`+footer();document.title=route==='post'?`${posts.find(p=>p.id===id)?.title||'아티클'} — AI 기술노트`:'AI 기술노트 — AI와 데이터의 이야기';if(!route){renderList();document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{category=b.dataset.category;limit=4;renderList();});document.querySelector('#more').onclick=()=>{limit+=4;renderList();};document.querySelector('#search-input').oninput=e=>{query=e.target.value;limit=4;renderList();};document.querySelector('#clear-search').onclick=()=>{query='';document.querySelector('#search-input').value='';renderList();};}document.querySelector('.search-toggle').onclick=()=>{if(location.hash){location.hash='';requestAnimationFrame(openSearch);}else openSearch();};}
function openSearch(){const box=document.querySelector('#search-box');if(!box)return;box.hidden=false;box.scrollIntoView({behavior:'smooth',block:'center'});document.querySelector('#search-input').focus();}
window.addEventListener('hashchange',()=>{render();window.scrollTo({top:0});});render();
