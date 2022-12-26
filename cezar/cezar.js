FSO = new ActiveXObject ("Scripting.FileSystemObject"); //обеспечивает доступ к файловой системе Windows
input = FSO.OpenTextFile("input.txt").ReadAll(); //считываем из файла строку
outputFile = FSO.CreateTextFile("output.txt"); //создаем файл для записи
tableFile = FSO.OpenTextFile("glob.txt"); //открываем таблицу глобальных частот
st1 = tableFile.ReadLine(); //считываем таблицу глобальных частот
alph = ""; //
glob = []; //массив со значениями глобальных частот
while (st1 != 'end') {
    tabl = st1.split('=');
    alph += tabl[0]; //формирование строки из букв и символов
    glob[tabl[0]] = tabl[1]; //формирование массива глобальных частот символов
    st1 = tableFile.ReadLine();
}
WSH.Echo("shift: "); //ввод сдвига
shift = (WScript.StdIn.ReadLine()) % alph.length; //в случае, когда сдвиг больше чем алфавит, мы возьмем остаток от деления.. ну понятно почему
if (shift < 0) { // случай с обратным сдвигом
    shift += alph.length;}
output="";
for (var i = 0; i < input.length; i++) {  //идем по стсроке из файла
    if (alph.indexOf(input.charAt(i))!= -1){ //если этот символ нам известен, то мы его кодируем и записывем
        output+=(alph.charAt((alph.indexOf(input.charAt(i)) + shift) % alph.length));}
    else{
        output+=input.charAt(i);} //символ нам неизвечтен, просто запишем, а что?
}
outputFile.WriteLine(input); outputFile.WriteLine("Shift: "+shift); outputFile.WriteLine(output); //записывем в файл полученную закоденную строку
localTable = [];
for (var i = 0; i < alph.length; i++) {
    localTable[alph.charAt(i)] = 0; } //создаем пустую новую таблицу частот
for (var i = 0; i < output.length; i++) { //идем по закодированной строке для декода
    if (localTable[output.charAt(i)] != undefined) { //если у нас вообще есть такой символ в нашем супер алфвите, то посчитаем кол-во посторений, пожалуй
        localTable[output.charAt(i)]++;
    }
}
for (var i = 0; i < alph.length; i++) { //а тут мы посчитаем непосредственно частоту этого символа)
    localTable[alph.charAt(i)] /= output.length; }
min = 1000; shift = 0; //сделаем большой минимум(все логично, все нормально), переменную - вычесление сдвига/
for (var j = 0; j < alph.length; j++) {
    rez = 0;
    for (var i = 1; i < alph.length; i++) {
        rez+=Math.pow(glob[alph.charAt((i + j) % alph.length)]  - localTable[alph.charAt(i)],2);} //разница между глобальной частотой и нашей в квадрате
    if (rez <= min) { //ищем самую минимальную разницу, частоту, мозговую активность (найдена)
        min = rez;
        shift = j-alph.length;
    }
}
WSH.Echo("Shift ", -shift);
outputFile.WriteLine("Shift: "+(-shift));
if (shift < 0) { // случай с обратным сдвигом
    shift += alph.length;}
for (var i = 0; i < output.length; i++){//запись в файл раскодированного текста
    if (alph.indexOf(output.charAt(i)) != -1){//запись в файл  символа, который встречается в глобальной таюлице
        outputFile.Write(alph.charAt((alph.indexOf(output.charAt(i)) + shift) % alph.length));}
    else{
        outputFile.Write(output.charAt(i));}//запись в файл символа, который не встречается в глобальной таюлице
}