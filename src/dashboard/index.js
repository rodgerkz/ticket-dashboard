/* eslint eqeqeq: 0 */
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import StackColumnChart from './stackColumn';
import React, { useState, useEffect, useRef } from 'react';
import HorizontalBar from './horizontalBar'
import axios from "axios";
import HeatMap from './Heatmap'
import LineChart from './lineChart'
import MemberResolved from './memberResolved'
import MemberOpen from './memberOpen'
export const BASE_URL = process.env.REACT_APP_API_URL;

const Dashboard=()=>{
    const [tickets, setTickets] = useState([0,0])
    const [resolved, setResolved] = useState([0,0])
    const [opentikets, setOpenTickets] = useState([0,0])
    const [responseRate, setResponseRate] = useState(["0 hours, 0 minutes, 0 seconds",0])
    const [ticketsDate, setTicketsDate] = useState([new Date().toISOString().split('T')[0], new Date().toISOString().split('T')[0]])
    const [openTicketsDate, setOpenTicketsDate] = useState([new Date().toISOString().split('T')[0], new Date().toISOString().split('T')[0]])
    const [resolvedTicketsDate, setResolvedTicketDate] = useState([new Date().toISOString().split('T')[0], new Date().toISOString().split('T')[0]])
    const [responseRateTicketsDate, setResponseRateTicketDate] = useState([new Date().toISOString().split('T')[0], new Date().toISOString().split('T')[0]])
    
    const getTotalTickets= async (range,date_1,date_2) => {
      var date='';
        if(range==false){
             date=`/received?date=${date_1}`;
        }else{
             date=`/received?startDate=${date_1}&endDate=${date_2}`
        }
        try {
          const response = await axios.get(BASE_URL+date, {
            headers: {
                          'Content-Type': 'application/json'
            }
          });
          var date_d=`/received?date=${getPrevious(date_1)}`;
          const response_2 = await axios.get(BASE_URL+date_d, {
            headers: {
                          'Content-Type': 'application/json'
            }
          });
          if (response.status === 200) {
         
            setTickets([response.data,response_2.data]);
              // console.log([response.data,response_2.data])
            return [response.data,response_2.data]
             
                } else {
            throw new Error('Error fetching data');
          }
        } catch (error) {
          console.error(error);
        }


      };
      const getResolvedTickets= async (range,date_1,date_2) => {
        var date='';
        if(range==false){
             date=`/resolved?date=${date_1}`;
        }else{
             date=`/resolved?startDate=${date_1}&endDate=${date_2}`
        }
        try {
          const response = await axios.get(BASE_URL+date, {
            headers: {
                          'Content-Type': 'application/json'
            }
          });
          var date_d=`/resolved?date=${getPrevious(date_1)}`;
       
          const response_2 = await axios.get(BASE_URL+date_d, {
            headers: {
                          'Content-Type': 'application/json'
            }
          });
          if (response.status === 200) {
         
            setResolved([response.data,response_2.data]);
              // console.log([response.data,response_2.data])
            return [response.data,response_2.data]
             
                } else {
            throw new Error('Error fetching data');
          }
        } catch (error) {
          console.error(error);
        }


      };
      const getOpenTickets= async (range,date_1,date_2) => {
        var date='';
        if(range==false){
             date=`/open?date=${date_1}`;
        }else{
           date=`/open?startDate=${date_1}&endDate=${date_2}`
        }
        try {
          const response = await axios.get(BASE_URL+date, {
            headers: {
                          'Content-Type': 'application/json'
            }
          });
          var date_d=`/open?date=${getPrevious(date_1)}`;
     
          const response_2 = await axios.get(BASE_URL+date_d, {
            headers: {
                          'Content-Type': 'application/json'
            }
          });
          if (response.status === 200) {
         
            setOpenTickets([response.data,response_2.data]);
              // console.log([response.data,response_2.data])
            return [response.data,response_2.data]
             
                } else {
            throw new Error('Error fetching data');
          }
        } catch (error) {
          console.error(error);
        }


      };
      

      const getResponseRate= async (range,date_1,date_2) => {
        var date='';
        if(range==false){
             date=`/responseRate?date=${date_1}`;
        }else{
             date=`/responseRate?startDate=${date_1}&endDate=${date_2}`
        }
        try {
          const response = await axios.get(BASE_URL+date, {
            headers: {
                          'Content-Type': 'application/json'
            }
          });
          // var date_d=`/responseRate?date=${getPrevious(date_1)}`;
 
          // const response_2 = await axios.get(BASE_URL+date_d, {
          //   headers: {
          //                 'Content-Type': 'application/json'
          //   }
          // });
// console.log(response.data);
// console.log(date);
          if (response.status === 200) {
            var v1=0;
            var seconds = 0;
var minutes = 0;
var remainingSeconds = 0
var hours =0;
var remainingMinutes=0
           
        if(response.data=='' || response.data==0){
           v1=0
        }else{

          
v1=response.data;
     
        }
        seconds = Math.floor(v1 / 1000);
 minutes = Math.floor(seconds / 60);
 remainingSeconds = seconds % 60;
 hours = Math.floor(minutes / 60);
 remainingMinutes = minutes % 60;
       setResponseRate([(hours + " hours, " + remainingMinutes + " minutes, " + remainingSeconds + " seconds"),null])
      //  console.log([v1,v2])
      //  return [v1,null]
           
            // setOpenTickets(response.data);
       
                } else {
            throw new Error('Error fetching data');
          }
        } catch (error) {
          console.error(error);
        }
      };
    const [parentWidth, setParentWidth] = useState(0);
    const parentRef = useRef(null);
  
    const handleResize = () => {
      if (parentRef.current) {
        setParentWidth(parentRef.current.offsetWidth);
      }
    //   console.log(parentRef.current.offsetWidth)
    };



  const getPrevious=(date)=>{
 var inputDate = new Date(date);

        // Subtract one day
        inputDate.setDate(inputDate.getDate() - 1);
        
        // Format the date as an ISO string
        var reducedDate = inputDate.toISOString().split('T')[0];
        return reducedDate;
  }
    useEffect(() => {
       
        getTotalTickets(false,openTicketsDate[0],null);
      
        getResolvedTickets(false,openTicketsDate[0],null);
      
        getOpenTickets(false,openTicketsDate[0],null);
      
        getResponseRate(false,openTicketsDate[0],null);
      
      handleResize(); // Initial width
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);


    
  const [resolvedModal,setResolvedModal]= useState(false);
    const [ticketModal, setTicketModal] = useState(false);
    const [openTicketModal, setOpenTicketModal] = useState(false);
    const [responseRateModal, setResponseRateModal] = useState(false);


    const [isChecked1, setIsChecked1] = useState(true);

    const handleCheckboxChange1 = (event) => {
      setIsChecked1(event.target.checked);
    };
    const [isChecked2, setIsChecked2] = useState(false);

const handleCheckboxChange2 = (event) => {
  setIsChecked2(event.target.checked);
};
const [isChecked3, setIsChecked3] = useState(false);

const handleCheckboxChange3 = (event) => {
  setIsChecked3(event.target.checked);
};

const [isChecked4, setIsChecked4] = useState(false);

const handleCheckboxChange4 = (event) => {
  setIsChecked4(event.target.checked);
};
    return(<div
    style={{display:'flex',background:'#f8f8f8',width:'100%',justifyContent:'center',flexDirection:'row',position:'relative',paddingTop:10}}
    >    
   {/* <div  style={{width:'100%',height:'100vh',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',zIndex:1000,position:'absolute',left:0,top:0, backgroundColor: 'rgba(255, 255, 255, 0.)', backdropFilter:' blur(5px)',border:'1px solid #00BCD4'}}>
  <DateRangePicker/>
</div> */}
        <div  ref={parentRef} style={{width:'100%',maxWidth:1600,background:'white',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
<div  style={{width:parentWidth*0.25,height:parentWidth*0.33,minHeight:200,minWidth:180,maxWidth:400,maxHeight:300,margin:0,padding:3}}>
    <div className="card" style={{height:'100%',boxShadow:"0 2px 5px 0 rgba(0,0,0,.16), 0 2px 5px 0 rgba(0,0,0,.23)",width:'100%',display:'flex',flexDirection:'column',position:'relative'}}>
        <div style={{display:'flex',flexDirection:'row',width:'100',justifyContent:'space-between',padding:5,paddingBottom:0}}>
            <strong style={{color:'black',fontSize:13}}>Ticket Received</strong>
       
           
       
        </div>
        <div style={{display:'flex',flexDirection:'row',width:'100',justifyContent:'flex-end',padding:5,paddingTop:0,paddingRight:10,userSelect:'none',cursor:'pointer'}}>
    
            <small onClick={()=>{
              setTicketModal(!ticketModal)
            }} style={{float:'right',fontSize:12,color:'#1565C0'}}>
              { new Date(ticketsDate[0]).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} {ticketsDate[0]!=ticketsDate[1] && isChecked1==true && <span>- { new Date(ticketsDate[1]).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>}
             </small>
       
        </div>

        <div style={{flex:1,width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
       
              <strong style={{color:'grey',fontSize:11}}>
          
            Tickets</strong>
        <h1 style={{color:'#0DB9DB',fontSize:48}}>{tickets[0]}</h1>
     <strong style={{color: 'grey',fontSize:24,fontWeight:'normal'}}>
      
      
      
      {(tickets[0]-tickets[1])<0 ?  <ArrowDropDownIcon sx={{ fontSize: 40,color: 'red'}} />  : <ArrowDropUpIcon sx={{ fontSize: 40,color: '#00CFBB'}} /> }
     
     {tickets[1]!=0 ? (((tickets[0]-tickets[1])/tickets[1])*100).toFixed(2) : tickets[0]>tickets[1] ?100 :0}%
     
     
     </strong>
        </div>
        {ticketModal && <div style={{position:'absolute',left:0,top:0,background:'rgba(0,0,0,0.5)',width:'100%',height:'100%'}}></div>}
       
       {ticketModal && <div style={{background:'white',minHeight:100,borderTop:'1px solid gray',bottom:0,left:0,width:'100%',position:'absolute',padding:10}}>
<div style={{width:'100%',display:'flex',flexDirection:'row',zoom:0.75,flexWrap:'wrap'}}>
        <div className="form-group" style={{flex:1,minWidth:120}}>

<div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
 <label style={{margin:0}} htmlFor="c1" className="required">{ isChecked1 ?'From' :'Select Date'}

 </label>
 
 <label style={{margin:0}} htmlFor="c11" >
 <input
          type="checkbox"
          id="c11"
          checked={isChecked1}
          onChange={handleCheckboxChange1}
        />Range
 </label>
 
  </div>

 
  <input
    required
    type="date"
    value={ticketsDate[0]}
    onChange={(e) => {
      setTicketsDate([e.target.value,ticketsDate[1]])

      if(isChecked1==false){
        setTicketsDate([e.target.value,e.target.value])
      }
       }}
    className="form-control"
    id="dob"
    placeholder="Enter your date of birth"
  />
</div>
{isChecked1 &&<div style={{width:'20px'}}></div>}
{isChecked1 &&<div className="form-group" style={{flex:1,minWidth:120}}>
 <label style={{margin:0}} htmlFor="dob" className="required">To</label>
  <input
    required
    type="date"
    value={ticketsDate[1]}
    onChange={(e) => {
      setTicketsDate([ticketsDate[0],e.target.value])
       
    }}
    className="form-control"
    id="dob"
    placeholder="Enter your date of birth"
  />
</div>}

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
  getTotalTickets(isChecked1,ticketsDate[0],ticketsDate[1]);
  setTicketModal(false)
}}
 >Filter</button>
</div>
  

        </div>}
    </div>

</div>
{/* //////////////////////////////////////// */}
<div  style={{width:parentWidth*0.25,height:parentWidth*0.33,minHeight:200,minWidth:180,maxWidth:400,maxHeight:300,margin:0,padding:3}}>
<div className="card" style={{height:'100%',boxShadow:"0 2px 5px 0 rgba(0,0,0,.16), 0 2px 5px 0 rgba(0,0,0,.23)",width:'100%',display:'flex',flexDirection:'column',position:'relative'}}>
       <div style={{display:'flex',flexDirection:'row',width:'100',justifyContent:'space-between',padding:5}}>
            <strong style={{color:'black',fontSize:12}}>Tickets Resolved</strong>
            {/* <small style={{color:'grey',fontSize:12}}>Jul 2019</small> */}
            
        </div>
        <div style={{display:'flex',flexDirection:'row',width:'100',justifyContent:'flex-end',padding:5,paddingTop:0,paddingRight:10,userSelect:'none',cursor:'pointer'}}>
    
    <small onClick={()=>{
      setResolvedModal(!resolvedModal)
    }} style={{float:'right',fontSize:12,color:'#1565C0'}}>
      { new Date(resolvedTicketsDate[0]).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} {resolvedTicketsDate[0]!=resolvedTicketsDate[1] && isChecked2==true && <span>- { new Date(resolvedTicketsDate[1]).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>}
     </small>

</div>

        <div style={{flex:1,width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <strong style={{color:'grey',fontSize:11}}>Tickets</strong>
        <h1 style={{color:'#00CFBB',fontSize:48}}>{resolved[0]}</h1>
     <strong style={{color: 'grey',fontSize:24,fontWeight:'normal'}}>
      
     {(resolved[0]-resolved[1])<0 ?  <ArrowDropDownIcon sx={{ fontSize: 40,color: 'red'}} />  : <ArrowDropUpIcon sx={{ fontSize: 40,color: '#00CFBB'}} /> }

     {resolved[1]!=0 ? (((resolved[0]-resolved[1])/resolved[1])*100).toFixed(2) : resolved[0]>resolved[1] ?100 :0}%
       
       </strong>
        </div>
        {resolvedModal && <div style={{position:'absolute',left:0,top:0,background:'rgba(0,0,0,0.5)',width:'100%',height:'100%'}}></div>}
       
        {resolvedModal && <div style={{background:'white',minHeight:100,borderTop:'1px solid gray',bottom:0,left:0,width:'100%',position:'absolute',padding:10}}>
<div style={{width:'100%',display:'flex',flexDirection:'row',zoom:0.75,flexWrap:'wrap'}}>
        <div className="form-group" style={{flex:1,minWidth:120}}>
        <div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
 <label style={{margin:0}} htmlFor="c2" className="required">{ isChecked2 ?'From' :'Select Date'}

 </label>
 
 <label style={{margin:0}} htmlFor="c22" >
 <input
          type="checkbox"
          id="c22"
          checked={isChecked2}
          onChange={handleCheckboxChange2}
        />Range
 </label>
 
  </div>
  <input
    required
    type="date"
    value={resolvedTicketsDate[0]}
    onChange={(e) => {
      setResolvedTicketDate([e.target.value,resolvedTicketsDate[1]])
      if(isChecked2==false){
        setResolvedTicketDate([e.target.value,e.target.value])
      }
       }}
    className="form-control"
    id="dob"
    placeholder="Enter your date of birth"
  />
</div>
{isChecked2 && <div style={{width:'20px'}}></div>}
{isChecked2 && <div className="form-group" style={{flex:1,minWidth:120}}>
 <label style={{margin:0}} htmlFor="dob" className="required">To</label>
  <input
    required
    type="date"
    value={resolvedTicketsDate[1]}
    onChange={(e) => {
      setResolvedTicketDate([resolvedTicketsDate[0],e.target.value])
       
    }}
    className="form-control"
    id="dob"
    placeholder="Enter your date of birth"
  />
</div>}

</div>
<div style={{width:'100%',display:'flex',flexDirection:'row',zoom:0.75,flexWrap:'wrap',justifyContent:'space-between'}}>
  <button
   
    className='btn btn-outline-danger'
 style={{flex:1,margin:3}}
onClick={()=>{

  setResolvedModal(false)
}}
  >Close</button>
    <button
   
   className='btn btn-primary '
style={{flex:1,margin:3}}
onClick={()=>{
  getResolvedTickets(isChecked2,resolvedTicketsDate[0],resolvedTicketsDate[1]);
setResolvedModal(false)
}}
 >Filter</button>
</div>
  


        </div>}
    </div>

</div>
{/* //////////////////////////////////////// */}
<div  style={{width:parentWidth*0.25,height:parentWidth*0.33,minHeight:200,minWidth:180,maxWidth:400,maxHeight:300,margin:0,padding:3}}>
<div className="card" style={{height:'100%',boxShadow:"0 2px 5px 0 rgba(0,0,0,.16), 0 2px 5px 0 rgba(0,0,0,.23)",width:'100%',display:'flex',flexDirection:'column',position:'relative'}}>
     <div style={{display:'flex',flexDirection:'row',width:'100',justifyContent:'space-between',padding:5}}>
            <strong style={{color:'black',fontSize:12}}>Tickets Open</strong>
            {/* <small style={{color:'grey',fontSize:12}}>Jul 2019</small> */}
            
        </div>
        <div style={{display:'flex',flexDirection:'row',width:'100',justifyContent:'flex-end',padding:5,paddingTop:0,paddingRight:10,userSelect:'none',cursor:'pointer'}}>
    
    <small onClick={()=>{
      setOpenTicketModal(!openTicketModal)
    }} style={{float:'right',fontSize:12,color:'#1565C0'}}>
      { new Date(openTicketsDate[0]).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} {openTicketsDate[0]!=openTicketsDate[1] && isChecked3==true && <span>- { new Date(openTicketsDate[1]).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>}
     </small>

</div>
        <div style={{flex:1,width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <strong style={{color:'grey',fontSize:11}}>Tickets</strong>
        <h1 style={{color:'#FF646F',fontSize:48}}>{opentikets[0]}</h1>
     <strong style={{color: 'grey',fontSize:24,fontWeight:'normal'}}>
      
  
      {(opentikets[0]-opentikets[1])<0 ?  <ArrowDropDownIcon sx={{ fontSize: 40,color: 'red'}} />  : <ArrowDropUpIcon sx={{ fontSize: 40,color: '#00CFBB'}} /> }
 
      {opentikets[1]!=0 ? (((opentikets[0]-opentikets[1])/opentikets[1])*100).toFixed(2) : opentikets[0]>opentikets[1] ?100 :0}%
     
      
      </strong>
        </div>
        {openTicketModal && <div style={{position:'absolute',left:0,top:0,background:'rgba(0,0,0,0.5)',width:'100%',height:'100%'}}></div>}
       
        {openTicketModal && <div style={{background:'white',minHeight:100,borderTop:'1px solid gray',bottom:0,left:0,width:'100%',position:'absolute',padding:10}}>
        {/* <div onClick={()=>{setOpenTicketModal(false)}} style={{position:'absolute',width:50,height:50,top:0,right:0,textAlign:'right'}}>
<CloseIcon  style={{color:'white'}} />sdsdssd
    </div> */}

<div style={{width:'100%',display:'flex',flexDirection:'row',zoom:0.75,flexWrap:'wrap'}}>
        <div className="form-group" style={{flex:1,minWidth:120}}>
        <div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
 <label style={{margin:0}} htmlFor="c3" className="required">{ isChecked3 ?'From' :'Select Date'}

 </label>
 
 <label style={{margin:0}} htmlFor="c33" >
 <input
          type="checkbox"
          id="c33"
          checked={isChecked3}
          onChange={handleCheckboxChange3}
        />Range
 </label>
 
  </div>
  <input
    required
    type="date"
    value={openTicketsDate[0]}
    onChange={(e) => {
      setOpenTicketsDate([e.target.value,openTicketsDate[1]])
      if(isChecked3==false){
        setOpenTicketsDate([e.target.value,e.target.value])
      }
       }}
    className="form-control"
    id="dob"
    placeholder="Enter your date of birth"
  />
</div>
{isChecked3 &&  <div style={{width:'20px'}}></div>}
{isChecked3 && <div className="form-group" style={{flex:1,minWidth:120}}>
 <label style={{margin:0}} htmlFor="dob" className="required">To</label>
  <input
    required
    type="date"
    value={openTicketsDate[1]}
    onChange={(e) => {
      setOpenTicketsDate([openTicketsDate[0],e.target.value])
       
    }}
    className="form-control"
    id="dob"
    placeholder="Enter your date of birth"
  />
</div>}</div>

<div style={{width:'100%',display:'flex',flexDirection:'row',zoom:0.75,flexWrap:'wrap',justifyContent:'space-between'}}>
  <button
   
    className='btn btn-outline-danger'
 style={{flex:1,margin:3}}
onClick={()=>{

setOpenTicketModal(false)
}}
  >Close</button>
    <button
   
   className='btn btn-primary '
style={{flex:1,margin:3}}
onClick={()=>{
 getOpenTickets(isChecked3,openTicketsDate[0],openTicketsDate[1]);
setOpenTicketModal(false)
}}
 >Filter</button>
</div>
        </div>}
    </div>

</div>
{/* //////////////////////////////////////// */}

<div  style={{width:parentWidth*0.25,height:parentWidth*0.33,minHeight:200,minWidth:180,maxWidth:400,maxHeight:300,margin:0,padding:3}}>
<div className="card" style={{height:'100%',boxShadow:"0 2px 5px 0 rgba(0,0,0,.16), 0 2px 5px 0 rgba(0,0,0,.23)",width:'100%',display:'flex',flexDirection:'column',position:'relative'}}>
       <div style={{display:'flex',flexDirection:'row',width:'100',justifyContent:'space-between',padding:5}}>
            <strong style={{color:'black',fontSize:12}}>Response rate</strong>
            {/* <small style={{color:'grey',fontSize:12}}>Jul 2019</small> */}
            
        </div>
        <div style={{display:'flex',flexDirection:'row',width:'100',justifyContent:'flex-end',padding:5,paddingTop:0,paddingRight:10,userSelect:'none',cursor:'pointer'}}>
    
    <small onClick={()=>{
      setResponseRateModal(!responseRateModal)
    }} style={{float:'right',fontSize:12,color:'#1565C0'}}>
      { new Date(responseRateTicketsDate[0]).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}{responseRateTicketsDate[0]!=responseRateTicketsDate[1] && isChecked4==true && <span> - { new Date(responseRateTicketsDate[1]).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>}
     </small>

</div>

        <div style={{flex:1,width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <strong style={{color:'grey',fontSize:11}}>Total time</strong>
  
        <h1 style={{color:'#00CFBB',fontSize:22}}>{responseRate[0].split(', ')[0]}</h1>
        <h1 style={{color:'#00CFBB',fontSize:22}}>{responseRate[0].split(', ')[1]}</h1>
        <h1 style={{color:'#00CFBB',fontSize:22}}>{responseRate[0].split(', ')[2]}</h1>
     {/* <strong style={{color: 'grey',fontSize:24,fontWeight:'normal'}}>
      
     {(responseRate[0]-responseRate[1])<0 ?  <ArrowDropDownIcon sx={{ fontSize: 40,color: 'red'}} />  : <ArrowDropUpIcon sx={{ fontSize: 40,color: '#00CFBB'}} /> }
     
       {(responseRate[0]-responseRate[1])/100}%</strong> */}
        </div>
        {responseRateModal && <div style={{position:'absolute',left:0,top:0,background:'rgba(0,0,0,0.5)',width:'100%',height:'100%'}}></div>}
        {responseRateModal && <div style={{background:'white',minHeight:100,borderTop:'1px solid gray',bottom:0,left:0,width:'100%',position:'absolute',padding:10}}>
<div style={{width:'100%',display:'flex',flexDirection:'row',zoom:0.75,flexWrap:'wrap'}}>
        <div className="form-group" style={{flex:1,minWidth:120}}>
        <div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
 <label style={{margin:0}} htmlFor="c4" className="required">{ isChecked4 ?'From' :'Select Date'}

 </label>
 
 <label style={{margin:0}} htmlFor="c44" >
 <input
          type="checkbox"
          id="c44"
          checked={isChecked4}
          onChange={handleCheckboxChange4}
        />Range
 </label>
 
  </div>
  <input
    required
    type="date"
    value={responseRateTicketsDate[0]}
    onChange={(e) => {
      setResponseRateTicketDate([e.target.value,responseRateTicketsDate[1]])
      if(isChecked4==false){
        setResponseRateTicketDate([e.target.value,e.target.value])
  
      }
 }}
    className="form-control"
    id="dob"
    placeholder="Enter your date of birth"
  />
</div>
{ isChecked4  && <div style={{width:'20px'}}></div>}
{ isChecked4 && <div className="form-group" style={{flex:1,minWidth:120}}>
 <label style={{margin:0}} htmlFor="dob" className="required">To</label>
  <input
    required
    type="date"
    value={responseRateTicketsDate[1]}
    onChange={(e) => {
      setResponseRateTicketDate([responseRateTicketsDate[0],e.target.value])
       
    }}
    className="form-control"
    id="dob"
    placeholder="Enter your date of birth"
  />
</div>}</div>
<div style={{width:'100%',display:'flex',flexDirection:'row',zoom:0.75,flexWrap:'wrap',justifyContent:'space-between'}}>
  <button
   
    className='btn btn-outline-danger'
 style={{flex:1,margin:3}}
onClick={()=>{

  setResponseRateModal(false)
}}
  >Close</button>
    <button
   
   className='btn btn-primary '
style={{flex:1,margin:3}}
onClick={()=>{
  getResponseRate(isChecked4,responseRateTicketsDate[0],responseRateTicketsDate[1]);
setResponseRateModal(false)
}}
 >Filter</button>
</div>
  


        </div>}
    </div>

</div>
<div style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
<div  style={{width:parentWidth*0.66,minHeight:200,flex:1,minWidth:360,margin:0,padding:3}}>
<div className="card" style={{height:'100%',boxShadow:"0 2px 5px 0 rgba(0,0,0,.16), 0 2px 5px 0 rgba(0,0,0,.23)",width:'100%',display:'flex',flexDirection:'column',position:'relative'}}>
<div style={{display:'flex',flexDirection:'row',width:'100',justifyContent:'space-between',padding:5}}>
            <strong style={{color:'black',fontSize:12}}>Ticket Trends for Received, Resolved and Open</strong>
   
            
        </div>

<StackColumnChart/>
 
    </div>

</div>


{/* <div  style={{width:parentWidth*0.33,height:'auto',minHeight:200,minWidth:180,maxWidth:400,maxHeight:300,margin:0,padding:3}}>
<div className="card" style={{height:'100%',boxShadow:"0 2px 5px 0 rgba(0,0,0,.16), 0 2px 5px 0 rgba(0,0,0,.23)",width:'100%',display:'flex',flexDirection:'column',position:'relative',justifyItems:'center'}}>
    <div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between',padding:5}}>
            <strong style={{color:'black',fontSize:12}}>Customer satisfaction</strong>
            <small style={{color:'grey',fontSize:12}}>Jul 2019</small>
            
        </div>
        {/* <div style={{display:'flex',flexDirection:'row',width:'100%',flexWrap:'wrap',justifyContent:'space-between',padding:5}}>
            <div style={{color:'black',fontSize:12,display:'flex',flexDirection:'row',alignItems:'center'}}> <div style={{width:10,height:10,background:'rgba(255, 99, 132, 1)',borderRadius:5,margin:2}}></div>Positive</div>
            <div style={{color:'black',fontSize:12,display:'flex',flexDirection:'row',alignItems:'center'}}> <div style={{width:10,height:10,background:'rgba(54, 162, 235, 1)',borderRadius:5,margin:2}}></div>Neutral</div>
            <div style={{color:'black',fontSize:12,display:'flex',flexDirection:'row',alignItems:'center'}}> <div style={{width:10,height:10,background:'rgba(255, 206, 86, 1)',borderRadius:5,margin:2}}></div>Negative</div>
          
        </div> 
        <DonutChart/>
        
        </div>

</div> */}
<div  style={{width:parentWidth*0.66,minHeight:200,flex:1,minWidth:360,margin:0,padding:3}}>
<div className="card" style={{height:'100%',boxShadow:"0 2px 5px 0 rgba(0,0,0,.16), 0 2px 5px 0 rgba(0,0,0,.23)",width:'100%',display:'flex',flexDirection:'column',position:'relative'}}>
<div style={{display:'flex',flexDirection:'row',width:'100',justifyContent:'space-between',padding:5}}>
            <strong style={{color:'black',fontSize:12}}>Source counts</strong>
            {/* <small style={{color:'grey',fontSize:12}}>Jul 2019</small> */}
            
        </div>

        <HorizontalBar/>
    </div>

</div> </div>
{/* //////////////////////////////////////// */}
{/* <div  style={{width:'33%',height:parentWidth*0.33,minHeight:200,minWidth:180,maxWidth:400,maxHeight:300,margin:0,padding:3}}>
    <div className="card" style={{height:'100%',width:'100%',display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',flexDirection:'row',width:'100',justifyContent:'space-between',padding:5}}>
            <strong style={{color:'black',fontSize:12}}>Customer Responses</strong>
            <small style={{color:'grey',fontSize:12}}>Jul 2019</small>
            
        </div>

        <div style={{flex:1,width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <strong style={{color:'grey',fontSize:11}}>Across Helpdesk</strong>
        <h1 style={{color:'#00CFBB',fontSize:48}}>235</h1>
     <strong style={{color: 'grey',fontSize:24,fontWeight:'normal'}}><ArrowDropDownIcon sx={{ fontSize: 40,color: '#00CFBB'}} />53%</strong>
        </div>
    </div>

</div> */}
<div  style={{width:parentWidth*0.66,minHeight:200,flex:1,minWidth:360,margin:0,padding:3}}>
<div className="card" style={{height:'100%',boxShadow:"0 2px 5px 0 rgba(0,0,0,.16), 0 2px 5px 0 rgba(0,0,0,.23)",width:'100%',display:'flex',flexDirection:'column',position:'relative'}}>
<div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between',padding:5}}>
            <strong style={{color:'black',fontSize:12}}>Daily ticket volume by time of the day</strong>
            {/* <small style={{color:'grey',fontSize:12}}>Jul 2019</small> */}
            
        </div>
    <HeatMap  />
    </div>

</div>
<div  style={{width:parentWidth*0.66,minHeight:200,flex:1,minWidth:360,margin:0,padding:3}}>
<div className="card" style={{height:'100%',boxShadow:"0 2px 5px 0 rgba(0,0,0,.16), 0 2px 5px 0 rgba(0,0,0,.23)",width:'100%',display:'flex',flexDirection:'column',position:'relative'}}>

<div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between',padding:5}}>
            <strong style={{color:'black',fontSize:12}}>Ticket volume trend per day</strong>
            {/* <small style={{color:'grey',fontSize:12}}>Jul 2019</small> */}
            
        </div>
    <LineChart  />
    </div>

</div>

<div style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
<div  style={{width:parentWidth*0.33,minHeight:200,flex:1,minWidth:300,margin:0,padding:3}}><div>
<div className="card" style={{height:'100%',boxShadow:"0 2px 5px 0 rgba(0,0,0,.16), 0 2px 5px 0 rgba(0,0,0,.23)",width:'100%',display:'flex',flexDirection:'column',position:'relative'}}>
     <div style={{display:'flex',flexDirection:'row',width:'100',justifyContent:'space-between',padding:5}}>
            <strong style={{color:'black',fontSize:12}}>Most resolved tickets per member</strong>
            {/* <small style={{color:'grey',fontSize:12}}>Jul 2019</small> */}
         
        </div>
        <div style={{width:'100%',padding:10}}>
          <MemberResolved/>
         
          </div>
          </div>
        
        </div>

</div>
<div  style={{width:parentWidth*0.33,minHeight:200,flex:1,minWidth:300,margin:0,padding:3}}><div>
<div className="card" style={{height:'100%',boxShadow:"0 2px 5px 0 rgba(0,0,0,.16), 0 2px 5px 0 rgba(0,0,0,.23)",width:'100%',display:'flex',flexDirection:'column',position:'relative'}}>
     <div style={{display:'flex',flexDirection:'row',width:'100',justifyContent:'space-between',padding:5}}>
     <strong style={{color:'black',fontSize:12}}>Most Open tickets per member</strong>
            {/* <small style={{color:'grey',fontSize:12}}>Jul 2019</small> */}
         
        </div>
        <div style={{width:'100%',padding:10}}>
          <MemberOpen/>
         
          </div>
          </div>
        
        </div>

</div></div>
{/*
<div  style={{width:'33%',height:300,minWidth:180,margin:0,padding:3}}>
    <div className="card" style={{height:'100%',width:'100%'}}></div>

</div>
<div  style={{width:'33%',height:300,minWidth:180,margin:0,padding:3}}>
    <div className="card" style={{height:'100%',width:'100%'}}></div>

</div>
<div  style={{width:'33%',height:300,minWidth:180,margin:0,padding:3}}>
    <div className="card" style={{height:'100%',width:'100%'}}></div>

</div> */}
        </div>

    </div>)
}

export default Dashboard