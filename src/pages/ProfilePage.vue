<template>
  <div class="container-fluid">
    <section v-if="profile" class="row">
      <div class="col-12 text-center my-3">
        <img class="profile-picture" :src="profile.picture" :alt="profile.name">
        <div>
          <img class="cover-img" :src="profile.coverImg" :alt="profile.name + ' cover image'">
        </div>
      </div>
      <div class="col-8 ps-5">
        <h1>
          <a v-if="profile.github" :href="profile.github" :title="`Go to ${profile.name}'s github!'`" target="_blank">
            <i class="mdi mdi-github"></i>
          </a>
          <!-- <span :class="{ 'fancy-font': profile.graduated == true }">{{ profile.name }}</span> -->
          <!-- <span :class="profile.graduated ? 'fancy-font' : ''">{{ profile.name }}</span> -->
          <span :class="{ 'fancy-font': profile.graduated }">{{ profile.name }}</span>

        </h1>
        <p>{{ profile.bio }}</p>
      </div>
      <div class="col-4">
        <h2>
          Projects: {{ projects.length }}
        </h2>
      </div>
    </section>
    <section class="row">
      <div v-for="project in projects" :key="project.id" class="col-12 col-md-4 mb-3">
        <ProjectCard :project="project" />
      </div>
    </section>
  </div>
</template>


<script>
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js'
import { AppState } from '../AppState.js'
import { projectsService } from '../services/ProjectsService.js';
import ProjectCard from '../components/ProjectCard.vue';

export default {
  setup() {
    // NOTE useRoute allows us to see information about the route, and allows us to pull out parameters from the route
    const route = useRoute();

    // NOTE creating a computed here so our watch function can watch this property
    const watchableProfileId = computed(() => route.params.profileId)

    async function getProfileById() {
      try {
        // NOTE pulls out the profile id being stored in our URL
        const profileId = route.params.profileId;
        await profilesService.getProfileById(profileId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    async function getProjectsByProfileId() {
      try {
        const profileId = route.params.profileId;
        await projectsService.getProjectsByProfileId(profileId);
      }
      catch (error) {
        Pop.error(error);
      }
    }

    // NOTE no longer using onMounted because we are using watch instead
    // onMounted(() => {
    //   logger.log(route);
    //   projectsService.clearAppState()
    //   getProfileById();
    //   getProjectsByProfileId();
    // });

    // NOTE watch will watch a piece of data, and run a callback function whenever that data changes
    // NOTE works similar to AppState.on('cats', _doSomething) || watch(()=> cats, _doSomething)
    // NOTE if we don't watch our route parameter, we won't get new data from API when our ID changes
    watch(
      // NOTE what I am watching. Must be a computed or getter 
      // getter example: watch(() => route.params.profileId, ()=>{})
      watchableProfileId,

      // NOTE what I do when watched property changes
      () => {

        logger.log(route);
        projectsService.clearAppState()
        getProfileById();
        getProjectsByProfileId();
      },

      // NOTE should I run my callback function on page load (works similar to onMounted)
      { immediate: true }
    )



    return {
      profile: computed(() => AppState.activeProfile),
      projects: computed(() => AppState.profileProjects)
    };
  },
  components: { ProjectCard }
}
</script>


<style lang="scss" scoped>
.profile-picture {
  height: 20vh;
}

.cover-img {
  height: 50vh;
  width: 80%;
  object-fit: cover;
}

.fancy-font {
  font-family: 'Josefin Sans', sans-serif;
}
</style>