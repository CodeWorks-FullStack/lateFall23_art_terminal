<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <h1>Projects</h1>
      </div>
    </section>
    <section class="row">
      {{ projects }}
    </section>
  </div>
</template>

<script>
import Pop from '../utils/Pop.js';
import { projectsService } from '../services/ProjectsService.js'
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js'

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
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss"></style>
