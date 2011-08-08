#Backbone : "Dans l'ordre" - Part I

##Introduction

    //TODO: décrire le projet (specs), parler des prochaines "PARTS", ...


##Initialisation de l'application :

Avant toute chose, nous allons créer la structure de notre application. Il n'y a rien d'imposé. Libre à vous d'adapter en fonction de vos règles de développement. J'utilise **Zepto** pour les accès au DOM, mais vous pouvez tout aussi bien utiliser **jQuery**.

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


###Et maintenant, jouons avec

Ouvrez dans votre navigateur préféré la page `index.html`, le mieux, c'est de bosser avec Chrome, Safari ou FireFox, leur mode console est terriblement pratique, comme vous allez pouvoir le voir tout de suite.

Forcément, vous ne voyez rien dans le navigateur, passez donc en mode console (pour Chrome & Safari : click-droit sur la page + "inspect elemement" + onglet "Console", pour FF : menu "Tools", puis "Web Console", mais franchement, ça sera mieux avec Chrome ou Safari)

1. Dans la console tapez `d1 = new Doc()`

    ![Alt "bb_01_01.png"](https://github.com/k33g/articles/raw/master/res/bb_01_01.png)

    Vous pouvez voir que l'instance `d1` de la "classe" `Doc` (qui hérite de `Backbone.Model`) possède une propriété `attributes` qui contient l'ensemble des propriétés de notre modèle (ici avec les valeurs par défaut).

2. Dans la console tapez `d2 = new Doc({ id : '001', title : 'Mon 1er doc', text : 'Hello world', keywords : 'hello, world'})`

    ![Alt "bb_01_02.png"](https://github.com/k33g/articles/raw/master/res/bb_01_02.png)

    Vous pouvez voir que la propriété `attributes` contient l'ensemble des propriétés avec les valeurs initialisées au moment du `new(...)`. Et si vous déroulez la "branche" `__proto__` de l'objet `d2`, vous voyez les valeurs par défaut. Vous pouvez aussi saisir dans la console, ceci `Doc.prototype.defaults` pour obtenir la liste des valeurs par défaut.

###???

###Bind ?


##Collections

