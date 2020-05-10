<template>
  <div>
    <h4 class="title is-4">Обнаруженные нарушения</h4>
    <b-table :data="[normalizedReport]" :columns="columns"></b-table>
  </div>
</template>

<script>
export default {
  props: {
    report: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      props: {
        report: {
          type: Array,
          required: true
        }
      },

      columns: [
        {
          field: 'coords',
          label: 'Координаты'
        },
        {
          field: 'square',
          label: 'Площадь',
          centered: true
        },
        {
          field: 'district',
          label: 'Кадастровый квартал'
        },
        {
          field: 'type',
          label: 'Вид участка'
        },
        {
          field: 'number',
          label: 'Кадастровый номер'
        },
        {
          field: 'areaPurpose',
          label: 'Разрешенное применение для участка'
        }
      ]
    };
  },

  computed: {
    normalizedReport() {
      return {
        ...this.report,
        coords: `lat: ${this.report.coords[0]}, lon: ${this.report.coords[1]}`
      };
    }
  }
};
</script>
