<template>
  <div class="no-data-stub box">
    <h4 class="title is-5 has-text-grey">{{ title }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: 'Пока что ничего нет'
    }
  }
};
</script>

<style scoped>
.no-data-stub {
  background: center / contain no-repeat url('~@/assets/desert.svg');
  width: 100%;
  min-width: 100px;
  height: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
