//Брутфорс
fso = new ActiveXObject ("Scripting.FileSystemObject");
fh = fso.OpenTextFile("4t.txt", 1 ,false);
inputText = fh.ReadAll();
stringLength = inputText.length; //длина входного текста
pattern = "Prince"; // подстрока, которую ищем
WSH.Echo(pattern);
patternLength = pattern.length;//длина подстроки
positions="";
counter=0;
f=0;
start = (new Date()).getTime();
i=0;
a=0;
while (i < stringLength-patternLength){
    if (inputText.charAt(i) == pattern.charAt(a) ){
        i++;
        a++;
        if (a == patternLength){
            counter++;
            if (f<11){
                positions+=(i-patternLength)+" ";
                f++;
            }
            a=0;
        }
    }
    else {
        i++;
        a=0;
    }
}
stop = (new Date ()).getTime();
WSH.Echo(stop-start);
WSH.Echo(counter);
WSH.Echo(positions);

//хэш1
fso = new ActiveXObject ("Scripting.FileSystemObject");
fh = fso.OpenTextFile("a6.txt", 1 ,false);
inputText = fh.ReadAll();
stringLength = inputText.length; //длина входного текста

pattern = "baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"; // подстрока, которую ищем
patternLength = pattern.length; //длина подстроки
patternCounter=0; //счетчик хэша строки
for (j=0;j<patternLength;j++) { //подсчет хэша в строке
    patternCounter+=(pattern.charAt(j).charCodeAt(0));
}

inputTextCounter=0; //счетчик хэша подстроки
for (c=0;c<patternLength; c++){ // подсчет хэша в подстроке
    inputTextCounter+=(inputText.charAt(c).charCodeAt(0));
}

positions=""; //запись позиций вхождения
counter=0; //счетчик вхождений
i=patternLength;
a=0;
kollizii=0;
f=0;
start = (new Date()).getTime(); //таймер
while (i < stringLength-1){
    if (inputTextCounter == patternCounter){
        if  (inputText.charAt(i-patternLength) == pattern.charAt(a) ){
            while (inputText.charAt(i-patternLength) == pattern.charAt(a) ){
                i++;
                a++;
                if (a == patternLength){
                    counter++;
                    if (f<11){
                        positions+=(i-2*patternLength)+" ";
                        f++;
                    }
                    a=0;
                }
            }
        }
        else {
            a=0;
            kollizii++;
            i++;
        }
    }
    else {
        inputTextCounter-=inputText.charAt(i-patternLength).charCodeAt(0) // удаляем первый символ
        inputTextCounter+=inputText.charAt(i).charCodeAt(0) //добавляем новый символ
        i++;
    }
}
stop = (new Date ()).getTime();

WSH.Echo(stop-start); //вывод времени

WSH.Echo(counter);

WSH.Echo(kollizii);
WSH.Echo(positions);

//хэш2
fso = new ActiveXObject ("Scripting.FileSystemObject");
fh = fso.OpenTextFile("1 vol.txt", 1 ,false);
inputText = fh.ReadAll();
stringLength = inputText.length; //длина входного текста

pattern = "Prince"; // подстрока, которую ищем
patternLength = pattern.length; //длина подстроки
patternCounter=0; //счетчик хэша строки
for (j=0;j<patternLength;j++) { //подсчет хэша в строке
    patternCounter+=(pattern.charAt(j).charCodeAt(0))*(pattern.charAt(j).charCodeAt(0));
}

inputTextCounter=0; //счетчик хэша подстроки
for (c=0;c<patternLength; c++){ // подсчет хэша в подстроке
    inputTextCounter+=(inputText.charAt(c).charCodeAt(0))*(inputText.charAt(c).charCodeAt(0));
}

positions=""; //запись позиций вхождения
counter=0; //счетчик вхождений
i=patternLength;
a=0;
kollizii=0;
f=0;
start = (new Date()).getTime(); //таймер
while (i < stringLength-1){
    if (inputTextCounter == patternCounter){
        if  (inputText.charAt(i-patternLength) == pattern.charAt(a) ){
            while (inputText.charAt(i-patternLength) == pattern.charAt(a) ){
                i++;
                a++;
                if (a == patternLength){
                    counter++;
                    if (f<11){
                        positions+=(i-2*patternLength)+" ";
                        f++;
                    }
                    a=0;
                }
            }
        }
        else {
            a=0;
            kollizii++;
            i++;
        }
    }
    else {
        inputTextCounter-=(inputText.charAt(i-patternLength).charCodeAt(0))*(inputText.charAt(i-patternLength).charCodeAt(0)) // удаляем первый символ
        inputTextCounter+=(inputText.charAt(i).charCodeAt(0))*(inputText.charAt(i).charCodeAt(0))//добавляем новый символ
        i++;
    }
}
stop = (new Date ()).getTime();

WSH.Echo(stop-start); //вывод времени

WSH.Echo(counter);
WSH.Echo(kollizii);
WSH.Echo(positions);
//Рабин Карп
fso = new ActiveXObject ("Scripting.FileSystemObject");
fh = fso.OpenTextFile("a6.txt", 1 ,false);

inputText = fh.ReadAll();
stringLength = inputText.length; //длина входного текста
//princeAndrew
pattern = "prince"; // подстрока, которую ищем
patternLength = pattern.length; //длина подстроки

patternCounter=0; //счетчик хэша строки
inputTextCounter=0; //счетчик хэша подстроки
maxDegree = 1 << (patternLength-1);
for (j = 0; j < patternLength; j++){ // счетчик хэша строки и подстроки
    patternCounter += ((1 << j) * (pattern.charAt(j).charCodeAt(0)));
    inputTextCounter += ((1 << j) * (inputText.charAt(j).charCodeAt(0)));
}

positions=""; //запись позиций вхождения
counter=0; //счетчик вхождений
i=patternLength;
a=0;
kollizii=0;
f=0;
start = (new Date()).getTime(); //таймер
b=0;
while (i < stringLength-1){
    if (inputTextCounter == patternCounter){
        if  (inputText.charAt(i-patternLength) == pattern.charAt(a) ){
            while (inputText.charAt(i-patternLength) == pattern.charAt(a) ){
                i++;
                a++;

                if (a == patternLength){
                    counter++;

                    if (f<11){
                        positions += (i-2*patternLength)+" ";
                        f++;
                    }
                    a=0;

                }
            }
        }
        else {
            a=0;
            kollizii++;
            i++;
        }
    }
    else {

        inputTextCounter=(inputTextCounter-(inputText.charAt(i-patternLength)).charCodeAt(0))/2+(inputText.charAt(i)).charCodeAt(0)*maxDegree;
        i++;
    }
}
stop = (new Date ()).getTime();

WSH.Echo("Time: ", stop-start); //вывод времени
WSH.Echo("Number: ", counter);
WSH.Echo("Collisions: ",kollizii);
WSH.Echo("Positions: ",positions);
