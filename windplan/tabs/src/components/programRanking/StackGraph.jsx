import React from "react";
import Plot from 'react-plotly.js';
// import { useFind } from 'react-pouchdb';

export function StackGraph() {

  // const programs = useFind({
  //   selector: {},
  // });
  // var data=[]
  var months=["january","february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
  var hours=[];
  // for (var i = 0; i < 12; i++) hours[i] = 0;


  // //Custos
  // programs.forEach((program, i) =>{

  //   var costs=[];
  //   var k=0;
    
  //   while (k<12)
  //   {
  //     costs[k]=Math.ceil(Math.random()*10)
  //     hours[k]=hours[k]+costs[k]
  //     k++;
  //   }

  //   data[i]={
  //     x: months,
  //     y: costs,
  //     name: program["name"],
  //     type: "bar"
  //   }
   
  // });

  // //horas 
  // var k=0;
  // while (k<12)
  // {
  //   hours[k]=hours[k]*(1+Math.random()/5)
  //   k++;
  // }

  let data=[
  {
    x: months,
    y: hours,
    name: "hours",
    type: "scatter"
  }]
 
  
  return(
  <Plot
        data={data}
        layout={{height:400, barmode:'stack', title: 'Program Costs'}}
      />
  )
}
