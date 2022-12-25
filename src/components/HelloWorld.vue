<!-- eslint-disable prettier/prettier -->
<template>
  <div class="todobox">
    <h1 style="margin-top: 15px">To-Do List</h1>
    <div style="margin-top: 15px">
      <input class="todoinput" v-model="userinput" placeholder="Enter a new task" v-on:keyup.enter="SendStraSearch()" />
    </div>
    <div>
      <div class="task" v-for="(todolist, index) in todolists.todo" :key="todolist" style="margin-top: 15px">
        <input
          class="todoinput"
          @click="checked(todolist)"
          :class="todolist.status == true ? 'checked' : ''"
          v-model="todolists.todo[index].title"
          placeholder="Enter a new task"
          readonly="readonly"
          
        />
        <i class="checkmark fa-solid fa-check" v-if="todolist.status==true"></i>
        <i class="xmark fa-regular fa-circle-xmark" @click="remove(todolist)"></i>
      </div>
    </div>

    <div style="margin-top: 15px">
      <img src="@/assets/logo.svg" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { reactive } from "vue"

// import logo from "../assets/logo.svg"
import { uuid } from "vue-uuid"

let userinput = ref("")
let todolists = reactive({
  todo: []
})
function SendStraSearch() {
  todolists.todo.push({
    id: uuid.v4(),
    title: userinput.value,
    status: false
  })
}

function remove(todolist) {
  todolists.todo = todolists.todo.filter((x) => x.id != todolist.id)
}

function checked(todolist) {
  console.log(todolist.status)
  if (todolist.status == true) {
    console.log(todolist.status + "11111")
    todolist.status = false
  } else {
    todolist.status = true
  }
}
</script>

<style scoped>
p {
  font-size: 24px;
}
img {
  width: 48px;
}
.todobox {
  box-shadow: 0 0 1rem rgb(0 0 0 / 50%);
  width: 20%;
  text-align: center;
  background-color: white;
  border-radius: 1rem;
}
.todoinput {
  width:75%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid rgb(231, 225, 225);
  font-size: 1rem;
  outline: none;
  padding-left: 38px;
}
.task {
  position: relative;
}
.task {
  position: relative;
}
.xmark {
  position: absolute;
  right: 30px;
  top: 10px;
  color: red;
}
.checkmark{
  position: absolute;
  left: 28px;
  top: 10px;
  color:#41b883

}
.checked {
  text-decoration: line-through;
  color: #41b883;
}
</style>
