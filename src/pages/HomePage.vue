<template></template>

<script>
import Pop from '../utils/Pop.js';
import { projectsService } from '../services/ProjectsService.js'
import { onMounted } from 'vue';

export default {
  setup() {
    async function getProjects() {
      try {
        await projectsService.getProjects()
      } catch (error) {
        Pop.error(error)
      }
    }

    onMounted(() => {
      getProjects()
    })

    return {

    }
  }
}
</script>

<style scoped lang="scss"></style>
