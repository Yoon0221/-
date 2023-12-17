// 시중에서 판매중인 차량 스펙
var carSpecs = {
  car1: { 항목: ['테슬라 로드스터', '1000km', '20만달러 (약 2억 6500만원)'] },
  car2: { 항목: ['라이트이어 0', '625km', '3억 4천만원'] },
  car3: { 항목: ['피스커 오션 울트라', '610km', '5만 2999달러 (약 7119만원)'] },
  car4: { 항목: ['테슬라 모델 X', '560km', '1억 1599만원 ~ 1억 3599만원'] },
  car5: { 항목: ['폭스바겐 ID.3 Pro S', '548km', '3만 6960유로 (약 5천만원)'] },
  car6: { 항목: ['테슬라 모델 3', '547km', '7034만원 ~ 9417만원'] },
  car7: { 항목: ['아우디 Q4 e-트론', '411km', '6170만원 ~ 6870만원'] },
  car8: { 항목: ['BMW i4 M50', '378km', '8490만원 ~ 9840만원'] },
};

// 모델 I 스펙
var modelISpecs = { 항목: ['모델 I', '567.8km', '5000만원'] };

// 시중에서 판매중인 차량 이미지
var carImages = {
  car1: 'https://github.com/Yoon0221/capston/assets/108733746/1867c087-1e72-4965-a9cb-b37ebec5dde4',
  car2: 'https://github.com/Yoon0221/capston/assets/108733746/2f94708e-f952-40b2-a9f1-da41fb8d75b2',
  car3: 'https://github.com/Yoon0221/capston/assets/108733746/da4a1ac0-73f9-44b6-8c3c-f7ef090235b4',
  car4: 'https://github.com/Yoon0221/capston/assets/108733746/f49abdb5-3543-438d-9459-05f1f5abb195',
  car5: 'https://github.com/Yoon0221/capston/assets/108733746/212c914d-f81e-4d42-b0e0-73c473cfe317',
  car6: 'https://github.com/Yoon0221/capston/assets/108733746/7cd0b396-30ef-4937-ac23-40c193882729',
  car7: 'https://github.com/Yoon0221/capston/assets/108733746/b71e5fb7-e21a-400a-92f5-0c404b16e9d1',
  car8: 'https://github.com/Yoon0221/capston/assets/108733746/39447e53-42f8-4da9-9095-cdcbcc0ac6e4',
};

// 임시 저장 배열 선언
var myArray = [];

// 내 정보 불러오기 기능 -> 배열에 해당 정보 저장까지 가능
function loadUserInfos(num) {
  const loginId = localStorage.getItem('loggedInUserId');
  const storedUserInfo = localStorage.getItem(loginId);

  if (storedUserInfo) {
    const userInfo = JSON.parse(storedUserInfo);
    generateCarInfo(userInfo, num);
  }

  updateTable();

  var userImage = document.getElementById('userImage');

  userImage.src = myArray[3];
}

function generateCarInfo(userInfo, num) {
  if (userInfo.carCount > 0) {
    const carInfo = userInfo.cars[`car${num}`];
    const carImage = userInfo.carImages[`car${num}`];

    myArray.push(carInfo.항목[0]);
    myArray.push(carInfo.항목[1]);
    myArray.push(carInfo.항목[2]);
    myArray.push(carImage);
  }
}

// 테이블 업데이트 함수
function updateTable() {
  // 테이블 요소 가져오기
  var table = document.getElementById('user-comparison-table');

  // 첫 번째 행은 헤더 행이므로 건너뜁니다.
  for (var i = 1; i < table.rows.length; i++) {
    // 각 행의 셀에 데이터 추가
    table.rows[i].cells[1].innerText = myArray[i - 1];
    table.rows[i].cells[2].innerText = modelISpecs.항목[i - 1];
  }
}

function refreshTable() {
  location.reload();
}

// 페이지 로드 후 테이블 업데이트 호출
window.onload = updateTable;

// 차량 번호를 입력받아 해당 차량 이미지 URL을 반환하는 함수
function getCarImageUrl(carId) {
  var carNumber = carId.split('car')[1];
  var carKey = 'car' + carNumber;
  return carImages[carKey];
}

// 차량 선택 시 호출되는 함수
function selectVehicle(vehicleId, isUser) {
  var selectedSpecs = isUser
    ? UserCar[vehicleId].항목
    : carSpecs[vehicleId].항목;
  var selectedModelISpecs = modelISpecs.항목;

  var comparisonTableId = isUser ? 'user-comparison-table' : 'comparison-table';
  var comparisonTable = document.getElementById(comparisonTableId);

  for (var i = 1; i < comparisonTable.rows.length; i++) {
    // 선택한 차량의 정보 표시
    comparisonTable.rows[i].cells[1].innerHTML = selectedSpecs[i - 1];

    // 모델 I의 정보 표시
    comparisonTable.rows[i].cells[2].innerHTML = selectedModelISpecs[i - 1];
  }

  var imageId = isUser ? 'userImage' : 'carImage';
  var imageUrl = isUser
    ? getUserImageUrl(vehicleId)
    : getCarImageUrl(vehicleId);
  document.getElementById(imageId).src = imageUrl;
}

// 차량 선택 시 호출되는 함수
function selectCar(carId) {
  selectVehicle(carId, false);
}

// 펼쳐보기 함수
function toggleSection(sectionId, button) {
  var section = document.getElementById(sectionId);
  if (section.style.display === 'none' || section.style.display === '') {
    section.style.display = 'block';
    button.innerText = 'X';
    button.classList.add('collapsed');
  } else {
    section.style.display = 'none';
    button.innerText = '더보기';
    button.classList.remove('collapsed');
  }
}
