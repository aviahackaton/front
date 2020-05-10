<template>
  <div>
    <h4 class="title is-4">Отчеты по загруженным изображениям</h4>
    <nav class="panel">
      <p class="panel-heading">
        Отчеты
      </p>
      <div class="panel-block">
        <p class="control has-icons-left">
          <b-input
            v-model="searchRequest"
            placeholder="Поиск по отчетам"
          ></b-input>
          <span class="icon is-left">
            <i class="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>
      </div>
      <div
        v-for="report in filteredReports"
        :key="report.id"
        class="panel-block report"
        :class="{ 'is-active': isActive(report) }"
        @click="$emit('select', report.id)"
      >
        <span class="panel-icon">
          <i class="fas fa-book" aria-hidden="true"></i>
        </span>
        {{ report.name }}
        <b-tag class="date-tag" rounded>{{ report.date | date }}</b-tag>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'ReportsList',

  filters: {
    date(date) {
      return new Intl.DateTimeFormat('ru-RU').format(new Date(date * 1000));
    }
  },

  props: {
    activeReportId: {
      type: Number,
      required: false,
      default: null
    },

    reports: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  data() {
    return {
      searchRequest: ''
    };
  },

  computed: {
    normalizedSearchRequest() {
      return this.searchRequest.toLowerCase();
    },

    filteredReports() {
      if (!this.searchRequest) return this.reports;

      return this.reports.filter(({ name }) =>
        name.toLowerCase().includes(this.normalizedSearchRequest)
      );
    }
  },

  methods: {
    isActive({ id }) {
      return this.activeReportId === id;
    }
  }
};
</script>

<style scoped>
.report {
  cursor: pointer;
}

.date-tag {
  margin-left: auto;
  margin-right: 10px;
}
</style>
