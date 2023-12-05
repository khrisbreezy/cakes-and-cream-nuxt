<template>
  <ul class="picture-list">
    <li v-for="(file, index) in files" :key="index" class="picture-list__item">
      <div class="picture-list__left">
        <img src="~assets/images/picture.png" class="picture-list__image" alt="">
        <span>{{ file.name }}</span>
      </div>
      <div class="picture-list__actions">
        <img src="~assets/images/minus.png" class="picture-list__actions-icon picture-list__actions-icon--minus" alt="" @click="removePicture(index)">
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: [
    'uploadedFiles'
  ],
  data: () => ({
    files: []
  }),
  watch: {
    uploadedFiles(val) {
      this.files = val;
    }
  },
  created() {
    this.files = this.uploadedFiles;
  },
  mounted() {

  },
  methods: {
    removePicture(index) {
      const files = Array.from(this.files);
      Array.from(files).splice(index, 1);
      console.log(files);
      // this.files = files;
      // console.log(this.files);
    },
  },
}
</script>
