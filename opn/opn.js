//Обратная Польская Нотация
function prioritet(x) { //делаем приоритеты для символов
    switch (x) {
        case '+' :
            return 0;
        case '-' :
            return 0;
        case '*' :
            return 1;
        case '/' :
            return 1;
    }
    return -1;
}
fso = new ActiveXObject ("Scripting.FileSystemObject"); //обеспечивает доступ к файловой системе Windows
fh = fso.OpenTextFile("abc.txt",1,false); // false-открывает готовый файл;  true-создает файл; 1-для чтения; 2-для записи; 8-для добавления (в конец)
sp = fh.ReadAll(); // считываем строку
input=sp.split(/\r\n|\r|\n/); //сплитуем для работы с выражением и его значениями
s='';
s=input[0];// кладем в с само выражение
stringOfOperands=""; //итоговая строка
stack = new Array(); //стэк
skobki=0; //счетчик для скобок
for (i=0; i < s.length; i++){ //идем по выражению
    if (( s.charAt(i).charCodeAt(0) >= 65 && s.charAt(i).charCodeAt(0) <= 90) || ( s.charAt(i).charCodeAt(0) >= 97 && s.charAt(i).charCodeAt(0) <= 122)) {   //Работаем с операндами
        stringOfOperands += " ";
        stringOfOperands += s.charAt(i);
        stringOfOperands += " ";
    } //тут мы ввели большие и маленькие англ буковки
    else if ( s.charAt(i).charCodeAt(0)<39 ||  s.charAt(i).charCodeAt(0)==46 ||  (s.charAt(i).charCodeAt(0)>=48 &&  s.charAt(i).charCodeAt(0)<=64) || s.charAt(i).charCodeAt(0)>122){
        WSH.Echo("Error - SIMBOL");
        WScript.Quit();
    }//тут мы не дали ввести кучу ненужных символов
    else if (s.charAt(i) == '(') { //Скобочку open
        stack.push('('); //кидаем в стек (правда?)
        skobki++;
        if (i+1==s.length && skobki !=0 ){ //проверка на нормальность выражения
            WSH.Echo("Error - SKOBKI");
            WScript.Quit();
        }
    }
    else if (s.charAt(i) == ')') { //Скобочку close
        skobki--;
        if (i+1==s.length && skobki !=0 ){ //проверка на нормальность выражения
            WSH.Echo("Error - SKOBKI");
            WScript.Quit();
        }
        while (stack[stack.length-1] != '(') { //выкидываем все из стека до открывающейся скобки
            stringOfOperands += stack.pop();
        }
        stack.pop();
    }
    else if (prioritet(s.charAt(i)) > prioritet(stack[stack.length-1])) {  //Если встречаем оператор (авиалиний) то смотрим приоритет, больший приоритет тутже кидаем
        stack.push(s.charAt(i));
    }
    else {
        while (prioritet(s.charAt(i)) <= prioritet(stack[stack.length-1])){ //не повезло и встретили меньший приоритет, выкидываем из стека все
            stringOfOperands += stack.pop();
        }
        stack.push(s.charAt(i));
    }

}
while (stack.length > 0) { // подчищаем стек, вдруг что-то осталось...
    stringOfOperands += stack.pop();
}

WScript.Echo(stringOfOperands); //вывод измененной строки

fso=new ActiveXObject ("Scripting.FileSystemObject");    //считываем значения из файла
fh=fso.OpenTextFile("abc.txt",1,false);
s1=fh.ReadAll();
lines=s1.replace(/\s{2,}/g, ' ');
lines1=lines.split (" ");
lines1=lines1.slice(1); // убираем первую строчку тк это выражение
realNumbers=new Array()
for (i=0;i<lines1.length;i++){
    realNumbers[lines1[i]]=(lines1[i+1]);
    i++;
}
for (i=0; i<s.length;i++){ //проверка деления на ноль!
    if (realNumbers[s.charAt(i)]){
        a=s.charAt(i);
        b=realNumbers[s.charAt(i)];
        s = s.replace(a,b);
        if((s.charAt(i-1) == '/' && s.charAt(i) == '0')){
            WScript.Echo('DIVISION ERROR!');
            WScript.Quit();
        }
    }
}
//WScript.Echo(s);
for (i=0; i<stringOfOperands.length;i++){ //меняем буквы в выражении на числа
    if (realNumbers[stringOfOperands.charAt(i)]){
        a=stringOfOperands.charAt(i);
        b=realNumbers[stringOfOperands.charAt(i)];
        stringOfOperands = stringOfOperands.replace(a,b);
    }
}
//WScript.Echo(stringOfOperands);
var stack = new Array(); //обработка выражения (проще говоря считаем значение)
for (i = 0; i < stringOfOperands.length; i++) { //Смотрим каждый символ
    if (stringOfOperands.charAt(i) == " ") { //Если число
        i++;
        temp = '';
        while ((stringOfOperands.charAt(i) != " ")) { //считывем число
            temp += stringOfOperands.charAt(i);
            i++;
        }
        stack.push(temp); //закидываем в стэк число
    }
    else {
        op2 = stack.pop(); //Берем числа для операции
        op1 = stack.pop();
        var op = 'parseFloat('+op1+')'+ stringOfOperands.charAt(i) + 'parseFloat('+op2+')';
        stack.push(eval(op)); 	//eval - конвертирует из string в double
    }
}

WScript.Echo(stack.pop());