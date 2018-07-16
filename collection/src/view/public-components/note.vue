<template>
  <div class="note-main">
    <el-card>
      <div :class="{'note-read':Boolean(note.memorandumStatus)}">
        <p class="note-time">创建时间：{{note.createDate}}</p>
        <i class="el-icon-bell note-icon"></i>
        <span class="note-title">{{note.title}}</span>
        <p class="note-content" v-if="note.type == 1">
          <a href="javascript:void(0)" :class="{'note-read':Boolean(note.memorandumStatus)}" @click="goDetail(note)" 
          style="text-decoration:underline;" class="el-button--text el-button--small">{{note.content}}</a>
        </p>
        <p class="note-content" v-else-if="note.type == 0">
          {{note.content}}
        </p>
      </div>
    </el-card>
  </div>
</template>
<script>
  export default {
    name: "note",
    props: {
      note: Object,
    },
    data() {
      return {

      }
    },
    computed: {},
    created() {

    },
    methods: {
      goDetail(note) {
        // url编码
        let caseCode = this.$util.encrypt(note.caseCode + '_' + note.caseId.toString() + '_' + note.caseManageId.toString(),
          'caseDetail');
        let url = (window.location.origin ? window.location.origin : '') + '/#/worker_case_detail?id=' + caseCode;
        window.open(url);
      },

    }
  };

</script>

<style lang="scss" scoped>



.note-read {
    color: #999;
}





</style>
