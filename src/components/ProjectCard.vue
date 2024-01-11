<template>
  <div class="card">
    <img :src="project.coverImg" class="card-img-top project-cover-img" :alt="project.title">
    <div class="card-body d-flex justify-content-between align-items-center">
      <div>
        <p class="card-title fs-5">{{ project.title }}</p>
        <button type="button" class="btn btn-danger">Open Gallery</button>
      </div>
      <RouterLink to="Profile">
        <img :title="`Go to ${project.creator.name}'s Profile Page!`" class="profile-img" :src="project.creator.picture"
          :alt="project.creator.name">
      </RouterLink>
    </div>
  </div>
</template>


<script>
import { RouterLink } from 'vue-router';
import { Project } from '../models/Project.js';

export default {
  props: {
    project: { type: Project, required: true }
  },
  setup() {
    return {};
  },
  components: { RouterLink }
}
</script>


<style lang="scss" scoped>
.profile-img {
  height: 7vh;
  width: 7vh;
  border-radius: 50%;
  object-fit: cover;
}

.project-cover-img {
  height: 40vh;
  object-fit: cover;
  object-position: center;
}
</style>