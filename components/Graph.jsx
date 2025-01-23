import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip,  Filler, Legend,} from 'chart.js'
import { Fira_Sans, Kalam } from 'next/font/google';

const fira = Fira_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800']
});

const sati = Kalam({
  subsets: ['latin'],
  weight: ['400', '700']
});

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip  ,
    Filler,
    Legend
)

export const options = (prices) => {
return {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels:{
        color: '#ebebeb',
        boxWidth: 17,
        font: {
          size: '17',
          family: `fira.className`,
          weight: '400',
        }
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: true, // Display grid lines along the x-axis
        color: '#2A2A2A',
        tickColor: '#1a1a1a',
      },
      border:{
        color: '#313131',
      },
      ticks: {
        color: '#cdcdcd',
        font:{
          size: '15',
          weight: '700',
        }
      },
    },
    y: {
      grid: {
        display: true, // Display grid lines along the y-axis
        color: '#2A2A2A',
        tickColor: '#1a1a1a',
        // offset: true,
      },
      border:{
        color: '#313131',
      },
      ticks: {
        color: '#cdcdcd',
        font:{
          size: '15',
          weight: '700',
        }
      },
      suggestedMin: prices.lowestPrice,
      suggestedMax: prices.maxValue,

    },
  },
};
};


const Graph = ({product: {amazon, croma, flipkart, samsung, lowestPrice}}) => {
  function findMaxValue(...arrays) {
    const filteredArrays = arrays.filter(arr => arr !== null);
    const allValues = [].concat(...filteredArrays);
    return Math.max(...allValues);
  }

  const maxValue = findMaxValue(amazon, flipkart, samsung, croma);
  const prices = {lowestPrice,maxValue};

  const chartData = {
      labels: ['Jan','Feb','Mar','Apr'],
      datasets: [
        amazon && {
          label: "Amazon",

          data: amazon?.map(price => price),
          // fill: true,
          backgroundColor: "#391714",
          borderColor: "#E54D2E",
          showLine: true,
          tension: 0.4,
          pointHoverRadius: 6,
          pointRadius: 4,
        },
        flipkart && {
          label: "Flipkart",
          data: flipkart?.map(price => price),
          // fill: true,
          backgroundColor: "#301C3B",
          borderColor: "#8E4EC6",
          showLine: true,
          tension: 0.4,
          pointHoverRadius: 6,
          pointRadius: 4,
        },
        croma && {
          label: "Croma",
          data: croma?.map(price => price),
          // fill: true,
          backgroundColor: "#302008",
          borderColor: "#FFC53D",
          showLine: true,
          tension: 0.4,
          pointHoverRadius: 6,
          pointRadius: 4,
        },
        samsung && {
          label: "Samsung",
          data: samsung?.map(price => price),
          // fill: true,
          backgroundColor: "#0D2847",
          borderColor: "#0090FF",
          showLine: true,
          tension: 0.4,
          pointHoverRadius: 6,
          pointRadius: 4,
        },

      ].filter(Boolean),
    };



    return (
      <div className='graph-wrapper'>
        <em className="graph-title">Price History</em>
        <div className='graph-container'>

            <Line
              data={chartData}
              options={options(prices)}

            />

        </div>
      </div>
    );


}

export default Graph;