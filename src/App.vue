<template>
  <main>
    <header>
      <h1>
        tasks
      </h1>
    </header>
    <TaskForm />
    <TasksList />
  </main>
</template>

<script setup>
import TasksList from "@/components/TasksList.vue";
import TaskForm from "@/components/TaskForm.vue";
</script>
