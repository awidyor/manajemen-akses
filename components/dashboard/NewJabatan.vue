<template>
  <button id="addJabatanModalButton" data-modal-target="addJabatanModal" data-modal-toggle="addJabatanModal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
    Tambah Jabatan
  </button>

  <div id="addJabatanModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
    <div class="relative w-full h-full max-w-2xl p-4 md:h-auto">
      <!-- Modal content -->
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <!-- Modal header -->
        <div class="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5 dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Form Tambah Jabatan
          </h3>
          <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="addJabatanModal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form @submit.prevent="addJabatan">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input
            id="name"
            v-model="jabatan"
            type="text"
            name="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            placeholder="Tulis nama jabatan"
            required
          >
          <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="w-6 h-6 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" /></svg>
            Simpan
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup type="ts">
import { getQueryKey } from 'trpc-nuxt/client'
import { useNuxtApp } from '#app'

const { $client } = useNuxtApp()
const previousJabatan = ref([])

const queryKey = getQueryKey($client.jabatan.getAll)

// Access to the cached value of useQuery
const { data: jabatans } = useNuxtData(queryKey)

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()
})

const jabatan = ref('')

const addJabatan = async () => {
  // Store the previously cached value to restore if mutation fails.
  previousJabatan.value = jabatans.value

  // Optimistically update the cache
  jabatans.value.push({
    id: jabatans.value.length + 1,
    nama: jabatan.value
  })

  try {
    await $client.jabatan.create.mutate({
      nama: jabatan.value
    })
    await refreshNuxtData(queryKey)
    document.querySelector('[data-modal-toggle="addJabatanModal"]').click()
    jabatan.value = ''
  } catch (error) {
    // Restore the cached value
    jabatans.value = previousJabatan.value
  }
}
</script>
