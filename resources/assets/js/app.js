new Vue({
    el: '#Crud',
    created: function(){
        this.getKeeps();
    },

    data:{
        keeps   : [],
        pagination: {
            'total'         : 0,
            'current_page'  : 0,
            'per_page'      : 0,
            'last_page'     : 0,
            'from'          : 0,
            'to'            : 0
        },
        newKeep : '',
        fillKeep: {'id': '', 'keep': ''},
        errors  : []
    },

    computed :{

        //CURRENT ACTIVE PAGE
        isActived: function () {
            return this.pagination.current_page;
        },

        //CALCULATE ITEMS TO VIEW
        pagesNumber: function () {
            
            if (!this.pagination.to){
                return [];
            }

            let from = this.pagination.current_page - 2; //TODO Offset
            if (from < 1){
                from = 1;
            }

            let to = from + ( 2 * 2); //TODO Offset
            if (to >= this.pagination.last_page){
                to = this.pagination.last_page;
            }

            let pagesArray = [];

            while(from <= to){
                pagesArray.push(from);
                from ++;
            }
            return pagesArray;
        }

    },

    methods: {

        //GET ALL KEEP
        getKeeps: function( page ){
            let urlKeeps = "tasks?page="+page;
            axios.get(urlKeeps).then(response => {
                this.keeps = response.data.tasks.data;
                this.pagination = response.data.pagination;
            });
        },

        //EDIT KEEP
        editKeep: function ( keep ) {
            this.fillKeep.id = keep.id;
            this.fillKeep.keep = keep.keep;

            $("#edit").modal('show');
        },

        //EDIT KEEP
        updateKeep: function ( id ) {
            let url = 'tasks/' + id;
            axios.put(url, this.fillKeep).then(response => {
                this.getKeeps();
                this.fillKeep= {'id': '', 'keep': ''};
                this.errors  = [];
                $("#edit").modal('hide');
                toastr.success("Actualizado Correctamente")
            }).catch(error => {
                this.errors = error.response.data;
            })
        },

        //DELETE KEEP
        deleteKeep: function( keep ){
            let url = 'tasks/' + keep.id;
            axios.delete(url).then(response => {
                this.getKeeps();
                toastr.success("Eliminado Correctamente")
            })
        },

        //CREATE KEEP
        createKeep: function () {
            let url = 'tasks';
            axios.post(url, {
                keep: this.newKeep
            }).then(response => {
                this.getKeeps();
                this.newKeep = '';
                this.errors  = [];
                $("#create").modal('hide');
                toastr.success("Creado Satisfactoriamente")
            }).catch(error => {
                this.errors = error.response.data;
            });
        },

        //CHANGE PAGE
        changePage: function ( page ) {
            this.pagination.current_page = page;
            this.getKeeps( page );

        }

    }
});