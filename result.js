// result.js
import { ctmiResults } from './ctmiResults.js';

const params = new URLSearchParams(window.location.search);
const type = params.get('type')?.toUpperCase();

if (!type || type.length !== 4 || !ctmiResults[type]) {
  document.body.innerHTML = `<p>잘못된 접근입니다. (type: ${type})</p>`;
  throw new Error('Invalid or missing type parameter');
}

const result = ctmiResults[type];

// 렌더링
document.getElementById('character-type').textContent = type.split('').join(' ');
document.getElementById('character-name').textContent = result.name;
document.getElementById('character-title').textContent = result.title;
document.getElementById('character-description').textContent = result.description;

// 이미지가 있으면 보여주기 (없어도 오류 X)
const imageElement = document.getElementById('character-image');
if (result.image) {
  imageElement.src = `./images/${result.image}`;
  imageElement.alt = result.name;
}

// 다시하기 버튼
window.restart = () => {
  window.location.href = 'index.html';
};