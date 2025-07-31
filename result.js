import { ctmiResults } from './ctmiResults.js';

window.addEventListener('DOMContentLoaded', () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type')?.toUpperCase();

    if (!type || type.length !== 4 || !ctmiResults[type]) {
      document.body.innerHTML = '<p>잘못된 접근입니다. 다시 시도해 주세요.</p>';
      throw new Error('Invalid or missing type parameter');
    }

    const result = ctmiResults[type];

    // 요소 참조
    const titleEl = document.getElementById('character-title');
    const typeEl = document.getElementById('character-type');
    const nameEl = document.getElementById('character-name');
    const descriptionEl = document.getElementById('character-description');

    // 텍스트 삽입
    if (typeEl) typeEl.textContent = type.split('').join(' ');
    if (nameEl) nameEl.textContent = result.name;
    if (titleEl) titleEl.innerHTML = result.title; // <br> 반영
    if (descriptionEl) descriptionEl.innerHTML = result.description;

    // 이미지
    const imageElement = document.getElementById('character-image');
    if (imageElement && result.image) {
      imageElement.src = result.image;
      imageElement.alt = `${type} 캐릭터 이미지`;
    }

    // trait-list
    const traits = result.traits || [];
    const traitList = document.getElementById('trait-list');
    if (traitList) {
      traitList.innerHTML = '';
      traits.forEach(trait => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${trait.charAt(0)}</strong>${trait.slice(1)}`;
        traitList.appendChild(li);
      });
    }

    // 이미지 저장 함수
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
  } catch (e) {
    console.error("초기화 에러:", e);
    const fallback = document.createElement('div');
    fallback.style.padding = '20px';
    fallback.innerHTML = `<p>결과를 불러오는 중 오류가 발생했습니다. 콘솔을 확인해 주세요.</p>`;
    document.body.prepend(fallback);
  }
});
