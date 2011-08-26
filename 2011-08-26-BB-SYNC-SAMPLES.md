#Backbone.sync : "Quelques exemples"

J'ai créé un nouveau repo GitHub : ["Ossicle"](https://github.com/k33g/ossicle) pour répertorier les différentes expériences que je pourrais faire sur Backbone.js.

J'ai bossé sur 2 versions de `Backbone.sync`, une pour faire du localStorage et une autre pour aller lire des fichiers markdown d'un repo GitHub (celle ci est "un peu" expérimentale.

##LocalStorage

Ce qui "m'ennuyait" dans l'exemple fourni sur le site de Backbone.js [backbone-localstorage.js](https://github.com/documentcloud/backbone/blob/master/examples/backbone-localstorage.js) c'est que c'est l'ensemble de la collection qui chargée : une collection correspond à une clé et une valeur (toute la collection) dans le localStorage du navigateur.

Je suis parti sur un système différent : un modèle correpond à une clé et une valeur (après on aime ou pas, c'est juste une question de point de vue), c'est à dire que l'on ne sauvegarde plus la collection (contenant les modèles) mais uniquement les modèles (avec une clé composée du nom de la "base" et de l'id du modèle). Vous pouvez donc charger un/des modèle(s) à partir du localStorage sans être obligé de charger toute la collection :


~~~ javascript

    window.Doc = Backbone.Model.extend({
        storeName : "docsDB"
    });


    window.Docs = Backbone.Collection.extend({
        model : Doc,
        storeName : "docsDB"
    });

    var doc1 = new Doc({id:'001', title:'TITLE 1', text:'TEXT1'});

    doc1.save(); //sauvegare le modèle avec une clé : "docsDB|001"

    /* ... */

    var un_doc = new Doc({id:'001'});
    un_doc.fetch(); //charge le modèle ayant la clé : "docsDB|001"

    var docs = new Docs(); //une collection

    docs.fetch(); //charge la collection à partie des modèles "persistés" dont la clé commence par "docsDB"

~~~

Le code source est ici : [https://github.com/k33g/ossicle/blob/master/js/backbone.sync/backbone-sync-localstorage.js](https://github.com/k33g/ossicle/blob/master/js/backbone.sync/backbone-sync-localstorage.js).


##GitHub API

L'utilisation est un peu différente (uniquement en lecture). Attention : c'est du bricolage.

- Vous trouverez le code ici : [backbone-sync-github.js](https://github.com/k33g/ossicle/blob/master/js/backbone.sync/backbone-sync-github.js)
- un exemple par là : [bb-github-api.js](https://github.com/k33g/ossicle/blob/master/bb-github-api.js) & [index-bb-github-api.html](https://github.com/k33g/ossicle/blob/master/index-bb-github-api.html)
- et enfin quelques explications : [2011-08-26-MAIN.md](https://github.com/k33g/ossicle/blob/master/posts/2011-08-26-MAIN.md) ou [README.md](https://github.com/k33g/ossicle/blob/master/README.md)

PS : je suis preneur de tout conseil et/ou amélioration

Et bon WE @ tous !