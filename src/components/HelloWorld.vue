<template>
  <div class="todobox">
    <div class="pagenate">
      <a-pagination :current="current" :total="total" :pageSize="pageSize" @change="change" show-less-items />
    </div>
    <a-spin tip="Loading..." :spinning="loading" >
      <h1 class="title">To-Do List</h1>
      <div v-for="page in pagination">
      <button @click="getTodoList(page.url)">{{ page.name }}</button>
      </div>
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
    </a-spin>

 
  </div>




</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"


let current=ref(1)//預設當前頁數在第一頁
let todolist = ref([])
let pagination = ref([])//放name跟url的陣列
let userinput = ref("")
let total=ref(0)
let pageSize=ref(5)

let loading=ref(false)

let getTodoList = (pageNumber =1) => {//預設當前頁數在第一頁
 loading.value=true
  axios
    .get(`http://localhost:3000/todos?`,{params:{_page:pageNumber,_limit:pageSize.value}})
    .then((res) => {
      console.log(res)
      todolist.value = res.data
      total.value=Number(res.headers["x-total-count"])//取得總筆數
      loading.value=false
    })
    .catch((err) => {
      alert("發生錯誤")
    })
}

// //不用取得總筆數
// let getTodoList = (url = 'http://localhost:3000/todos?_page=1&_limit=4') => {//page->當前頁數,limit->一頁顯示筆數
//   axios
//     .get(url)
//     .then((res) => {
//       console.log(res)
//       todolist.value = res.data
//       // total.value=res.headers["x-total-count"]
//       let contents = res.headers.link.split(',');
//       pagination.value = [];//每次都要先把陣列清空,不然資料一直累計進去會出事..(按鈕變很多)
//       // for(var i=0;i<contents.length;i++){
       
//       // }

//       contents.forEach(x=>{
//         let name=x.split(";")[1].split("=")[1].replaceAll("\"","")
//           let url=x.split(";")[0].replace("<","").replace(">","")
//           console.log(name,url)
//           pagination.value.push({//把分割完的name跟url丟進pagination的陣列裡面
//             name:name,
//             url:url
//           })
//       })

      // pagination.value = pagination.value.map(x=>{
      //     let name=x.split(";")[1].split("=")[1].replaceAll("\"","")
      //     let url=x.split(";")[0].replace("<","").replace(">","")
      //     console.log(name,url)
      //     let res = {//把分割完的name跟url丟進pagination的陣列裡面
      //       name:name,
      //       url:url
      //     }
      //    return res;
      // })

//       console.log(pagination)





//     })
//     .catch((err) => {
//       alert("發生錯誤")
//     })
// }



function change(page,pageSize){
  console.log(page,pageSize)
  current.value=page
  getTodoList(page);
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
.pagenate{
  margin-top: 10px;
}
.pagenate>button{
  margin-left: 10px;
}
</style>
