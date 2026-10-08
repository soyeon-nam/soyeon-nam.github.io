import './style.css';
import './palettes.css';

const posts = [
  {
    "id": "agent-loop",
    "category": "AI Agents",
    "title": "AI 에이전트, 실행 루프부터 이해하기",
    "description": "계획하고, 도구를 사용하고, 결과를 확인하기까지. 에이전트의 작은 실행 루프를 들여다봅니다.",
    "date": "2026-10-05",
    "time": 8,
    "series": "agents",
    "art": "react",
    "tags": [
      "Agent",
      "Tool Use"
    ],
    "sections": [
      [
        "작은 작업부터 시작하기",
        "예시 프로젝트에서는 하나의 작업을 수행하는 에이전트부터 설계합니다. 입력과 완료 조건을 먼저 적고, 작업을 수행하는 데 어떤 도구가 필요한지 정리합니다."
      ],
      [
        "실행 과정을 기록하기",
        "어떤 도구를 선택했는지, 입력은 무엇이었는지, 결과를 어떻게 판단했는지 기록하는 화면을 구상합니다. 최종 답변뿐 아니라 중간 과정을 살펴보는 것이 이 실험의 목표입니다."
      ],
      [
        "종료 조건을 정하기",
        "성공 조건과 최대 실행 횟수를 실험 전에 정합니다. 종료 이유를 따로 기록해 다음 실험에서 비교할 수 있도록 합니다."
      ]
    ]
  },
  {
    "id": "data-pipeline",
    "category": "Data",
    "title": "데이터 파이프라인의 시작은 좋은 질문",
    "description": "수집부터 정제와 검증까지, 목적이 분명한 데이터 흐름을 설계하는 과정을 기록합니다.",
    "date": "2026-10-02",
    "time": 6,
    "series": "data",
    "art": "api",
    "tags": [
      "Data Pipeline",
      "Data Quality"
    ],
    "sections": [
      [
        "데이터의 목적 적기",
        "어떤 질문에 답하려는지, 결과를 어디에서 사용할지 먼저 정리합니다. 이 예시에서는 작은 문서 모음을 대상으로 수집과 검증 과정을 구성합니다."
      ],
      [
        "검증 기준 만들기",
        "필수 필드, 중복 여부, 갱신 시점처럼 확인할 항목을 적습니다. 각 단계에서 발견한 문제와 처리 결과를 기록하는 실험을 계획합니다."
      ]
    ]
  },
  {
    "id": "agent-context",
    "category": "AI Agents",
    "title": "에이전트에게 어떤 맥락을 전달할까",
    "description": "지시와 작업 상태, 도구의 결과. 컨텍스트를 구성하며 마주하는 선택들을 정리합니다.",
    "date": "2026-09-28",
    "time": 7,
    "series": "agents",
    "art": "ts",
    "tags": [
      "Context",
      "Agent Memory"
    ],
    "sections": [
      [
        "필요한 정보 구분하기",
        "작업 지시, 현재 상태, 참고 자료를 구분해 입력을 구성하는 예시입니다. 각 정보가 어떤 판단에 필요한지 설명을 붙여봅니다."
      ],
      [
        "비교할 조건 정하기",
        "같은 작업에 서로 다른 컨텍스트를 전달하는 실험을 계획합니다. 완료 여부와 실행 과정, 사용량을 함께 기록해 차이를 살펴봅니다."
      ]
    ]
  },
  {
    "id": "evaluation",
    "category": "Engineering",
    "title": "AI 에이전트 평가, 무엇을 기록할까",
    "description": "정답 하나를 넘어 실행 과정까지. 반복 가능한 평가를 위한 작은 체크포인트.",
    "date": "2026-09-24",
    "time": 5,
    "series": "evaluation",
    "art": "docker",
    "tags": [
      "Evaluation",
      "Agent"
    ],
    "sections": [
      [
        "완료 조건 명시하기",
        "작업별로 확인할 결과를 적고, 성공과 실패를 구분하는 기준을 정하는 예시입니다. 실행이 끝난 이유도 결과와 함께 기록합니다."
      ],
      [
        "같은 조건에서 비교하기",
        "입력, 설정, 평가 기준을 함께 보관하는 실험을 계획합니다. 변경 전후의 결과를 같은 기준으로 비교할 수 있는 기록 양식을 만듭니다."
      ]
    ]
  },
  {
    "id": "experiment-notes",
    "category": "실험 노트",
    "title": "작은 AI 실험을 오래 남기는 방법",
    "description": "가설, 조건, 관찰, 다음 질문. 실험의 결과보다 과정을 잃지 않는 기록 습관.",
    "date": "2026-09-20",
    "time": 4,
    "art": "notes",
    "tags": [
      "실험",
      "기록"
    ],
    "sections": [
      [
        "가설과 관찰 구분하기",
        "예상한 결과와 실제로 관찰한 내용을 따로 적는 노트입니다. 아직 확인하지 못한 이유는 질문으로 남겨 다음 실험으로 연결합니다."
      ],
      [
        "다시 시도할 수 있는 기록",
        "입력과 설정, 실행 시점, 바꾼 조건을 적습니다. 작은 실험도 나중에 같은 조건으로 다시 살펴볼 수 있도록 기록하는 것이 목표입니다."
      ]
    ]
  },
  {
    "id": "data-observability",
    "category": "Data",
    "title": "데이터와 에이전트의 흐름을 관찰하기",
    "description": "입력에서 결과까지, 어디에서 변화가 생겼는지 따라갈 수 있는 관측 노트를 만듭니다.",
    "date": "2026-09-15",
    "time": 9,
    "series": "evaluation",
    "art": "metrics",
    "tags": [
      "Observability",
      "Tracing"
    ],
    "sections": [
      [
        "흐름을 연결하는 기록",
        "하나의 작업에서 데이터가 전달되는 경로를 도식화하는 예시입니다. 단계마다 입력, 출력, 소요 시간을 기록할 수 있는 구조를 구상합니다."
      ],
      [
        "다음 질문 찾기",
        "결과를 살펴보며 추가로 확인할 지점을 적습니다. 관찰한 사실과 해석을 구분하고, 다음 실험에 필요한 기록 항목을 정리합니다."
      ]
    ]
  }
];
const series = [
  {
    "id": "agents",
    "name": "에이전트 직접 만들기",
    "desc": "실행 루프부터 컨텍스트 설계까지",
    "color": "purple",
    "symbol": "{ }",
    "label": "BUILDING AI AGENTS"
  },
  {
    "id": "data",
    "name": "데이터 파이프라인 노트",
    "desc": "수집부터 검증까지, 흐름을 단단하게",
    "color": "green",
    "symbol": "⌘",
    "label": "FOLLOW THE DATA"
  },
  {
    "id": "evaluation",
    "name": "평가와 관측",
    "desc": "결과를 넘어, 과정을 이해하는 방법",
    "color": "orange",
    "symbol": "↗",
    "label": "EVALUATE & OBSERVE"
  }
];
const icon = (name) => ({search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>'}[name]);
const svg = name => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">${icon(name)}</svg>`;
const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let category='전체', query='', limit=4;
function art(p,small=false){return `<div class="art image-placeholder ${small?'small':''}" aria-hidden="true"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5"/><path d="m3 17 5-5 4 4 4-6 5 7"/></svg><span>ARTICLE IMAGE</span></div>`;}
function header(){return `<header class="header"><a class="brand" href="#"><span class="brand-mark">ai</span>AI 기술노트<span class="brand-dot">.</span></a><nav aria-label="주 메뉴"><a href="#" class="${!location.hash||location.hash==='#'?'active':''}">아티클</a><a href="#series" class="${location.hash==='#series'?'active':''}">시리즈</a><a href="#about" class="${location.hash==='#about'?'active':''}">소개</a></nav><button class="search-toggle" aria-label="검색 열기">${svg('search')}</button></header>`;}
function footer(){return `<footer><a class="brand" href="#">AI 기술노트<span class="brand-dot">.</span></a><p>배우고, 만들고, 나눕니다.</p><span>© ${new Date().getFullYear()} AI 기술노트. Built with curiosity.</span><a class="top" href="#" aria-label="맨 위로">↑</a></footer>`;}
function seriesCard(s){return `<a class="series-card" href="#series/${s.id}"><div class="series-art series-placeholder"><span>${s.label}</span><b>${s.symbol}</b><em>SERIES IMAGE</em></div><div class="series-info"><h3>${s.name}</h3><p>${s.desc}</p><span>아티클 ${posts.filter(p=>p.series===s.id).length}개 ${svg('arrow')}</span></div></a>`;}
function postCard(p){return `<a class="post" href="#post/${p.id}">${art(p)}<div class="post-content"><span class="post-category">${p.category}</span><h3>${p.title}</h3><p>${p.description}</p><div class="post-meta"><span class="avatar">ai</span><span>AI 기술노트</span><i></i><time datetime="${p.date}">${p.date.replaceAll('-','. ')}</time><span class="read-time">${p.time}분 읽기</span></div></div></a>`;}
function renderList(){let filtered=posts.filter(p=>(category==='전체'||category===p.category)&&`${p.title} ${p.description} ${p.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>b.date.localeCompare(a.date));document.querySelector('#post-list').innerHTML=filtered.length?filtered.slice(0,limit).map(postCard).join(''):'<div class="empty">찾는 글이 없어요.<p>다른 검색어나 주제를 선택해 보세요.</p></div>';document.querySelector('#count').textContent=filtered.length;const more=document.querySelector('#more');more.hidden=filtered.length<=limit;document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('selected',b.dataset.category===category);b.setAttribute('aria-pressed',b.dataset.category===category);});}
function home(){return `<section class="hero"><h1>AI와 데이터,<br>배움의 과정을 기록합니다<span>.</span></h1><p>에이전트를 만드는 고민, 데이터에서 발견하는 가능성.<br>매일의 작은 발견을 함께 나눕니다.</p><div class="hero-graphic" aria-hidden="true"><span class="floating-label">const curiosity = true;</span><div class="code-tile"><span>&lt;</span><b>/</b><span>&gt;</span></div><div class="mini-tile">✳</div><span class="graphic-caption">KEEP LEARNING, KEEP BUILDING</span></div></section><div class="home-grid"><section class="articles"><div class="section-heading"><h2>최신 아티클 <span id="count"></span></h2><span class="sort">↓ 최신순</span></div><div class="filters" aria-label="주제 필터">${['전체','AI Agents','Data','Engineering','실험 노트'].map(c=>`<button class="filter" data-category="${c}">${c}</button>`).join('')}</div><div id="search-box" class="search-box" hidden><label for="search-input">아티클 검색</label><div>${svg('search')}<input id="search-input" placeholder="궁금한 기술이나 키워드를 검색하세요" value="${esc(query)}"/><button id="clear-search" aria-label="검색어 지우기">${svg('close')}</button></div></div><div id="post-list"></div><button id="more" class="more">아티클 더 보기 <span>↓</span></button></section><aside><div class="section-heading"><h2>함께 읽는 시리즈</h2><a href="#series" aria-label="모든 시리즈 보기">${svg('arrow')}</a></div><p class="aside-desc">하나의 주제, 차곡차곡 쌓이는 이야기.</p>${series.map(seriesCard).join('')}</aside></div>`;}
function seriesPage(id){const s=series.find(s=>s.id===id);if(id&&!s)return '<section class="page"><h1>시리즈를 찾을 수 없어요.</h1><a href="#series">시리즈 목록으로 돌아가기 →</a></section>';return s?`<section class="page"><a class="back" href="#series">← 모든 시리즈</a><div class="eyebrow">AI TECH NOTES SERIES</div><h1>${s.name}</h1><p class="page-desc">${s.desc}</p><div class="series-posts">${posts.filter(p=>p.series===id).map(postCard).join('')}</div></section>`:`<section class="page"><div class="eyebrow">LEARN ONE CHAPTER AT A TIME</div><h1>함께 읽는 시리즈<span>.</span></h1><p class="page-desc">하나의 주제를 깊이 있게, 차곡차곡 쌓이는 이야기.</p><div class="series-grid">${series.map(seriesCard).join('')}</div></section>`;}
function article(id){const p=posts.find(p=>p.id===id);if(!p)return '<section class="page"><h1>글을 찾을 수 없어요.</h1><a href="#">목록으로 돌아가기 →</a></section>';return `<article class="article-page"><a class="back" href="#">← 아티클 목록</a><span class="post-category">${p.category}</span><h1>${p.title}</h1><p class="lede">${p.description}</p><div class="post-meta"><span class="avatar">ai</span><span>AI 기술노트</span><i></i><time>${p.date.replaceAll('-','. ')}</time><span>${p.time}분 읽기</span></div>${art(p)}<div class="sample-notice">이 글은 블로그 화면을 살펴보기 위한 예시 콘텐츠입니다.</div><div class="article-body">${p.sections.map(([title,body],i)=>`<section id="section-${i}"><h2>${title}</h2><p>${body}</p></section>`).join('')}<div class="tags">${p.tags.map(t=>`<span>#${t}</span>`).join('')}</div>${p.series?`<div class="article-series"><span>이 글이 포함된 시리즈</span><a href="#series/${p.series}">${series.find(s=>s.id===p.series).name} →</a></div>`:''}<a class="back" href="#">← 다른 아티클 읽기</a></div></article>`;}
function about(){return `<section class="page about-page"><div class="eyebrow">HELLO, WORLD</div><h1>배우고, 만들고,<br>나눕니다<span>.</span></h1><p class="page-desc">AI와 데이터의 배움의 과정을 기록하는 공간, AI 기술노트입니다.</p><div class="about-copy"><h2>작은 발견이 모여, 더 나은 개발로</h2><p>개발하면서 마주한 질문, 문제를 해결하며 배운 것, 새로운 기술을 탐구한 경험을 기록합니다. 완벽한 정답보다 고민의 과정과 선택의 이유를 나누고 싶습니다.</p><h2>함께 깊이 읽어요</h2><p>AI 에이전트, 데이터, 엔지니어링과 실험 노트를 다룹니다. 연결되는 글은 시리즈로 묶어, 하나의 주제를 처음부터 차근차근 읽을 수 있습니다.</p><a class="primary-link" href="#">아티클 둘러보기 ${svg('arrow')}</a></div></section>`;}
function render(){const [route,id]=location.hash.slice(1).split('/');document.querySelector('#app').innerHTML=header()+`<main>${route==='post'?article(id):route==='series'?seriesPage(id):route==='about'?about():home()}</main>`+footer();document.title=route==='post'?`${posts.find(p=>p.id===id)?.title||'아티클'} — AI 기술노트`:'AI 기술노트 — AI와 데이터의 이야기';if(!route){renderList();document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{category=b.dataset.category;limit=4;renderList();});document.querySelector('#more').onclick=()=>{limit+=4;renderList();};document.querySelector('#search-input').oninput=e=>{query=e.target.value;limit=4;renderList();};document.querySelector('#clear-search').onclick=()=>{query='';document.querySelector('#search-input').value='';renderList();};}document.querySelector('.search-toggle').onclick=()=>{if(location.hash){location.hash='';requestAnimationFrame(openSearch);}else openSearch();};}
function openSearch(){const box=document.querySelector('#search-box');if(!box)return;box.hidden=false;box.scrollIntoView({behavior:'smooth',block:'center'});document.querySelector('#search-input').focus();}
window.addEventListener('hashchange',()=>{render();window.scrollTo({top:0});});render();
