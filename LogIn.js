// 회원가입 기능 (확인완료)
function signup() {
  const id = document.getElementById('id').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const carCount = document.getElementById('carCount').value;

  if (localStorage.getItem(id)) {
    document.getElementById('signupMessage').innerHTML =
      '이미 있는 아이디입니다.';
    document.getElementById('signupMessage').classList.remove('hidden');
    return;
  }

  const UserCar = {};
  const UsercarImages = {};

  for (let i = 0; i < carCount; i++) {
    const carSpec = [
      document.getElementById(`model${i}`).value,
      document.getElementById(`maintenance${i}`).value,
      document.getElementById(`carCost${i}`).value,
      document.getElementById(`dailyCost${i}`).value,
      document.getElementById(`monthlyCost${i}`).value,
      document.getElementById(`annualCost${i}`).value,
    ];

    UserCar[`car${i + 1}`] = { 항목: carSpec };

    UsercarImages[`car${i + 1}`] = document.getElementById(
      `carImage${i}`
    ).value;
  }

  const userInfo = {
    id: id,
    password: password,
    name: name,
    age: age,
    carCount: carCount,
    cars: UserCar,
    carImages: UsercarImages,
  };

  localStorage.setItem(id, JSON.stringify(userInfo));

  document.getElementById('signupMessage').innerHTML =
    '성공적으로 회원가입이 완료되었습니다.';
  document.getElementById('signupMessage').classList.remove('hidden');
}

// 로그인 기능 (확인완료)
function login() {
  const loginId = document.getElementById('loginId').value;
  const loginPassword = document.getElementById('loginPassword').value;

  const storedUserInfo = localStorage.getItem(loginId);

  if (storedUserInfo) {
    const userInfo = JSON.parse(storedUserInfo);
    if (userInfo.password === loginPassword) {
      document.getElementById(
        'loginMessage'
      ).innerHTML = `로그인에 성공하였습니다. 환영합니다, ${userInfo.name}님`;

      // 사용자 ID를 localStorage에 저장
      localStorage.setItem('loggedInUserId', loginId);

      // "회원모드 전환"
      gotoMyPage(loginId);

      return;
    }
  }

  document.getElementById('loginMessage').innerHTML =
    '로그인에 실패하였습니다. 정보를 다시 확인해주시길 바랍니다.';
  document.getElementById('loginMessage').classList.remove('hidden');
}

// 회원가입 - 동적으로 차량 정보 기입 폼 생성 (확인완료)
document.getElementById('carCount').addEventListener('input', function () {
  const carInfoForms = document.getElementById('dynamicCarInfoForms');
  const carCount = parseInt(document.getElementById('carCount').value, 10);

  // 동적으로 차량 정보 기입 폼 생성
  let formsHTML = '';
  for (let i = 0; i < carCount; i++) {
    formsHTML += `
    <br/></br/><h3>-차량 정보 입력-</h3> <br/></br/>
<label for="model${i}">모델:</label>
<input type="text" id="model${i}"><br>
<label for="maintenance${i}">전비:</label>
<input type="text" id="maintenance${i}"><br>
<label for="carCost${i}">주행 거리 :</label>
<input type="number" id="carCost${i}"><br>
<label for="dailyCost${i}">차량 비용:</label>
<input type="number" id="dailyCost${i}"><br>
<label for="monthlyCost${i}">1일 기준 비용:</label>
<input type="number" id="monthlyCost${i}"><br>
<label for="annualCost${i}">1년 기준 비용:</label>
<input type="number" id="annualCost${i}"><br>
<label for="carImage${i}">차량 사진:</label>
<input type="url" id="carImage${i}"><br>
`;
  }

  carInfoForms.innerHTML = formsHTML;

  if (carCount > 0) {
    document.getElementById('dynamicCarInfoForms').classList.remove('hidden');
  } else {
    document.getElementById('dynamicCarInfoForms').classList.add('hidden');
  }
});

// 회원모드 전환하는 함수
function gotoMyPage(loginId) {
  const userInfo = JSON.parse(localStorage.getItem(loginId));

  window.location.href = 'MyPage.html';
}

// 배치
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

function toggleForms() {
  signupForm.style.display =
    signupForm.style.display === 'none' ? 'block' : 'none';
  loginForm.style.display =
    loginForm.style.display === 'none' ? 'block' : 'none';
}
