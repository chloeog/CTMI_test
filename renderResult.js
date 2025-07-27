// renderResults.js
import { ctmiResults } from './ctmiResults.js';

const params = new URLSearchParams(window.location.search);
const rawType = params.get('type'); // 예: BIMU

if (!rawType || rawType.length !== 4 || !/^[A-Z]{4}$/i.test(rawType)) {
  document.body.innerHTML = '<p>잘못된 접근입니다. (type 매개변수 오류)</p>';
  throw new Error('Invalid or missing type parameter');
}

const type = rawType.toUpperCase();
const result = ctmiResults[type];

if (!result) {
  document.body.innerHTML = `<p>결과를 불러올 수 없습니다: ${type}</p>`;
  throw new Error('Invalid type value');
}

// 결과 화면 구성
const typeElement = document.getElementById('character-type');
const nameElement = document.getElementById('character-name');
const titleElement = document.getElementById('character-title');
const descElement = document.getElementById('character-description');
const imageElement = document.getElementById('character-image');

if (typeElement) typeElement.textContent = type.split('').join(' ');
if (nameElement) nameElement.textContent = result.name;
if (titleElement) titleElement.textContent = result.title;
if (descElement) descElement.textContent = result.description;
if (imageElement) {
  imageElement.alt = result.name;
  imageElement.src = result.image ? `./images/${result.image}` : '';
}

// 다시하기 버튼 기능
window.restart = () => {
  window.location.href = 'index.html';
};
