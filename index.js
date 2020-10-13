

function Eval(exp) {
    var result = 0;
    var method = {
        "/": function (Arr) {
            var result = 1;
            for (var i = 0; i < Arr.length; i++) {
                result /= Number(Arr[i]);
            }
            return result;
        },
        "*": function (Arr) {
            result = 1;
            for (var i = 0; i < Arr.length; i++) {
                result *= Number(Arr[i]);
            }
            return result;
        },
        "-": function (Arr) {
            result = Number(Arr[0]);
            for (var i = 1; i < Arr.length; i++) {
                result -= Number(Arr[i]);
            }
            return result;
        },
        "+": function (Arr) {
            result = 0;
            for (var i = 0; i < Arr.length; i++) {
                result += Number(Arr[i]);
            }
            return result;
        }
    };
    var keys = Object.keys(method).reverse();
    exp = exp.replace(" ","");
    for (var j = 0; j < keys.length; j++) {
        var fun = method[keys[j]];
        for (var i = 0; i < exp.length; i++) {
            if (exp[i] === keys[j]) {
                var tempArr = exp.split(keys[j]);
                if (isNaN(fun(tempArr))) {
                    var tempArr2 = new Array();
                    for (var o = 0; o < tempArr.length; o++) {
                        tempArr2.push(Eval2(tempArr[o]).toString());
                    }
                    return fun(tempArr2);
                }
                return fun(tempArr);
            }
        }
    }
    return Number(exp);
}
function calc(){
    var result = "";
    var btnArr = document.getElementsByClassName("num");
    var clean = document.getElementById("clean");
    var answer = document.getElementById("answer");
    var equal = document.getElementById("equal");
    var dot = document.getElementById("dot");
    var operator = document.getElementsByClassName("oper");


    var longPress = false;
    var startTime = 0;
    var endTime = 0;

    equal.addEventListener("click",() => {
        result = Eval(result.toString()).toString()
        if(result === "Infinity"){
            result = ""
            answer.innerHTML = "Не правильная операция";
        } else {
            answer.innerHTML = result;
        }
    })

    clean.addEventListener("click",() => {
        if(!longPress){
            result = result.toString().substring(0,result.length -1);
            answer.innerHTML = result;
        } else {
            result = "";
            answer.innerHTML = result;
        }
    })
    clean.addEventListener("mousedown",() => {
        startTime = new Date().getTime();
    })
    clean.addEventListener("mouseup",() => {
        endTime = new Date().getTime();
        longPress = (endTime - startTime < 500) ? false : true;
    })

    for (let i = 0; i < btnArr.length; i++) {
        btnArr[i].addEventListener("click",() => {
            var text = btnArr[i].innerHTML;          
            result += text;
            answer.innerHTML = result;
        })
    }
    for (let i = 0; i < operator.length; i++) {
        operator[i].addEventListener("click",() => {
            var text = operator[i].innerHTML;
            var lastChar = result[result.length-1];
            if(lastChar != text && lastChar != "."){
                result += text;
                answer.innerHTML = result;
            }          
        })
    }
    dot.addEventListener("click", () => {
        var lastChar = result[result.length-1];
        if( lastChar != "." && lastChar != "+" && lastChar != "-" && lastChar != "/" && lastChar != "*" ){
            result += "."
            answer.innerHTML = result;
        }
    })
}
calc()
