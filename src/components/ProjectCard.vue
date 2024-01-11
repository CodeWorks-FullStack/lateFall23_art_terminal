<template>
  <div class="card">
    <img :src="project.coverImg" class="card-img-top" :alt="project.title">
    <div class="card-body">
      <p class="card-title fs-5">{{ project.title }}</p>
      <button type="button" class="btn btn-danger">Open Gallery</button>
    </div>
  </div>
</template>


<script>
import { Project } from '../models/Project.js';

export default {
  props: {
    project: { type: Project, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped></style>