<template>
  <div class="todobox">
    <div class="pagenate">
      <a-pagination :current="current" :total="total" :pageSize="pageSize" @change="change" />
    </div>

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
import axios from "@/utils/axios"

let current = ref(1) //預設當前頁數在第一頁
let todolist = ref([])
let userinput = ref("")
let total = ref(0)
let pageSize = 5

let getTodoList = (page, pageSize) => {
  axios.get("/todos", { params: { _page: page, _limit: pageSize } }).then((res) => {
    todolist.value = res.data
    total.value = res.headers["x-total-count"]
  })
}

function change(page, pageSize) {
  getTodoList(page, pageSize)
  current.value = page
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
  axios.post("/todos", data).then(() => {
    userinput.value = ""
    getTodoList(current.value, pageSize)
  })
}

function remove(todo) {
  axios.delete(`/todos/${todo.id}`).then(() => {
    getTodoList(current.value, pageSize)
  })
}

function checked(todo) {
  axios
    .patch(`/todos/${todo.id}`, {
      status: !todo.status
    })
    .then(() => {
      getTodoList(current.value, pageSize)
    })
}

onMounted(() => {
  getTodoList(current.value, pageSize)
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
.pagenate {
  margin-top: 10px;
}
.pagenate > button {
  margin-left: 10px;
}
</style>
