#Jekyll & GitHub

##Introduction

[Jekyll](https://github.com/mojombo/jekyll) est un générateur de site web statique fait en ruby à partir de fichier markdown (et textile). Il se trouve qu'il est installé automatiquement sur GitHub quand vous créez un compte, et que vous n'avez pas besoin de faire du ruby pour l'utiliser. Une fois l'arborescence du site construite, vous n'avez plus qu'à "pusher" vos billets au format markdown pour qu'ils soient publiés sur votre blog.

**Remarque :** je vous présente "ma méthode", le plus simple est probablement de forker un blog Jekill, mais au moins mon cheminement vous fera comprendre 2,3 trucs, pour le reste, lisez la doc. Au départ, suivez les instructions à la lettre pour avoir un 1er site qui fonctionne, après, bidouillez !


##Pré-requis

- avoir un compte GitHub,
- savoir utiliser git (les bases)
- connaître markdown (textile fonctionne aussi)
- créer un repository avec un nom du type `votre_user.github.com`, donc votre user, si c'est `bob`, le repository devra s'appeller `bob.github.com` et vous aurez une url `http://bob.github.com`, c'est ce que permet [github:pages](http://pages.github.com/) en mode **"User & Organization Pages"**
- une fois votre repository créé, vous l'importer sur votre machine avec votre client git préféré (ou en mode commande si vous êtes à l'aise) *personnellement j'utilise SmartGit*
- et vous allez créer l'arborescence suivante et les fichiers vides pour chacun des directories :


~~~
    .
    |-- _config.yml
    |-- _layouts
    |   |-- default.html
    |   `-- post.html
    |-- _posts
    |   |-- 2011-07-25-MON-PREMIER-POST.md
    |   `-- 2011-07-26-MON-DEUXIEME-POST.md
    |-- _site
    |-- css
    |-- images
    `-- index.html
~~~


##Construction du site

###css

Récupérer les 2 feuilles de style suivantes : (ce sont celles du blog du créateur de Jekill, nous les modifierons plus tard)

- [https://raw.github.com/mojombo/mojombo.github.com/master/css/screen.css](https://raw.github.com/mojombo/mojombo.github.com/master/css/screen.css)
- [https://raw.github.com/mojombo/mojombo.github.com/master/css/syntax.css](https://raw.github.com/mojombo/mojombo.github.com/master/css/syntax.css)

Placez les dans le répertoire css, `screen.css` définit les styles de votre blog, `syntax.css` permet la colorisation du code source que vous présentez dans vos articles. (N'oubliez pas de les ajouter dans votre repo local).

###_config.yml

C'est le fichier de configuration de votre blog, nous n'allons pas y mettre grand chose, mais il existe de nombreuses options de configuration que vous pouvez consulter ici : [Configuration](https://github.com/mojombo/jekyll/wiki/Configuration), mais elles vous serviront principalement si vous installez Jekill sur votre propre plateforme, ce qui n'est pas le sujet de ce tuto.

####contenu de _config.yml

    auto : true
    url: "http://bob.github.com/"
    markdown : rdiscount
    pygments : true

En gros, on explique à Jekill que l'on souhaite une génération automatique (`auto : true`) des pages html dans le répertoire `_site` à partir des fichiers markdown, que le moteur de rendu markdown vers htm est `rdiscount` et que l'on souhaite bénéficier de la colorisation du code (`pygments : true`).

###_layouts

Ce répertoire contient les templates de votre site, `default.html`, c'est le template général du site (ce qui s'affiche quand vous arrivez sur le site et sur toutes les pages), et `post.html`, c'est ce qui vous permet d'afficher le contenu d'un "billet/article"

####contenu de default.html

~~~ html
    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en-us">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <title>{{ page.title }}</title>
        <meta name="author" content="bob" />

        <!-- syntax highlighting CSS -->
        <link rel="stylesheet" href="/css/syntax.css" type="text/css" />
        <!-- Homepage CSS -->
        <link rel="stylesheet" href="/css/screen.css" type="text/css" media="screen, projection" />

    </head>
    <body>
        <div class="site">
            <div class="title">
                <a href="/">Bob's blog</a>
            </div>

            {{ content }}

            <div class="footer">
                <div class="contact">
                    <p>
                        <a href="http://github.com/bob/">github.bob</a><br/>
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>
~~~

**Remarque :** rappelez vous que vous n'êtes pas Bob ...

####contenu de post.html

Dans ce template, on explique que l'on utilise pour le détail d'un article, le template par défaut (`layout: default)`, on affiche le contenu avec la balise suivante : `{{ content }}`, et en dessous, on affiche les liens des 3 derniers posts.

~~~ html
    ---
    layout: default
    ---
    <div id="post">
        {{ content }}
    </div>

    <div id="related">
        <h2>Related Posts</h2>
            <ul class="posts">
            {% for post in site.related_posts limit:3 %}
              <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
            {% endfor %}
        </ul>
    </div>
~~~

###A la racine du site ...index.html

####contenu de index.html

On se contente d'afficher la liste des "billets/articles" du blog

~~~ html
    ---
    layout: default
    title: Who is this Bob ?
    ---

    <div id="home">
        <div>
            <br>
            <h2>Blog Posts</h2>
            <ul class="posts">
                {% for post in site.posts %}
                  <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a> <br>
                      {{ post.info }}</li>
                {% endfor %}
            </ul>
        </div>
    </div>
~~~

le "draft" de votre blog est terminé, reste à saisir des articles.

##Saisir un article :

Les articles sont saisis dans le répertoire `_posts`

###Règle de nom de fichier

Vous devez les nommer de cette façon : `YYYY-MM-DD-MON-FICHIER.md` (ça permet de les classer correctement), par exemple : `2011-07-26-JEKILL-ON-GITHUB.md`.

###Format

Un article "Jekill" commence toujours par un cartouche d'en-tête avec le format suivant (après vous adaptez) :


    ---

    layout: post
    title: Le titre de mon article ...
    info : un petit descriptif de mon article

    ---

Ensuite le reste de l'article est saisi au format markdown, par exemple :

    #Le titre de mon article ...

    ##un sous titre

    *Curabitur blandit tempus porttitor. Cras justo odio, dapibus ac facilisis in, egestas eget quam.*

    **Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum.**

Si vous voulez afficher du code "avec la couleur", vous l'entourez des balises `{% highlight nom_techno %}`et `{% endhighlight %}`, plus de détail ici : [https://github.com/mojombo/jekyll/wiki/liquid-extensions](https://github.com/mojombo/jekyll/wiki/liquid-extensions) (en fin de page)

- Saisissez plusieurs articles
- un commit, puis un push de tout ça, et normalement vous pouvez accéder à votre site via l'url `http://bob.github.com`
- **TERMINE !!!**, facile !, non ?, il ne vous rest plus qu'à faire de "jolis styles"

##Pour aller plus loin

Le plus intéressant c'est de regarder ce que font les autres (en fait Jekill permet pas mal de choses : pagination, générer des flux rss, etc. ...), une liste de sites : [https://github.com/mojombo/jekyll/wiki/Sites](https://github.com/mojombo/jekyll/wiki/Sites)

###Ajouter un système de commentaires pour vos posts

La solution que j'utilise ici est : [Disqus](http://disqus.com/) qui est très simple à mettre en oeuvre. Si vous voulez regarder comment j'ai fait, c'est ici : [template post.html](https://github.com/k33g/k33g.github.com/blob/master/_layouts/post.html)

###Ajouter un système de stats

En ce qui me concerne j'utilise Google Analytics, pour l'intégrer, voici comment j'ai fait (en bas de page) : [template default.html](https://github.com/k33g/k33g.github.com/blob/master/_layouts/default.html)

###Une dernière remarque

Vous pouvez aussi créer un site Jekyll pour chacun de vos repositories en utilisant [github:pages](http://pages.github.com/) en mode **"Project Pages"** et cette fois ci vous aurez une url de type `http://bob.github.com/le_nom_de_votre_projet`.

Voilà, finalement c'est simple, c'est pratique. Github, c'est terrible. En espérant que cela vous fasse sauter le pas.

@+.
