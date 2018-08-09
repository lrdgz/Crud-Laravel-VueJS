new Vue({
    el: '#Crud',
    created: function(){
        this.getKeeps();
    },

    data:{
        keeps   : [],
        newKeep : '',
        fillKeep: {'id': '', 'keep': ''},
        errors  : []
    },

    methods: {

        //GET ALL KEEP
        getKeeps: function(){
            let urlKeeps = "tasks";
            axios.get(urlKeeps).then(response => {
                this.keeps = response.data
            })
        },

        //EDIT KEEP
        editKeep: function (keep) {
            this.fillKeep.id = keep.id;
            this.fillKeep.keep = keep.keep;

            $("#edit").modal('show');
        },

        //EDIT KEEP
        updateKeep: function (id) {
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
        deleteKeep: function(keep){
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


    }
});