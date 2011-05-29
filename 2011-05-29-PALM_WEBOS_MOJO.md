#Créer votre 1ère application WebOs

##Intro

Palm avait crée WebOS, un OS mobile, orienté web avec un SDK à base de HTML5/JS/CSS3, pour son nouveau SmartPhone Palm Pré, qui aurait du être le concurrent "ultime" de l'iPhone. Mais c'était sans compter la force marketing d'Apple. Du coup ... plouf.
HP a eu ensuite l'incroyable (mais certainement très bonne) idée de se payer Palm, et d'acquérir ainsi un savoir inestimable et un OS mobile qui semble promu à un bel avenir (en tous les cas chez HP) et qui va être embarqué en plus des téléphone, sur la future TouchPad, la tablette d'HP (pour cet été, donc probablement septembre pour nous).

##Application webOS

Une application WebOs s'appuie sur les standards HTML, CSS et Javascript mais le model d'application est différent du modèle "web app classique". Une application WebOs s'exécute dans le **UI System Manager** qui est un runtime construit sur les bases de WebKit (donc que du bon).
Les API WebOS sont accessibles (en js) grâce au framework **Mojo** qui fournit :

- une structure d'application avec une gestion des évènements, notifications, ...
- des widgets (composants graphiques d'IHM)
- des accès au "local storage", au system, vers l'extérieur, ...
- et plein d'autres choses que je n'ai pas encore eu le temps de découvrir

**Mojo** permet de construire des applications sur le modèle MVC.

Une application est appelée **"Stage"** (pensez à la fenêtre principale de votre navigateur).

Une application est composée de **"Scenes"** (pensez views/vues)

- - -
**Bon à Savoir : Mojo** n'arrive pas tout seul, il est fourni avec l'excellent framework js **[http://www.prototypejs.org/](http://www.prototypejs.org/)**.
On en parle ici : [http://www.weboshelp.net/getting-started-with-webos/161-webos-and-the-prototype-javascript-framework](http://www.weboshelp.net/getting-started-with-webos/161-webos-and-the-prototype-javascript-framework)

- - -

##Installation du SDK et de l'émulateur webOS

Là, je ne vous fait même pas un semblant d'explication, Palm (bon ok HP) a toujours eu une documentation très claire, donc suivez le guide et profitez-en, c'est rarement aussi simple : [https://developer.palm.com/content/resources/develop/sdk_pdk_download.html](https://developer.palm.com/content/resources/develop/sdk_pdk_download.html), et vous pouvez faire ça sous OSX, Win et Linux.

##Première application

Je vous propose de créer rapidement une application de type "slideware" pour vous faire découvrir juste "un bout" de la puissance de webOs et de son SDK.

###Préparation

- Créer un répertoire de travail `webos` (par ex)
- Aller dans le répertoire
- Taper la commande suivante : `palm-generate -p "{title:'MyLittleSlideWare', id:org.k33g.mylittleslideware, version:'1.0.0'}" MyLittleSlideWare`
- cette commande va vous générer le squelette de votre application

![Alt "webos_01.png"](https://github.com/k33g/articles/raw/master/res/webos_01.png)

Nous allons nous contenter de 3 slides. Pour cela nous allons créer des vues :

###Les vues

On parle aussi de *scenes*. Nous allons créer tout de suite nos 3 slides/vues/scenes avec les commandes suivantes :

	palm-generate -t new_scene -p "name:slide1" MyLittleSlideWare
	palm-generate -t new_scene -p "name:slide2" MyLittleSlideWare
	palm-generate -t new_scene -p "name:slide3" MyLittleSlideWare

6 fichiers viennent d'être générés :

dans /assistants :

- slide1-assistant.js
- slide2-assistant.js
- slide3-assistant.js

dans /views :

- /slide1/slide1-scene.html
- /slide2/slide2-scene.html
- /slide3/slide3-scene.html

![Alt "webos_02.png"](https://github.com/k33g/articles/raw/master/res/webos_02.png)

Allons modifier un peu le code :

####Modification des 3 pages html

Dans chacune des pages ci-dessous, vous allez remplacer le code html par :

**/slide1/slide1-scene.html**

	<div id="main" class="palm-hasheader">
	     <div class="palm-header">Slide 1</div>
	     <div class="palm-body-text">
	         <h1>Hello World</h1>
	         <p>WebOS rocks !!!</p>
	     </div>
	     <div id="cmdNext" name="cmdNext" x-mojo-element="Button">Next</div>
	</div>

**/slide2/slide2-scene.html**

	<div id="main" class="palm-hasheader">
	     <div class="palm-header">Slide 2</div>
	     <div class="palm-body-text">
	         <h1>Hi !</h1>
	         <p>This is slide number two</p>
	     </div>
	     <div id="cmdPrevious" name="cmdPrevious" x-mojo-element="Button">Previous</div>
	     <div id="cmdNext" name="cmdNext" x-mojo-element="Button">Next</div>
	</div>

**/slide3/slide3-scene.html**

	<div id="main" class="palm-hasheader">
	     <div class="palm-header">Slide 3</div>
	     <div class="palm-body-text">
	         <h1>The End</h1>
	         <p>That's all folks!</p>
	     </div>
	     <div id="cmdPrevious" name="cmdPrevious" x-mojo-element="Button">Previous</div>
	     <div id="cmdHome" name="cmdHome" x-mojo-element="Button">Home</div>
	</div>

####Afficher le 1er slide au démarrage

Nous souhaitons qu'au démarrage de l'application, s'affiche le 1er slide. Pour cela, il faut modifier le fichier `/app/assistants/stage-assistant.js` de la façon suivante :

	function StageAssistant() {
		/* this is the creator function for your stage assistant object */
	}

	StageAssistant.prototype.setup = function() {
		/* this function is for setup tasks that have to happen when the stage is first created */
	    this.controller.pushScene("slide1");
	};

- - -
**Remarque :** `StageAssistant()` est le constructeur, `setup()` est appelée au lancement/démarrage est dans notre cas, "poussera sur le devant de la scène" notre slide1 (*#mauvaisjeudemots*) : `this.controller.pushScene("slide1");`

- - -

####Dire aux boutons ce qu'ils doivent faire

**Allons modifier /assistants/slide1-assistant.js :**

*Modifions setup()*

	Slide1Assistant.prototype.setup = function() {
	  // a local object for button attributes
	     this.cmdNextAttributes = {};
	  // a local object for button model
	     this.cmdNextModel = {
	         "label" : "Next",
	         "buttonClass" : "",
	         "disabled" : false
	     };
	  // set up the button
	     this.controller.setupWidget("cmdNext", this.cmdNextAttributes, this.cmdNextModel);
	  // bind the button to its handler
	    Mojo.Event.listen(this.controller.get("cmdNext"), Mojo.Event.tap,
	        this.handleButtonPress.bind(this));
	};

*Ajoutons la méthode handleButtonPress()*

	Slide1Assistant.prototype.handleButtonPress = function(event){
	    Mojo.Controller.stageController.pushScene("slide2");
	};

**Allons modifier /assistants/slide2-assistant.js :**

*Modifions setup()*

	Slide2Assistant.prototype.setup = function() {

	     this.cmdNextAttributes = {};
	     this.cmdPreviousAttributes = {};

	     this.cmdNextModel = {
	         "label" : "Next",
	         "buttonClass" : "",
	         "disabled" : false
	     };

	     this.cmdPreviousModel = {
	         "label" : "Previous",
	         "buttonClass" : "",
	         "disabled" : false
	     };

	     this.controller.setupWidget("cmdNext", this.cmdNextAttributes, this.cmdNextModel);
	     this.controller.setupWidget("cmdPrevious", this.cmdPreviousAttributes, this.cmdPreviousModel);

	     Mojo.Event.listen(this.controller.get("cmdNext"), Mojo.Event.tap,
	        this.handleCmdNextPress.bind(this));

	     Mojo.Event.listen(this.controller.get("cmdPrevious"), Mojo.Event.tap,
	        this.handleCmdPreviousPress.bind(this));

	};

*Ajoutons les méthodes handle_mon_bouton_Press()*

	Slide2Assistant.prototype.handleCmdNextPress = function(event){
	    Mojo.Controller.stageController.pushScene("slide3");
	};

	Slide2Assistant.prototype.handleCmdPreviousPress = function(event){
	    Mojo.Controller.stageController.pushScene("slide1");
	};


**Allons modifier /assistants/slide3-assistant.js :**

*Modifions setup()*

	Slide3Assistant.prototype.setup = function() {
	     this.cmdHomeAttributes = {};
	     this.cmdPreviousAttributes = {};

	     this.cmdHomeModel = {
	         "label" : "Home",
	         "buttonClass" : "",
	         "disabled" : false
	     };

	     this.cmdPreviousModel = {
	         "label" : "Previous",
	         "buttonClass" : "",
	         "disabled" : false
	     };

	     this.controller.setupWidget("cmdHome", this.cmdHomeAttributes, this.cmdHomeModel);
	     this.controller.setupWidget("cmdPrevious", this.cmdPreviousAttributes, this.cmdPreviousModel);

	    Mojo.Event.listen(this.controller.get("cmdHome"), Mojo.Event.tap,
	        this.handleCmdHomePress.bind(this));

	    Mojo.Event.listen(this.controller.get("cmdPrevious"), Mojo.Event.tap,
	        this.handleCmdPreviousPress.bind(this));
	};

*Ajoutons les méthodes handle_mon_bouton_Press()*

	Slide3Assistant.prototype.handleCmdHomePress = function(event){
	    Mojo.Controller.stageController.pushScene("slide1");
	};

	Slide3Assistant.prototype.handleCmdPreviousPress = function(event){
	    Mojo.Controller.stageController.pushScene("slide2");
	};

Ouf!, c'est terminé. Maintenant, allons voir ce que cela donne

###On Lance le bouzin

Pour cela, nous allons faire quelques manipulations :

- Démarrer le **Simulator** (si cela ne fonctionne pas, et c'est mon cas sous Mac, démarrez directement VirtualBox et choisissez la VM qui vous convient, dans mon cas : SDK 2.1.0.519 (320x480))
- Passez en mode commande et positionnez vous un cran au-dessus de votre répertoire de travail (si vous êtes dedans faites `cd ..`)
- Packagez votre application : `palm-package MyLittleSlideWare`, cela va créer un fichier `org.k33g.mylittleslideware_1.0.0_all.ipk` 
- Installez votre application dans la VM : `palm-install org.k33g.mylittleslideware_1.0.0_all.ipk`
- Lancez votre application : `palm-launch org.k33g.mylittleslideware`

![Alt "webos_03.png"](https://github.com/k33g/articles/raw/master/res/webos_03.png)
![Alt "webos_04.png"](https://github.com/k33g/articles/raw/master/res/webos_04.png)
![Alt "webos_05.png"](https://github.com/k33g/articles/raw/master/res/webos_05.png)

**c'est beau non ? c'est trop facile !**

**BRAVO! VOUS ETES UN DEVELOPPEUR WEBOS ;)**

- - -

- pour arrêter votre application : `palm-launch -c org.k33g.mylittleslideware`
- pour supprimer votre application : de la VM : `palm-install -r org.k33g.mylittleslideware`
- lorsque vous faites des modifications de votre code, pas besoin de supprimer l'application, contentez vous de l'arrêter, puis de reproduire le processus de publication (packaging, installation et lancement)

- - -


###Plus loin ?

Et si nous ajoutions un menu ? Vous allez voir, ce n'est pas très compliqué.
Le menu nous servira à naviguer dans les slides.

####Tout d'abord, modifions /app/assistants/stage-assistant.js

Déclarons une variable globale qui va représenter notre menu (en mode web, c'est pas bien (d'en avoir trop), mais là on est dans un contexte applicatif) :

	var MyLittleSlideWare = {};

	MyLittleSlideWare.MenuAttr = {omitDefaultItems: true};

	MyLittleSlideWare.MenuModel = {
	    visible: true,
	    items: [
	            {label: "Slide 1", command: "do-slide1"},
	            {label: "Slide 2", command: "do-slide2"},
	            {label: "Slide 3", command: "do-slide3"}
	    ]
	};

Ajoutons (toujours dans stage-assistant.js) un handler pour capturer les évènements de sélection dans le menu :

	StageAssistant.prototype.handleCommand = function(event) {
	    if(event.type == Mojo.Event.command) {
	        switch(event.command) {
	            case "do-slide1":
	                Mojo.Controller.stageController.pushScene("slide1");
	            break;

	            case "do-slide2":
	                Mojo.Controller.stageController.pushScene("slide2");
	            break;

	            case "do-slide3":
	                Mojo.Controller.stageController.pushScene("slide3");
	            break;
	        }
	    }
	};

Ensuite il faut aller déclarer le menu dans chacun des fichiers assistants de nos scenes. Donc pour :

- slide1-assistant.js
- slide2-assistant.js
- slide3-assistant.js

donc dans chacune des methode `.setup()`, ajouter ceci :

	this.controller.setupWidget(Mojo.Menu.appMenu, MyLittleSlideWare.MenuAttr, MyLittleSlideWare.MenuModel);

####On relance le bouzin

- Re-packagez : `palm-package MyLittleSlideWare`
- Re-installez : `palm-install org.k33g.mylittleslideware_1.0.0_all.ipk`
- Re-lancez : `palm-launch org.k33g.mylittleslideware`

![Alt "webos_06.png"](https://github.com/k33g/articles/raw/master/res/webos_06.png)

Et voiloù, un beau menu, qui fonctionne (testez quand même)

##Conclusion

Comme vous venez de le voir, il est très facile de faire une application pour webOS. J'espère que cette plateforme rencontrera le succès, car son modèle de développement est très intéressant, on sent qu'il y a du boulot derrière (l'héritage Palm, des anciens ingés d'Apple, ...). Personnellement, je trouve ce SDK plus agréable à utiliser que de faire de l'Objective-C pour iOS, voire même du Java pour Android (pourtant j'aime bien Java).
Un autre avantage, l'émulateur est **bien bien bien** plus rapide que l'émulateur Android, ce qui est très appréciable si l'on souhaite tester souvent son code.

Maintenant, c'est à suivre de près : 

- Si j'ai bien compris, le webOs actuel embarque aussi node.js (mais je n'ai pas encore mis mon nez là dedans)
- le webOs 3 arrive cet été [https://developer.palm.com/content/resources/develop/webos_3_0_developer_beta.html](https://developer.palm.com/content/resources/develop/webos_3_0_developer_beta.html)
- ... en même temps que la tablette **TouchPad** [http://www.palm.com/us/products/pads/touchpad/index.html](http://www.palm.com/us/products/pads/touchpad/index.html)










