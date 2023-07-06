/* eslint eqeqeq: 0 */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

export const BASE_URL = process.env.REACT_APP_API_URL;
 const TicketBySource = () => {

  const [tickets, setTickets] = useState([])

  const [ticketsDate, setTicketsDate] = useState([new Date().toISOString().split('T')[0], new Date().toISOString().split('T')[0]])
  const getTotalTickets= async (range,date_1,date_2) => {

    // if(range==false){
        var date=`/dayTrendByhours?date=${date_1}`;
    // }else{
    //     var date=`/dayTrendByhours?startDate=${date_1}&endDate=${date_2}`
    // }
    // console.log(date)
    try {
      const response = await axios.get(BASE_URL+date, {
        headers: {
                      'Content-Type': 'application/json'
        }
      });
    
      // console.log(response.data)
// console.log(response_2.data)
      if (response.status === 200) {
     
        setTickets(response.data.data);
          // console.log([response.data,response_2.data])
        // return [response.data,response_2.data]
         
            } else {
        throw new Error('Error fetching data');
      }
    } catch (error) {
      console.error(error);
    }


  };
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
    getTotalTickets(true, new Date().toISOString().split('T')[0],ticketsDate[1]);
 
}, []);

const [ticketModal, setTicketModal] = useState(false);

 // Generate an array of all the hour slots
 const allHourSlots = [];
 for (let i = 0; i < 24; i++) {
   const hourSlot = `2023-05-25 ${i.toString().padStart(2, '0')}:00:00`;
   allHourSlots.push(hourSlot);
 }

 // Fill in missing hour slots with zero values
 const filledData = allHourSlots.map(hourSlot => {
   const existingEntry = tickets.find(entry => entry.hourSlot === hourSlot);
   if (existingEntry) {
     return existingEntry;
   } else {
     return {
       hourSlot,
       solvedCount: "0",
       pendingCount: "0"
     };
   }
 });
// console.log(filledData)
 const xData = filledData.map(entry => entry.hourSlot);
 const seriesData = [
   {
     name: 'Solved Count',
     type: 'line',
     data: filledData.map(entry => parseInt(entry.solvedCount)),
   },
   {
     name: 'Pending Count',
     type: 'line',
     data: filledData.map(entry => parseInt(entry.pendingCount)),
   }
 ];

 const option = {
    legend: {
        data: ['Solved Count', 'Pending Count'],
      },
    xAxis: {
      type: 'category',
      name: 'Hours',
      axisLabel: {
        formatter: function (value) {
          return value.split(' ')[1].split(':')[0] + ':00';
        }
      },
      data: xData,
    },
    yAxis: {
      type: 'value',
      name: 'Count',
    },
    series: seriesData,
  };

  return (
    <div style={{width:'100%'}}>
   

      {/* <div className="mt-1 mb-2 lg:m-3 flex lg:p-2 bg-white w-8/12 lg:ml-auto">
      

        <input type='date' 
          className="text-lg font-bold mx-2 px-4 py-1 border-2 border-sky-400 bg-white max-h-10 focus:border-blue-600 focus:ring-blue-600 rounded-md"
          value={date}
          id='date'
          onChange={getDateParam}
        />
          
      </div> */}
      <div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-end',padding:5,paddingTop:0,paddingRight:10,userSelect:'none',cursor:'pointer'}}>
    
            <small onClick={()=>{
              setTicketModal(!ticketModal)
            }} style={{float:'right',fontSize:12,color:'#1565C0'}}>
              {new Date(ticketsDate[0]).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
             </small>
       
        </div>
      <ReactECharts option={option} style={{width:width}} />
      {ticketModal && <div style={{position:'absolute',left:0,top:0,background:'rgba(0,0,0,0.5)',width:'100%',height:'100%'}}></div>}
      {ticketModal && <div style={{background:'white',minHeight:100,borderTop:'1px solid gray',bottom:0,left:0,width:'100%',position:'absolute',padding:10}}>
<div style={{width:'100%',display:'flex',flexDirection:'row',zoom:0.75,flexWrap:'wrap'}}>
        <div className="form-group" style={{flex:1,minWidth:120}}>
 <label style={{margin:0}} htmlFor="dob" className="required">Select date</label>
  <input
    required
    type="date"
    value={ticketsDate[0]}
    onChange={(e) => {
      setTicketsDate([e.target.value,ticketsDate[1]])
      // console.log(e.target.value)
     }}
    className="form-control"
    id="dob"
    placeholder="Enter your date of birth"
  />
</div>
{/* <div style={{width:'20px'}}></div>
<div className="form-group" style={{flex:1,minWidth:120}}>
 <label style={{margin:0}} htmlFor="dob" className="required">To</label>
  <input
    required
    type="date"
    value={ticketsDate[1]}
    onChange={(e) => {
      setTicketsDate([ticketsDate[0],e.target.value])
      // console.log(e.target.value) 
    }}
    className="form-control"
    id="dob"
    placeholder="Enter your date of birth"
  />
</div> */}
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
  getTotalTickets(true,ticketsDate[0],ticketsDate[1]);
  setTicketModal(false)
}}
 >Filter</button>
</div>
  

        </div>}
    </div>
  );
}
export default TicketBySource
