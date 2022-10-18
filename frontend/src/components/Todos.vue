<template>
  <div class="todos">
    <!----------------------------------------------->
    <!--todos intro http://image.yes24.com/goods/76105334/XL-->
    <div class="container my-4">
      <div class="row justify-content-center align-items-center">
        <div class="col text-center text-md-start">
          <h1>
            <div class="display-3">Willy Dreams</div>
            <div class="display-6 text-muted">
              willy dreams of becoming a good person
            </div>
          </h1>
          <div class="lead text-muted">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            ipsa hic non consequuntur veritatis laboriosam, aut nemo ipsum ad
            corrupti commodi deserunt pariatur harum totam, delectus quae
            labore? Debitis, ullam.
          </div>
          <button class="btn btn-secondary btn-lg my-4">Start</button>
        </div>
        <div class="col text-center d-none d-md-block">
          <img
            src="http://image.yes24.com/goods/76105334/XL"
            alt=""
            class="fluid"
            width="220"
          />
        </div>
      </div>
    </div>
    <!----------------------------------------------->
    <!--todos input-->
    <div class="container my-4">
      <label class="form-label">New To Do</label>
      <form @submit.prevent="addNewTodo">
        <div class="row d-flex align-items-center">
          <div class="col-auto">
            <input type="text" class="form-control" v-model="state.newTodo" />
          </div>
          <div class="col-auto">
            <button class="btn btn-primary btn-sm">Add</button>
          </div>
        </div>
      </form>
      <div class="form-text">Input new to do!</div>
    </div>
    <!----------------------------------------------->
    <!--todos list-->
    <div class="container my-4">
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="todo in state.todos" :key="todo.id">
          <div class="row d-flex justify-content-between align-item-center">
            <div class="col-auto form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                v-model="todo.done"
                @click="toggleDone(todo)"
              />
              <label
                class="form-check-label"
                for="flexCheckDefault"
                :class="{ todoDone: todo.done }"
              >
                {{ todo.title }}
              </label>
            </div>
            <div class="col-auto">
              <button
                class="btn btn-outline-scondary btn-sm"
                @click="deleteTodo(todo._id)"
              >
                X
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--  -->
  </div>
</template>
<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';

export default {
  name: 'Todos-vue',
  components: {},
  setup() {
    const state = reactive({
      todos: [],
      newTodo: '',
    });
    // backend serve - mongoose
    const BaseUrl = 'http://localhost:10181/api/v1/todos';

    const getTodos = () => {
      axios
        .get(BaseUrl)
        .then(res => {
          state.todos = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    };
    onMounted(() => {
      getTodos();
    });

    const addNewTodo = () => {
      if (state.newTodo) {
        axios
          .post(BaseUrl, {
            title: state.newTodo,
          })
          .then(res => {
            // console.log(res);
            getTodos();
          })
          .catch(error => {
            console.log(error);
          });
        // state.todos.push({
        //   id: Date.now(),
        //   title: state.newTodo,
        //   done: false,
        // });

        state.newTodo = '';
      }
    };

    const toggleDone = todo => {
      todo.done = !todo.done;

      // console.log(`${BaseUrl}/${todo._id}`);

      axios
        .put(`${BaseUrl}/${todo._id}`, {
          done: todo.done,
        })
        .then(res => {
          console.log(res);
          getTodos();
        })
        .catch(error => {
          console.log(error);
        });
    };

    const deleteTodo = id => {
      console.log(id);
      // state.todos.splice(index, 1);
      axios
        .delete(`${BaseUrl}/${id}`)
        .then(res => {
          console.log(res);
          getTodos();
        })
        .catch(error => {
          console.log(error);
        });
    };

    return {
      state,
      addNewTodo,
      toggleDone,
      deleteTodo,
    };
  },
};
</script>
<style lang="scss" scoped>
.todoDone {
  text-decoration: line-through;
}
</style>
