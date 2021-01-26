<template>
   <q-page padding class="column q-gutter-lg">
      <f-uploader :options="options" @refresh="fetchFiles" />
      <file-manager :files="files" @refresh="fetchFiles" />
   </q-page>
</template>

<script>
import { firestorage } from 'boot/firebase'

export default {
   name: 'PageIndex',

   data() {
      return {
         files: [],
      }
   },

   computed: {
      options() {
         return {}
      },
   },

   methods: {
      async fetchFiles() {
         const storageRef = firestorage.ref()
         const result = await storageRef.child('images').listAll()
         let files = []
         await Promise.all(
            result.items.map(async (file) => {
               const url = await storageRef.child(file.fullPath).getDownloadURL()
               file.url = url
               files.push(file)
            })
         )
         this.files = files
      },
   },

   async mounted() {
      await this.fetchFiles()
   },

   components: {
      FileManager: () => import('components/FileManager.vue'),
      FUploader: () => import('components/FUploader.vue'),
   },
}
</script>
