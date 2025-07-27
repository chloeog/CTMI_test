const questions = [
  {
    text: '따뜻한 커피를 좋아하나요, 차가운 커피를 좋아하나요?',
    options: [
      { label: 'Hot', value: 'H' },
      { label: 'Ice', value: 'I' }
    ]
  },
  {
    text: '계획적으로 내려마시나요, 빠르게 샷으로 마시나요?',
    options: [
      { label: 'Brew', value: 'B' },
      { label: 'Shot', value: 'S' }
    ]
  },
  {
    text: '로스팅은 다크한 풍미인가요, 라이트한 산미인가요?',
    options: [
      { label: 'Dark', value: 'D' },
      { label: 'Light', value: 'L' }
    ]
  },
  {
    text: '당신의 커피는 달달한가요, 달지 않나요?',
    options: [
      { label: 'Sweet', value: 'S' },
      { label: 'Unsweetened', value: 'U' }
    ]
  }
];

let current = 0;
let resultCode = '';

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const quizEl = document.getElementById('quiz');
const resultEl = document.getElementById('result');
const codeEl = document.getElementById('code');

function renderQuestion() {
  const q = questions[current];
  questionEl.textContent = q.text;
  optionsEl.innerHTML = '';

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt.label;
    btn.onclick = () => {
      resultCode += opt.value;
      current++;
      if (current < questions.length) {
        renderQuestion();
      } else {
        showResult();
      }
    };
    optionsEl.appendChild(btn);
  });
}

function showResult() {
  quizEl.classList.add('hidden');
  resultEl.classList.remove('hidden');
  codeEl.textContent = resultCode;
}

renderQuestion();

// result.js
import { ctmiResults } from './ctmiResults.js';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type'); // 예: AABB

  const result = ctmiResults[type];

  if (result) {
    document.getElementById('character-image').src = `./images/${result.image}`;
    document.getElementById('character-name').textContent = result.name;
    document.getElementById('character-title').textContent = result.title;
    document.getElementById('character-description').textContent = result.description;
  } else {
    document.getElementById('result-card').innerHTML = `<p>결과를 불러올 수 없습니다.</p>`;
  }
});

function restart() {
  window.location.href = 'index.html';
}

// 예: 4문항 중 1~2는 성격 A/B, 3~4는 취향 A/B
let resultType = q1 + q2 + q3 + q4; // AABB 같은 문자열
window.location.href = `result.html?type=${resultType}`;