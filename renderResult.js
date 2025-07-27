import { ctmiResults } from './ctmiResults.js';

const params = new URLSearchParams(window.location.search);
const rawType = params.get('type'); // 예: BIMU

if (!rawType || rawType.length !== 4) {
  document.body.innerHTML = '<p>잘못된 접근입니다.</p>';
  throw new Error('Invalid type value');
}

const type = rawType.toUpperCase();
const result = ctmiResults[type];

if (result) {
  document.getElementById('character-type').textContent = type.split('').join(' ');
  document.getElementById('character-name').textContent = result.name;
  document.getElementById('character-title').textContent = result.title;
  document.getElementById('character-description').textContent = result.description;

  const imageElement = document.getElementById('character-image');
  if (imageElement) {
    imageElement.alt = result.name;
    imageElement.src = result.image
      ? `./images/${result.image}`
      : '';
  }
} else {
  document.querySelector('.container').innerHTML = `<p>결과를 불러올 수 없습니다: ${type}</p>`;
}

window.restart = () => {
  window.location.href = 'index.html';
};

