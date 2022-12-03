<template>
  <div class="task" :class="{done: task.isDone}">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i class="material-icons" @click="taskStore.deleteTask(task.id)">delete</i>
      <i class="material-icons" :class="{active: task.isFav}" @click="taskStore.toggleFav(task.id)">favorite</i>
      <i class="material-icons" :class="{done: task.isDone}" @click="taskStore.toggleDone(task.id)">done</i>

    </div>
  </div>
</template>

<script setup>
import {useTaskStore} from "@/stores/taskStore";

defineProps(['task']);
const taskStore = useTaskStore();

</script>

<style scoped>

</style>
