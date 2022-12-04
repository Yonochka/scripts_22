function fact(){ //функция, считывающая файл для факториала
    mem = new Array ();
    fso = new ActiveXObject('Scripting.FileSystemObject');
    text_prog = fso.OpenTextFile('factorial.txt')
    var s="";
    while(!text_prog.AtEndOfStream){
        s+=text_prog.ReadLine() + ' ';
    }
    //s+='exit';
    mem = s.split(' ');
    ip=0;
}

function nod(){ //функция, считывающая файл для нода
    mem = new Array ();
    fso = new ActiveXObject('Scripting.FileSystemObject');
    text_prog = fso.OpenTextFile('nod1.txt')
    var s="";
    while(!text_prog.AtEndOfStream){
        s+=text_prog.ReadLine() + ' ';
    }
    //s+='exit';
    mem = s.split(' ');
    ip=0;
}

WSH.Echo ("What do you want to calculate: factorial or NOD?"); //даем пользователю выбор, что он хочет посчитать
string = WScript.StdIn.ReadLine();
if ((string == "factorial") || (string == "fact")) { // если пользователю нужен факториал, даем факториал
    fact();
}
if ((string == "nod") || (string == "NOD")) { // если пользователю нужен нод, даем нод
    nod();
}


for(var count=0;count<mem.length;count++){
    WScript.echo("In cell " ,count," stored ",mem[count]);

}
while (mem [ip] != 'exit' ){
    switch (mem [ip]) {
        case 'input': // введение начения с консоли
            WScript.Echo( 'Enter a value');
            mem[mem[ip+1]] = parseFloat(WScript.StdIn.ReadLine());
            if (((string == "nod") || (string == "NOD")) && ((mem[parseInt(mem[ip + 1])] <= 0) || (mem[parseInt(mem[ip + 3])] <= 0))){ // проверяем на нули и отрицательные числа
                if  ((mem[parseInt(mem[ip + 1])] < 0) || (mem[parseInt(mem[ip + 3])] < 0)){
                    WScript.Echo( 'Error');
                    mem[ip]="exit";
                    break;
                }
                else if  ((mem[parseInt(mem[ip + 1])] == 0) && (mem[parseInt(mem[ip + 3])] != 0)){
                    WScript.Echo(mem[parseInt(mem[ip + 3])] );
                    mem[ip]="exit";
                }
                else if  ((mem[parseInt(mem[ip + 1])] != 0) && (mem[parseInt(mem[ip + 3])] == 0)){
                    WScript.Echo( mem[parseInt(mem[ip + 1])]);
                    mem[ip]="exit";
                    break;
                }
                else if  ((mem[parseInt(mem[ip + 1])] == 0) && (mem[parseInt(mem[ip + 3])] == 0)){
                    WScript.Echo( 'Error');
                    mem[ip]="exit";
                    break;
                }

            }
            if ((string == "factorial") || (string == "fact")){ // проверяем на нули и допустимые значения
                if (mem[parseInt(mem[ip + 1])] == 0){
                    WScript.Echo('1');
                    mem[ip]="exit";
                    break;
                }
                if ((mem[parseInt(mem[ip + 1])] < 0) || ((mem[parseInt(mem[ip + 1])] > 21)) || (mem[parseInt(mem[ip + 1])] - Math.round(mem[parseInt(mem[ip + 1])])!=0)){
                    WScript.Echo('Error');
                    mem[ip]="exit";
                    break;
                }
            }
            ip+=2;
            break;
        case 'var': //значение переменной берется из пргораммы
            mem[parseInt(mem[ip + 1])] = parseInt(mem[ip + 2]);
            ip+=3;
            break;
        case 'output': //вывод
            WScript.Echo( 'Result: ',parseInt(mem[parseInt(mem[ip + 1])]) );
            ip+=2;
            break;
        case 'add': //сложение
            mem [mem [ip+1] ] = parseInt(mem [mem [ip+2] ]) + parseInt(mem [mem [ip+3] ]);
            ip+=4;
            break;
        case 'minus': //вычитание
            mem [mem [ip+1] ] = parseInt(mem [mem [ip+2] ]) - parseInt(mem [mem [ip+3] ]);
            ip+=4;
            break;
        case 'goto': //переход
            ip = parseInt(mem [ip+1]);
            break;
        case 'mult': //произведение
            mem [mem [ip+1] ] = parseInt(mem [mem [ip+2] ]) * parseInt(mem [mem [ip+3] ]);
            ip+=4;
            break;
        case 'if': //условие
            switch (mem [ip+2]) {
                case '>':
                    if (parseInt(mem[parseInt(mem[ip + 1])]) > parseInt(mem[parseInt(mem[ip+ 3])])){
                        ip += 4;
                    }
                    else {
                        ip+=5;
                    }
                    break;
                case '==':
                    if (parseInt(mem[parseInt(mem[ip + 1])]) == parseInt(mem[parseInt(mem[ip + 3])])) {
                        ip += 4;
                    }
                    else {
                        ip += 5 ;
                    }
                    break;
                default:
                    break;
            }
            break;
        case 'exit': //конец программы
            WSH.Echo('The end)');
            WScript.Quit();
            break;
        default:
            ip++;
            break;
    }
}