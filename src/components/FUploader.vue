<script>
import { Notify, QUploaderBase } from 'quasar'

import { firestorage, firebase } from 'boot/firebase'

export default {
   name: 'FUploader',

   props: {
      options: {
         type: Object,
         required: true,
      },
      label: {
         type: String,
         default: 'Drag files here or click "plus" icon to upload',
      },
      flat: {
         type: Boolean,
         default: true,
      },
      bordered: {
         type: Boolean,
         default: true,
      },
      square: {
         type: Boolean,
         default: true,
      },
      color: {
         type: String,
         default: 'grey',
      },
      textColor: {
         type: String,
         default: 'white',
      },
      hideUploadBtn: {
         type: Boolean,
         default: true,
      },
      autoUpload: {
         type: Boolean,
         default: true,
      },
   },

   data() {
      return {
         uploading: false,
         filesUploading: [],
      }
   },

   computed: {
      isUploading() {
         return this.uploading
      },

      isBusy() {
         return this.uploading
      },
   },

   methods: {
      abort() {},

      updateComponent(index, snapshot, status = 'uploading') {
         const file = this.files[index]
         const uploadSize = typeof snapshot === 'object' ? snapshot.bytesTransferred : 0
         this.__updateFile(file, status, uploadSize)
      },

      upload() {
         console.group('upload')
         try {
            if (this.canUpload === false) {
               return
            }
            this.uploading = true
            this.queuedFiles.forEach((file) => {
               this.filesUploading.push(this.uploadFileToFirestore(file))
            })
            Promise.all(this.filesUploading)
               .then(() => {
                  this.uploading = false
               })
               .catch((err) => {
                  this.uploading = false
                  Notify.create({
                     color: 'negative',
                     message: `One or more of your files failed to upload. ${err}`,
                  })
               })
               .finally(() => {})
         } catch (err) {
            console.error('error', err)
            return false
         } finally {
            console.groupEnd()
         }
      },

      async uploadFileToFirestore(file) {
         console.group('uploadFileToFirestore')
         try {
            const index = this.filesUploading.length
            const storageRef = firestorage.ref()
            const imagesRef = storageRef.child('images')
            const fileRef = imagesRef.child(file.name).put(file)
            const state_changed = firebase.storage.TaskEvent.state_changed

            return new Promise((resolve, reject) => {
               fileRef.on(
                  state_changed,
                  (snapshot) => {
                     // Update
                     this.updateComponent(index, snapshot)
                  },
                  (err) => {
                     // Error
                     console.error(err)
                     this.updateComponent(index, 0, 'failed')
                     reject()
                  },
                  () => {
                     // Done
                     this.files.map(async (f) => {
                        this.updateComponent(index, 0, 'uploaded')
                        const link = await fileRef.snapshot.ref.getDownloadURL()
                        Notify.create({
                           color: 'positive',
                           message: 'We have great success!',
                        })
                        this.$emit('refresh')
                     })
                     this.reset()
                     resolve()
                  }
               )
            })
         } catch (err) {
            console.error('error', err)
            return false
         } finally {
            console.groupEnd()
         }
      },
   },

   mixins: [QUploaderBase],
}
</script>
