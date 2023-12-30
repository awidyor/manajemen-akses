<template>
  <section class="w-full mt-4 antialiased bg-gray-50 dark:bg-gray-900">
    <!-- Start coding here -->
    <div class="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
      <div class="overflow-x-auto">
        <table id="my-table" class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr class="border-b dark:border-gray-700">
              <th scope="col" class="px-4 py-4">
                Nama
              </th>
              <th scope="col" class="px-4 py-4">
                Jabatan
              </th>
              <th scope="col" class="px-4 py-4">
                Jenis Kelamin
              </th>
              <th scope="col" class="px-4 py-4">
                Tempat Masuk
              </th>
              <th scope="col" class="px-4 py-4">
                Metode Masuk
              </th>
              <th scope="col" class="px-4 py-4">
                Metode Keluar
              </th>
              <th scope="col" class="px-4 py-4">
                Waktu Masuk
              </th>
              <th scope="col" class="px-4 py-4">
                Waktu Keluar
              </th>
              <th scope="col" class="px-4 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d, index) in data" :key="index" class="border-b dark:border-gray-700">
              <td class="px-4 py-3">
                {{ d.user.nama }}
              </td>
              <td class="px-4 py-3">
                {{ d.user.jabatan.nama }}
              </td>
              <td class="px-4 py-3">
                {{ d.user.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}
              </td>
              <td class="px-4 py-3">
                {{ d.tempatMasuk }}
              </td>
              <td class="px-4 py-3">
                {{ d.metodeMasuk }}
              </td>
              <td class="px-4 py-3">
                {{ d.metodeKeluar ?? "-" }}
              </td>
              <td class="px-4 py-3">
                {{
                  new Date(d.waktuMasuk).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
                }}
              </td>
              <td class="px-4 py-3">
                {{
                  d.waktuKeluar ? new Date(d.waktuKeluar).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) : "-"
                }}
              </td>
              <td class="flex items-center justify-end px-4 py-3" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    required: true
  }
})
</script>
