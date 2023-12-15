// 내 정보 불러오기 기능
function loadUserInfo() {
  const loginId = localStorage.getItem('loggedInUserId');

  if (!loginId) {
    console.error('로그인된 사용자 ID를 찾을 수 없습니다.');
    return;
  }

  const storedUserInfo = localStorage.getItem(loginId);

  if (storedUserInfo) {
    const userInfo = JSON.parse(storedUserInfo);
    const userInfoDiv = document.getElementById('userInfo');

    userInfoDiv.innerHTML = `
      <div class="user-info">
        <div class="user-details">
          <p><strong>아이디:</strong> ${userInfo.id}</p>
          <p><strong>이름:</strong> ${userInfo.name}</p>
          <p><strong>나이:</strong> ${userInfo.age}</p>
          <p><strong>차량 개수:</strong> ${userInfo.carCount}</p>
        </div>
        <div class="car-info-container">
          ${generateCarInfo(userInfo)}
        </div>
      </div>
    `;
  }
}

function generateCarInfo(userInfo) {
  if (userInfo.carCount > 0) {
    let carInfoHtml = '<div class="car-info-container">';

    for (let i = 0; i < userInfo.carCount; i++) {
      const carInfo = userInfo.cars[`car${i + 1}`];
      const carImage = userInfo.carImages[`car${i + 1}`];

      carInfoHtml += `
        <div class="car-info">
          <p><strong>차량 ${i + 1} 정보:</strong></p>
          <p><strong>모델:</strong> ${carInfo.항목[0]}</p>
          <p><strong>전비:</strong> ${carInfo.항목[1]}</p>
          <p><strong>주행 거리:</strong> ${carInfo.항목[2]}</p>
          <p><strong>차량 비용:</strong> ${carInfo.항목[3]}</p>
          <p><strong>1일 기준 비용:</strong> ${carInfo.항목[4]}</p>
          <p><strong>1년 기준 비용:</strong> ${carInfo.항목[5]}</p>
          <p><strong>차량 사진:</strong></p> <img src="${carImage}" alt="차량 사진" width="50%">
        </div>
      `;
    }

    carInfoHtml += '</div>';

    return carInfoHtml;
  }

  return '';
}

// "내 정보 불러오기" 버튼에 이벤트 리스너 등록
document.getElementById('loadInfoBtn').addEventListener('click', loadUserInfo);

// 회원탈퇴 기능
function withdraw() {
  const withdrawId = document.getElementById('withdrawId').value;
  const storedUserInfo = localStorage.getItem(withdrawId);

  if (storedUserInfo) {
    localStorage.removeItem(withdrawId);

    document.getElementById('withdrawMessage').innerHTML =
      '성공적으로 회원탈퇴가 완료되었습니다.';
    document.getElementById('withdrawMessage').classList.remove('hidden');

    window.location.href = 'index.html';
  } else {
    document.getElementById('withdrawMessage').innerHTML =
      '회원정보를 찾을 수 없습니다. 다시 확인해주세요.';
    document.getElementById('withdrawMessage').classList.remove('hidden');
  }
}

// 회원탈퇴 버튼에 이벤트 리스너 등록
document.getElementById('withdrawButton').addEventListener('click', withdraw);
