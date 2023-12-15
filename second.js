// 차량 부품 소개 배너
const bannerWrapper = document.querySelector('.banner-wrapper');
let currentIndex = 0;

function showBanner(index) {
  const percentage = -index * 100;
  bannerWrapper.style.transform = `translateX(${percentage}%)`;
}

function prevBanner() {
  currentIndex = (currentIndex - 1 + 4) % 4;
  showBanner(currentIndex);
}

function nextBanner() {
  currentIndex = (currentIndex + 1) % 4;
  showBanner(currentIndex);
}

setInterval(nextBanner, 3000);

// 가격 책정 부분
var ctx = document.getElementById('priceChart').getContext('2d');
var priceChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['배터리 구성 비용', '나머지 부품 및 마진'],
    datasets: [
      {
        data: [930, 4070],
        backgroundColor: ['#3498db', '#ecf0f1'],
      },
    ],
  },
  options: {
    cutoutPercentage: 70,
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: '책정 가격 구성 비율',
      fontSize: 16,
      fontColor: '#3498db',
    },
  },
});
