<form action="POST" v-on:submit.prevent="updateKeep(fillKeep.id)">
    <div class="modal fade" id="edit">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>Editar Tarea</h4>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <label for="keep">Editar Tarea</label>
                    <input type="text" name="keep" id="keep" class="form-control" v-model="fillKeep.keep">
                    <span v-for="error in errors" class="text-danger"> @{{ error }} </span>
                </div>
                <div class="modal-footer">
                    <input type="submit" class="btn btn-primary" value="Aztualizar">
                </div>
            </div>
        </div>
    </div>
</form>
