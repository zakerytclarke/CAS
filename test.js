var CAS=require("./index.js");

var tests=[
  [["=","y","x"],["=","y","x"]],
  [["=",["*",2,"y"],"x"],["=","y",["/","x",2]]],
  [["=",2,"y"],["=","y",2]],
];


for(var i=0;i<tests.length;i++){
  var result=CAS.solve("y",tests[i][0]);
  var status=compare(tests[i][1],result);
  console.log("Test "+i,"Status: ",status);
  if(status==false){
    console.log("","Input: "+tests[i][0]);
    console.log("","Output: "+result);
    console.log("","Expected: "+tests[i][1]);

  }
}


function compare(eq1,eq2){
  return JSON.stringify(eq1)==JSON.stringify(eq2);
}
