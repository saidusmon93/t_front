<template>
  <el-row
    type="flex"
    shadow="always"
    justify="center"
    v-loading.fullscreen.lock="loading"
  >
    <el-col :span="18">
      <el-menu class="el-menu-demo" mode="horizontal" v-if="!loading">
        <el-menu-item style="padding-left: 0">
          <el-select
            v-model="value"
            @change="searchRoom(value)"
            filterable
            placeholder="Select"
          >
            <el-option
              v-for="item in rooms"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-menu-item>
        <el-menu-item> Room </el-menu-item>
      </el-menu>

      <el-table :data="tableData" border size="mini" row-class-name="no-hover">
        <el-table-column
          prop="time"
          label="Time"
          min-width="50"
        ></el-table-column>
        <el-table-column
          v-for="(weekday, index) in weekdays"
          :key="index"
          :prop="weekday.name"
          :label="weekday.name"
        >
          <template slot-scope="{ row }">
            <div
              v-for="lesson in row[weekday.name]"
              :key="lesson.id"
              class="time_data"
            >
              <el-tag type="success" size="small" effect="dark">
                {{ lesson.teacher.name }}</el-tag
              >
              <el-tag size="small">{{ lesson.lesson.subject }}</el-tag>
              <el-tag size="small">{{ lesson.group.name }}</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      value: "",
    };
  },
  created() {
    this.fetchLessons(1);
  },
  computed: {
    ...mapGetters(["lessons", "room", "weekdays", "times", "loading"]),
    rooms() {
      return this.room.map((item) => {
        return { value: item.id, label: item.name };
      });
    },
    tableData() {
      const data = [];
      for (let i = 0; i < this.times.length; i++) {
        const row = {
          time: `${this.times[i].start_time} - ${this.times[i].end_time}`,
        };
        for (let j = 0; j < this.weekdays.length; j++) {
          row[this.weekdays[j].name] = this.lessons.filter((lesson) => {
            return (
              lesson.weekday_id === this.weekdays[j].id &&
              lesson.time_id === this.times[i].id
            );
          });
        }

        data.push(row);
      }

      return data;
    },
  },
  methods: {
    ...mapActions(["fetchLessons"]),
    async searchRoom(value) {
      this.fetchLessons(value);
    },
  },
};
</script>
<style lang="scss">
.el-table {
  border: 1px solid #999;
  border-radius: 5px;
  .el-table__empty-text {
    display: none;
  }
  .el-table__header thead tr th {
    font-size: 1.8em;
    color: black;
    text-align: center;
  }
  .no-hover:hover > td {
    background-color: initial !important;
  }
  td.el-table__cell:hover {
    background-color: beige !important;
    cursor: pointer;
  }

  .time_data {
    display: flex;
    flex-direction: column;
    justify-content: center;

    span {
      margin: 3px 0;
      text-align: center;
      font-size: 1.5em;
    }
  }
  .el-table__body-wrapper {
    border-top: 2px solid #999;
  }
}
</style>
