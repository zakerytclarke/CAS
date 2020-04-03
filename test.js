var CAS=require("./index.js");

var tests=[
  //Test Solver
  {input:["=","y","x"],output:["=","y","x"],function:"solve"},
  {input:["=",["*",2,"y"],"x"],output:["=","y",["/","x",2]],function:"solve"},
  {input:["=",2,"y"],output:["=","y",2],function:"solve"},
  {input:["=",["^","y",2],"x"],output:["=","y",["^","x",0.5]],function:"solve"},
  {input:["=",["^","y",0.5],"x"],output:["=","y",["^","x",2]],function:"solve"},
  {input:["=","y",["+","x","x"]],output:["=","y",["*","x",2]],function:"solve"},
  {input:["=","y",["*","x","x"]],output:["=","y",["^","x",2]],function:"solve"},
  {input:["=",["+","y","x"],1],output:["=","y",["-",1,"x"]],function:"solve"},
  {input:["=",["-","y","x"],1],output:["=","y",["+",1,"x"]],function:"solve"},
  {input:["=",["*","x","y"],1],output:["=","y",["/",1,"x"]],function:"solve"},
  {input:["=",["/","x","y"],1],output:["=","y","x"],function:"solve"},
  {input:["=","y",["/",["^","x",2],["^","x",2]]],output:["=","y",1],function:"solve"},
  {input:["=",["^",["+","y",1],0.5],["^",["+","x",17],2]],output:["=","y",["-",["^",["+","x",17],4],1]],function:"solve"},
  {input:["=",["+","y",1],"x"],output:["=","y",["-","x",1]],function:"solve"},
  {input:["=",1,["^","x","y"]],output:["=","y",["/",["ln","1"],["ln","x"]]],function:"solve"},
  //{input:,output:,function:"solve"},
  //Test Derivative
  {input:["=","y",1],output:["=","y",0],function:"derive"},
  {input:["=","y","x"],output:["=","y",1],function:"derive"},
  {input:["=","y",["*",2,"x"]],output:["=","y",2],function:"derive"},
  {input:["=","y",["^","x",2]],output:["=","y",["*",2,"x"]],function:"derive"},
  {input:["=","x",["*",0.5,"y"]],output:["=","y",2],function:"derive"},
  {input:["=","y",["+",2,"x"]],output:["=","y",1],function:"derive"},
  {input:["=","y",["+",["^","x",2],5]],output:["=","y",["*",2,"x"]],function:"derive"},
  //["=","y",["^","y",2],1]

  //Finding Critical Points
  {input:["=","y",["^","x",2]],output:["=","x",0],function:"criticalPts"},
  {input:["=","y",["+",["^","x",2],5]],output:["=","x",5],function:"criticalPts"},
];



for(var i=0;i<tests.length;i++){
  var test=tests[i].input.slice();
  if(tests[i].function=="solve"){
    var result=CAS.solve("y",test);
  }
  if(tests[i].function=="derive"){
    var result=CAS.derive("y","x",test);
  }
  if(tests[i].function=="criticalPts"){
    var result=CAS.findCriticalPts("y","x",test);
  }

  var status=compare(tests[i].output,result);
  console.log("Test "+i,"Status: ",status);
  if(status==false){
    console.log("  ","Input: "+JSON.stringify(tests[i].input));
    console.log("  ","Output: "+JSON.stringify(result));
    console.log("  ","Expected: "+JSON.stringify(tests[i].output));
  }

}


function compare(eq1,eq2){
  return JSON.stringify(eq1)==JSON.stringify(eq2);
}
