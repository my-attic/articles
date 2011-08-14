
(function($) {

    window.Doc = Backbone.Model.extend({

        defaults : {
            id : "???",
            title : "Doc Title",
            text : "Bla bla bla",
            keywords : "word1, word2, word3, ..."
        },

        validate: function( attributes ){
            if( attributes.title == '') {
                return "Le titre du document ne peut pas être vide !!!";
            }
        },

        initialize : function Doc() {
            console.log('Doc Constructor');

            this.bind("error", function(model, error){
                console.log( error );
            });

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


    window.Docs = Backbone.Collection.extend({
        model : Doc,

        localStorage : new Store("docs"),

        initialize : function() {
            console.log('Docs collection Constructor');
        }
    });

    window.DocView = Backbone.View.extend({
        el : $('#doc-container'),
        initialize : function() {
            this.template = _.template($('#doc-template').html());

            /*--- binding ---*/
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
            /*---------------*/
        },

        setModel : function(model) {
            this.model = model;
            return this;
        },

        render : function() {
            var renderedContent = this.template(this.model.toJSON());
            $(this.el).html(renderedContent);
            return this;
        }

    });

    window.DocsCollectionView = Backbone.View.extend({
        el : $('#docs-collection-container'),

        initialize : function() {
            this.template = _.template($('#docs-collection-template').html());

            /*--- binding ---*/
            _.bindAll(this, 'render');
            this.collection.bind('change', this.render);
            this.collection.bind('add', this.render);
            this.collection.bind('remove', this.render);
            /*---------------*/

        },

        render : function() {
            var renderedContent = this.template({ docs : this.collection.toJSON() });
            $(this.el).html(renderedContent);
            return this;
        }

    });


    window.DocsCollectionViewTempo = Backbone.View.extend({

        initialize : function() {
            this.template = Tempo.prepare('documents-list');

            /*--- binding ---*/
            _.bindAll(this, 'render');
            this.collection.bind('change', this.render);
            this.collection.bind('add', this.render);
            this.collection.bind('remove', this.render);
            /*---------------*/

        },

        render : function() {
            this.template.render(this.collection.toJSON());
            return this;
        }

    });


    window.DocFormView = Backbone.View.extend({
        el : $('#doc-form-container'),

        initialize : function() {
            //Nothing to do now
        },
        events : {
            'submit form' : 'addDoc'
        },
        addDoc : function(e) {
            e.preventDefault();

            this.collection.add({
                id : this.$('.id').val(),
                title : this.$('.title').val(),
                text : this.$('.text').val(),
                keywords : this.$('.keywords').val()
            }, { error : _.bind(this.error, this) });

            this.$('input[type="text"]').val(''); //on vide le form

        },
        error : function(model, error) {
            console.log(model, error);
            return this;
        }

    });



})(Zepto);


