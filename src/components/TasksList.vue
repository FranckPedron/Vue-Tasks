<template>
  <nav class="filter">
    <button @click="filter = 'all'">All tasks</button>
    <button @click="filter = 'fav'">Favs tasks</button>
  </nav>

  <div class="loading" v-if="loading">Loading ...</div>

  <div class="task-list" v-if="filter === 'all'">
    <p>You have {{ totalCount }} tasks</p>
    <div v-for="task in tasks">
      <TaskDetails :task="task"/>
    </div>
  </div>

  <div class="task-list" v-if="filter === 'fav'">
    <p>You have {{ favCount }} favorites tasks</p>
    <div v-for="task in favs">
      <TaskDetails :task="task"/>
    </div>
  </div>

  <div class="task-list">
    <p>You have {{ undoneCount }} tasks left to do</p>
    <div v-for="task in unDone">
      <TaskDetails :task="task"/>
    </div>
  </div>

  <div class="task-list">
    <p>You have already done {{ doneCount }} tasks</p>
    <div v-for="task in done">
      <TaskDetails :task="task"/>
    </div>
  </div>
</template>

<script setup>
import {useTaskStore} from "@/stores/taskStore";
import TaskDetails from "@/components/TaskDetails.vue";
import {ref} from "vue";
import {storeToRefs} from "pinia";

const taskStore = useTaskStore();
taskStore.getTasks();

const {tasks, done, unDone, favs, doneCount, favCount, totalCount, undoneCount, loading} = storeToRefs(taskStore);
const filter = ref('all');
</script>

<style scoped>

</style>
