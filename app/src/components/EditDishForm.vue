<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Dish } from '@/types'
import { useRouter } from 'vue-router'
import { useDishStore } from '@/stores/DishStore'

const emits = defineEmits<{
  (e: 'edit-dish', dish: Dish): void
  (e: 'cancel-edit-dish'): void
}>()
const router = useRouter()
const elNameInput = ref<HTMLInputElement | null>(null)

const props = defineProps<{
  dishId: string
}>()

const dishStore = useDishStore()

const targetDish = dishStore.getDishById(props.dishId)
if (!targetDish) {
  router.back()
}

const newDish = ref<Dish>({
  id: targetDish?.id ? targetDish?.id : '',
  name: targetDish?.name ? targetDish.name : '',
  status: targetDish?.status ? targetDish?.status : 'Want to Try',
  diet: targetDish?.diet ? targetDish.diet : '',
})

const editDish = () => {
  emits('edit-dish', newDish.value)
}

const cancelEditDish = () => {
  emits('cancel-edit-dish')
}

onMounted(() => {
  elNameInput.value?.focus()
})
</script>

<template>
  <form @submit.prevent>
    <div class="field">
      <div class="field">
        <label for="name" class="label">Edit Name</label>
        <div class="control">
          <input
            v-model="newDish.name"
            type="text"
            class="input is-large"
            placeholder="Mystery Flavored Shrimp"
            required
            ref="elNameInput"
          />
        </div>
      </div>
      <div class="field">
        <div class="buttons">
          <button @click="editDish" class="button is-success">Edit</button>
          <button @click="cancelEditDish" class="button is-light">Cancel</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style></style>
