<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <h1>Projects</h1>
      </div>
    </section>
    <section class="row">
      <div v-for="project in projects" :key="project.id" class="col-12 col-md-3">
        <div class="card">
          <img :src="project.coverImg" class="card-img-top" :alt="project.title">
          <div class="card-body">
            <p class="card-title fs-5">{{ project.title }}</p>
            <button type="button" class="btn btn-danger">Open Gallery</button>
          </div>
        </div>
      </div>
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
