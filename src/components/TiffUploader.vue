<template>
  <section>
    <h4 class="title is-4">Загрузка изображения для анализа</h4>
    <b-field>
      <b-upload v-model="dropFiles" multiple drag-drop>
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload" size="is-large"> </b-icon>
            </p>
            <p>
              Перетащите сюда файлы для загрузки или кликните, чтобы выбрать из
              проводника
            </p>
          </div>
        </section>
      </b-upload>
    </b-field>

    <div class="tags">
      <span
        v-for="(file, index) in dropFiles"
        :key="index"
        class="tag is-primary"
      >
        {{ file.name }}
        <button
          class="delete is-small"
          type="button"
          @click="deleteDropFile(index)"
        ></button>
      </span>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dropFiles: []
    };
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    }
  }
};
</script>
