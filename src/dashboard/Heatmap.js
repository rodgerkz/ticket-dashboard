/* eslint eqeqeq: 0 */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

export const BASE_URL = process.env.REACT_APP_API_URL;
 const TicketVolumePerHour = () => {
  const [tickets, setTickets] = useState([]);
  const date = new Date();
  const currentYear = date.getFullYear();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [week, setWeek] = useState(1);
  const [weeks, setWeeks] = useState([]);
  // const [tickets, setTickets] = useState([])
  const [max,setMax]=useState(500)
  const getTotalTickets= async () => {
    const dates = getWeekDates(year, month, week);
    const startDate = dates.from;
    const endDate = dates.to;

    axios
      .get(BASE_URL+`/TicketVolumeperweek?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => {setTickets(response.data.data)
      
        let highestCount = 0;
for (const date in response.data.data) {
  const counts = response.data.data[date].map(item => Number(item.count));
  const maxCount = Math.max(...counts);
  if (maxCount > highestCount) {
    highestCount = maxCount;
  }
}
if(highestCount<500){
  setMax(500)
}else{
  setMax(highestCount)
}
      })
      .catch((error) => console.log(error));

  };


const [ticketModal, setTicketModal] = useState(false);
  const years = Array.from({ length: 2 }, (_, index) => currentYear - index);
  const months = [];

  if (year < currentYear) {
    for (let month = 1; month <= 12; month++) {
      months.push(new Date(year, month - 1, 1).toLocaleString('default', { month: 'long' }));
    }
  } else {
    for (let month = 1; month <= new Date().getMonth() + 1; month++) {
      months.push(new Date(year, month - 1, 1).toLocaleString('default', { month: 'long' }));
    }
  }
  function getNumberOfWeeks( ) {
    const currentDate = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  const numberOfWeeks = Math.ceil((lastDayOfMonth + currentDate.getDay()) / 7);

  const weekNumbers = Array(numberOfWeeks).fill(0).map((_, index) => index + 1);

  return weekNumbers;
}
   
const getWeeks=()=>{
  var Weekslots = [];
var numw=getNumberOfWeeks()
//  console.log(numw)
  setWeeks(numw);
}

  useEffect(() => {
    getWeeks()
  }, [year, month]);

  const getWeekDates = (year, month, week) => {
    const startDate = new Date(year, month - 1, 2).toISOString().split('T')[0];
    let from = '';
    let to = '';

    if (week === 1) {
      from = startDate;
      to = new Date(new Date(startDate).getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    } else {
      from = new Date(new Date(startDate).getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0]
      to = new Date(new Date(from).getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }

    return { from, to }
  }


  const [width,setWidth]=useState('auto')
  useEffect(() => {
   
    const intervalId = setInterval(()=>{
    if(width=='auto'){
      setWidth('100%')
      clearInterval(intervalId)
    }else{
      setWidth('auto')

    }

   },2000)
    const dates = getWeekDates(year, month, week);
    const startDate = dates.from;
    const endDate = dates.to;

    axios
      .get(BASE_URL+`/TicketVolumeperweek?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => {setTickets(response.data.data)
        let highestCount = 0;
for (const date in response.data.data) {
  const counts = response.data.data[date].map(item => Number(item.count));
  const maxCount = Math.max(...counts);
  if (maxCount > highestCount) {
    highestCount = maxCount;
  }
}
if(highestCount<500){
  setMax(500)
}else{
  setMax(highestCount)
}
      
      
      })
      .catch((error) => console.log(error));

     
  }, []);

  const sortedData = Object.entries(tickets)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
    // console.log(sortedData)

    const hours = Array.from({ length: 24 }, (_, index) => index); // Create an array of hours [0, 1, 2, ..., 23]
    const dates = Object.keys(tickets); // Get the list of dates from the data object
    
    const data = dates.flatMap((date, dayIndex) => {
      const slots = tickets[date];
      return slots.map((slot) => {
        if (slot.hourSlot && slot.hourSlot.includes(':')) {
          const hour = slot.hourSlot.split(':')[0];
          const formattedHour = hour.length === 1 ? '0' + hour : hour;
          const hourIndex = hours.indexOf(parseInt(formattedHour));
          const count = Number(slot.count); // Convert count to a number
          return [hourIndex, dayIndex, count]; // Return an array instead of an object
        } else {
          return null; // or handle the null or invalid format case accordingly
        }
      });
    }).filter(Boolean); // Remove any null values from the array
// console.log(data)
  const option = {
    tooltip: {
      position: 'top',
    },
    grid: {
      height: '75%',
      width: '90%',
      top: '5%',
    },
    xAxis: {
      type: 'category',
      data: hours,
      name: 'Hours',
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: 'category',
      data: Object.keys(sortedData).map((dateStr) => {
        const date = new Date(dateStr);
        const options = { weekday: 'short' };
        return date.toLocaleDateString('en-US', options);
      }),
      //.toLocaleDateString('en-US',{ weekday: 'long' })
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: 0,
      max: max,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%',
    },

    series: [
      {
        name: 'Tickets',
        type: 'heatmap',
        data: data,
        label: {
          show: false,
        },
        itemStyle: {
          color: '#FF6F00', // Change the color of the heatmap chart
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 5,
            shadowColor: 'rgba(124, 65, 121,121)',
          },
        },
      },
    ],
  };
  return (
    <div style={{width:'100%'}}>
    <div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-end',padding:5,paddingTop:0,paddingRight:10,userSelect:'none',cursor:'pointer'}}>

    <small onClick={()=>{
      setTicketModal(!ticketModal)
    }} style={{float:'right',fontSize:12,color:'#1565C0'}}>
    (Week {week}) { new Date(year+'-'+month).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
     </small>

</div>
     

        <ReactECharts option={option} style={{height:'300px',width:width,display:'flex',flexDirection:'row',justifyContent:'center'}}/>

   
   
    {ticketModal && <div style={{position:'absolute',left:0,top:0,background:'rgba(0,0,0,0.5)',width:'100%',height:'100%'}}></div>}
  
    {ticketModal && <div style={{background:'white',minHeight:100,borderTop:'1px solid gray',bottom:0,left:0,width:'100%',position:'absolute',padding:10}}>
<div style={{width:'100%',display:'flex',flexDirection:'row',zoom:0.75,flexWrap:'wrap'}}>
        <div className="form-group" style={{flex:1,minWidth:120}}>
 <label style={{margin:0}} htmlFor="dob" className="required">Year</label> 
 <select className="form-control"
            // className="text-lg font-bold mx-2 px-4 py-1 rounded-lg bg-white max-h-10 focus:border-blue-600 focus:ring-blue-600"
            value={year}
            onChange={(e) => {
              
            // console.log(year)
              setYear(e.target.value)
              getWeeks()
            }}
          >
            <option value="">--Year--</option>
            {years.map((yearval, index) => (
              <option key={index} className="block px-4 py-2 hover:bg-gray-100" value={yearval}>
                {yearval}
              </option>
            ))}
          </select>
</div><div style={{width:'10px'}}></div>
<div className="form-group" style={{flex:1,minWidth:120}}>
 <label style={{margin:0}} htmlFor="dob" className="required">Month</label>
 <select className="form-control"
           value={month}
            onChange={(e) => {
              
              
              setMonth(e.target.value)
              getWeeks()
            }}
          >
            <option value="">--Month--</option>
            {months.map((monthval, index) => (
              <option
                key={index}
                className="block px-4 py-2 hover:bg-gray-100"
                value={new Date(`1 ${monthval} ${year}`).getMonth() + 1}
              >
                {monthval}
              </option>
            ))}
          </select>
</div>
<div style={{width:'10px'}}></div>
<div className="form-group" style={{flex:1,minWidth:120}}>
 <label style={{margin:0}} htmlFor="dob" className="required">Week</label>
 <select className="form-control"
          value={week}
          onChange={(e) => {
            
            
            setWeek(e.target.value)
    
          }}
        >
          <option value="">--Week--</option>
          {weeks.map((weekOption, index) => (
            <option key={index} className="block px-4 py-2 hover:bg-gray-100" value={weekOption}>
              Week {weekOption}
            </option>
          ))}
        </select>
</div>



</div>

<div style={{width:'100%',display:'flex',flexDirection:'row',zoom:0.75,flexWrap:'wrap',justifyContent:'space-between'}}>
  <button
   
    className='btn btn-outline-danger'
 style={{flex:1,margin:3}}
onClick={()=>{

  setTicketModal(false)
}}
  >Close</button>
    <button
   
   className='btn btn-primary '
style={{flex:1,margin:3}}
onClick={()=>{
  getTotalTickets();
  setTicketModal(false)
}}
 >Filter</button>
</div>
  

        </div>}
  </div>
  );
};
export default TicketVolumePerHour 