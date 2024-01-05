<template>
  <div>
    <NuxtLayout>
      <h1 class="mb-4 text-2xl font-semibold tracking-tight scroll-m-20">
        Laporan
      </h1>

      <div class="flex gap-2">
        <button
          type="submit"
          class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="exportDataToPdf"
        >
          Export PDF
        </button>
        <ClientOnly>
          <template #fallback>
            <button class="text-white inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 hover:cursor-pointer" disabled>
              Memuat...
            </button>
          </template>
          <download-excel
            :data="dataForExcel"
            class="text-white inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 hover:cursor-pointer"
          >
            Export Excel
          </download-excel>
        </ClientOnly>
        <button
          type="submit"
          class="text-white inline-flex items-center bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
          @click="printData"
        >
          Print Laporan
        </button>
      </div>
      <DashboardLaporanDataTable :columns="columns" :data="data" />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import JsonExcel from 'vue-json-excel3'
import { columns } from '@/components/dashboard/laporan/columns'

const { $client } = useNuxtApp()

const downloadExcel = JsonExcel

useHead({
  title: 'Dashboard | Laporan'
})

definePageMeta({
  middleware: ['auth-logged-in']
})

const { data } = await $client.reporting.getAll.useQuery()
const dataForExcel = []
if (data.value) {
  data.value.forEach((d) => {
    const dataRow = {
      Nama: d.user.nama,
      Jabatan: d.user.jabatan.nama,
      'Jenis Kelamin': d.user.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan',
      'Tempat Masuk': d.tempatMasuk,
      'Metode Masuk': d.metodeMasuk,
      'Metode Keluar': d.metodeKeluar ?? '-',
      'Waktu Masuk': new Date(d.waktuMasuk).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }),
      'Waktu Keluar': d.waktuKeluar
        ? new Date(d.waktuKeluar).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
        : '-'
    }
    dataForExcel.push(dataRow)
  })
}

const exportDataToPdf = () => {
  // eslint-disable-next-line new-cap
  const doc = new jsPDF()
  const tableColumn = [
    'Nama',
    'Jabatan',
    'Jenis Kelamin',
    'Tempat Masuk',
    'Metode Masuk',
    'Metode Keluar',
    'Waktu Masuk',
    'Waktu Keluar'
  ]
  const tableRows = []

  data.value.forEach((d) => {
    const dataRow = [
      d.user.nama,
      d.user.jabatan.nama,
      d.user.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan',
      d.tempatMasuk,
      d.metodeMasuk,
      d.metodeKeluar ?? '-',
      new Date(d.waktuMasuk).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }),
      d.waktuKeluar
        ? new Date(d.waktuKeluar).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
        : '-'
    ]
    tableRows.push(dataRow)
  })

  doc.autoTable(tableColumn, tableRows, { startY: 20 })

  const date = Date().split(' ')
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
  doc.text('Laporan Kehadiran', 14, 15)
  doc.save(`report_${dateStr}.pdf`)
}

const printData = () => {
  const tableRows = []

  data.value.forEach((d) => {
    const dataRow = [
      d.user.nama,
      d.user.jabatan.nama,
      d.user.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan',
      d.tempatMasuk,
      d.metodeMasuk,
      d.metodeKeluar ?? '-',
      new Date(d.waktuMasuk).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }),
      d.waktuKeluar
        ? new Date(d.waktuKeluar).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
        : '-'
    ]
    tableRows.push(dataRow)
  })

  const myWindow = window.open('', '', 'width=800,height=600')
  myWindow.document.write(`
    <html>
      <head>
        <title>Laporan Kehadiran</title>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
            border: 1px solid black;
          }
          th, td {
            text-align: left;
            padding: 8px;
            border: 1px solid black;
          }
          tr:nth-child(even) {background-color: #f2f2f2;}
        </style>
      </head>
      <body>
        <h1>Laporan Kehadiran</h1>
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Jabatan</th>
              <th>Jenis Kelamin</th>
              <th>Tempat Masuk</th>
              <th>Metode Masuk</th>
              <th>Metode Keluar</th>
              <th>Waktu Masuk</th>
              <th>Waktu Keluar</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows
              .map((row) => {
                return `
                <tr>
                  <td>${row[0]}</td>
                  <td>${row[1]}</td>
                  <td>${row[2]}</td>
                  <td>${row[3]}</td>
                  <td>${row[4]}</td>
                  <td>${row[5]}</td>
                  <td>${row[6]}</td>
                  <td>${row[7]}</td>
                </tr>
              `
              })
              .join('')}
          </tbody>
        </table>
      </body>
    </html>
  `)
  myWindow.document.close()
  myWindow.focus()
  myWindow.print()
  myWindow.close()
}
</script>
