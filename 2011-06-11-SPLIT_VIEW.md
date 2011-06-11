#iPad HTML Split-View with iOS5

Safari (mobile) on iOS5 will support native position:fixed and overflow:scroll. It's a great news for mobile webapps developers.

we'll see how to make a split-view "easily" with position:fixed and overflow:scroll
(not necessarily the best solution but if you know a better way you can edit this article and fork on github : [https://github.com/k33g/articles](https://github.com/k33g/articles)).

##First, create some styles :

###Body :

    body {
        background-color            : #ddd;
        color                       : #222;
        font-family                 : Helvetica;
        font-size                   : large;
        margin                      : 0;
        padding                     : 0;
        -webkit-user-select         : none;
        -webkit-text-size-adjust    : none;
    }

Then we need Header and footer,

###Header and Footer

    .head {
        top                         : 0px;
        border-bottom               : 1px solid #777;
    }

    .foot {
        bottom                      : 0px;
        border-top                  : 1px solid #777;
    }

    .head, .foot {
        overflow                    : hidden;
        display                     : block;
        position                    : fixed;

        width                       : inherit;

        margin                      : 0;

        line-height                 : 20px;
        height                      : 20px;

        padding-top                 : 10px;
        padding-bottom              : 10px;

        background                  : -webkit-gradient(linear, left top, left bottom, from(#fff), to(#ccc));

        text-align                  : center;
        text-decoration             : none;
        font-size                   : 16px;
        color                       : #333333;

        z-index                     : 100;
    }

- - -

**Remark :** position of header and footer is **fixed**, and overflow is **hidden**, and display is set to **block**
**Other Remark :** width is **inherit**

- - -

Now, we need 2 containers : left and right containers,

###Left and Right Containers

    .container {
        overflow                    : hidden;
        position                    : absolute;
        display                     : block;
        width                       : 100%;

        padding-top                 : 40px;
        padding-bottom              : 40px;

        top                         : 0px;
        background-color            : #ddd; /* same as body*/

        z-index                     : 50;
    }

    .left {
        float                       : left;
        left                        : 0px;
        width                       : 30%;
        z-index                     : 60;
    }

    .right {
        float                       : right;
        left                        : 30%;
        width                       : 70%;
        z-index                     : 70;
    }

- - -

**Remark :** position of container is **absolute**

- - -

Now, we have to put a **scrollable** container content in each "side" container (left and right) :

###Scrollable Content Container :

    .scrollable {
        overflow: scroll;
    }

##Create our html "mobile" code :

    <!DOCTYPE HTML>
    <html>
    <head>
        <title>SPLITVIEW</title>
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="viewport" content="user-scalable=no, width=device-width" />

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="stylesheet" href="splitview.css" type="text/css">

    </head>
    <body>
        <div class="container left">

            <div class="head">Head Left</div>

            <div class="container scrollable">
            </div>

            <div class="foot">Foot Left</div>

        </div>

        <div class="container right">

            <div class="head">Head Right</div>

            <div class="container scrollable">
            </div>

            <div class="foot">Foot Right</div>

        </div>

    </body>

    </html>

##I want a split border !

We have to add this : `style="border-left : 1px solid black; margin-left : 1px;"` to all the div of the right container :

Something like that :


    <div class="container right">

        <div class="head" style="border-left : 1px solid black; margin-left : 1px;">Head Right</div>

        <div class="container scrollable" style="border-left : 1px solid black; margin-left : 1px;">
        </div>

        <div class="foot" style="border-left : 1px solid black; margin-left : 1px;">Foot Right</div>

    </div>

##We have to set height of containers

Add a javascript code at the bottom of the page :

    var height = window.innerHeight - (document.querySelector('[class="head"]').offsetHeight * 2 -2);
    // * 2 because of header and footer
    // - 2 because of border-bottom of 1px of header and border-top of 1px of footer

    // set height of all containers
    [].slice.apply(document.querySelectorAll('.container')).forEach(function(elt) {
        elt.style['height'] = height+'px';
    });

##We have to set height of containers when orientation change

Then change previous code with this code :

    function refreshCalc() {
        var height = window.innerHeight - (document.querySelector('[class="head"]').offsetHeight * 2 -2);
        // * 2 because of header and footer
        // - 2 because of border-bottom (1px) of header and border-top (1px) of footer

        // set height of all containers
        [].slice.apply(document.querySelectorAll('.container')).forEach(function(elt) {
            elt.style['height'] = height+'px';
        });
    }

    window.addEventListener("orientationchange", function(){
        refreshCalc();
    }, true);

    refreshCalc();

##Add some content to scrollable containers :

    /*Creepy ... I know*/
    [].slice.apply(document.querySelectorAll('.scrollable')).forEach(function(elt) {
        for(var i = 0; i < 100; i +=1) { elt.innerHTML += 'HELLO WORLD ! ' ; }
    });

##And open page with iPad :

![Alt "landscape.png"](https://github.com/k33g/articles/raw/master/res/landscape.png)

![Alt "portrait.png"](https://github.com/k33g/articles/raw/master/res/portrait.png)

##Complete css code :

    body {
        background-color            : #ddd;
        color                       : #222;
        font-family                 : Helvetica;
        font-size                   : large;
        margin                      : 0;
        padding                     : 0;
        -webkit-user-select         : none;
        -webkit-text-size-adjust    : none;
    }

    .head {
        top                         : 0px;
        border-bottom               : 1px solid #777;
    }

    .foot {
        bottom                      : 0px;
        border-top                  : 1px solid #777;
    }

    .head, .foot {
        overflow                    : hidden;
        display                     : block;
        position                    : fixed;

        width                       : inherit;

        margin                      : 0;

        line-height                 : 20px;
        height                      : 20px;

        padding-top                 : 10px;
        padding-bottom              : 10px;

        background                  : -webkit-gradient(linear, left top, left bottom, from(#fff), to(#ccc));

        text-align                  : center;
        text-decoration             : none;
        font-size                   : 16px;
        color                       : #333333;

        z-index                     : 100;
    }

    .container {
        overflow                    : hidden;
        position                    : absolute;
        display                     : block;
        width                       : 100%;

        padding-top                 : 40px;
        padding-bottom              : 40px;

        top                         : 0px;
        background-color            : #ddd; /* same as body*/

        z-index                     : 50;
    }

    .left {
        float                       : left;
        left                        : 0px;
        width                       : 30%;
        z-index                     : 60;
    }

    .right {
        float                       : right;
        left                        : 30%;
        width                       : 70%;
        z-index                     : 70;
    }

    .scrollable {
        overflow: scroll;
    }

##Complete html code :

    <!DOCTYPE HTML>
    <html>
    <head>
        <title>SPLITVIEW</title>
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="viewport" content="user-scalable=no, width=device-width" />

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="stylesheet" href="splitview.css" type="text/css">

    </head>
    <body>
        <div class="container left">

            <div class="head">Head Left</div>

            <div class="container scrollable">
            </div>

            <div class="foot">Foot Left</div>

        </div>

        <div class="container right">

            <div class="head" style="border-left : 1px solid black; margin-left : 1px;">Head Right</div>

            <div class="container scrollable" style="border-left : 1px solid black; margin-left : 1px;">
            </div>

            <div class="foot" style="border-left : 1px solid black; margin-left : 1px;">Foot Right</div>

        </div>

    </body>

    <script>

        function refreshCalc() {
            var height = window.innerHeight - (document.querySelector('[class="head"]').offsetHeight * 2 -2);
            // * 2 because of header and footer
            // - 2 because of border-bottom of 1px of header and border-top of 1px of footer

            // set height of all containers
            [].slice.apply(document.querySelectorAll('.container')).forEach(function(elt) {
                elt.style['height'] = height+'px';
            });
        }

        window.addEventListener("orientationchange", function(){
            refreshCalc();
        }, true);

        refreshCalc();

        [].slice.apply(document.querySelectorAll('.scrollable')).forEach(function(elt) {
            for(var i = 0; i < 100; i +=1) { elt.innerHTML += 'HELLO WORLD ! ' ; }
        });


    </script>


    </html>