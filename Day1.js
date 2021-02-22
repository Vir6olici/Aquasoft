// Virgolici Theodor
// 22 - 02 - 2021

// 1. Diferenta dintre var/let/const.
// Toate sunt utilizate pentru a declara variabile , insa sub diferite forme.

// keyword : var.
// este o variabila care poate fi filosita atat global cat si intr-o metoda/func.
// daca se declara in afara oricarui scope, variabila declarata devine globala.

var x = 'X'; // Variabila x este globala si poate fi utilizate in orice parte a programului.
console.log(x);

function myFunction(){
  var y = 'Y';
  console.log(y); // y este declarat in functie -> poate fii utilizat EXCLUSIV in functie.
  console.log(x);

}

myFunction() //la apelarea functiei se observa ca ambele variabile sunt utilizabile.

// console.log(y); -> daca se decomenteaza aceasta linie, o sa fie eroare,pt ca
// din memorie a fost eliberata variabila y dupa terminarea functiei MyFunction.

var x = 'X1'; // Orice variabila var poate fi redeclarata sau updatata
console.log(x); // si dupa rularea functiei myFunction variabila x ramare valabila.

//Problema lui var este ca poate fi reinitializat sau schimbata valoarea in momente
// in care nu ne dorim.

// keyword : let
// o alternativa la myFunction pentru y poate fii folosit in loc de var , keyword-ul let.

function myFunction2(){
  let y = 'YY';
  console.log(y); // -> aici exista.
  y = 'YY1'; // se poate updata.
  // let y = 'z'; -> nu poate fii redefinit.
  console.log(y);
  // asa cum am spus let este scope available deci la deschiderea altor scope-uri
  // se poate redeclara y
  for(let i=0 ; i<5;i++){
    let y = 'YY - in for'; // s-a putut redeclara.
    console.log(y);
  }
  myLetScope();
}

function myLetScope(){
  let y = 'YY - in alta functie'
  console.log(y);
}

myFunction2();
// console.log(y) -> aici nu mai exista
// orice variabila declarata cu let este scope available.

//keyword : const;
//orice variabila declarata cu const isi pastreaza aceasi valoare.
// cu alte cuvinte valaore din memorie nu poate fi schimbata.
//din punct de vedere a disponibilitati - este similar cu let.

const z = 'z';
console.log(z);

// z = "zz"; -> o sa fie eroare .. daca se incearca updatarea.

function myFuncConst(){
  const nume = "Virgolici";
  console.log(nume);
  console.log(z);
  for(let i = 0;i < 3; i++){
    const nume = "Thedor"; // la fel ca la let in orice scope diferit ma aflu se
    //poate face denumirea aceleasi variabile
    //aceasta duoe terminarea for-ului o sa fie eliberata din memorie.
    console.log(nume);
  }
}

myFuncConst();

//2. Operatorul Spread.
// acest operator este folosit pentru a include un obiect intr-o lista

let listOfNumbers = [0, 1, 2]; // o lista de 3 numere.
console.log("Lista: " ,listOfNumbers); // se printeaza cifrele 0 , 1, 2;
console.log("Elemente din lista :" ,listOfNumbers.length); // OUTPUT : 3

let numar = 100;
listOfNumbers = [...listOfNumbers,numar];
console.log("Lista: " ,listOfNumbers); // se printeaza cifrele 0 , 1, 2, 100;
console.log("Elemente din lista :" ,listOfNumbers.length); // OUTPUT : 4

// se poate folosi si pentru copierea unei liste in felul urmator;
function myFuncSpreadOp1(){
  const listA = [1, 2, 3];
  const listB = listA;
  listB.push(4);
  console.log(listA); // OUTPUT : [ 1, 2, 3, 4 ]
  console.log(listB); // OUTPUT : [ 1, 2, 3, 4 ]
  // desi am pushat doar in lista B elementul 4 aceasta a aparut si in lista A.
  // motivul este linia : const listB = listA;
  // aici in spate se creaza aceasi referinta in memorie pentru ambele liste si astfel la
  // apelarea uneia , se apeleaza automat si cealalata
  // inconvenient in multe cazuri
  // se poate folosi SPREAD OPERATOR pentru copiere.
  const listC = [...listA];
  listC.pop(); // se foloseste metoda pop pt a scoate din lista -> si doar lista
  // care a apelat metoda este afectata.
  console.log("Lista A : " , listA); // OUTPUT : [ 1, 2, 3, 4 ]
  console.log("Lista B : " , listB); // OUTPUT : [ 1, 2, 3, 4 ]
  console.log("Lista C : " , listC); // OUTPUT : [ 1, 2, 3 ]
}
myFuncSpreadOp1();

//se poate folosi si atc cand se apeleaza functii cu o lista de valori in loc de
// multiple argumente.

function suma(x,y,z){
  return x+y+z;
}

function myFuncSpreadOp2(){
  let numere = [1, 1, 1];
  // functia suma trebuie sa primeasca 3 argumente
  // se pot face in urmatoarele metode.
  //1. folosind metoda apply.
  console.log("suma APPLY : ", suma.apply(null,numere)); // OUTPUT : 3
  //2. sau cu SPREAD OPERATOR.
  console.log("suma SPREAD OPERATOR : ",suma(...numere)); // OUTPUT : 3
  //Practic in amebele cazuri elementele liste sunt date ca parametri pentru
  //functia apelata si nu suntem nevoiti sa facem ceva de genul asta.
  let a = 2;
  let b = 2;
  let c = 2;
  console.log(suma(a,b,c));
  //trebuie marcat faptul ca daca lista are mai multe elemente, atunci o sa fie luate
  // primele din lista data paramentru.
}
myFuncSpreadOp2();

//se poate folosi pentru adaugarea intr-o lista a altei liste in felul urmator.
function myFuncSpreadOp3(){
  let unitar = [1, 1, 1];
  let zecimal = [10, 10];
  let sute = [100];
  sute = [100 , ...unitar , ...zecimal ,...sute];
  console.log(sute);
  //au fost adaugate in aceasi lista sute , fiecare in ordinea in care au fost
  //introduse.

}
myFuncSpreadOp3();

//3. Obiecte - Deep copy vs Shallow copy, Iterarea obiectelor folosind for...in.
// Pana acum in acest cod am lucrat doar cu shallow copy
// adica atunci cand se copieaza un element din altul(fara a se folosi operatorul '=')
// se va copia doar primul nivel .  ce am facut la Spread Operator.
function deepCopyVSShallowCopy(){
  let string1 = "JavaScript" // string1 este o primitiva.
  let string2 = string1 // Se copieaza ce este in string1 si se adauga in string2.
  // astfel string2 are o referinta si o cu totul alta locatie in memorie
  // deci sunt independente una fata de alta.
  console.log("S1 : ",string1); //OUTPUT : JavaScript
  console.log("S2 : ",string2); //OUTPUT : JavaScript
  string2 = "Python";
  console.log("S1 : ",string1); //OUTPUT : JavaScript
  console.log("S2 : ",string2); //OUTPUT : Python
  // ATENTIE - functioneaza doar la varibile primiteve.
  // se considera urmatorul obiect.
  let array = [4,4,1999, 'Theodor','Virgolici'];
  let copieShallow = array; // totusi array nu este o valoare de tip primitiva
  // acest lucru duce la doar copierea referintei lui array.
  //astfel acum variabila copieShallow este doar o referinta.
  //asa ca daca incerc sa chimb una dintre ele ... o sa se schimbe ambele.
  console.log("Array : ", array); //OUTPUT : Array :  [ 4, 4, 1999, 'Theodor', 'Virgolici' ]
  console.log("Copie Array :" ,copieShallow);//OUTPUT : Copie Array :  [ 4, 4, 1999, 'Theodor', 'Virgolici' ]
  copieShallow[0] = 44;
  console.log("Array : ", array); //OUTPUT : Array :  [ 44, 4, 1999, 'Theodor', 'Virgolici' ]
  console.log("Copie Array :" ,copieShallow);//OUTPUT : Copie Array :  [ 44, 4, 1999, 'Theodor', 'Virgolici' ]
  // se poate observa ca s-au schibat ambele
  // exista mai multe metode de a copia Shallow obiecte care nu sunt primitive.
  // 1. array.slice(0);
  // 2. array.concat(arr2);
  // 3. SPREAD OPERATOR;
  // 4. Obj.create({} , obj1);
  // 5. Obj.assign({} , obj2);
  // 6. Array.from(arr);
  console.log("_______________________");
  let copieShallow2 = Array.from(array);
  console.log("Array : ", array); //OUTPUT : Array :  [ 44, 4, 1999, 'Theodor', 'Virgolici' ]
  console.log("Copie Array :" ,copieShallow2);//OUTPUT : Copie Array :  [ 44, 4, 1999, 'Theodor', 'Virgolici' ]
  copieShallow2[0] = 'Array.from()';
  console.log("Array : ", array); //OUTPUT : Array :  [ 44, 4, 1999, 'Theodor', 'Virgolici' ]
  console.log("Copie Array :" ,copieShallow2);//OUTPUT : Copie Array :  [ 'Array.from()', 4, 1999, 'Theodor', 'Virgolici'
  console.log("_______________________");
  let copieShallow3 = array.slice();
  console.log("Array : ", array); //OUTPUT : Array :  [ 44, 4, 1999, 'Theodor', 'Virgolici' ]
  console.log("Copie Array :" ,copieShallow3);//OUTPUT : Copie Array :  [ 44, 4, 1999, 'Theodor', 'Virgolici' ]
  copieShallow3[0] = 'slice';
  console.log("Array : ", array); //OUTPUT : Array :  [ 44, 4, 1999, 'Theodor', 'Virgolici' ]
  console.log("Copie Array :" ,copieShallow3);//OUTPUT : Copie Array :  [ 'slice', 4, 1999, 'Theodor', 'Virgolici'
  console.log("_________________________");
  let copieShallow4 = [];
  Object.assign(copieShallow4,array);
  console.log("Array : ", array); //OUTPUT : Array :  [ 44, 4, 1999, 'Theodor', 'Virgolici' ]
  console.log("Copie Array :" ,copieShallow4);//OUTPUT : Copie Array :  [ 44, 4, 1999, 'Theodor', 'Virgolici' ]
  copieShallow4[0] = 'Object.assign()';
  console.log("Array : ", array); //OUTPUT : Array :  [ 44, 4, 1999, 'Theodor', 'Virgolici' ]
  console.log("Copie Array :" ,copieShallow4);//OUTPUT : Copie Array :  [ 'Object.assign()', 4, 1999, 'Theodor', 'Virgolici' ]
  //Acestea su fost toate metode de shallow copy
  console.log("_________________________");
  let newDeepObj = JSON.parse(JSON.stringify(array));
  console.log(array);
  console.log(newDeepObj);
  newDeepObj[0] = 'JSON'
  console.log(array);
  console.log(newDeepObj);
  //in folosirea acestei medore exista doua procese independente care aduc la rezultatul dorit.
  //prima data se foloseste metoda JSON.stringify(array).
  //  aceasta are rolul sa imi de referentieze toate elementele listei array si sa le puna intr-un singur string de tip JSON.
  //  adica se adauga tagu-rui in dreptul fiecarui element din obiect : in cazul de fata o sa existe 55 taguri.
  // apoi metoda parse - parseaza stringul si recreeaza cu ajutorul tagurilor noile referinte in noul obiect.

}
deepCopyVSShallowCopy();

function deepCopy(){
  // definesc un obiect Entity pe care il initializaez
  const string = ['Health','Mana','Damage','Level'];
  //folosesc const pentru acesta lista in obiectele Entity nu poate fii schimbata.

  let Entity1 = {
    'Stats' : string.slice(),
    'CharacterStats' : ['100','100','45','15'],
    'Skils' : ['Firebolt','Fireblast','Firerain'],
  }
  console.log(Entity1);

  let Entity2 ={
    'Stats' : string.slice(),
    'CharacterStats' : ['150','100','50','18'],
    'Skils' : ['Frostbolt','Frostblast','Blizzard'],
  }
  let Entity2Copy = JSON.parse(JSON.stringify(Entity2));
  console.log(Entity2Copy);

  //iterarea obiecului Entity2Copy;
  for (const property in Entity2Copy){
    console.log(`${property}: ${Entity2Copy[property]}`);
  }
  // are la baza sintaxa for ... in loop.

}
deepCopy();

//4. Arrays - accesor, iteration, mutator methods
 var cars = ["Volkswagen","Skoda","Opel"]; // initializare corecta de array.

 //accesarea unui element din array.
 console.log(cars[1]); // OUTPUT : Skoda
 //se poate schimba un element din array.
 cars[1] = "Fiat";
 console.log(cars[1]);
 //lungimea unei Array
 console.log(cars.length);
 //loop over
 cars.forEach((item, i) => {
   console.log(item,i);
 });
//adaugarea unui element
cars.push('AlfaRomeo');
cars.forEach((item, i) => {
  console.log(item,i);
});
//stergerea unui element
cars.pop();
cars.forEach((item, i) => {
  console.log(item,i);
});
//aflarea unei pozitii
let pozitie = cars.indexOf('Opel');
console.log(pozitie);
//sterge un element dupa index
let removedItem = cars.splice(pozitie);
cars.forEach((item, i) => {
  console.log(item,i);
});
//MAPAREA
let numere = [1 , 4, 6, 20];

let map = numere.map(x => x * 2);
console.log(map);

// FILTRAREA
function prim(n) {
	var divizori = 0
	var d = 1
	while (d <= n) {
		if (n % d === 0) {
			divizori++
		}
		if (divizori === 3) {
			break
		}
		d++
	}
	if (divizori === 2) {
		return true
	} else {
		return false
	}
}

let numere_aproape_prime = [3 , 5 ,6 ,7, 11];
let numere_prime = numere_aproape_prime.filter(numar => prim(numar) == true);
console.log(numere_prime);

//5. Promise, Callback
// Promisiunile sunt obiecte de tip JavaScript care fac legatuura dintre un cod
// ce trebuie consumat si unul care trebuie produs.

function promise1(){
  let myPromise = new Promise(function(Executare,Rejectare){
    // cod ce dureaza ceva timp.
    Executare(); // daca totul este in regula.
    Rejectare(); // daca apare o eraore.
  });
  myPromise.then(
    function(value) {/*cod daca este executat*/},
    function(error) {/*cod daca exista vreo eroare*/}
  );

  //felul incare functioneaza promisiunile.
  // in caz de exista un obiect care ruleaza rezultatul nu este definit.
  // Atunci cand Obiectul Prommisiune este indeplinit, rezultatul este o valoare.
  // dar daca Obiectul Promisiune este rejectat , atc rezultatul este un obiect eroare.
}

function promise2(){
  // o sa fac o promisiune pentru gasirea unui element dintr-un vector.
  // o sa fac o cautare de tip LinearSearch() - cea mai mare complexitate O(n) . pentru a obtine
  // ceva rezultate intarziate.
  var arr = [...Array.from(Array(1000).keys())]
  // generez 1000 de numere sortate.
  let myPromise = new Promise(function(found,notFound){
    let numarDeCautat = 999; // Se poate schimba numarul .
    let f;
    for(let i = 0; i < arr.length; i++){
      if(numarDeCautat == arr[i]){
        f = arr[i];break;
      }else {
        f = -1;
      }
    }
    if (f != -1){
      found("A fost Gasit!");
    }else if(f == -1){
      notFound("Nu a fost Gasit!");
    }
  });
  myPromise.then(function(value){console.log("A fost gasit numarul in arraay")},function(error){console.log("Nu a fost gasit in vector numarul dorit!")});
}

promise2();

// Callback - este parametru dat unei functii pentru o alta functie.
function callaback1(){
  function print(value){
    console.log(value);
  }
  function adunare(n1,n2,print){
    let sum = n1 + n2;
    print(sum);
  }
  adunare(3,7,print);
}
callaback1();
// ideea principala a callback-urilor este ca atunci cand se ruleaza o functiei
// in mod automat sa fie apelata alta data ca parametru.

//6. Async , await
// keweordul async - face ca sa returneze functia o Promisiune
//keywordul await - face ca sa se astepte rezultatul unei functii care ruleaza asinron.
function rezolvain2Secunde(){
  return new Promise(resolve => {
    setTimeout(() =>{
      resolve('rezolvat');
    },2000);
  });
}

async function asyncCall(){
  console.log('calling');
  const result = await rezolvain2Secunde();
  console.log(result);
}

asyncCall()

//Concluzie async/await - orice functie care este declarata cu async trebuie apelata
// cu await. async face ca returnarea sa fie o promisiune , await face ca
// codul sa astepte o promisiune.

//7. Closures
//iti da posibilitatea sa accesezi scope-ul altei functii.
// la nivel de runtime se creaza un closure la fiecare aparitie a keywordului function.

// crearea unui adder.

function adder(x){
  return function(y){
    return x + y;
  };
}

var add1 = adder(1);
console.log(add1); // OUTPUT : [Function (anonymous)]
console.log(add1(1)); // OUTPUT : 2;

//nested Closures

function sum(a){
  return function(b){
    console.log("Acum ma aflu in B");
    return function(c){
      return a + b + c;
    }
  }
}

console.log(sum(1)(2)(3));

class Vehicle{
  constructor(name,model){
    this.name = name;
    this.model = model;
  }
  setPrice(price){
    this.price = price;
    return function(name,model){
      return "Masina " + name + " modelul " + model + " costa : " + price;
    }
  }
  getModel(){
    return this.model;
  }
  getName(){
    return this.name;
  }
}

let auto1 = new Vehicle('kia','stinger');
console.log(auto1.setPrice(1000));
console.log(auto1.setPrice(1000)(auto1.getName(),auto1.getModel()));
