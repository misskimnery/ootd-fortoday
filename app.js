/* =========================================================
   OOTD RECOMMENDATION JAVASCRIPT
   - Gender-neutral persona ("내가 추천해줄게!")
   - Center Model & Connected Leader Lines Layout
   - Gender Option (Female / Male)
   - Fixed hair SVGs for natural look
   ========================================================= */

const state = {
  step: 0,
  gender: 'female',
  height: 165,
  weight: 54,
  weather: '',
  temp: 18,
  selectedStyles: [],
  selectedColors: [],
  uploadedImage: null,
  extractedColors: [],
  avoidItems: [],
  customAvoid: '',
  situationText: '',
  rerollIndex: 0
};

// FASHION ITEMS POOL (GENDER-SPECIFIC & RICH CURATION)
const itemDatabase = {
  female: {
    outer: [
      { name: '헤비 구스다운 롱패딩', types: [], styles: ['casual', 'sporty'], minTemp: -15, maxTemp: 4, desc: '바람을 든든하게 막아주는 포근한 보온성' },
      { name: '오버핏 볼륨 숏패딩', types: [], styles: ['street', 'casual'], minTemp: -15, maxTemp: 6, desc: '트렌디한 볼륨감과 가벼운 착용감' },
      { name: '맥시 더블 울 코트', types: [], styles: ['classic', 'minimal'], minTemp: -10, maxTemp: 5, desc: '우아하게 떨어지는 클래식 실루엣' },
      { name: '캐시미어 싱글 울 코트', types: [], styles: ['classic', 'minimal'], minTemp: 3, maxTemp: 13, desc: '부드러운 터치감의 단정한 일자핏' },
      { name: '클래식 테일러드 블레이저', types: [], styles: ['classic', 'minimal', 'casual'], minTemp: 12, maxTemp: 22, desc: '단정하고 세련된 무드' },
      { name: '소프트 벨티드 트렌치 코트', types: [], styles: ['classic', 'lovely'], minTemp: 11, maxTemp: 20, desc: '분위기를 살려주는 자연스러운 실루엣' },
      { name: '세미오버 워싱 데님 자켓', types: [], styles: ['casual', 'street'], minTemp: 13, maxTemp: 22, desc: '어떤 이너와도 찰떡인 캐주얼 정석' },
      { name: '라운드넥 니트 가디건', types: ['니트'], styles: ['lovely', 'minimal'], minTemp: 14, maxTemp: 22, desc: '단독으로 잠가 입어도 사랑스러운 포근함' },
      { name: '스포티 후드 윈드브레이커', types: [], styles: ['sporty', 'street'], minTemp: 12, maxTemp: 22, desc: '가볍고 바람을 효과적으로 차단' }
    ],
    top: [
      { name: '메리노 울 터틀넥 니트', types: ['니트'], styles: ['classic', 'minimal'], minTemp: -15, maxTemp: 12, desc: '목을 포근하게 감싸는 겨울 이너' },
      { name: '기모 세미오버 맨투맨', types: [], styles: ['casual', 'sporty'], minTemp: -15, maxTemp: 13, desc: '부드러운 기모 안감의 데일리 탑' },
      { name: '루즈핏 옥스포드 셔츠', types: [], styles: ['classic', 'minimal'], minTemp: 12, maxTemp: 24, desc: '탄탄하고 깔끔한 데일리 클래식 셔츠' },
      { name: '소프트 립 골지 니트', types: ['니트'], styles: ['minimal', 'lovely'], minTemp: 12, maxTemp: 21, desc: '여리여리한 무드의 골지 조직' },
      { name: '볼륨 슬리브 핀턱 블라우스', types: [], styles: ['lovely', 'classic'], minTemp: 14, maxTemp: 23, desc: '화사하고 단정한 핀턱 디테일' },
      { name: '스트라이프 보트넥 티', types: [], styles: ['casual', 'minimal'], minTemp: 14, maxTemp: 23, desc: '산뜻하고 감각적인 프렌치 무드' },
      { name: '프렌치 린넨 반팔 셔츠', types: [], styles: ['minimal', 'classic'], minTemp: 21, maxTemp: 35, desc: '통기성이 우수한 시원한 린넨' },
      { name: '프리미엄 코튼 반팔티', types: [], styles: ['casual', 'minimal'], minTemp: 20, maxTemp: 35, desc: '깔끔한 핏의 탄탄한 기본 티셔츠' },
      { name: '스퀘어넥 반팔 블라우스', types: [], styles: ['lovely'], minTemp: 22, maxTemp: 33, desc: '쇄골 라인을 예쁘게 드러내는 탑' },
      { name: '쿨 슬리브리스 탑', types: ['민소매'], styles: ['minimal', 'street'], minTemp: 25, maxTemp: 35, desc: '여름철 시원하게 입는 쿨 나시' }
    ],
    bottom: [
      { name: '원턱 세미 와이드 슬랙스', types: ['와이드팬츠'], styles: ['minimal', 'classic'], minTemp: -10, maxTemp: 28, desc: '체형을 커버하며 찰랑이는 실루엣' },
      { name: '테이퍼드 코튼 슬랙스', types: [], styles: ['classic', 'minimal'], minTemp: -5, maxTemp: 27, desc: '밑단으로 갈수록 깔끔한 단정핏' },
      { name: '스트레이트핏 크림 데님', types: [], styles: ['casual', 'minimal'], minTemp: -10, maxTemp: 28, desc: '어떤 상의와도 잘 어울리는 크림진' },
      { name: '클래식 레귤러핏 중청 데님', types: [], styles: ['casual', 'street'], minTemp: -10, maxTemp: 27, desc: '질리지 않는 데일리 만능 블루진' },
      { name: '슬림 텐션 스키니진', types: ['스키니진'], styles: ['casual', 'lovely'], minTemp: -5, maxTemp: 25, desc: '다리 라인을 군더더기 없이 잡아줌' },
      { name: '플리츠 롱 A라인 스커트', types: [], styles: ['lovely', 'classic'], minTemp: 0, maxTemp: 28, desc: '걸을 때마다 우아한 롱 기장' },
      { name: 'H라인 미디 코튼 스커트', types: [], styles: ['classic', 'minimal'], minTemp: 5, maxTemp: 28, desc: '차분하고 단정한 무릎 아래 기장' },
      { name: '테니스 플리츠 미니스커트', types: ['짧은 치마'], styles: ['lovely', 'sporty'], minTemp: 15, maxTemp: 32, desc: '경쾌하고 사랑스러운 숏 스커트' },
      { name: '컴포트 밴딩 조거 팬츠', types: [], styles: ['sporty', 'casual'], minTemp: -10, maxTemp: 28, desc: '편안한 착용감과 자유로운 활동성' }
    ],
    shoes: [
      { name: '클래식 레더 페니 로퍼', types: [], styles: ['classic', 'minimal'], desc: '단정하고 지적인 데일리 신발' },
      { name: '미니멀 화이트 스니커즈', types: [], styles: ['casual', 'minimal'], desc: '어떤 룩에도 깨끗하게 녹아듦' },
      { name: '볼드 쿠셔닝 런닝화', types: [], styles: ['sporty', 'casual'], desc: '발이 편안해 오래 걸어도 무리 없음' },
      { name: '단정한 첼시 레더 부츠', types: [], styles: ['classic', 'minimal'], desc: '발목 라인을 깔끔하게 정돈해줌' },
      { name: '슬림 미들 펌프스 힐', types: ['힐'], styles: ['classic', 'lovely'], desc: '격식 있고 우아한 발등 라인' },
      { name: '숏 레인부츠 (방수)', types: [], styles: ['casual', 'lovely'], desc: '빗물 튐 걱정 없는 보송함' }
    ],
    accessory: [
      { name: '미니멀 실버 체인 목걸이', types: [], styles: ['minimal', 'classic'], desc: '과하지 않게 은은한 포인트' },
      { name: '소프트 레더 숄더백', types: [], styles: ['classic', 'lovely'], desc: '자연스러운 감성의 데일리 가방' },
      { name: '클래식 가죽 스트랩 시계', types: [], styles: ['classic', 'minimal'], desc: '손목에 단정하고 세련된 디테일' },
      { name: '소프트 캐시미어 머플러', types: [], styles: ['classic', 'lovely'], desc: '목을 포근하게 감싸주는 필수템' },
      { name: '자수 빈티지 볼캡', types: [], styles: ['street', 'casual'], desc: '힙하고 캐주얼한 센스 더하기' }
    ]
  },

  male: {
    outer: [
      { name: '헤비 구스다운 롱패딩', types: [], styles: ['casual', 'sporty'], minTemp: -15, maxTemp: 4, desc: '한파에도 끄떡없는 보온성' },
      { name: '미니멀 오버핏 숏패딩', types: [], styles: ['street', 'casual'], minTemp: -15, maxTemp: 6, desc: '트렌디한 핏감과 활동성' },
      { name: '울 발마칸 더블 코트', types: [], styles: ['classic', 'minimal'], minTemp: -10, maxTemp: 6, desc: '묵직하고 클래식한 실루엣' },
      { name: '캐시미어 싱글 맥코트', types: [], styles: ['classic', 'minimal'], minTemp: 3, maxTemp: 14, desc: '깔끔하게 떨어지는 남성미 넘치는 라인' },
      { name: '세미오버 2버튼 테일러드 블레이저', types: [], styles: ['classic', 'minimal'], minTemp: 12, maxTemp: 22, desc: '단정하면서도 세련된 남친룩 정석' },
      { name: '미니멀 스웨이드 블루종', types: [], styles: ['minimal', 'street'], minTemp: 13, maxTemp: 21, desc: '고급스러운 텍스처와 남성적인 핏' },
      { name: '워싱 세미오버 데님 트러커', types: [], styles: ['casual', 'street'], minTemp: 13, maxTemp: 22, desc: '탄탄하고 러프한 캐주얼 아우터' },
      { name: '스포티 윈드브레이커 자켓', types: [], styles: ['sporty', 'street'], minTemp: 12, maxTemp: 22, desc: '가볍고 방풍 기능이 탁월' }
    ],
    top: [
      { name: '헤비 울 크루넥 니트', types: ['니트'], styles: ['classic', 'minimal'], minTemp: -15, maxTemp: 12, desc: '도톰하고 어깨 라인을 잡아주는 니트' },
      { name: '기모 세미오버 맨투맨', types: [], styles: ['casual', 'sporty'], minTemp: -15, maxTemp: 13, desc: '편안하고 자연스러운 데일리 스웨트' },
      { name: '클래식 옥스포드 코튼 셔츠', types: [], styles: ['classic', 'minimal'], minTemp: 12, maxTemp: 24, desc: '단정하고 신뢰감을 주는 탄탄한 셔츠' },
      { name: '하프집업 코튼 스웨트셔츠', types: [], styles: ['casual', 'sporty'], minTemp: 12, maxTemp: 22, desc: '지퍼로 다양한 카라 연출 가능' },
      { name: '드롭숄더 탄탄 롱슬리브', types: [], styles: ['casual', 'minimal'], minTemp: 13, maxTemp: 22, desc: '단독으로도 깔끔한 실루엣' },
      { name: '프렌치 린넨 릴렉스 셔츠', types: [], styles: ['minimal', 'classic'], minTemp: 21, maxTemp: 35, desc: '고급스럽고 시원한 여름 린넨' },
      { name: '오버핏 코튼 헤비 반팔티', types: [], styles: ['casual', 'minimal', 'street'], minTemp: 20, maxTemp: 35, desc: '체형을 단단하게 잡아주는 코튼' },
      { name: '썸머 쿨 카라 니트 반팔', types: ['니트'], styles: ['classic', 'minimal'], minTemp: 21, maxTemp: 32, desc: '단정하고 시원한 카라 디테일' }
    ],
    bottom: [
      { name: '원턱 세미 와이드 슬랙스', types: ['와이드팬츠'], styles: ['minimal', 'classic'], minTemp: -10, maxTemp: 28, desc: '자연스럽게 떨어지는 세련된 바지선' },
      { name: '테이퍼드 치노 팬츠', types: [], styles: ['classic', 'casual'], minTemp: -5, maxTemp: 27, desc: '허벅지는 여유롭고 밑단은 깔끔한 핏' },
      { name: '스트레이트핏 크림 데님', types: [], styles: ['casual', 'minimal'], minTemp: -10, maxTemp: 28, desc: '어떤 상의와도 매치하기 좋은 크림진' },
      { name: '레귤러 스트레이트 중청진', types: [], styles: ['casual', 'street'], minTemp: -10, maxTemp: 27, desc: '클래식한 정석 블루 데님' },
      { name: '컴포트 조거 스웨트팬츠', types: [], styles: ['sporty', 'casual'], minTemp: -10, maxTemp: 28, desc: '발목을 잡아주는 편안한 조거' },
      { name: '코튼 핀턱 버뮤다 쇼츠', types: ['와이드팬츠'], styles: ['minimal', 'casual'], minTemp: 22, maxTemp: 35, desc: '부담 없는 기장감의 시원한 반바지' }
    ],
    shoes: [
      { name: '클래식 레더 더비 슈즈', types: [], styles: ['classic', 'minimal'], desc: '단정하고 세련된 남성 포멀화' },
      { name: '미니멀 화이트 레더 스니커즈', types: [], styles: ['casual', 'minimal'], desc: '모든 룩을 깔끔하게 마무리' },
      { name: '빈티지 독일군 스니커즈', types: [], styles: ['minimal', 'casual'], desc: '스웨이드 배색의 클래식 스니커즈' },
      { name: '볼드 쿠셔닝 런닝화', types: [], styles: ['sporty', 'casual'], desc: '오래 걸어도 발이 편안한 운동화' },
      { name: '라운드토 첼시 레더 부츠', types: [], styles: ['classic', 'street'], desc: '가을·겨울철 묵직하고 시크한 부츠' }
    ],
    accessory: [
      { name: '메탈 프레임 안경 & 레더 크로스백', types: [], styles: ['classic', 'minimal'], desc: '지적이고 센스 있는 디테일' },
      { name: '클래식 레더 스트랩 시계', types: [], styles: ['classic', 'minimal'], desc: '손목에 남성적인 무게감' },
      { name: '미니멀 나일론 메신저백', types: [], styles: ['casual', 'street'], desc: '수납력 좋고 편안한 데일리백' },
      { name: '소프트 울 머플러', types: [], styles: ['classic', 'minimal'], desc: '보온성과 스타일을 올려주는 머플러' },
      { name: '빈티지 자수 볼캡', types: [], styles: ['street', 'casual'], desc: '꾸안꾸 캐주얼의 완성' }
    ]
  }
};

const styleKeyMap = {
  '캐주얼': 'casual', '미니멀': 'minimal', '스트릿': 'street',
  '러블리': 'lovely', '클래식': 'classic', '스포티': 'sporty'
};

const pastelColorMap = {
  '화이트': '#FFFFFF', '아이보리': '#FBF8EE', '베이지': '#F0E5D5', '그레이': '#D4D5D9',
  '블랙': '#333339', '네이비': '#3B4868', '라벤더': '#D4C4F5', '민트': '#BDEFE0',
  '하늘': '#BEE3F8', '핑크': '#FFD0DD', '버터옐로': '#FFF099', '브라운': '#9C775D'
};

// DOM ELEMENTS
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');

function showToast(msg) {
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// INIT
document.addEventListener('DOMContentLoaded', () => {
  // Gender Buttons
  document.getElementById('genderGrid').addEventListener('click', e => {
    const btn = e.target.closest('.gender-btn');
    if (!btn) return;
    document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    state.gender = btn.dataset.gender;
  });

  // Height / Weight Sliders
  document.getElementById('sliderHeight').addEventListener('input', e => {
    state.height = parseInt(e.target.value, 10);
    document.getElementById('valHeight').textContent = state.height;
  });
  document.getElementById('sliderWeight').addEventListener('input', e => {
    state.weight = parseInt(e.target.value, 10);
    document.getElementById('valWeight').textContent = state.weight;
  });

  // Temp Slider
  document.getElementById('sliderTemp').addEventListener('input', e => {
    state.temp = parseInt(e.target.value, 10);
    document.getElementById('valTemp').textContent = state.temp;
    const t = Math.max(0, Math.min(1, (state.temp + 15) / 50));
    const r = Math.round(91 + (255 - 91) * t);
    const g = Math.round(146 + (111 - 146) * t);
    const b = Math.round(229 + (89 - 229) * t);
    document.getElementById('tempDisplayWrap').style.color = `rgb(${r},${g},${b})`;
  });

  // Weather
  document.getElementById('weatherGrid').addEventListener('click', e => {
    const btn = e.target.closest('.choice-card-btn');
    if (!btn) return;
    document.querySelectorAll('#weatherGrid .choice-card-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    state.weather = btn.dataset.weather;
  });

  // Style (Max 2)
  document.getElementById('styleGrid').addEventListener('click', e => {
    const btn = e.target.closest('.choice-card-btn');
    if (!btn) return;
    const s = btn.dataset.style;
    const idx = state.selectedStyles.indexOf(s);
    if (idx > -1) {
      state.selectedStyles.splice(idx, 1);
      btn.classList.remove('selected');
    } else {
      if (state.selectedStyles.length >= 2) return showToast('스타일은 최대 2개까지!');
      state.selectedStyles.push(s);
      btn.classList.add('selected');
    }
    document.getElementById('styleCountText').textContent = `최대 2개 (${state.selectedStyles.length}/2)`;
  });

  // Color (Max 3)
  document.getElementById('colorGrid').addEventListener('click', e => {
    const btn = e.target.closest('.color-chip-btn');
    if (!btn) return;
    const c = btn.dataset.color;
    const idx = state.selectedColors.indexOf(c);
    if (idx > -1) {
      state.selectedColors.splice(idx, 1);
      btn.classList.remove('selected');
    } else {
      if (state.selectedColors.length >= 3) return showToast('색상은 최대 3개까지!');
      state.selectedColors.push(c);
      btn.classList.add('selected');
    }
    document.getElementById('colorCountText').textContent = `최대 3개 (${state.selectedColors.length}/3)`;
  });

  // Photo upload & canvas extraction
  document.getElementById('uploadZone').addEventListener('click', () => document.getElementById('filePhoto').click());
  document.getElementById('filePhoto').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      const img = new Image();
      img.onload = () => {
        state.uploadedImage = evt.target.result;
        document.getElementById('imgPreview').src = state.uploadedImage;
        document.getElementById('photoResultWrap').style.display = 'block';
        extractColors(img);
      };
      img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  });
  document.getElementById('btnRemovePhoto').addEventListener('click', () => {
    state.uploadedImage = null; state.extractedColors = [];
    document.getElementById('filePhoto').value = '';
    document.getElementById('photoResultWrap').style.display = 'none';
  });

  // Avoid buttons
  document.getElementById('avoidGrid').addEventListener('click', e => {
    const btn = e.target.closest('.avoid-chip');
    if (!btn) return;
    const val = btn.dataset.avoid;
    if (val === '없음') {
      const isChecked = !btn.classList.contains('checked');
      document.querySelectorAll('.avoid-chip').forEach(b => b.classList.remove('checked'));
      if (isChecked) btn.classList.add('checked');
    } else {
      document.getElementById('chipAvoidNone').classList.remove('checked');
      btn.classList.toggle('checked');
    }
    state.avoidItems = Array.from(document.querySelectorAll('.avoid-chip.checked')).map(b => b.dataset.avoid);
  });
  document.getElementById('inputCustomAvoid').addEventListener('input', e => { state.customAvoid = e.target.value.trim(); });

  document.getElementById('textSituation').addEventListener('input', e => { state.situationText = e.target.value; });

  // Quick tags
  document.getElementById('quickTagList').addEventListener('click', e => {
    const btn = e.target.closest('.quick-tag');
    if (!btn) return;
    const tx = document.getElementById('textSituation');
    tx.value = tx.value ? tx.value + ' ' + btn.dataset.tag : btn.dataset.tag;
    state.situationText = tx.value;
  });

  // Navigation
  document.getElementById('btnStart').addEventListener('click', () => goToStep(1));
  document.getElementById('btnPrev').addEventListener('click', () => {
    if (state.step > 1) goToStep(state.step - 1);
    else goToStep(0);
  });
  document.getElementById('btnNext').addEventListener('click', () => {
    if (state.step === 2 && !state.weather) return showToast('오늘 날씨를 하나 골라줘! ☀️');
    if (state.step === 3 && (state.selectedStyles.length === 0 || state.selectedColors.length === 0)) return showToast('스타일과 색상을 1개 이상 골라줘~');
    if (state.step === 4 && state.avoidItems.length === 0 && !state.customAvoid) return showToast('피하고 싶은 옷이나 "없음"을 선택해줘!');
    if (state.step < 5) goToStep(state.step + 1);
    else renderLookbookResult();
  });

  document.getElementById('btnReroll').addEventListener('click', () => {
    state.rerollIndex++;
    renderLookbookResult();
    showToast('새로운 코디 조합으로 바꿨어! ✨');
  });
  document.getElementById('btnRestart').addEventListener('click', () => goToStep(0));
});

function goToStep(target) {
  state.step = target;
  if (target === 0) {
    document.getElementById('viewLanding').style.display = 'block';
    document.getElementById('viewForm').style.display = 'none';
    document.getElementById('viewResult').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  document.getElementById('viewLanding').style.display = 'none';
  document.getElementById('viewForm').style.display = 'block';
  document.getElementById('viewResult').style.display = 'none';

  for (let i = 1; i <= 5; i++) {
    document.getElementById('step' + i).style.display = (i === target) ? 'block' : 'none';
  }
  const pct = target * 20;
  document.getElementById('progressBar').style.width = pct + '%';
  document.getElementById('stepBadgeText').textContent = target + '단계 / 5단계';
  document.getElementById('stepPercentage').textContent = pct + '%';
  document.getElementById('btnNext').textContent = (target === 5) ? '코디 추천받기 ✨' : '다음 ›';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function extractColors(img) {
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  c.width = 80; c.height = 80;
  ctx.drawImage(img, 0, 0, 80, 80);
  const data = ctx.getImageData(0, 0, 80, 80).data;
  const bucket = {};
  for (let i = 0; i < data.length; i += 16) {
    const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
    if (a < 128) continue;
    const bright = (r * 299 + g * 587 + b * 114) / 1000;
    if (bright > 245 || bright < 20) continue;
    const key = `${Math.round(r/32)*32},${Math.round(g/32)*32},${Math.round(b/32)*32}`;
    bucket[key] = (bucket[key] || 0) + 1;
  }
  const sorted = Object.entries(bucket).sort((a,b) => b[1] - a[1]);
  const res = [];
  for (const [k] of sorted) {
    const [r, g, b] = k.split(',').map(Number);
    res.push('#' + [r, g, b].map(x => x.toString(16).padStart(2,'0')).join('').toUpperCase());
    if (res.length >= 3) break;
  }
  while (res.length < 3) res.push('#C9B8F0');
  state.extractedColors = res;

  const container = document.getElementById('extractedChipsList');
  container.innerHTML = '';
  res.forEach(hex => {
    container.innerHTML += `<div class="extracted-chip-circle" style="background:${hex};"></div>`;
  });
}

// ========================================================
// LOOKBOOK RESULT ENGINE (CENTER PERSON + LEADER LINES)
// ========================================================
function renderLookbookResult() {
  const genderPool = itemDatabase[state.gender] || itemDatabase.female;
  const avoids = [...state.avoidItems];
  const custom = state.customAvoid.toLowerCase();

  function isAvoided(item) {
    if (avoids.includes('없음') && !custom) return false;
    for (const a of avoids) {
      if (a === '없음') continue;
      if (item.types && item.types.includes(a)) return true;
      if (item.name.includes(a)) return true;
    }
    if (custom) {
      if (item.name.toLowerCase().includes(custom) || item.desc.toLowerCase().includes(custom)) return true;
    }
    return false;
  }

  // 선택한 스타일(한글)을 DB 스타일 키(영문)로 변환해서, 맞는 아이템이 있으면 그것만 사용
  const styleKeys = state.selectedStyles.map(s => styleKeyMap[s]);
  const preferStyle = list => {
    const matched = list.filter(i => i.styles.some(s => styleKeys.includes(s)));
    return matched.length ? matched : list;
  };
  const badFooting = state.weather === '비' || state.weather === '눈';

  const needOuter = state.temp < 23;
  const validOuters = needOuter ? genderPool.outer.filter(i => !isAvoided(i) && state.temp >= i.minTemp && state.temp <= i.maxTemp) : [];
  const validTops = genderPool.top.filter(i => !isAvoided(i) && state.temp >= i.minTemp && state.temp <= i.maxTemp);
  const validBottoms = genderPool.bottom.filter(i => !isAvoided(i));
  const validShoes = genderPool.shoes.filter(i => !isAvoided(i) && !(badFooting && i.types.includes('힐')));
  const validAccs = genderPool.accessory.filter(i => !isAvoided(i));

  const emptyItem = { name: '추천할 아이템이 없어', desc: '피하고 싶은 옷 조건을 조금 줄여줘!' };
  function pick(list, offset) {
    if (!list || list.length === 0) return emptyItem;
    list = preferStyle(list);
    return list[(state.rerollIndex * 2 + offset) % list.length];
  }

  const pickedOuter = needOuter ? pick(validOuters.length ? validOuters : genderPool.outer.filter(i => !isAvoided(i)), 1) : null;
  const pickedTop = pick(validTops.length ? validTops : genderPool.top.filter(i => !isAvoided(i)), 2);
  const pickedBottom = pick(validBottoms, 3);
  const pickedShoes = pick(validShoes, 4);
  const pickedAccessory = pick(validAccs, 5);

  // Render Center Model (Female vs Male SVG)
  const mannequinContainer = document.getElementById('mannequinContainer');
  if (state.gender === 'male') {
    mannequinContainer.innerHTML = getMaleMannequinSVG();
  } else {
    mannequinContainer.innerHTML = getFemaleMannequinSVG();
  }

  // Populate 4 Lookbook Cards & Labels
  // Card 1 (Top Left): Outer or Top
  const tag1 = document.getElementById('tagCard1');
  const name1 = document.getElementById('nameCard1');
  const desc1 = document.getElementById('descCard1');
  if (pickedOuter) {
    tag1.textContent = 'OUTER';
    name1.textContent = pickedOuter.name;
    desc1.textContent = pickedOuter.desc;
  } else {
    tag1.textContent = 'TOP';
    name1.textContent = pickedTop.name;
    desc1.textContent = pickedTop.desc;
  }

  // Card 2 (Top Right): Top (if outer present) or Bottom
  const tag2 = document.getElementById('tagCard2');
  const name2 = document.getElementById('nameCard2');
  const desc2 = document.getElementById('descCard2');
  if (pickedOuter) {
    tag2.textContent = 'TOP';
    name2.textContent = pickedTop.name;
    desc2.textContent = pickedTop.desc;
  } else {
    tag2.textContent = 'BOTTOM';
    name2.textContent = pickedBottom.name;
    desc2.textContent = pickedBottom.desc;
  }

  // Card 3 (Bottom Left: Bottom or Accessory)
  const tag3 = document.getElementById('tagCard3');
  const name3 = document.getElementById('nameCard3');
  const desc3 = document.getElementById('descCard3');
  if (pickedOuter) {
    tag3.textContent = 'BOTTOM';
    name3.textContent = pickedBottom.name;
    desc3.textContent = pickedBottom.desc;
  } else {
    tag3.textContent = 'ACCESSORY';
    name3.textContent = pickedAccessory.name;
    desc3.textContent = pickedAccessory.desc;
  }

  // Card 4 (Bottom Right): Shoes
  const tag4 = document.getElementById('tagCard4');
  const name4 = document.getElementById('nameCard4');
  const desc4 = document.getElementById('descCard4');
  tag4.textContent = 'SHOES';
  name4.textContent = pickedShoes.name;
  desc4.textContent = pickedShoes.desc;

  // Color Palette (3 Colors)
  const palWrap = document.getElementById('colorComboContainer');
  palWrap.innerHTML = '';
  const c1 = state.selectedColors[0] || '라벤더';
  const c2 = state.extractedColors[0] || state.selectedColors[1] || '베이지';
  const c3 = state.selectedColors[2] || '아이보리';
  const cList = [
    { name: c1, hex: pastelColorMap[c1] || '#D4C4F5', role: '메인 톤' },
    { name: (state.extractedColors.length > 0) ? '사진 포인트' : c2, hex: (state.extractedColors.length > 0) ? state.extractedColors[0] : (pastelColorMap[c2] || '#F0E5D5'), role: '포인트' },
    { name: c3, hex: pastelColorMap[c3] || '#FBF8EE', role: '서브 밸런스' }
  ];
  cList.forEach(c => {
    palWrap.innerHTML += `
      <div style="text-align:center;">
        <div class="combo-circle" style="background:${c.hex};"></div>
        <div style="font-size:0.86rem; font-weight:700; color:var(--text-main);">${c.name}</div>
        <div style="font-size:0.75rem; color:var(--text-muted);">${c.role}</div>
      </div>
    `;
  });

  // Recommendation Reason (Friendly gender-neutral tone)
  const sit = state.situationText.toLowerCase();
  let sitComment = '';
  if (sit.includes('발표') || sit.includes('면접')) sitComment = '오늘 발표 일정이 있어서 단정하고 신뢰감을 주는 핏을 특별히 신경 썼어!';
  else if (sit.includes('데이트')) sitComment = '데이트 날이라 은은하고 매력적인 포인트를 곁들였지 💕';
  else if (sit.includes('많이 걸')) sitComment = '오늘 많이 걷는다고 해서 발이 편안한 쿠셔닝 신발을 챙겼어!';
  else if (sit.includes('여행')) sitComment = '여행지에서 활동하기도 편하고 사진도 예쁘게 나오는 조합이야 ✈️';
  else if (sit.includes('운동')) sitComment = '가벼운 움직임에도 거슬림 없이 산뜻한 활동성을 담았어!';

  const tempText = (state.temp >= 23)
    ? `오늘 기온이 ${state.temp}℃로 따뜻해서 아우터는 과감히 생략하고 시원하고 가벼운 상의로 맞췄어.`
    : `오늘 날씨가 ${state.weather}에 ${state.temp}℃라서 쌀쌀하지 않게 체온을 딱 지켜주는 예쁜 아우터를 골랐지.`;

  const fitText = (state.height >= 170)
    ? '키가 시원해서 멋스러운 실루엣이 돋보이도록 기장감의 밸런스를 잡았어.'
    : '비율이 훨씬 길어 보이고 단정하게 정돈되는 핏으로 연출했어.';

  const styleText = `네가 좋아하는 ${state.selectedStyles.join('·') || '내추럴'} 스타일에 ${c1} 컬러 톤온톤으로 자연스럽게 매치했어.`;

  document.getElementById('reasonBox').textContent = `${tempText} ${styleText} ${fitText} ${sitComment}`.trim();

  // Weather Tip
  const cond = document.getElementById('conditionsBox');
  if (state.weather === '비') cond.textContent = '☔ 비 소식이 있으니 가방에 우산 꼭 챙기고, 빗물에 젖지 않는 신발을 신자!';
  else if (state.weather === '눈') cond.textContent = '❄️ 길이 얼어 미끄러울 수 있으니 접지력 좋은 신발을 신고 따뜻하게 챙겨입어.';
  else if (state.weather === '바람 강함') cond.textContent = '💨 바람이 매서우니 밑단이 펄럭이지 않고 단단하게 여밀 수 있는 옷이 좋아.';
  else cond.textContent = '🌿 실내외 일교차에 맞춰 가볍게 레이어드하면 하루 종일 쾌적할 거야.';

  document.getElementById('viewLanding').style.display = 'none';
  document.getElementById('viewForm').style.display = 'none';
  document.getElementById('viewResult').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });

  requestAnimationFrame(() => {
    updateConnectorLines();
    setTimeout(updateConnectorLines, 150);
  });
}

// Dynamic connector lines from callout boxes to center model
function updateConnectorLines() {
  const stage = document.getElementById('lookbookStage');
  const svg = document.getElementById('connectorSvg');
  if (!stage || !svg || stage.offsetParent === null || !stage.getBoundingClientRect) return;

  const stageRect = stage.getBoundingClientRect();
  const c1 = document.getElementById('boxCard1').getBoundingClientRect();
  const c2 = document.getElementById('boxCard2').getBoundingClientRect();
  const c3 = document.getElementById('boxCard3').getBoundingClientRect();
  const c4 = document.getElementById('boxCard4').getBoundingClientRect();
  const mannequin = document.getElementById('mannequinContainer').getBoundingClientRect();

  if (stageRect.width === 0 || mannequin.width === 0) return;

  svg.setAttribute('viewBox', `0 0 ${stageRect.width} ${stageRect.height}`);

  const hasOuter = (document.getElementById('tagCard1').textContent === 'OUTER');

  // Card 1 (Top Left: OUTER or TOP)
  const p1_start_x = c1.right - stageRect.left;
  const p1_start_y = c1.top + c1.height / 2 - stageRect.top;
  const p1_target_x = mannequin.left + mannequin.width * 0.44 - stageRect.left;
  const p1_target_y = mannequin.top + mannequin.height * (hasOuter ? 0.32 : 0.36) - stageRect.top;
  const p1_mid_x = p1_start_x + Math.max(12, (p1_target_x - p1_start_x) * 0.45);

  document.getElementById('line1').setAttribute('d', `M ${p1_start_x} ${p1_start_y} L ${p1_mid_x} ${p1_start_y} L ${p1_target_x} ${p1_target_y}`);
  document.getElementById('dot1').setAttribute('cx', p1_target_x);
  document.getElementById('dot1').setAttribute('cy', p1_target_y);

  // Card 2 (Top Right: TOP or BOTTOM)
  const p2_start_x = c2.left - stageRect.left;
  const p2_start_y = c2.top + c2.height / 2 - stageRect.top;
  const p2_target_x = mannequin.left + mannequin.width * 0.58 - stageRect.left;
  const p2_target_y = mannequin.top + mannequin.height * (hasOuter ? 0.42 : 0.54) - stageRect.top;
  const p2_mid_x = p2_start_x - Math.max(12, (p2_start_x - p2_target_x) * 0.45);

  document.getElementById('line2').setAttribute('d', `M ${p2_start_x} ${p2_start_y} L ${p2_mid_x} ${p2_start_y} L ${p2_target_x} ${p2_target_y}`);
  document.getElementById('dot2').setAttribute('cx', p2_target_x);
  document.getElementById('dot2').setAttribute('cy', p2_target_y);

  // Card 3 (Bottom Left: BOTTOM or ACCESSORY)
  const p3_start_x = c3.right - stageRect.left;
  const p3_start_y = c3.top + c3.height / 2 - stageRect.top;
  const p3_target_x = mannequin.left + mannequin.width * (hasOuter ? 0.40 : 0.30) - stageRect.left;
  const p3_target_y = mannequin.top + mannequin.height * (hasOuter ? 0.62 : 0.49) - stageRect.top;
  const p3_mid_x = p3_start_x + Math.max(12, (p3_target_x - p3_start_x) * 0.45);

  document.getElementById('line3').setAttribute('d', `M ${p3_start_x} ${p3_start_y} L ${p3_mid_x} ${p3_start_y} L ${p3_target_x} ${p3_target_y}`);
  document.getElementById('dot3').setAttribute('cx', p3_target_x);
  document.getElementById('dot3').setAttribute('cy', p3_target_y);

  // Card 4 (Bottom Right: SHOES)
  const p4_start_x = c4.left - stageRect.left;
  const p4_start_y = c4.top + c4.height / 2 - stageRect.top;
  const p4_target_x = mannequin.left + mannequin.width * 0.56 - stageRect.left;
  const p4_target_y = mannequin.top + mannequin.height * 0.93 - stageRect.top;
  const p4_mid_x = p4_start_x - Math.max(12, (p4_start_x - p4_target_x) * 0.45);

  document.getElementById('line4').setAttribute('d', `M ${p4_start_x} ${p4_start_y} L ${p4_mid_x} ${p4_start_y} L ${p4_target_x} ${p4_target_y}`);
  document.getElementById('dot4').setAttribute('cx', p4_target_x);
  document.getElementById('dot4').setAttribute('cy', p4_target_y);
}

if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('resize', updateConnectorLines);
}

// ========================================================
// MANNEQUIN SVGs — FIXED HAIR (natural, full coverage)
// ========================================================
function getFemaleMannequinSVG() {
  return `
    <svg class="mannequin-svg" viewBox="0 0 200 480" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skinGradF" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FCECE5"/>
          <stop offset="100%" stop-color="#F5DCD0"/>
        </linearGradient>
        <linearGradient id="hairGradF" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#4A3E3D"/>
          <stop offset="100%" stop-color="#2D2423"/>
        </linearGradient>
        <linearGradient id="dressGradF" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#F5F0F8"/>
        </linearGradient>
      </defs>
      <!-- Shadow -->
      <ellipse cx="100" cy="460" rx="42" ry="7" fill="rgba(142,116,199,0.15)"/>
      <!-- Legs -->
      <path d="M 86 280 L 86 425 Q 86 440 82 445 L 94 445 Q 98 430 96 280 Z" fill="url(#skinGradF)"/>
      <path d="M 114 280 L 114 425 Q 114 440 110 445 L 122 445 Q 126 430 124 280 Z" fill="url(#skinGradF)"/>
      <!-- Socks & Shoes -->
      <ellipse cx="88" cy="445" rx="7" ry="3.5" fill="#FFFFFF"/>
      <ellipse cx="116" cy="445" rx="7" ry="3.5" fill="#FFFFFF"/>
      <path d="M 81 444 Q 88 440 95 444 L 97 452 Q 88 456 79 452 Z" fill="#D34B38"/>
      <path d="M 109 444 Q 116 440 123 444 L 125 452 Q 116 456 107 452 Z" fill="#D34B38"/>
      <!-- Arms -->
      <path d="M 66 145 Q 52 195 56 240 Q 58 245 64 240 Q 64 195 72 150 Z" fill="url(#skinGradF)"/>
      <path d="M 134 145 Q 148 195 144 240 Q 142 245 136 240 Q 136 195 128 150 Z" fill="url(#skinGradF)"/>
      <!-- Red Mini Bag -->
      <path d="M 50 235 Q 48 220 54 220 Q 60 220 58 235 Z" stroke="#D34B38" stroke-width="2" fill="none"/>
      <rect x="44" y="235" width="22" height="15" rx="4" fill="#D34B38"/>
      <!-- Torso / Dress -->
      <path d="M 72 140 Q 100 135 128 140 Q 122 195 135 280 L 65 280 Q 78 195 72 140 Z" fill="url(#dressGradF)" stroke="#E4DCE8" stroke-width="1.2"/>
      <!-- Neck & Head -->
      <path d="M 93 118 L 93 140 L 107 140 L 107 118 Z" fill="url(#skinGradF)"/>
      <ellipse cx="100" cy="98" rx="19" ry="24" fill="url(#skinGradF)"/>
      <!-- Hair: 3-layer natural long hair -->
      <!-- Layer 1: Crown cap covering entire top of head -->
      <path d="M 76 100 Q 74 78 80 70 Q 90 62 100 60 Q 110 62 120 70 Q 126 78 124 100 Q 118 80 100 74 Q 82 80 76 100 Z" fill="url(#hairGradF)"/>
      <!-- Layer 2: Left long strand flowing to shoulder -->
      <path d="M 76 100 Q 74 118 72 140 Q 70 158 68 168 L 75 168 Q 77 155 79 140 Q 81 118 83 100 Z" fill="url(#hairGradF)"/>
      <!-- Layer 3: Right long strand flowing to shoulder -->
      <path d="M 124 100 Q 126 118 128 140 Q 130 158 132 168 L 125 168 Q 123 155 121 140 Q 119 118 117 100 Z" fill="url(#hairGradF)"/>
    </svg>
  `;
}

function getMaleMannequinSVG() {
  return `
    <svg class="mannequin-svg" viewBox="0 0 200 480" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skinGradM" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FAE8DE"/>
          <stop offset="100%" stop-color="#EED4C5"/>
        </linearGradient>
        <linearGradient id="hairGradM" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#3A353B"/>
          <stop offset="100%" stop-color="#221E23"/>
        </linearGradient>
        <linearGradient id="shirtGradM" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#E9EEF4"/>
        </linearGradient>
        <linearGradient id="pantsGradM" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4E5564"/>
          <stop offset="100%" stop-color="#323844"/>
        </linearGradient>
      </defs>
      <!-- Shadow -->
      <ellipse cx="100" cy="462" rx="46" ry="7" fill="rgba(142,116,199,0.15)"/>
      <!-- Trousers / Legs -->
      <path d="M 74 235 L 82 435 L 94 435 L 98 260 L 102 260 L 106 435 L 118 435 L 126 235 Z" fill="url(#pantsGradM)"/>
      <!-- Shoes / Derby -->
      <path d="M 78 435 Q 86 430 96 436 L 98 448 Q 86 453 74 448 Z" fill="#221E23"/>
      <path d="M 104 436 Q 114 430 122 435 L 126 448 Q 114 453 102 448 Z" fill="#221E23"/>
      <!-- Arms -->
      <path d="M 60 135 Q 46 195 50 245 Q 54 250 62 245 Q 60 195 70 140 Z" fill="url(#skinGradM)"/>
      <path d="M 140 135 Q 154 195 150 245 Q 146 250 138 245 Q 140 195 130 140 Z" fill="url(#skinGradM)"/>
      <!-- Messenger Bag -->
      <path d="M 64 135 L 142 245" stroke="#795548" stroke-width="3" fill="none"/>
      <rect x="130" y="235" width="22" height="18" rx="4" fill="#5D4037"/>
      <!-- Torso / Shirt -->
      <path d="M 64 130 Q 100 126 136 130 L 128 240 L 72 240 Z" fill="url(#shirtGradM)" stroke="#D0D8E2" stroke-width="1.2"/>
      <!-- Neck & Head -->
      <path d="M 91 108 L 91 130 L 109 130 L 109 108 Z" fill="url(#skinGradM)"/>
      <ellipse cx="100" cy="94" rx="19" ry="23" fill="url(#skinGradM)"/>
      <!-- Hair: Full-coverage short hair cap -->
      <path d="M 78 97 Q 76 76 82 68 Q 90 62 100 60 Q 110 62 118 68 Q 124 76 122 97 Q 118 78 100 72 Q 82 78 78 97 Z" fill="url(#hairGradM)"/>
    </svg>
  `;
}
