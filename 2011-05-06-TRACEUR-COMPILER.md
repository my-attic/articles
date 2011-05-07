#Les Classes arrivent chez JavaScript

Ca va peut-être en faire hurler certains, mais moi je trouve ça très fun ;)
Lors de la JSConf 2011 a été présenté un nouveau projet [Traceur-Compiler](http://code.google.com/p/traceur-compiler/) qui par l'insertion de quelques script dans votre page html, vous permet d'utiliser un code javascript qui préfigure ce que javascript sera probablement demain (en fait des propositions pour le projet Harmony (aka ES.Next) qui ne sont pas encore acceptées : dans la branche [strawman](http://wiki.ecmascript.org/doku.php?id=strawman:strawman)).

Et parmi ces "propositions", une d'entre elles me "parle" beaucoup : `class`

juste un petit exemple :

```js
	<html>
		<head>
		<script 
		  src="http://traceur-compiler.googlecode.com/
                       svn/branches/v0.10/src/traceur.js" 
		  type="text/javascript">
		</script>
		<script 
		  src="http://traceur-compiler.googlecode.com/
                       svn/branches/v0.10/src/bootstrap.js" 
		  type="text/javascript">
		</script>		
		</head>
		<body>
			<h1 id="human-message"></h1>
	        <h1 id="man-message"></h1>

			<script type="text/traceur">

				class Human {
	                var firstName = 'John', lastName = 'Doe';
					new(params, message) {
						this.message = message;
	                    if(params.firstName) this.firstName = params.firstName;
	                    if(params.lastName) this.lastName = params.lastName;
					}

					hello(where) {
						let element = document.querySelector('#' + where);
						element.innerHTML = 
                                                 this.message + "-" + 
                                                 this.firstName + " " + 
                                                 this.lastName;
					}
				};
				
				/* heritage */
	            class Man : Human {
	                var what = 'male';
	                new(params, message) {
	                    super(params, message);
	                }

	            };

				let johnDoe = new Human({},'Hello, world!');
				johnDoe.hello('human-message');


	            let bob = new Man({
	                    firstName:'Bob',
	                    lastName:'Morane'
	                },
	                "Hello i'm a man"
	            );
            
	            bob.hello('man-message');
	            console.log(bob.what);

			</script>
		</body>
	</html>
```

**Remarque :** le mot var déclare une variable publique

Personnellement je trouve ça assez sympa, il y a d'autre fonctionnalités que vous pouvez découvrir ici [http://code.google.com/p/traceur-compiler/wiki/LanguageFeatures](http://code.google.com/p/traceur-compiler/wiki/LanguageFeatures)

