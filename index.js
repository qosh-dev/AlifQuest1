function Eval(exp) {
    var result;
    var method = [
        function (a, b) { return a * b; },
        function (a, b) { return a / b; },
        function (a, b) { return a + b; },
        function (a, b) { return a - b; },
    ];
    var methodChar = ["*", "/", "+", "-"];
    exp = exp.replace(" ","");
    var int1 = 0;
    var int2 = 0;
    for (var i = 0; i < exp.length; i++) {
        var fun = method[i];
        var part1 = exp.split(methodChar[i], 1)[0];
        var part2 = exp.replace(part1, "");
        part2 = part2.substr(1, part2.length - 1);
        if (part2 !== "") {
            int1 = Number(part1);
            int2 = Number(part2);
            if (!Number(part1)) {
                result = fun(Eval(part1), int2);
            }
            else if (!Number(part2)) {
                result = fun(int1, Eval(part2));
            }
            else {
                result = fun(int1, int2);
            }
        }
    }
    return result;
}
function calc(){
    var result = "";
    var btnArr = document.getElementsByClassName("btn");
    var clean = document.getElementById("clean");
    var answer = document.getElementById("answer");
    clean.addEventListener("click",() => {
        result = result.substring(0,result.length -1);
        answer.innerHTML = result;
    })
    for (let i = 0; i < btnArr.length; i++) {
        btnArr[i].addEventListener("click",() => {
            if(btnArr[i].innerHTML !== "C"){
                result += btnArr[i].innerHTML;
            }
            answer.innerHTML = result;
            if(Eval(result) != undefined){
                result = Eval(result);
                answer.innerHTML = result;
            }
            console.log(result);
        })
    }
}
calc()



