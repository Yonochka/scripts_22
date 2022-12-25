WSH.Echo("Please enter the String: ");
str = WScript.StdIn.ReadLine(); // ввод строки
WSH.Echo("Please enter the SubString: ");
subs = WScript.StdIn.ReadLine(); //ввод подстроки
alph = new Array(); //массив (что реально?!)

//Определяем алфавит строки t
for(var i = 0; i < subs.length; i++){
    alph[subs.charAt(i)] = 0;} // у нас есть буковки, присваиваем им нолики)

//В двумерном массиве del будем хранить таблицу переходов
del = new Array(subs.length + 1);

for(var j = 0; j <= subs.length; j++){
    del[j] = new Array();}

//Инициализируем таблицу переходов
for(i in alph){
    del[0][i] = 0;}

//Форомируем таблицу переходов
for(var j = 0; j < subs.length; j++) {
    prev = del[j][subs.charAt(j)];
    del[j][subs.charAt(j)] = j + 1;
    for(i in alph){
        del[j + 1][i] = del[prev][i];}
}
//Выводим таблицу переходов
for(var j = 0; j <= subs.length; j++){
    out = '';
    for(i in alph){
        out += del[j][i] + ' ';}
    WScript.Echo(out);
}

position = ""; //номера позиций вхождений
state = 0;// состояние
for(i = 0; i < str.length; i++) {
    if (!del[state][str.charAt(i)]) { //если не переходим в след состояние, то грустно
        del[state][str.charAt(i)] = 0;}

    state = del[state][str.charAt(i)];//смотрим в каком состоянии находится автомат

    if(state == subs.length){//если встречаем состояние == длине подстроки, считаем, что это вхождение))
        position += (i - subs.length + 1) +  " ";}
}

if (position.length == 0) //вообще не нашливхождений
    WScript.Echo("Not found");
else
    WScript.Echo("Positions of occurrence of a substring in a string: ", position); //нашли вхождения и тихо радуемся