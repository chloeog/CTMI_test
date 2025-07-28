import { ctmiResults } from './ctmiResults.js';

const params = new URLSearchParams(window.location.search);
const type = params.get('type')?.toUpperCase(); // 예: "EHMS"

if (!type || type.length !== 4 || !ctmiResults[type]) {
  document.body.innerHTML = '<p>잘못된 접근입니다. 다시 시도해 주세요.</p>';
  throw new Error('Invalid or missing type parameter');
}

const result = ctmiResults[type];

document.getElementById('character-type').textContent = type.split('').join(' ');
document.getElementById('character-name').textContent = result.name;
document.getElementById('character-title').textContent = result.title;
document.getElementById('character-description').textContent = result.description;
