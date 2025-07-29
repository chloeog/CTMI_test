import { ctmiResults } from './ctmiResults.js';

const params = new URLSearchParams(window.location.search);
const type = params.get('type')?.toUpperCase(); 

if (!type || type.length !== 4 || !ctmiResults[type]) {
  document.body.innerHTML = '<p>잘못된 접근입니다. 다시 시도해 주세요.</p>';
  throw new Error('Invalid or missing type parameter');
}

const result = ctmiResults[type];

// 기본 텍스트 삽입
document.getElementById('character-type').textContent = type.split('').join(' ');
document.getElementById('character-name').textContent = result.name;
document.getElementById('character-title').textContent = result.title;
document.getElementById('character-description').textContent = result.description;

// 이미지 삽입
const imageElement = document.getElementById('character-image');
if (imageElement && result.image) {
  imageElement.src = result.image;
  imageElement.alt = `${type} 캐릭터 이미지`;
}

// ⭐ trait-list 동적 생성
const traits = result.traits || []; // 예: ['Brew', 'Iced', 'Milky', 'Sweety']
const traitList = document.getElementById('trait-list');
if (traitList && traits.length > 0) {
  traitList.innerHTML = ''; // 기존 비우기
  traits.forEach(trait => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${trait[0]}</strong>${trait.slice(1)}`;
    traitList.appendChild(li);
  });
}

window.downloadCardImage = function () {
  const card = document.querySelector('.result-card');

  html2canvas(card).then(canvas => {
    const link = document.createElement('a');
    link.download = 'CTMI_result.png';
    link.href = canvas.toDataURL();
    link.click();
  });
};
