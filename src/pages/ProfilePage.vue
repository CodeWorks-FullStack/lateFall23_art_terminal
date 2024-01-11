<template>
  <div class="container-fluid">
    <section v-if="profile" class="row">
      <div class="col-12 text-center my-3">
        <img :src="profile.picture" :alt="profile.name">
        <div>
          <img class="cover-img" :src="profile.coverImg" :alt="profile.name + ' cover image'">
        </div>
      </div>
      <div class="col-12 ps-5">
        <h1>{{ profile.name }}</h1>
        <p>{{ profile.bio }}</p>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js'
import { AppState } from '../AppState.js'

export default {
  setup() {
    const route = useRoute()

    async function getProfileById() {
      try {
        const profileId = route.params.profileId
        await profilesService.getProfileById(profileId)
      } catch (error) {
        Pop.error(error)
      }
    }

    onMounted(() => {
      logger.log(route)
      getProfileById()
    })
    return {
      profile: computed(() => AppState.activeProfile)
    }
  }
}
</script>


<style lang="scss" scoped>
.cover-img {
  height: 50vh;
  width: 80%;
  object-fit: cover;
}
</style>