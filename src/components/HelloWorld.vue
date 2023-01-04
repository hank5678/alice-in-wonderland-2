<template>
  <div class="todobox">
    <h1 class="title">To-Do List</h1>
    <div style="margin-top: 15px">
      <input class="todoinput" v-model="userinput" placeholder="Enter a new task" v-on:keyup.enter="add()" />
    </div>
    <div>
      <div class="task" v-for="todo in todolist" :key="todo.id" style="margin-top: 15px">
        <input class="todoinput1" @click="checked(todo)" :class="{ checked: todo.status }" v-model="todo.title" readonly="readonly" />
        <i class="checkmark fa-solid fa-check" v-if="todo.status"></i>
        <i class="xmark fa-regular fa-circle-xmark" @click="remove(todo)"></i>
      </div>
    </div>

    <div style="margin-top: 15px">
      <img src="@/assets/logo.svg" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

let todolist = ref([])
let userinput = ref("")

let getTodoList = () => {
  axios
    .get("http://localhost:3000/todos")
    .then((res) => {
      todolist.value = res.data
    })
    .catch((err) => {
      alert("發生錯誤")
    })
}

function add() {
  if (userinput.value === "") {
    alert("請輸入文字")
    return
  }
  let data = {
    title: userinput.value,
    status: false
  }
  axios
    .post("http://localhost:3000/todos", data)
    .then((res) => {
      if (res.status === 201) {
        userinput.value = ""
        getTodoList()
      } else {
        alert("失敗")
      }
    })
    .catch(() => {
      alert("發生錯誤")
    })
}

function remove(todo) {
  axios
    .delete(`http://localhost:3000/todos/${todo.id}`)
    .then((res) => {
      if (res.status === 200) {
        getTodoList()
      } else {
        alert("失敗")
      }
    })
    .catch(() => {
      alert("發生錯誤")
    })
}

function checked(todo) {
  axios
    .patch(`http://localhost:3000/todos/${todo.id}`, {
      status: !todo.status
    })
    .then((res) => {
      if (res.status === 200) {
        getTodoList()
      } else {
        alert("失敗")
      }
    })
    .catch(() => {
      alert("發生錯誤")
    })
}

onMounted(() => {
  getTodoList()
})
</script>

<style scoped>
p {
  font-size: 24px;
}
img {
  width: 48px;
}

.title {
  margin-top: 15px;
}
.todobox {
  box-shadow: 0 0 1rem rgb(0 0 0 / 50%);
  width: 20%;
  text-align: center;
  background-color: white;
  border-radius: 1rem;
}
.todoinput {
  width: 75%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid rgb(231, 225, 225);
  font-size: 1rem;
  outline: none;
  padding-left: 38px;
}
.todoinput1 {
  width: 75%;
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
.checkmark {
  position: absolute;
  left: 28px;
  top: 10px;
  color: #41b883;
}
.checked {
  text-decoration: line-through;
  color: #41b883;
}
.loading {
  font-size: 14px;
}
</style>
