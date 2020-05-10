<template>
  <div id="app">
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Отслеживание незаконных построек
          </h1>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="columns">
        <div class="column">
          <TiffUploader />
        </div>
        <div class="column">
          <NoData v-if="noReports" title="Отчетов еще нет" />
          <ReportsList
            v-else
            :reports="reports"
            :active-report-id="activeReport && activeReport.id"
            @select="fetchReport"
          />
        </div>
      </div>
    </section>
    <section v-if="activeReport" class="section">
      <h3 class="title is-3">
        Подробная информация по отчету {{ activeReport.name }}
      </h3>
      <div class="columns">
        <div class="column">
          <AnalysisReport :report="activeReport" />
        </div>
        <div class="column">
          <figure class="image is-4by3">
            <img :src="activeReport.image" />
          </figure>
          <AreasMap v-if="false" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { isEmpty } from 'lodash/fp';

import { fetchReports, fetchReport } from '@/api/index';

import AreasMap from './components/AreasMap.vue';
import TiffUploader from '@/components/TiffUploader.vue';
import ReportsList from '@/components/ReportsList.vue';
import AnalysisReport from '@/components/AnalysisReport.vue';
import NoData from '@/components/NoData.vue';

export default {
  name: 'App',

  components: {
    AreasMap,
    TiffUploader,
    ReportsList,
    AnalysisReport,
    NoData
  },

  data() {
    return {
      reports: [],
      activeReport: {}
    };
  },

  computed: {
    noReports() {
      return isEmpty(this.reports);
    }
  },

  async mounted() {
    this.reports = await fetchReports();
  },

  methods: {
    async fetchReport(id) {
      this.activeReport = await fetchReport(id);
    }
  }
};
</script>

<style>
#app {
  font-family: 'Noto Sans', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
