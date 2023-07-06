/* eslint eqeqeq: 0 */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
export const BASE_URL = process.env.REACT_APP_API_URL;
 const TicketTrends = () => {
   const [tickets, setTickets] = useState([])
   const [monthTrendModal, setMonthTrendModal] = useState(false);
   const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().split('T')[0].split('-')[1]);
   const [selectedYear, setSelectedYear] = useState( new Date().toISOString().split('T')[0].split('-')[0]);

   const getTotalTickets= async () => {

    try {
      const response = await axios.get(BASE_URL+`/monthTrendBydays?month=`+selectedYear+'-'+selectedMonth, {
        headers: {
                      'Content-Type': 'application/json'
        }
      });
 
      if (response.status === 200) {
     
        setTickets(response.data.data)
         
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
      
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      
      const formattedDate = `${year}-${month}`;
        axios.get(BASE_URL+`/monthTrendBydays?month=`+formattedDate)
            .then(response => 
    setTickets(response.data.data)
    )
    },[])


    const option = {
        color: ['lightgreen', 'orange','red'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            right: '10%'
        },
      
        legend: {
            data: ['Resolved Tickets','Received Tickets','Open Tickets']
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                boundaryGap: true,
                data: tickets.map((ticket) => { return ticket.daySlot }),
            }
        ],
        yAxis: { 
            type: 'value',
                    position: 'left',
                    alignTicks: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#5470C6'
                        }
                    },
                    axisLabel: {
                        formatter: '{value}'
                    },
    
        },
       
        series: [
            {
                name: 'Received Tickets',
                type: 'bar',
                stack: 'one',
                smooth: 0.3,
                data: tickets.map((ticket) => { return ticket.totalCount }),
            },
            {
                name: 'Resolved Tickets',
                type: 'bar',
                stack: 'one',
                smooth: 0.3, // Add the smooth property with the desired tension
                // yAxisIndex: 1,
                data: tickets.map((ticket) => { return ticket.solvedCount }),
            },
            {
                name: 'Open Tickets',
                type: 'bar',
                stack: 'one',
                smooth: 0.3, // Add the smooth property with the desired tension
                // yAxisIndex: 1,
                data: tickets.map((ticket) => { return ticket.pendingCount }),
            },
            
        ]
    };
   
  
    const handleMonthChange = (e) => {
      setSelectedMonth(e.target.value);
    };
  
    const handleYearChange = (e) => {
      setSelectedYear(e.target.value);
    };
    return (
      <div style={{width:'100%'}}>
           <div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-end',padding:5,paddingTop:0,paddingRight:10,userSelect:'none',cursor:'pointer'}}>
    
    <small onClick={()=>{
      setMonthTrendModal(!monthTrendModal)
    }} style={{float:'right',fontSize:12,color:'#1565C0'}}>
      { (selectedMonth!='' || selectedYear!='')  && new Date(selectedYear+'-'+selectedMonth).toLocaleDateString("en-US", { year: "numeric", month: "short" })} 
      {(selectedMonth=='' || selectedYear=='') && <span>Select date</span>}
     </small>

</div>

  <ReactECharts option={option} style={{height:'300px',width:width,display:'flex',flexDirection:'row',justifyContent:'center'}}/>

            
            {monthTrendModal && <div style={{position:'absolute',left:0,top:0,background:'rgba(0,0,0,0.5)',width:'100%',height:'100%'}}></div>}
{monthTrendModal && <div style={{background:'white',minHeight:100,borderTop:'1px solid gray',bottom:0,left:0,width:'100%',position:'absolute',padding:10}}>
        {/* <div onClick={()=>{setOpenTicketModal(false)}} style={{position:'absolute',width:50,height:50,top:0,right:0,textAlign:'right'}}>
<CloseIcon  style={{color:'white'}} />sdsdssd
    </div> */}

<div style={{width:'100%',display:'flex',flexDirection:'row',zoom:0.75,flexWrap:'wrap'}}>

        <div className="form-group" style={{flex:1,minWidth:120}}>
 <label style={{margin:0}} htmlFor="dob" className="required">Year</label>

 <select
        id="yearSelect"
        value={selectedYear}
        onChange={handleYearChange}
        className="form-control"
      >
        <option value="">-- Select Year --</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
        <option value="2028">2028</option>
        <option value="2029">2029</option>
                <option value="2030">2030</option>

        {/* Add more options as needed */}
      </select>
{/* 
    required
    type="date"
    value={openTicketsDate[0]}
    onChange={(e) => {
      setOpenTicketsDate([e.target.value,openTicketsDate[1]])
      console.log(e.target.value) }}
  
    id="dob"
    placeholder="Enter your date of birth"
  /> */} 
</div>
<div style={{width:'20px'}}></div>
<div className="form-group" style={{flex:1,minWidth:120}}>
 <label style={{margin:0}} htmlFor="dob" className="required">Month</label>
 <select
        id="monthSelect"
        value={selectedMonth}
        onChange={handleMonthChange}  
        className="form-control"
      >
        <option value="">-- Select Month --</option>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
</div></div>

<div style={{width:'100%',display:'flex',flexDirection:'row',zoom:0.75,flexWrap:'wrap',justifyContent:'space-between'}}>
  <button
   
    className='btn btn-outline-danger'
 style={{flex:1,margin:3}}
onClick={()=>{

  setMonthTrendModal(false)
}}
  >Close</button>
    <button
   
   className='btn btn-primary '
style={{flex:1,margin:3}}
onClick={()=>{
  if(selectedMonth!='' && selectedYear!=''){

  }
  getTotalTickets()
//  getOpenTickets(true,openTicketsDate[0],openTicketsDate[1]);
 setMonthTrendModal(false)
}}
 >Filter</button>
</div>
        </div>}
        </div>
    );
}

export default TicketTrends