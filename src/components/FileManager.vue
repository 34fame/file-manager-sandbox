<template>
   <q-list>
      <div class="row q-gutter-lg">
         <q-card v-for="f in files" :key="f.fullPath">
            <q-card-section>
               <q-item-label>{{ f.bucket }}</q-item-label>
               <q-item-label>{{ f.fullPath }}</q-item-label>
               <q-item-label>{{ f.name }}</q-item-label>
            </q-card-section>
            <q-card-actions>
               <q-btn
                  color="positive"
                  icon="launch"
                  flat
                  dense
                  round
                  @click="handleLaunch(f)"
               />
               <q-btn
                  color="negative"
                  icon="delete"
                  flat
                  dense
                  round
                  @click="handleDelete(f)"
               />
            </q-card-actions>
         </q-card>
      </div>
   </q-list>
</template>

<script>
import { openURL, Notify } from 'quasar'

import { firestorage } from 'boot/firebase'

export default {
   name: 'FileManager',

   props: {
      files: {
         type: Array,
         required: true,
      },
   },

   methods: {
      handleLaunch(file) {
         openURL(file.url)
      },

      async handleDelete(file) {
         try {
            const storageRef = firestorage.ref()
            await storageRef.child(file.fullPath).delete()
            this.$emit('refresh')
         } catch (error) {}
      },
   },
}
</script>

<style></style>
