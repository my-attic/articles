/*------------------------------------------------------------*/
/*           JavaScript MVC sans aucun Framework              */
/*                                                            */
/*                                                            */
/*    - Il faudra faire des copies consoles pour              */
/*      pour chaque étape (eg: le selector)                   */
/*                                                            */
/*------------------------------------------------------------*/

/*------------------------------------------------------------*/
/*                       MODEL                                */
/*------------------------------------------------------------*/
var Model = {
    kind : "Model",
    save : function() { console.log('save ', this); },
    remove : function() { console.log('remove ', this); },

    init : function(args) {
        var m, S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        if(args) { for(m in args) { this[m] = args[m]; } }
        if(!this.id) { this.id = S4() + S4() + S4() + S4()  + S4()  + S4() + S4() + S4(); }
        return this;
    },
    getInstance : function(args) {
        return Object.create(this).init(args);
    },

    extend : function(class_def) {
        var m, k = Object.create(this);
        /*--- define members ---*/
        for(m in class_def) {
            Object.defineProperty(k, m,{
                value : class_def[m],
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
        return k;
    }
}

/*------------------------------------------------------------*/
/*                       MODELS (Collection)                  */
/*------------------------------------------------------------*/

var List = {
    kind : "List",
    models : [],

    init : function(model) {
        this.model = model;
        return this;
    },
    getInstance : function(model) {
        return Object.create(this).init(model);
    },

    add : function(something) {
        if(Array.isArray(something)) {
            var i, that = this;
            for(i=0;i < something.length; i+=1) {
                if(something[i].kind === that.model.kind) {
                    that.models.push(something[i]);
                } else {
                    throw "Expected : " + that.model.kind;
                }
            }
        } else {
            if(something.kind === this.model.kind) {
                this.models.push(something);
            } else {
                throw "Expected : " + this.model.kind;
            }
        }
    },

    all : function() {
        return this.models;
    },

    each : function(handler) {
        this.models.forEach(handler);
    },

    filter : function(handler) {
        return this.models.filter(handler);
    }

    //TODO: supprimer un élément de la liste ?

}

/*------------------------------------------------------------*/
/*                       VIEW Helper                          */
/*------------------------------------------------------------*/

//Pour moi la vue, c'est uniquement les portions du DOM HTML (à la Play!)

var $q = function(selector) {
    this.watch = function(what, handler){};
    this.unwatch = function(what){};
    this.elements = [].slice.apply(document.querySelectorAll(selector));
    if(this.elements.length === 1) { return this.elements[0]; } else { return this.elements; }
};

//$q('form > * input') : liste de tous les champs de saisie
//$q('form > * input').filter(function(e){ return e.id === "nom"; })


/*------------------------------------------------------------*/
/*                       Controller                           */
/*------------------------------------------------------------*/

var Controller = {
    //events : {},
    init : function() {
        var m, e;
        for(m in this.events) {
            var el = $q(this.view + ' > ' + m);
            //console.log(el);
            if(Array.isArray(el)) {
                //console.log(this.view + ' > ' + m, el);
                el.forEach(function(e) { e.addEventListener(this.events[m][0],this.events[m][1],false); });
            } else {
                el.addEventListener(this.events[m][0],this.events[m][1],false);
            }


        }
        return this;
    },

    //$q('#my_view > * li')

    extend : function(class_def) {
        var m, k = Object.create(this);
        /*--- define members ---*/
        for(m in class_def) {
            Object.defineProperty(k, m,{
                value : class_def[m],
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
        k.init();
        return k;
    }

}