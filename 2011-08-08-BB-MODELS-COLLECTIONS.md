#Backbone : "Dans l'ordre" - Part I : "Modèles & Collections"

##Introduction

    //TODO: décrire le projet (specs), parler des prochaines "PARTS", ...


##Initialisation de l'application :

Avant toute chose, nous allons créer la structure de notre application. Il n'y a rien d'imposé. Libre à vous d'adapter en fonction de vos règles de développement. J'utilise **Zepto** pour les accès au DOM, mais vous pouvez tout aussi bien utiliser **jQuery**.*(Dans cette 1ère partie, Zepto ou jQuery sont inutiles)*

1. Créer un répertoire `myLittleBrain` pour votre application avec l'arborescence suivante (et fichiers)

        .
        |-- js
        |   |-- myLittleBrain.js        /* fichier vide */
        |   `-- vendor
        |       |-- backbone-min.js     /* http://documentcloud.github.com/backbone/backbone-min.js */
        |       |-- underscore-min.js   /* http://documentcloud.github.com/underscore/underscore-min.js */
        |       `-- zepto.min.js        /* http://zeptojs.com/downloads/zepto-0.6.zip */
        |
        |-- css                         /* répertoire vide pour le moment */
        `-- index.html

2. Initialisation du fichier `myLittleBrain.js`

        (function($) {

            //Ici viendra le code ...

        })(Zepto);

3. Initialisation du fichier `index.html`

        <!DOCTYPE HTML PUBLIC>
        <html>
        <head>
            <title>My Little Brain</title>
            <script src="js/vendor/zepto.min.js"></script>
            <script src="js/vendor/underscore-min.js"></script>
            <script src="js/vendor/backbone-min.js"></script>
            <script src="js/myLittleBrain.js"></script>

            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        </head>
        <body>

        </body>

        </html>

##Modèles

    //TODO : définir le modèle (et aussi selon BackBone)

###1er Modèle

Dans `myLittleBrain.js`, nous allons créer notre modèle `Doc`, par convention nous faisons commencer le nom du modèle par une majuscule, et le nom du modèle est au singulier. Un "modèle BackBone" hérite de `Backbone.Model` et est défini avec le mot clé `extend` de la manière suivante :

~~~ javascript

    (function($) {

        window.Doc = Backbone.Model.extend({

            defaults : {
                id : "???",
                title : "Doc Title",
                text : "Bla bla bla",
                keywords : "word1, word2, word3, ..."
            },

            initialize : function Doc() {
                console.log('Doc Constructor');
            }
        });


    })(Zepto);

~~~

La propriété `default` permet d'attribuer des valeurs par défaut aux instances du modèle (c'est optionnel). La méthode `initialize` est appelée lorsque que l'on instantie le modèle.

Pour instancier le modèle, il suffit d'écrire : `new Doc()`, est vous obtiendrez un modèle avec des valeurs par défaut. Ou bien : `new Doc({ id : '001', title : 'Mon 1er doc', text : 'Hello world', keywords : 'hello, world'})`.

*Remarque : la propriété `id` n'est pas obligatoire, mais elle nous servira par la suite.*

*Autre remarque : j'ai "englobé" mon code dans une fonction anonyme pour éviter les problématiques de variables globales, et j'utilise `window.Doc` pour rendre `Doc` "disponible" (accessible) à l'extérieur de la fonction anonyme. Et `(function($) ... })(Zepto);` permet de définir que `$ = Zepto`.*


###Et maintenant, jouons avec

Ouvrez dans votre navigateur préféré la page `index.html`, le mieux, c'est de bosser avec Chrome, Safari ou FireFox, leur mode console est terriblement pratique, comme vous allez pouvoir le voir tout de suite.

Forcément, vous ne voyez rien dans le navigateur, passez donc en mode console (pour Chrome & Safari : click-droit sur la page + "inspect elemement" + onglet "Console", pour FF : menu "Tools", puis "Web Console", mais franchement, ça sera mieux avec Chrome ou Safari)

1. Dans la console tapez `d1 = new Doc()`

    ![Alt "bb_01_01.png"](https://github.com/k33g/articles/raw/master/res/bb_01_01.png)

    Vous pouvez voir que l'instance `d1` de la "classe" `Doc` (qui hérite de `Backbone.Model`) possède une propriété `attributes` qui contient l'ensemble des propriétés de notre modèle (ici avec les valeurs par défaut).

2. Dans la console tapez `d2 = new Doc({ id : '001', title : 'Mon 1er doc', text : 'Hello world', keywords : 'hello, world'})`

    ![Alt "bb_01_02.png"](https://github.com/k33g/articles/raw/master/res/bb_01_02.png)

    Vous pouvez voir que la propriété `attributes` contient l'ensemble des propriétés avec les valeurs initialisées au moment du `new(...)`. Et si vous déroulez la "branche" `__proto__` de l'objet `d2`, vous voyez les valeurs par défaut. Vous pouvez aussi saisir dans la console, ceci `Doc.prototype.defaults` pour obtenir la liste des valeurs par défaut.

###Jouons avec les attributs ... du modèle

La "class" `Backbone.Model` fournit 2 méthodes pour lire et modifier les valeurs des attributs de l'instance :

- `.get(attribute_name)`
- `.set({ attribute_name, attribute_value})`

Essayez en mode console : tapez `doc = new Doc({ id : '001', title : 'Mon 1er doc', text : 'Hello world', keywords : 'hello, world'})`, puis :

![Alt "bb_01_03.png"](https://github.com/k33g/articles/raw/master/res/bb_01_03.png)

**Remarque :** le modèle BackBone surcharge la méthode `toJSON()` de `Object` et permet d'exporter les attributs dans une chaîne JSON, ce qui est pratique pour la persistence, la sérialisation, "transfert" de données etc. ... :

![Alt "bb_01_04.png"](https://github.com/k33g/articles/raw/master/res/bb_01_04.png)

Et du coup vous pouvez auss écrire ceci : `autreDoc = new Doc(doc.toJSON())`

![Alt "bb_01_05.png"](https://github.com/k33g/articles/raw/master/res/bb_01_05.png)


###Ajoutons des méthodes au modèle

Il est bien sûr possible de surcharger le modèle en luis ajoutons des méthodes. Si par exemple vous trouvez que le système de `.set({ attribute_name, attribute_value})` et `.get(attribute_name)` ne correspond pas à vos habitudes et que vous souhaitez quelque chose d'un peu plus "java-like", vous pouvez écrire votre modèle de cette façon :

~~~ javascript

    window.Doc = Backbone.Model.extend({

        defaults : {
            id : "???",
            title : "Doc Title",
            text : "Bla bla bla",
            keywords : "word1, word2, word3, ..."
        },

        initialize : function Doc() {
            console.log('Doc Constructor');
        },

        getId : function() {
            return this.get('id');
        },
        setId : function(value) {
            this.set({ id : value });
        },

        getTitle : function() {
            return this.get('title');
        },
        setTitle : function(value) {
            this.set({ title : value });
        },

        getText : function() {
            return this.get('text');
        },
        setText : function(value) {
            this.set({ text : value });
        },

        getKeywords : function() {
            return this.get('keywords');
        },
        setKeywords : function(value) {
            this.set({ keywords : value });
        }

    });

~~~

Démonstration :

![Alt "bb_01_06.png"](https://github.com/k33g/articles/raw/master/res/bb_01_06.png)

###Ecoute, Ecoute ...

Il est possible de s'abonner aux changements effectués sur un modèle. Les modèles backbone ont une méthode `bind` que vous pouvez utiliser de la façon suivante : `doc.bind('change',function(){ console.log('doc has change : ', this.toJSON()); })`

Démonstration :

![Alt "bb_01_07.png"](https://github.com/k33g/articles/raw/master/res/bb_01_07.png)

Vous pouvez aussi "écouter" les changements spécifiques à un attribut bien particulier : `doc.bind('change:text',function(){ console.log('text has change : ', this.get('text')); })`

Démonstration :

![Alt "bb_01_08.png"](https://github.com/k33g/articles/raw/master/res/bb_01_08.png)

... Et vous pouvez remarquer que les "abonnements" se cumulent.

**Remarque :** pour annuler un, des ou tous les abonnements, il faut utiliser la méthode `unbind()` :

    object.unbind("change", onChange);  // Removes just the onChange callback.

    object.unbind("change");            // Removes all "change" callbacks.

    object.unbind();                    // Removes all callbacks on object.

(cf. : [http://documentcloud.github.com/backbone/#Events-unbind](http://documentcloud.github.com/backbone/#Events-unbind)).


###Validation

Les modèles backbone permettent aussi de procéder à la validation des données en utilisant justement le système d'abonnement vu précédemment :

1. Ajoutons une méthode `validate()` à notre modèle :

        validate: function( attributes ){
            if( attributes.title == '') {
                return "Le titre du document ne peut pas être vide !!!";
            }
        },

2. Mettons un abonnement à l'évènement `error` dans le constructeur du modèle :

        initialize : function Doc() {
            console.log('Doc Constructor');

            this.bind("error", function(model, error){
                console.log( error );
            });

        },

Et, démonstration :

![Alt "bb_01_09.png"](https://github.com/k33g/articles/raw/master/res/bb_01_09.png)

##Collections



##Conclusion

Là vous avez les bases pour écrire vos modèles et collections correctement (enfin j'espère) et commencer à apprendre à les utiliser. Mais nous n'avons vu qu'une partie des possibilités des modèles et des collections : la prochaine fois nous verrons comment les utiliser avec du "local storage" mais aussi comment les faire "communiquer" avec un serveur http pour obtenir des données (ou sauvegarder des données).