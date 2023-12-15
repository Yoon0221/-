// 시중에서 판매중인 차량 스펙
var carSpecs = {
  car1: { 항목: ['dkssud', 2, 3, 4, 5, 6] },
  car2: { 항목: [11, 12, 13, 14, 15, 16] },
  car3: { 항목: [21, 22, 23, 24, 25, 26] },
  car4: { 항목: [31, 32, 33, 34, 35, 36] },
  car5: { 항목: [41, 42, 43, 44, 45, 46] },
  car6: { 항목: [51, 52, 53, 54, 55, 56] },
  car7: { 항목: [61, 62, 63, 64, 65, 66] },
  car8: { 항목: [71, 72, 73, 74, 75, 76] },
};

// 모델 I 스펙
var modelISpecs = { 항목: [91, 92, 93, 94, 95, 96] };

// 시중에서 판매중인 차량 이미지
var carImages = {
  car1: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE12LHS9UK7axlWIVM6yKkZTYtroeOgcrEkA&usqp=CAU',
  car2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE12LHS9UK7axlWIVM6yKkZTYtroeOgcrEkA&usqp=CAU',
  car3: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE12LHS9UK7axlWIVM6yKkZTYtroeOgcrEkA&usqp=CAU',
  car4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE12LHS9UK7axlWIVM6yKkZTYtroeOgcrEkA&usqp=CAU',
  car5: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE12LHS9UK7axlWIVM6yKkZTYtroeOgcrEkA&usqp=CAU',
  car6: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE12LHS9UK7axlWIVM6yKkZTYtroeOgcrEkA&usqp=CAU',
  car7: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE12LHS9UK7axlWIVM6yKkZTYtroeOgcrEkA&usqp=CAU',
  car8: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE12LHS9UK7axlWIVM6yKkZTYtroeOgcrEkA&usqp=CAU',
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

  userImage.src = myArray[6];
}

function generateCarInfo(userInfo, num) {
  if (userInfo.carCount > 0) {
    const carInfo = userInfo.cars[`car${num}`];
    const carImage = userInfo.carImages[`car${num}`];

    myArray.push(carInfo.항목[0]);
    myArray.push(carInfo.항목[1]);
    myArray.push(carInfo.항목[2]);
    myArray.push(carInfo.항목[3]);
    myArray.push(carInfo.항목[4]);
    myArray.push(carInfo.항목[5]);
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
