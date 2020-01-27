module.exports.solve=solve;

//Solve for a given variable in an equation
function solve(varName,equation){
  equation=simplify(equation);

  var side1=equation[1];
  var side2=equation[2];

  if(contains(side2,varName)){//Swap so variable is on left
    side1=equation[2];
    side2=equation[1];
  }

  if(side1==varName){//Base Case; Equation Solved
    return [equation[0],side1,side2];
  }

  var op=side1[0];
  var side11=side1[1];
  var side12=side1[2];
  if(contains(side11,varName)){//Variable is on the left side
    equation[1]=side11;
    if(op=="+"){
      equation[2]=["-",side2,side12];
    }
    if(op=="*"){
      equation[2]=["/",side2,side12];
    }
    if(op=="^"){
      equation[2]=["^",side2,["/",1,side12]];
    }

  }

  if(contains(side12,varName)){//Variable is on the right side
    equation[1]=side12;

    if(op=="+"){
      equation[2]=["-",side2,side11];
    }
    if(op=="*"){
      equation[2]=["/",side2,side11];
    }
    if(op=="^"){
      equation[2]=["^",side2,["/",1,side11]];
    }


  }

  return simplify(equation);
}

//Simplifies Expressions if possible
function simplify(equation){
  if(equation.constructor!==Array){
    return equation;
  }

  for(var i=0;i<equation.length;i++){//Try to simplify children nodes
    equation[i]=simplify(equation[i]);
  }






  var op=equation[0];
  var arg1=equation[1];
  var arg2=equation[2];


  //Simplifying at Top Level

  if(arg1.constructor===Number&&arg2.constructor===Number){//Simplify two numbers
    return apply(op,arg1,arg2);
  }

  if(arg1==arg2){//Simplify two of same variable
    if(op=="+"){
      return ["*",arg1,2];
    }
    if(op=="*"){
      return ["^",arg1,2];
    }

  }

  //Simplify with a variable one level below
  if(arg1.constructor===String){
    var tempVar=arg1;

    var lop=arg2[0];
    var larg1=arg2[1];
    var larg2=arg2[2];

    if(op=="+"){
      if(lop=="*"){
        if(larg1==tempVar&&larg2.constructor===Number){
          return ["*",tempVar,larg2+1];
        }

        if(larg2==tempVar&&larg1.constructor===Number){
          return ["*",tempVar,larg1+1];
        }
      }
    }

    if(op=="*"){
      if(lop=="*"){
        if(larg1==tempVar){
          return [lop,["^",tempVar,2],larg2];
        }

        if(larg2==tempVar){
          return [lop,["^",tempVar,2],larg1];
        }

      }


      if(lop=="^"){//Only in first variable
        if(larg1==tempVar){
          return [lop,tempVar,larg2+1];
        }

      }

    }

  }





  if(arg2.constructor===String){
    var tempVar=arg2;

    var lop=arg1[0];
    var larg1=arg1[1];
    var larg2=arg1[2];

    if(op=="+"){
      if(lop=="*"){
        if(larg1==tempVar&&larg2.constructor===Number){
          return ["*",tempVar,larg2+1];
        }

        if(larg2==tempVar&&larg1.constructor===Number){
          return ["*",tempVar,larg1+1];
        }
      }
    }

    if(op=="*"){
      if(lop=="*"){
        if(larg1==tempVar){
          return [lop,["^",tempVar,2],larg2];
        }

        if(larg2==tempVar){
          return [lop,["^",tempVar,2],larg1];
        }

      }


      if(lop=="^"){//Only in first variable
        if(larg1==tempVar){
          return [lop,tempVar,larg2+1];
        }

      }

    }
  }



  //Further Nested Redcutions
  if(op=="*"){
    if(arg1.constructor===Number){
      var tempVar=arg1;

      var lop=arg2[0];
      var larg1=arg2[1];
      var larg2=arg2[2];

      if(lop=="*"){
        if(larg1.constructor===Number){
          return ["*",larg2,larg1*tempVar]
        }
        if(larg2.constructor===Number){
          return ["*",larg1,larg2*tempVar]
        }
      }
    }

    if(arg2.constructor===Number){
      var tempVar=arg2;

      var lop=arg1[0];
      var larg1=arg1[1];
      var larg2=arg1[2];

      if(lop=="*"){
        if(larg1.constructor===Number){
          return ["*",larg2,larg1*tempVar]
        }
        if(larg2.constructor===Number){
          return ["*",larg1,larg2*tempVar]
        }
      }
    }



  }

  if(op=="^"){
    if(arg1[0]=="^"){
      return ["^",arg1[1],+arg1[2]*arg2];
    }
  }


  return equation;
}


//Applys operator to its arguments
function apply(op,arg1,arg2){
  switch(op){
    case "+":
      return arg1+arg2;
    break;
    case "-":
      return arg1-arg2;
    break;
    case "*":
      return arg1*arg2;
    break;
    case "/":
      return arg1/arg2;
    break;
    case "^":
      return Math.pow(arg1,arg2);
    break;
    default:
    break;
  }
}


function substitute(equation,varName,value){
  if(equation.constructor===Array){
    for(var i=0;i<equation.length;i++){
      equation[i]=substitute(equation[i],varName,value);
    }
    return equation;
  }

  if(equation==varName){
    return value;
  }
  return equation;
}

//Checks if the equation contains the variable in its subtree
function contains(equation,varName){
  if(!equation){
    return false;
  }
  if(equation.constructor===Array){
    for(var i=0;i<equation.length;i++){
      if(contains(equation[i],varName)){
        return true;
      }
    }
    return false;
  }

  if(equation==varName){
    return true;
  }
  return false;
}
