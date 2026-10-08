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
  const sections = body.split(/^## /m).slice(1).map(chunk => {
    const [title, ...rest] = chunk.split('\n');
    return [title.trim(), rest.join('\n').trim()];
  });
  return {
    ...meta,
    id: path.split('/').pop().replace(/\.md$/, '').replace(/^\d+-/, ''),
    series: path.split('/').slice(-2, -1)[0],
    tags: (meta.tags || '').replace(/^\[|\]$/g, '').split(',').map(t => t.trim()).filter(Boolean),
    draft: meta.draft === 'true',
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
function art(p,small=false){return `<div class="art image-placeholder ${small?'small':''}" aria-hidden="true"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5"/><path d="m3 17 5-5 4 4 4-6 5 7"/></svg><span>ARTICLE IMAGE</span></div>`;}
function header(){return `<header class="header"><a class="brand" href="#">AI 기술노트<span class="brand-dot">.</span></a><nav aria-label="주 메뉴"><a href="#" class="${!location.hash||location.hash==='#'?'active':''}">아티클</a><a href="#series" class="${location.hash==='#series'?'active':''}">시리즈</a><a href="#about" class="${location.hash==='#about'?'active':''}">소개</a></nav><button class="search-toggle" aria-label="검색 열기">${svg('search')}</button></header>`;}
function footer(){return `<footer><a class="brand" href="#">AI 기술노트<span class="brand-dot">.</span></a><p>배우고, 만들고, 나눕니다.</p><span>© ${new Date().getFullYear()} AI 기술노트. Built with curiosity.</span><a class="top" href="#" aria-label="맨 위로">↑</a></footer>`;}
function seriesCard(s){return `<a class="series-card" href="#series/${s.id}">${s.cover?`<div class="series-art series-cover">${s.cover}<span>${s.label}</span><strong>${esc(s.name)}</strong></div>`:`<div class="series-art series-placeholder"><span>${s.label}</span><b>${s.symbol}</b><em>SERIES IMAGE</em></div>`}<div class="series-info"><h3>${s.name}</h3><p>${s.desc}</p><span>아티클 ${posts.filter(p=>p.series===s.id).length}개 ${svg('arrow')}</span></div></a>`;}
function postCard(p){return `<a class="post" href="#post/${p.id}">${art(p)}<div class="post-content"><span class="post-category">${p.category}</span><h3>${p.title}</h3><p>${p.description}</p><div class="post-meta"><span class="avatar">ai</span><span>AI 기술노트</span><i></i><time datetime="${p.date}">${p.date.replaceAll('-','. ')}</time></div></div></a>`;}
function renderList(){let filtered=posts.filter(p=>(category==='전체'||category===p.category)&&`${p.title} ${p.description} ${p.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>b.date.localeCompare(a.date));document.querySelector('#post-list').innerHTML=filtered.length?filtered.slice(0,limit).map(postCard).join(''):'<div class="empty">찾는 글이 없어요.<p>다른 검색어나 주제를 선택해 보세요.</p></div>';document.querySelector('#count').textContent=filtered.length;const more=document.querySelector('#more');more.hidden=filtered.length<=limit;document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('selected',b.dataset.category===category);b.setAttribute('aria-pressed',b.dataset.category===category);});}
function home(){return `<section class="hero"><h1>AI와 데이터,<br>배움의 과정을 기록합니다<span>.</span></h1><p>에이전트를 만드는 고민, 데이터에서 발견하는 가능성.<br>매일의 작은 발견을 함께 나눕니다.</p><div class="hero-graphic" aria-hidden="true"><span class="floating-label">const curiosity = true;</span><div class="code-tile"><span>&lt;</span><b>/</b><span>&gt;</span></div><div class="mini-tile">✳</div><span class="graphic-caption">KEEP LEARNING, KEEP BUILDING</span></div></section><div class="home-grid"><section class="articles"><div class="section-heading"><h2>최신 아티클 <span id="count"></span></h2><span class="sort">↓ 최신순</span></div><div class="filters" aria-label="주제 필터">${categories.map(c=>`<button class="filter" data-category="${c}">${c}</button>`).join('')}</div><div id="search-box" class="search-box" hidden><label for="search-input">아티클 검색</label><div>${svg('search')}<input id="search-input" placeholder="궁금한 기술이나 키워드를 검색하세요" value="${esc(query)}"/><button id="clear-search" aria-label="검색어 지우기">${svg('close')}</button></div></div><div id="post-list"></div><button id="more" class="more">아티클 더 보기 <span>↓</span></button></section><aside><div class="section-heading"><h2>함께 읽는 시리즈</h2><a href="#series" aria-label="모든 시리즈 보기">${svg('arrow')}</a></div><p class="aside-desc">하나의 주제, 차곡차곡 쌓이는 이야기.</p>${series.map(seriesCard).join('')}</aside></div>`;}
function seriesPosts(s){const list=posts.filter(p=>p.series===s.id);return s.order==='newest'?[...list].sort((a,b)=>b.date.localeCompare(a.date)||b.id.localeCompare(a.id)):list;}
function seriesPage(id){const s=series.find(s=>s.id===id);if(id&&!s)return '<section class="page"><h1>시리즈를 찾을 수 없어요.</h1><a href="#series">시리즈 목록으로 돌아가기 →</a></section>';return s?`<section class="page"><a class="back" href="#series">← 모든 시리즈</a><div class="eyebrow">AI TECH NOTES SERIES</div><h1>${s.name}</h1><p class="page-desc">${s.desc}</p><div class="series-posts">${seriesPosts(s).map(postCard).join('')}</div></section>`:`<section class="page"><div class="eyebrow">LEARN ONE CHAPTER AT A TIME</div><h1>함께 읽는 시리즈<span>.</span></h1><p class="page-desc">하나의 주제를 깊이 있게, 차곡차곡 쌓이는 이야기.</p><div class="series-grid">${series.map(seriesCard).join('')}</div></section>`;}
function article(id){const p=posts.find(p=>p.id===id);if(!p)return '<section class="page"><h1>글을 찾을 수 없어요.</h1><a href="#">목록으로 돌아가기 →</a></section>';return `<article class="article-page"><a class="back" href="#">← 아티클 목록</a><span class="post-category">${p.category}</span><h1>${p.title}</h1><p class="lede">${p.description}</p><div class="post-meta"><span class="avatar">ai</span><span>AI 기술노트</span><i></i><time>${p.date.replaceAll('-','. ')}</time></div>${art(p)}<div class="sample-notice">이 글은 블로그 화면을 살펴보기 위한 예시 콘텐츠입니다.</div><div class="article-body">${p.sections.map(([title,body],i)=>`<section id="section-${i}"><h2>${esc(title)}</h2>${body.split(/\n{2,}/).map(t=>`<p>${esc(t)}</p>`).join('')}</section>`).join('')}<div class="tags">${p.tags.map(t=>`<span>#${t}</span>`).join('')}</div>${seriesNav(p)}<a class="back" href="#">← 다른 아티클 읽기</a></div></article>`;}
function seriesNav(p){const s=series.find(s=>s.id===p.series),list=posts.filter(x=>x.series===p.series),i=list.indexOf(p),prev=list[i-1],next=list[i+1];return `<div class="article-series"><span>이 글이 포함된 시리즈 (${i+1}/${list.length})</span><a href="#series/${p.series}">${s.name} →</a>${prev?`<a href="#post/${prev.id}">← 이전 글: ${esc(prev.title)}</a>`:''}${next?`<a href="#post/${next.id}">다음 글: ${esc(next.title)} →</a>`:''}</div>`;}
function about(){return `<section class="page about-page"><div class="eyebrow">HELLO, WORLD</div><h1>배우고, 만들고,<br>나눕니다<span>.</span></h1><p class="page-desc">AI와 데이터의 배움의 과정을 기록하는 공간, AI 기술노트입니다.</p><div class="about-copy"><h2>작은 발견이 모여, 더 나은 개발로</h2><p>개발하면서 마주한 질문, 문제를 해결하며 배운 것, 새로운 기술을 탐구한 경험을 기록합니다. 완벽한 정답보다 고민의 과정과 선택의 이유를 나누고 싶습니다.</p><h2>함께 깊이 읽어요</h2><p>AI 에이전트, 데이터, 엔지니어링과 실험 노트를 다룹니다. 연결되는 글은 시리즈로 묶어, 하나의 주제를 처음부터 차근차근 읽을 수 있습니다.</p><a class="primary-link" href="#">아티클 둘러보기 ${svg('arrow')}</a></div></section>`;}
function render(){const [route,id]=location.hash.slice(1).split("/").map(decodeURIComponent);document.querySelector('#app').innerHTML=header()+`<main>${route==='post'?article(id):route==='series'?seriesPage(id):route==='about'?about():home()}</main>`+footer();document.title=route==='post'?`${posts.find(p=>p.id===id)?.title||'아티클'} — AI 기술노트`:'AI 기술노트 — AI와 데이터의 이야기';if(!route){renderList();document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{category=b.dataset.category;limit=4;renderList();});document.querySelector('#more').onclick=()=>{limit+=4;renderList();};document.querySelector('#search-input').oninput=e=>{query=e.target.value;limit=4;renderList();};document.querySelector('#clear-search').onclick=()=>{query='';document.querySelector('#search-input').value='';renderList();};}document.querySelector('.search-toggle').onclick=()=>{if(location.hash){location.hash='';requestAnimationFrame(openSearch);}else openSearch();};}
function openSearch(){const box=document.querySelector('#search-box');if(!box)return;box.hidden=false;box.scrollIntoView({behavior:'smooth',block:'center'});document.querySelector('#search-input').focus();}
window.addEventListener('hashchange',()=>{render();window.scrollTo({top:0});});render();
