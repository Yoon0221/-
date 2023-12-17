// 메인 2번
function controlMotor() {
  var torque = parseFloat(document.getElementById('torqueInput').value);
  var resultElement = document.getElementById('result');

  if (torque > 0) {
    resultElement.innerHTML = '모터 구동 중';
    resultElement.className = 'driving';
  } else if (torque < 0) {
    resultElement.innerHTML = '회생 제동 중';
    resultElement.className = 'regenerative';
  } else {
    resultElement.innerHTML = '토크 값이 0이므로 모터가 정지 상태입니다.';
    resultElement.className = 'stopped';
  }
}

// 메인 3번
// 슬라이더 요소와 결과를 표시할 요소 가져오기
const regenSlider = document.getElementById('regenRatio');
const hydraulicSlider = document.getElementById('hydraulicRatio');
const regenValue = document.getElementById('regenValue');
const hydraulicValue = document.getElementById('hydraulicValue');
const gearRatioDisplay = document.getElementById('gearRatio');

// 초기 값 표시
updateDisplay();

// 슬라이더 값 변경 이벤트에 대한 리스너 등록
regenSlider.addEventListener('input', updateDisplay);
hydraulicSlider.addEventListener('input', updateDisplay);

// 슬라이더 값 변경에 따라 화면 업데이트
function updateDisplay() {
  // 슬라이더 값 가져오기
  let regenRatio = regenSlider.value;
  let hydraulicRatio = hydraulicSlider.value;

  // 비율 표시 업데이트
  regenValue.textContent = `${regenRatio}%`;
  hydraulicValue.textContent = `${hydraulicRatio}%`;

  // 전비 값 계산 및 표시
  if (regenRatio + hydraulicRatio > 100) {
    // 비율 합이 100을 초과하는 경우, 비율을 재조정
    const totalRatio = parseFloat(regenRatio) + parseFloat(hydraulicRatio);
    regenRatio = (regenRatio / totalRatio) * 100;
    hydraulicRatio = (hydraulicRatio / totalRatio) * 100;
    regenValue.textContent = `${regenRatio.toFixed(2)}%`;
    hydraulicValue.textContent = `${hydraulicRatio.toFixed(2)}%`;
  }

  const totalRatio = 100 - regenRatio;
  const gearRatio = (100 - hydraulicRatio) / totalRatio;
  gearRatioDisplay.textContent = gearRatio.toFixed(2);
}

// 메인 4번
var data = {
  labels: ['회생제동 비율 80%', '회생제동 비율 50%'],
  datasets: [
    {
      label: 'UDDS2(도심 주행)에서 직류전류 방전량',
      backgroundColor: ['#36A2EB', '#FFCE56'],
      data: [12, 18],
    },
  ],
};

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '직류전류 방전량 (Ah)',
        },
      },
    },
  },
});

// 결과 표시
var resultElement = document.getElementById('result');
resultElement.innerHTML =
  'UDDS2(도심 주행)에서의 직류전류 방전량: 12 Ah (회생제동 비율 80%)';
resultElement.innerHTML += '<br>';
resultElement.innerHTML +=
  'UDDS2(도심 주행)에서의 직류전류 방전량: 18 Ah (회생제동 비율 50%)';

// 메인 5번
const svg = d3.select('svg');
const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - margin.top - margin.bottom;

const xScale = d3.scaleLinear().range([0, width]);
const yScale = d3.scaleLinear().range([height, 0]);

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

svg
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

const updateChart = () => {
  const recoveryRatio = +document.getElementById('recoveryRatio').value;
  const error = calculateError(recoveryRatio);

  xScale.domain([0, 100]);
  yScale.domain([0, 1]);

  svg.selectAll('rect').remove();

  svg
    .selectAll('rect')
    .data([{ recoveryRatio, error }])
    .enter()
    .append('rect')
    .attr('x', (d) => xScale(d.recoveryRatio) - width / 200 + 50)
    .attr('y', (d) => yScale(d.error))
    .attr('width', width / 100)
    .attr('height', (d) => height - yScale(d.error))
    .style('fill', 'red');

  svg.select('.x-axis').remove();
  svg.select('.y-axis').remove();

  svg
    .append('g')
    .attr('class', 'x-axis')
    .attr(
      'transform',
      'translate(' + margin.left + ',' + (height + margin.top) + ')'
    )
    .call(xAxis);

  svg
    .append('g')
    .attr('class', 'y-axis')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .call(yAxis);

  document.getElementById('errorValue').innerText = error.toFixed(2);
};

const calculateError = (recoveryRatio) => {
  return Math.abs(recoveryRatio - 50) / 100;
};

updateChart();

document.getElementById('recoveryRatio').addEventListener('input', updateChart);
