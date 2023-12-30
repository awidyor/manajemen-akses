<template>
  <!-- Start block -->
  <section class="w-full mt-4 antialiased bg-gray-50 dark:bg-gray-900">
    <!-- Start coding here -->
    <div class="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr class="border-b dark:border-gray-700">
              <th scope="col" class="px-4 py-4">
                ID Sidik Jari
              </th>
              <th scope="col" class="px-4 py-4">
                Tap Card ID
              </th>
              <th scope="col" class="px-4 py-4">
                Face ID
              </th>
              <th scope="col" class="px-4 py-4">
                Nama
              </th>
              <th scope="col" class="px-4 py-4">
                Jabatan
              </th>
              <th scope="col" class="px-4 py-4">
                Jenis Kelamin
              </th>
              <th scope="col" class="px-4 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d, index) in props.data" :key="index" class="border-b dark:border-gray-700">
              <td class="px-4 py-3">
                {{ d.fingerPrintId ?? "-" }}
              </td>
              <td class="px-4 py-3">
                {{ d.tapCardId ?? "-" }}
              </td>
              <td class="px-4 py-3">
                {{ d.faceId ?? "-" }}
              </td>
              <td class="px-4 py-3">
                {{ d.nama }}
              </td>
              <td class="px-4 py-3">
                {{ d.jabatan.nama }}
              </td>
              <td class="px-4 py-3">
                {{ d.jenisKelamin == "L" ? "Laki-Laki" : "Perempuan" }}
              </td>
              <td class="flex items-center justify-end px-4 py-3">
                <button :id="`${d.id}-button`" :data-dropdown-toggle="`${d.id}-dropdown`" class="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                  <EllipsisHorizontalIcon class="w-5 h-5" />
                </button>
                <div :id="`${d.id}-dropdown`" class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul class="py-1 text-sm" :aria-labelledby="`${d.id}-button`">
                    <li>
                      <button type="button" :data-modal-target="`${d.id}-updateUserModal`" :data-modal-toggle="`${d.id}-updateUserModal`" class="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dark:text-gray-200">
                        <PencilSquareIcon class="w-4 h-4 mr-2" />
                        Edit
                      </button>
                    </li>
                    <li>
                      <button type="button" :data-modal-target="`${d.id}-deleteModal`" :data-modal-toggle="`${d.id}-deleteModal`" class="flex items-center w-full px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-red-400">
                        <TrashIcon class="w-4 h-4 mr-2" />
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
                <!-- Update modal -->
                <div :id="`${d.id}-updateUserModal`" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div class="relative w-full max-w-2xl max-h-full p-4">
                    <!-- Modal content -->
                    <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                      <!-- Modal header -->
                      <div class="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5 dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                          Perbarui User
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" :data-modal-toggle="`${d.id}-updateUserModal`">
                          <XMarkIcon class="w-5 h-5" />
                          <span class="sr-only">Close modal</span>
                        </button>
                      </div>
                      <!-- Modal body -->
                      <form @submit.prevent="updateUser(d.id, $event)">
                        <div class="flex flex-row gap-2">
                          <div class="flex-1">
                            <label for="fingerPrintId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Sidik Jari</label>
                            <input
                              id="fingerPrintId"
                              type="text"
                              name="fingerPrintId"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                              placeholder="Tulis ID sidik jari user"
                              :value="d.fingerPrintId"
                            >
                          </div>

                          <div class="flex-1">
                            <label for="tapCardId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tap Card ID</label>
                            <input
                              id="tapCardId"
                              type="text"
                              name="tapCardId"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                              placeholder="Tulis tap card ID user"
                              :value="d.tapCardId"
                            >
                          </div>
                        </div>

                        <label for="faceId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Face ID</label>
                        <input
                          id="faceId"
                          type="text"
                          name="faceId"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          placeholder="Tulis face ID user"
                          :value="d.faceId"
                        >

                        <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                        <input
                          id="nama"
                          type="text"
                          name="nama"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          placeholder="Tulis nama user"
                          :value="d.nama"
                          required
                        >

                        <div class="flex flex-row gap-2">
                          <div class="flex-1">
                            <label for="jabatanId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jabatan</label>
                            <select
                              id="jabatanId"
                              name="jabatanId"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                              required
                            >
                              <option value="" selected>
                                Pilih Jabatan
                              </option>
                              <option v-for="(jab, jindex) in jabatanOptions" :key="jindex" :value="jab.value" :selected="d.jabatanId === jab.value">
                                {{ jab.text }}
                              </option>
                            </select>
                          </div>

                          <div class="flex-1">
                            <label for="jenisKelamin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Kelamin</label>
                            <select
                              id="jenisKelamin"
                              name="jenisKelamin"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                              required
                            >
                              <option value="" selected>
                                Pilih Jenis Kelamin
                              </option>
                              <option value="L" :selected="d.jenisKelamin == 'L'">
                                Laki-Laki
                              </option>
                              <option value="P" :selected="d.jenisKelamin == 'P'">
                                Perempuan
                              </option>
                            </select>
                          </div>
                        </div>

                        <button :disabled="isLoading" type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Perbarui
                        </button>
                        <p v-if="errorMessage" class="mt-2 text-sm text-red-500">
                          {{ errorMessage }}
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
                <!-- Delete modal -->
                <div :id="`${d.id}-deleteModal`" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div class="relative w-full max-w-md max-h-full p-4">
                    <!-- Modal content -->
                    <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                      <button type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" :data-modal-toggle="`${d.id}-deleteModal`">
                        <XMarkIcon class="w-5 h-5" />
                        <span class="sr-only">Close modal</span>
                      </button>
                      <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                      <p class="mb-4 text-gray-500 dark:text-gray-300">
                        Apakah kamu yakin ingin menghapus user <span class="font-bold">{{ d.nama }}</span>?
                      </p>
                      <div class="flex items-center justify-center space-x-4">
                        <button :data-modal-toggle="`${d.id}-deleteModal`" type="button" class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                          Batal
                        </button>
                        <button type="submit" class="px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" @click="deleteUser(d.id)">
                          Iya, Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
  <!-- End block -->
</template>

<script setup>
import {
  XMarkIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/vue/24/solid'
import { getQueryKey } from 'trpc-nuxt/client'
const { $client } = useNuxtApp()
const previousUser = ref([])

const queryKey = getQueryKey($client.user.getAll, undefined)

// Access to the cached value of useQuery
const { data: users } = useNuxtData(queryKey)
const { data: jabatans } = await $client.jabatan.getAll.useQuery()

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const errorMessage = ref('')

const updateUser = async (id, payload) => {
  if (!payload.target.fingerPrintId.value && !payload.target.tapCardId.value && !payload.target.faceId.value) {
    errorMessage.value = 'Mohon isi setidaknya salah satu ID (sidik jari, tap card, atau face ID)'
    return
  }

  // Store the previously cached value to restore if mutation fails.
  previousUser.value = users.value

  // Optimistically update the cache
  users.value = users.value.map((d) => {
    if (d.id === id) {
      return {
        ...d,
        fingerPrintId: payload.target.fingerPrintId.value,
        tapCardId: payload.target.tapCardId.value,
        faceId: payload.target.faceId.value,
        nama: payload.target.nama.value,
        jabatanId: payload.target.jabatanId.value,
        jenisKelamin: payload.target.jenisKelamin.value
      }
    }
    return d
  })

  errorMessage.value = ''

  try {
    await $client.user.update.mutate({
      id,
      fingerPrintId: payload.target.fingerPrintId.value,
      tapCardId: payload.target.tapCardId.value,
      faceId: payload.target.faceId.value,
      nama: payload.target.nama.value,
      jabatanId: payload.target.jabatanId.value,
      jenisKelamin: payload.target.jenisKelamin.value
    })
    document.querySelector(`[data-modal-toggle="${id}-updateUserModal"]`).click()
    await refreshNuxtData(queryKey)
  } catch (error) {
    // Restore the cached value
    users.value = previousUser.value
  } finally {
    payload.target.fingerPrintId.value = ''
    payload.target.tapCardId.value = ''
    payload.target.faceId.value = ''
    payload.target.nama.value = ''
    payload.target.jabatanId.value = ''
    payload.target.jenisKelamin.value = ''
    errorMessage.value = ''
  }
}

const deleteUser = async (id) => {
  // Store the previously cached value to restore if mutation fails.
  previousUser.value = users.value

  // Optimistically update the cache
  users.value.filter(d => d.id !== id)

  try {
    await $client.user.delete.mutate({
      id
    })
    document.querySelector(`[data-modal-toggle="${id}-deleteModal"]`).click()
    await refreshNuxtData(queryKey)
  } catch (error) {
    // Restore the cached value
    users.value = previousUser.value
  }
}

const jabatanOptions = computed(() => {
  return jabatans.value.map((jabatan) => {
    return {
      value: jabatan.id,
      text: jabatan.nama
    }
  })
})
</script>
