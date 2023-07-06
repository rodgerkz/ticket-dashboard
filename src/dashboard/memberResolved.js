/* eslint eqeqeq: 0 */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const BASE_URL = process.env.REACT_APP_API_URL;
 const TicketBySource = () => {
  
  const [tickets, setTickets] = useState([])

  const [ticketsDate, setTicketsDate] = useState([(new Date().toISOString().split('T')[0].split('-')[0])+'-01-01', new Date().toISOString().split('T')[0]])
  const getTotalTickets= async (range,date_1,date_2) => {
var date='';
    if(range==false){
         date=`/mostResolvedTicketsByMembers?date=${date_1}`;
    }else{
         date=`/mostResolvedTicketsByMembers?startDate=${date_1}&endDate=${date_2}`
    }
    // console.log(date)
    try {
      const response = await axios.get(BASE_URL+date, {
        headers: {
                      'Content-Type': 'application/json'
        }
      });
    

      if (response.status === 200) {

        setTickets(response.data.data);

         
            } else {
        throw new Error('Error fetching data');
      }
    } catch (error) {
      console.error(error);
    }


  };
  useEffect(() => {
   
   
    getTotalTickets(true,(new Date().toISOString().split('T')[0].split('-')[0])+'-01-01',ticketsDate[1]);
 
}, []);

const [ticketModal, setTicketModal] = useState(false);


const [isChecked1, setIsChecked1] = useState(true);

const handleCheckboxChange1 = (event) => {
  setIsChecked1(event.target.checked);
};

  return (
    <div style={{minHeight:250}}> 
      {/* <div className="mt-1 mb-2 lg:m-3 flex lg:p-2 bg-white w-8/12 lg:ml-auto">
      

        <input type='date' 
          className="text-lg font-bold mx-2 px-4 py-1 border-2 border-sky-400 bg-white max-h-10 focus:border-blue-600 focus:ring-blue-600 rounded-md"
          value={date}
          id='date'
          onChange={getDateParam}
        />
          
      </div> */}
      <div style={{display:'flex',flexDirection:'row',width:'100',justifyContent:'flex-end',padding:5,paddingTop:0,paddingRight:10,userSelect:'none',cursor:'pointer'}}>
    
            <small onClick={()=>{
              setTicketModal(!ticketModal)
            }} style={{float:'right',fontSize:12,color:'#1565C0'}}>
              { new Date(ticketsDate[0]).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}{ticketsDate[0]!=ticketsDate[1] && isChecked1==true && <span> - { new Date(ticketsDate[1]).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>}
             </small>
       
        </div>
        <table style={{width:'100%',fontSize:12}}  className="table table-striped table-sm table-hover">
        <thead><tr>
                <th>Solver Name</th>
                <th>Resolved Ticket</th>
              </tr></thead>   
              <tbody>
            
           
      {tickets.map((mem,i)=>{
            return <tr key={i}>
                <td>{mem.solver_name}</td>
                <td>{mem.count}</td>
              </tr>
        })}

              </tbody>
  
        
            </table> 
      {ticketModal && <div style={{position:'absolute',left:0,top:0,background:'rgba(0,0,0,0.5)',width:'100%',height:'100%'}}></div>}
      {ticketModal && <div style={{background:'white',minHeight:100,borderTop:'1px solid gray',bottom:0,left:0,width:'100%',position:'absolute',padding:10}}>
<div style={{width:'100%',display:'flex',flexDirection:'row',zoom:0.75,flexWrap:'wrap'}}>
        <div className="form-group" style={{flex:1,minWidth:120}}>

<div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
 <label style={{margin:0}} htmlFor="c1" className="required">{ isChecked1 ?'From' :'Select Date'}

 </label>
 
 <label style={{margin:0}} htmlFor="c55" >
 <input
          type="checkbox"
          id="c55"
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
  );
}
export default TicketBySource
