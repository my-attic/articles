#Variables privées et héritage en javascript

- - -
*Ma méconnaissance de javascript au moment où j'ai eu la problématique décrite ci-dessous n'a pas forcément aidé, ni dans la résolution du problème, ni dans ma capacité à l'expliciter (d'où probablement l'impossibilité de trouver quelqu'un qui réponde à cette problématique particulière), mais peut-être que je ne suis pas le seul à avoir "bloqué" là dessus, d'où cet article.*
- - -

Il y a quelques temps je me suis creusé la tête sur le fonctionnement des variables privées avec des classes (pardon fonctions) filles en javascript. Je m'explique :



* j'ai une fonction `Human()`

	    function Human() {
	    	var name = "John Doe";
	    	this.getName = function(){ return name; }
	    	this.setName = function( value ){ name = value; }
	    }

* j'ai une fonction `Man()`

	    function Man() {
	    	var nickName = "Johnny";
	    	this.getNickName = function() { return nickName; }
	    	this.setNickName = function( value ) { nickName = value; }
        
	    	this.toString = function() { 
                    return "Hello i am " + this.getName() + " aka " + nickName ;
                }
	    }

* `Man` hérite de `Human`

	    Man.prototype = new Human();

* j'instancie `Man` pour avoir `bob`

	    var bob = new Man(); 
	    bob.setName( "Bob" ); 
	    bob.setNickName( "Bobby" );

* j'instancie `Man` pour avoir `bill`

	    var bill = new Man(); 
	    bill.setName( "Bill" ); 
	    bill.setNickName( "Billy" );

* j'affiche les informations

	    console.log( bob.toString() );
	    console.log( bill.toString() );

* je lance ça et vais faire un tour dans ma console

##Et là, c'est le drame !

J'obtiens ceci :

	Hello i am Bill aka Bobby
	Hello i am Bill aka Billy

**AAARGHHHHH !!!** bill et bob ont le même nom !!! Oh p.....! Il doit y avoir quelques code js dans la nature qui fonctionnent bizarement ...

- Je suis arrivé à trouver des moyens de contournement, mais rien de très "joli"
- J'ai demandé autour de moi, on m'a expliqué qu'en js, il ne fallait pas à tout prix vouloir mimer le fonctionnement objet de Java ou que je pouvais fonctionner par convention et prefixer mes variables privées par un `_`

Au final, j'ai continué dans ma découverte de javascript ... en évitant d'utiliser des variables privées dans des cas similaires.

##Quelques mois plus tard ...

Je viens de tomber sur un excellent "billet" sur le blog de Ben Nadel : [Private Variables Do Not Necessarily Break Prototypal Inheritance In Javascript](http://www.bennadel.com/blog/2181-Private-Variables-Do-Not-Necessarily-Break-Prototypal-Inheritance-In-Javascript.htm).

Et là l'**illumination !!!** , une simple ligne de code dans son exemple a allumé une lueur d'intelligence dans mon esprit relativement embrumé (ben oui c'était 5h du matin ...)

Si dans le constructeur de Man() j'ajoute simplement ceci : `Human.call(this);` eh ben ça fonctionne ! Et c'est bien sûr, et je m'en veux de ne pas y avoir pensé.

Et `bill` s'appellera bien "Bill", et `bob` s'appellera bien "Bob" ...
... et je me coucherai mois c.. ce soir ;)

##Au final mon code ressemblera à ceci :

	function Human() {
		var name = "John Doe";
		this.getName = function(){ return name; }
		this.setName = function( value ){ name = value; }
	}

	function Man() {
		//the SOLUTION is here
		Human.call(this);

	  	var nickName = "Johnny";
	  	this.getNickName = function() { return nickName; }
	  	this.setNickName = function( value ) { nickName = value; }

	  	this.toString = function() { 
                    return "Hello i am " + this.getName() + " aka " + nickName ;
                }
	}
	Man.prototype = new Human();

	var bob = new Man(); bob.setName( "Bob" ); bob.setNickName( "Bobby" );
	var bill = new Man(); bill.setName( "Bill" ); bill.setNickName( "Billy" );

	console.log( bob.toString() );
	console.log( bill.toString() );

