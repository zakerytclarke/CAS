var CAS=require("./index.js");

var tests=[
  [["=","y","x"],["=","y","x"]],
  [["=",["*",2,"y"],"x"],["=","y",["/","x",2]]],
  [["=",2,"y"],["=","y",2]],
  [["=",["^","y",2],"x"],["=","y",["^","x",0.5]]],
  [["=",["^","y",0.5],"x"],["=","y",["^","x",2]]],
  [["=","y",["+","x","x"]],["=","y",["*","x",2]]],
  [["=","y",["*","x","x"]],["=","y",["^","x",2]]],
  [["=",["+","y","x"],1],["=","y",["-",1,"x"]]],
  [["=",["-","y","x"],1],["=","y",["+",1,"x"]]],
  [["=",["*","x","y"],1],["=","y",["/",1,"x"]]],
  [["=",["/","x","y"],1],["=","y","x"]],
  [["=","y",["/",["^","x",2],["^","x",2]]],["=","y",1]],
  [["=",["^",["+","y",1],0.5],["^",["+","x",17],2]],[]],
  [["=",["+","y",1],"x"],["=","y",["-","x",1]]]

];



for(var i=0;i<tests.length;i++){
  var test=tests[i][0].slice();
  var result=CAS.solve("y",test);
  var status=compare(tests[i][1],result);
  console.log("Test "+i,"Status: ",status);
    console.log("  ","Input: "+JSON.stringify(tests[i][0]));
    console.log("  ","Output: "+JSON.stringify(result));
    console.log("  ","Expected: "+JSON.stringify(tests[i][1]));
    if(status==false){
  }
}


function compare(eq1,eq2){
  return JSON.stringify(eq1)==JSON.stringify(eq2);
}
