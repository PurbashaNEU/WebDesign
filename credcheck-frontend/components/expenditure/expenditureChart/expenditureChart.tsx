import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement } from 'chart.js';
import { useEffect } from 'react';
import exp from 'constants';

Chart.register(ArcElement);
const data = {
 labels: [],
 datasets: [{
 label: 'Doughnut chart',
 data: [],
 backgroundColor: [],
 borderColor: [],
 borderWidth: 1,
 hoverBorderWidth: 8,
}]
};
const Options = {
    responsive: false,
    maintainAspectRatio: false,
    defaultFontSize:"14px",
    width:"100px",
    height:"100px"
  }
  const abc = {};
export default function ExpenditureChart({expenditureDetails}) {

    const segregateExpenditure = () => {
        const dataSet = {};
        expenditureDetails?.forEach(expenditure => {
            if (dataSet.hasOwnProperty(expenditure.expenditure_type)) {
                dataSet[expenditure['expenditure_type']] += expenditure.expenditure_amount;
            } else {
                const key = expenditure['type'];
                dataSet[expenditure['expenditure_type']] = expenditure['expenditure_amount'];
            }
        });
    
        if (dataSet) {
            data.labels= Object.keys(dataSet);
        }
        const amt = []
        for (let key in dataSet) {
            let rgb = {
                r: 155,
                g: 99,
                b: 132,
                a: 0.2
            }
            const randomColor = Math.floor(Math.random()*16777215).toString(16);

            amt.push(dataSet[key]);
            data.datasets[0].backgroundColor.push(`#${randomColor}`);
            data.datasets[0].borderColor.push(`#${randomColor}`);
            rgb.r += 20;
            rgb.g += 20;
            rgb.b += 20;
            
        }
        data.datasets[0].data = [...amt];

        console.log(data);
    }

    useEffect(() => {
        segregateExpenditure();
    }, []);
    return (
        <div>
            <Doughnut
            options = {Options}
            data={data}
 />
 
        </div>
    )
}