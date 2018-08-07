new Vue({
    el: '#Crud',
    created: function(){
        this.getKeeps();
    },

    data:{
        keeps: []
    },

    methods: {

        //GET ALL KEEP
        getKeeps: function(){
            let urlKeeps = "tasks";
            axios.get(urlKeeps).then(response => {
                this.keeps = response.data
            })
        },

        //DELETE KEEP
        deleteKeep: function(keep){
            let url = 'tasks/' + keep.id;
            axios.delete(url).then(response => {
                this.getKeeps();
            })
        }
    }
});