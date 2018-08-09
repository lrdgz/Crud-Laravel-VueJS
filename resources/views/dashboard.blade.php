@extends('app')

@section('content')

<div id="Crud" class="row">

    <div class="col-xs-12 col-lg-12 col-xl-12">
        <h1 class="page-header">Crud Laravel & Vue</h1>
    </div>


    <div class="col-sm-7 col-lg-7 col-xl-7">
        <a href="#" class="btn btn-primary pull-right" data-toggle="modal" data-target="#create">New Task</a>
        <table class="table table-hover table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Task</th>
                    <th colspan="2">&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="keep in keeps">
                    <td width="10px"> @{{ keep.id }} </td>
                    <td> @{{ keep.keep }} </td>
                    <td width="10px">
                        <a href="#" class="btn btn-warning btn-sm" v-on:click.prevent="editKeep(keep)">Editar</a>
                    </td>
                    <td width="10px">
                        <a href="#" class="btn btn-danger btn-sm" v-on:click.prevent="deleteKeep(keep)">Eliminar</a>
                    </td>
                </tr>
            </tbody>
        </table>

        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" v-if="pagination.current_page > 1"><a class="page-link" href="#" @click.prevent="changePage(pagination.current_page - 1)">Previous</a></li>

                <li v-for="page in pagesNumber" class="page-item" v-bind:class="[ page == isActived ? 'active' : '']">
                    <a href="#" class="page-link" @click.prevent="changePage(page)">
                        @{{ page }}
                    </a>
                </li>

                <li class="page-item"v-if="pagination.current_page < pagination.last_page"><a class="page-link" href="#" @click.prevent="changePage(pagination.current_page + 1)">Next</a></li>
            </ul>
        </nav>

        @include('create')
        @include('edit')
    </div>


    <div class="col-sm-5 col-lg-5 col-xl-5">
        <pre>
            @{{ $data }}
        </pre>
    </div>
</div>

@endsection