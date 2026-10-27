// ==UserScript==
// @name         Azota Hint - c8kpxq (content match)
// @namespace    local.azota.hint.c8kpxq
// @version      3.1
// @description  Highlight the correct answer for c8kpxq. Content matching, not A/B/C/D. Double-click/double-tap toggles the green line.
// @match        https://azota.vn/*
// @match        https://*.azota.vn/*
// @match        https://azota.io/*
// @match        https://*.azota.io/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  // qid -> correct answer content (normalized). Azota shuffles alpha between
  // attempts, but the correct option's content is stable.
  const ANS = {
  "600152103": "paragraph 3",
  "600152104": "paragraph 2",
  "600152102": "old materials are burned to make space for new ones",
  "600152101": "divide",
  "600152098": "the circular economy reuses things instead of throwing them away.",
  "600152099": "materials",
  "600152100": "the circular economy reduces unemployment by offering new types of work.",
  "600152097": "damage",
  "600152094": "a - c - b - d - e",
  "600152088": "a - d - c - b",
  "600152090": "d - c - a - b - e",
  "600152093": "a - c - e - b - d",
  "600152087": "a - b - c",
  "600152096": "d - a - c - e - b",
  "600152091": "b - c - a - d - e",
  "600152095": "d - c - a - b - e",
  "600152092": "c - b - e - a - d",
  "600152089": "c - b - e - a - d",
  "600152077": "started",
  "600152078": "way",
  "600152079": "regular",
  "600152080": "found",
  "600152081": "ever",
  "600152082": "in",
  "600152083": "take",
  "600152084": "recent",
  "600152085": "demand",
  "600152086": "means",
  "600152061": "become",
  "600152062": "protect",
  "600152063": "pollute",
  "600152064": "waste",
  "600152065": "throw away",
  "600152066": "donate",
  "600152067": "result",
  "600152068": "since",
  "600152069": "answer",
  "600152070": "designed",
  "600152071": "space",
  "600152072": "source",
  "600152073": "matter",
  "600152074": "consequently",
  "600152075": "disturb",
  "600152076": "absorbed",
  "600151973": "public transport",
  "600151985": "announcement",
  "600152016": "is going to",
  "600152002": "keen",
  "600151955": "cause",
  "600152019": "in use",
  "600151960": "calculated",
  "600151994": "had been",
  "600151993": "destroy",
  "600152030": "eco - friendly",
  "600151930": "adoption",
  "600151982": "will be",
  "600152006": "to turn",
  "600152035": "sustainability",
  "600152020": "throw away",
  "600151952": "attention",
  "600151956": "cut down on",
  "600151990": "heat . prevention",
  "600152056": "was",
  "600151977": "raw material",
  "600152024": "are going to travel",
  "600152042": "compulsory",
  "600151974": "will be distributed",
  "600152022": "were not selected",
  "600151943": "are going to see",
  "600151935": "raise awareness",
  "600151946": "for sorting",
  "600151971": "raise",
  "600152060": "must be replaced",
  "600151967": "professor",
  "600152014": "of",
  "600152048": "to bring",
  "600151937": "sustainable",
  "600152008": "remember",
  "600151996": "prize",
  "600152029": "is going to make",
  "600151998": "congratulations",
  "600152057": "waste",
  "600151976": "attractively",
  "600151965": "average",
  "600152058": "destruction",
  "600151933": "ceremony",
  "600151932": "will drive",
  "600152007": "won't go",
  "600152040": "to design",
  "600152039": "make",
  "600151942": "am going to meet",
  "600152009": "reminded",
  "600152032": "waste",
  "600151991": "driving machines",
  "600151984": "announce",
  "600152052": "adopted",
  "600151941": "harmful",
  "600152043": "will be finished",
  "600152051": "are going to be installed",
  "600151987": "waste collection program",
  "600151950": "are you going to leave",
  "600151958": "recycle",
  "600152003": "to collect",
  "600151961": "emissions",
  "600151978": "prevention",
  "600151945": "household appliances",
  "600151947": "will pay",
  "600151980": "compulsory",
  "600151934": "sustainability",
  "600152044": "harmful",
  "600151936": "am going to study",
  "600152053": "is sorted",
  "600151992": "on",
  "600152046": "on",
  "600151962": "estimate",
  "600152021": "revising",
  "600152055": "achievement",
  "600151986": "was left",
  "600151997": "creative waste collection idea",
  "600151999": "is going to rain",
  "600152005": "attracted",
  "600151957": "sort household appliances",
  "600152027": "was officially announced",
  "600152010": "are going to be typed",
  "600152059": "attraction",
  "600151983": "shade",
  "600151995": "every",
  "600151970": "explosion",
  "600152017": "turn off",
  "600151944": "global temperatures",
  "600152011": "made",
  "600151948": "climate change",
  "600151972": "plot",
  "600152028": "is going to be shown",
  "600152031": "is going to be",
  "600151988": "growing",
  "600151966": "average household energy bill",
  "600151979": "prevent",
  "600152013": "to",
  "600151963": "electric bus service",
  "600151981": "dirty plastic bags",
  "600152045": "will open",
  "600152026": "will get",
  "600152038": "will be banned",
  "600151940": "achievable",
  "600151975": "attract",
  "600152047": "will you open",
  "600151969": "have been banned",
  "600152050": "adopt",
  "600152001": "will miss",
  "600152025": "sustainably",
  "600151953": "safety",
  "600152023": "was translated",
  "600151949": "sustainable",
  "600152036": "will turn",
  "600151929": "youth union",
  "600151968": "electricity",
  "600152000": "aims",
  "600152004": "were being collected",
  "600152015": "give",
  "600152033": "are going to do",
  "600151954": "damage",
  "600152054": "are being installed",
  "600152034": "destruction",
  "600152041": "will be completed",
  "600152012": "choice",
  "600151939": "turned off",
  "600151931": "be recommended",
  "600151989": "carbon footprint",
  "600151938": "organic",
  "600151951": "was given",
  "600151964": "estimation",
  "600151959": "will visit",
  "600152037": "harm",
  "600152018": "broke down",
  "600152049": "harmful chemicals"
};

  const normalize = (s) => (s == null ? '' : String(s))
    .replace(/\u00a0/g, ' ')
    .replace(/[\u00ad\u200b\u200c\u200d\ufeff]/g, '')
    .replace(/[\u2018\u2019\u201b\u2032]/g, "'")
    .replace(/[\u201c\u201d\u2033]/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/[\u2010-\u2015\u2212]/g, '-')
    .replace(/\s*-\s*/g, ' - ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  const style = document.createElement('style');
  style.textContent = `
    .item-answer[data-azota-hit] .answer-content {
      background: #f0fdf4 !important;
      box-shadow: inset 3px 0 0 #16a34a, 0 0 0 1px rgba(34, 197, 85, .22) !important;
      border-radius: 10px !important;
      transition: background-color .15s ease, box-shadow .15s ease;
    }
    .item-answer[data-azota-hit] .answer-content::after {
      content: "";
      display: inline-block;
      width: 9px;
      height: 9px;
      margin-left: 8px;
      border-radius: 9999px;
      background: #16a34a;
      box-shadow: 0 0 0 3px rgba(34, 197, 85, .15);
      vertical-align: middle;
    }
    html.dark .item-answer[data-azota-hit] .answer-content,
    body.dark .item-answer[data-azota-hit] .answer-content {
      background: rgba(22, 163, 74, .14) !important;
      box-shadow: inset 3px 0 0 #22c55e, 0 0 0 1px rgba(34, 197, 85, .28) !important;
    }
    body.azota-hint-hidden .item-answer[data-azota-hit] .answer-content {
      background: transparent !important;
      box-shadow: none !important;
    }
    body.azota-hint-hidden .item-answer[data-azota-hit] .answer-content::after {
      display: none !important;
    }
  `;
  document.head.appendChild(style);

  function getQid(itemEl) {
    let el = itemEl.closest ? itemEl.closest('.azt-question[id], [id^="question_"]') : null;
    if (el && el.id) {
      const m = el.id.match(/(\d{6,})$/);
      if (m) return m[1];
    }
    let p = itemEl;
    for (let i = 0; i < 10 && p; i++) {
      const m = (p.id || '').match(/(\d{6,})$/);
      if (m) return m[1];
      p = p.parentElement;
    }
    return null;
  }

  function getContent(itemEl) {
    const el = itemEl.querySelector('.answer-content');
    if (!el) return '';
    return normalize(el.textContent || '');
  }

  let hiddenByDbl = false;

  function process() {
    document.querySelectorAll('.item-answer').forEach((itemEl) => {
      const qid = getQid(itemEl);
      const correct = qid ? ANS[qid] : null;
      const cur = getContent(itemEl);
      const hit = !!correct && (Array.isArray(correct) ? correct.includes(cur) : cur === correct);
      if (hit) {
        if (!itemEl.hasAttribute('data-azota-hit')) itemEl.setAttribute('data-azota-hit', '1');
      } else if (itemEl.hasAttribute('data-azota-hit')) {
        itemEl.removeAttribute('data-azota-hit');
      }
    });
  }

  let timer = null;
  const schedule = () => {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      process();
    }, 180);
  };

  const isRelevant = (m) => {
    const target = m.target.nodeType === 1 ? m.target : m.target.parentElement;
    if (target && target.closest && target.closest('.azt-question')) return true;
    if (m.type === 'childList') {
      for (const node of m.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.matches && node.matches('.azt-question, .item-answer')) return true;
        if (node.querySelector && node.querySelector('.azt-question, .item-answer')) return true;
      }
    }
    return false;
  };
  const obs = new MutationObserver((mutations) => {
    if (mutations.some(isRelevant)) schedule();
  });
  obs.observe(document.body, { childList: true, subtree: true, characterData: true });
  process();
  setInterval(process, 1800);

  let lastTouchAt = 0;
  let lastTouchToggleAt = 0;

  function toggleHints() {
    hiddenByDbl = !hiddenByDbl;
    document.body.classList.toggle('azota-hint-hidden', hiddenByDbl);
    if (!hiddenByDbl) process();
  }

  function isEditableTarget(target) {
    return !!(target && target.closest && target.closest('input, textarea, [contenteditable="true"]'));
  }

  document.addEventListener('dblclick', (e) => {
    if (Date.now() - lastTouchToggleAt < 600) return;
    if (isEditableTarget(e.target)) return;
    toggleHints();
  }, true);

  // Mobile browsers often do not fire dblclick for a double tap.
  document.addEventListener('touchend', (e) => {
    if (isEditableTarget(e.target)) return;
    const now = Date.now();
    if (now - lastTouchAt < 350) {
      lastTouchAt = 0;
      lastTouchToggleAt = Date.now();
      toggleHints();
    } else {
      lastTouchAt = now;
    }
  }, true);

  document.addEventListener('keydown', (e) => {
    if (e.altKey && (e.key === 'h' || e.key === 'H')) toggleHints();
  });

  console.log('[azota-hint c8kpxq] loaded: ' + Object.keys(ANS).length + ' answers, content match, double-click/double-tap to toggle.');
})();
