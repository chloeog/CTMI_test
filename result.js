import { ctmiResults } from './ctmiResults.js';

const params = new URLSearchParams(window.location.search);
const type = params.get('type')?.toUpperCase();

if (!type || type.length !== 4 || !ctmiResults[type]) {
  document.body.innerHTML = '<p>잘못된 접근입니다. 다시 시도해 주세요.</p>';
  throw new Error('Invalid or missing type parameter');
}

const result = ctmiResults[type];

// 요소 참조 (titleEl 정의 포함)
const titleEl = document.getElementById('character-title');
const typeEl = document.getElementById('character-type');
const nameEl = document.getElementById('character-name');
const descriptionEl = document.getElementById('character-description');

// 기본 텍스트 삽입 (줄바꿈 태그가 있는 title은 innerHTML 사용)
if (titleEl) titleEl.innerHTML = result.title;
if (typeEl) typeEl.textContent = type.split('').join(' ');
if (nameEl) nameEl.textContent = result.name;
if (descriptionEl) descriptionEl.innerHTML = result.description;

// 이미지 삽입
const imageElement = document.getElementById('character-image');
if (imageElement && result.image) {
  imageElement.src = result.image;
  imageElement.alt = `${type} 캐릭터 이미지`;
}

// ⭐ trait-list 동적 생성
const traits = result.traits || []; // 예: ['Brew', 'Iced', 'Milky', 'Sweety']
const traitList = document.getElementById('trait-list');
if (traitList) {
  traitList.innerHTML = ''; // 기존 비우기
  traits.forEach(trait => {
    const li = document.createElement('li');
    // 첫 글자 강조
    li.innerHTML = `<strong>${trait.charAt(0)}</strong>${trait.slice(1)}`;
    traitList.appendChild(li);
  });
}

window.downloadCardImage = function () {
  const card = document.querySelector('.result-card');
  if (!card) return;

  html2canvas(card, {
    backgroundColor: "#fff8f2",
    useCORS: true
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'CTMI_result.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }).catch(err => {
    console.error("이미지 저장 실패:", err);
  });
};
