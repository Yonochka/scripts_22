stringInput = WScript.StdIn.ReadLine(); // считываем строку
alph = new Array(); //массив для "алфавита"
count = 0;
result = 0;
for(var i = 0; i < stringInput.length; i++) {
    if (alph [stringInput.charCodeAt(i)]) { //если встречаем символ который уже был
        alph [stringInput.charCodeAt(i)]++; //считаем сколько этих символов
    }
    else {
        alph [stringInput.charCodeAt(i)] = 1; //случай, когда сивол одиночный, либо встртился впрвые
    }
}
for(var i = 0; i < alph.length; i++) {
    if (alph[i]) {
        result = alph[i]/stringInput.length; //узнаем частоту повторений
        count++; //
    }
}
if (result == 1){ // случай, когда все символы одинаковые
    WScript.Echo('entropy', 0);
    WScript.Quit(); //break / конец прогр
}
entropy = 0; //переменная для энтропии
if (count > 0){ // случай, когда мы считаем энтропию
    for (var i = 0; i < alph.length; i++){
        if (alph[i]){
            entropy += (alph[i] / stringInput.length) * (Math.log(alph[i]/stringInput.length) / Math.log(count)); //формула для подсчета
        }
    }
}
WScript.Echo('entropy', -entropy); //вывод результата