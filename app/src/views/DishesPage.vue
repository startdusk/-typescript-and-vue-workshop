<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import NewDishForm from '../components/NewDishForm.vue'
import DishCard from '../components/DishCard.vue'
import SideMenu from '../components/SideMenu.vue'
import EditDishForm from '../components/EditDishForm.vue'
import type { Dish } from '@/types'
import { useRoute } from 'vue-router'
import { useDishStore } from '@/stores/DishStore'

type ShowFormState = '' | 'new' | 'edit'

/**
 * Dish module
 */
const dishStore = useDishStore()
const dishList = computed(() => dishStore.list)
const filteredDishList = computed((): Dish[] => {
  return dishList.value.filter((dish) => {
    if (dish.name) {
      return dish.name.toLowerCase().includes(filterText.value.toLowerCase())
    }
    return dishList.value
  })
})
const numberOfDishes = computed(() => {
  return filteredDishList.value.length
})
const addDish = (payload: Dish) => {
  dishStore.addDish(payload)
  hideForm()
}

/**
 * New form module
 */
const filterText = ref('')
const showForm = ref<ShowFormState>('')
const editDishId = ref('')
const editDishForm = (payload: Dish) => {
  showForm.value = 'edit'
  editDishId.value = payload.id
}
const updateDish = (updateDish: Dish) => {
  dishStore.updateDish(updateDish)
  hideForm()
}
const hideForm = () => {
  showForm.value = ''
}
onMounted(() => {
  const route = useRoute()
  if (route.query.new) {
    showForm.value = 'new'
  } else if (route.query.edit) {
    showForm.value = 'edit'
  }
})

const updateFilterText = (event: KeyboardEvent) => {
  filterText.value = (event.target as HTMLInputElement).value
}
</script>

<template>
  <main class="section">
    <div class="columns">
      <!-- Side Menu -->
      <SideMenu />

      <!-- Main Content -->
      <div class="column">
        <h1 class="title">Dishes</h1>

        <!-- CTA Bar -->
        <nav v-if="!showForm" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfDishes }}</strong> dishes
              </p>
            </div>

            <p class="level-item">
              <button @click="showForm = 'new'" class="button is-success">New</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Dish name"
                    :value="filterText"
                    @keyup.enter="updateFilterText"
                  />
                </p>
                <p class="control">
                  <button class="button">Search</button>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <!-- New Dish Form -->
        <NewDishForm v-if="showForm === 'new'" @add-new-dish="addDish" @cancel-new-dish="hideForm" />
        <!-- Edit Dish Form -->
        <EditDishForm
          v-else-if="showForm === 'edit'"
          :dishId="editDishId"
          @edit-dish="updateDish"
          @cancel-edit-dish="hideForm"
        />
        <!-- Display Results -->
        <div v-else class="columns is-multiline">
          <div v-for="item in filteredDishList" class="column is-full" :key="`item-${item}`">
            <DishCard :dish="item" @edit-dish="editDishForm" @delete-dish="dishStore.deleteDish" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
