<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div class="container-fluid">
    <section class="row">
      <div class="col-12 col-md-6 m-auto">
        <form @submit.prevent="updateAccount">
          <div class="mb-3">
            <label for="name">Name</label>
            <input v-model="editable.name" class="w-100" id="name" type="text" required>
          </div>
          <div class="mb-3">
            <label for="picture">Picture</label>
            <input v-model="editable.picture" class="w-100" id="picture" type="url" required>
          </div>
          <div class="mb-3">
            <label for="coverImg">Cover Image</label>
            <input v-model="editable.coverImg" class="w-100" id="coverImg" type="url" required>
          </div>
          <div class="mb-3">
            <label for="github">Github</label>
            <input v-model="editable.github" class="w-100" id="github" type="url">
          </div>

          <div class="mb-3">
            <label for="graduated">Graduated?</label>
            <input v-model="editable.graduated" class="ms-2" id="graduated" type="checkbox">
          </div>

          <div class="mb-3">
            <label for="bio">Bio</label>
            <textarea v-model="editable.bio" name="bio" id="" class="w-100" rows="10"></textarea>
          </div>

          <div class="text-end mb-3">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';
export default {
  setup() {
    const editable = ref({})

    // NOTE we compute the account in our setup function and return it out so we can watch the account
    const account = computed(() => AppState.account)

    watch(
      account,
      () => {
        // NOTE break reference to object stored in AppState
        // NOTE "..." is spread operator https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
        editable.value = { ...AppState.account }
      },
      { immediate: true }
    )

    return {
      editable,
      account,
      async updateAccount() {
        try {
          const accountData = editable.value
          await accountService.updateAccount(accountData)
          Pop.success('Updated account!')
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
