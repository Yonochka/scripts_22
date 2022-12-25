WSH.Echo("Please enter the String: ");
S = WScript.StdIn.ReadLine(); // S строка
n=S.length; //длина строки
WSH.Echo("Please enter the SubString: ");
T = WScript.StdIn.ReadLine(); // T подстрока
m=T.length; // длина подстроки

N=new Array();
for(j=0;j<m;j++){ // предварительная обработка шаблона Т и составление Таблицы N (наиболее правых вхождений символов в строку Т)
    N [T.charAt(j)]=j+1;}
for(j in N){
    WScript.Echo('N[',j,']=' ,N[j]);}

i=0;
l=0; // кол-во совпавших символов в подстроке и фрагменте, по которому идем в данный момент
answer=0; // кол-во ответов
position=""; // позиции вхождений
while (i<n+1) {
    if (S.charAt(i+m-1-l)==T.charAt(m-1-l)){ //сравниваем символы подстроки и строки
        l++;
        if (l==m){ //ситуация, когда мы нашли подстроку в S == подстроке Т
            answer++;
            o=i+1;
            position+=o+' ';
            i++;
            l=0;
        }
    }
    else {
        if (i>n){
            break; }
        char = S[i+m-l-1]; //char — это самый правый символ фрагмента S [i.. і + m — 1], на котором произошло рассогласование
        if (!N [char]) { // если в рассматриваемой подстроке вообще нет элементов N, то можем перешагнуть довольно много символов
            i=i+m+l;
            l=0; }
        else { //если есть, но это все же не подстрока, то вот на столько шагаем
            i+=Math.max(m-N(char)-l, 1)
        }
    }
}
WSH.Echo("The number of occurrences of a substring in a string: ",answer);
if (position==''){
    WSH.Echo("There are no occurrences");
}
else {
    WSH.Echo("Positions of occurrence of a substring in a string: ",position);
}
//спасибо великому Солодушкину за прописанные им формулы шагов!
