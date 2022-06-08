<template>
  <!-- 
    关于elementUI上传组件的属性说明：
    action    上传的地址（必选参数）
    multiple  是否支持多选文件
    name	    上传的文件字段名（默认值是file）

    关于elementUI上传组件的钩子说明：
    on-preview      function(file)            点击文件列表中已上传的文件时的钩子  
    on-remove       function(file, fileList)  文件列表移除文件时的钩子
    before-upload   function(file)            上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
   -->

  <div>
    <div class="card_wrap">
      <div class="card">
        <div class="file">
          <div class="video" style="margin-top: 20px">
            <span class="file_title">上传视频</span>
            <div class="file_wrap">
              <el-upload
                class="upload-demo"
                ref="upload"
                drag
                action="https://milimili.super2021.com/api/video/upload-video"
                :before-upload="beforeVideoUpload"
                :auto-upload="false"
                :http-request="uploadVideo"
                :limit="1"
                accept=".mp4"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">
                  只能上传mp4/mkv/avi/wmv/rmvb/flv/mov文件，且不超过50mb
                </div>
              </el-upload>
            </div>
            <!-- 在填写完标题、标签、简介等以后，正式投稿上传 -->
          </div>
          <div class="img" style="margin-top: 20px">
            <span class="file_title">上传图片</span>
            <div class="file_wrap">
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :limit="1"
                :file-list="uploadFiles"
                :on-change="loadJsonFromFile"
                ref="uploadImg"
                accept=".jpg"
              >
                <i slot="default" class="el-icon-plus" ></i>
                <div slot="file" slot-scope="{ file }">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
            </div>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </div>
        </div>
        <div class="info">
          <div class="info_block">
            <span class="title">标题:</span>
            <div class="file_wrap">
              <el-input v-model="videoInfoTitle" maxlength="20" show-word-limit>
              </el-input>
            </div>
          </div>
          <div class="info_block">
            <span class="title">分区:</span>
            <div class="file_wrap">
              <el-select v-model="videoInfoBlock">
                <el-option
                  v-for="item in zone_list"
                  :key="item.id"
                  :label="item.zone"
                  :value="item.zone"
                >
                </el-option>
                <br />
              </el-select>
            </div>
          </div>
          <div class="info_block">
            <span class="title">标签</span>
            <div class="file_wrap">
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="true"
                @close="handleClose(tag)"
                class="single_tag"
              >
                {{ tag }}
              </el-tag>
              <!-- 回车定义增加标签事件 0->回车 1->失去焦点 -->
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                maxlength="5"
                show-word-limit
                @keyup.enter.native="handleInputConfirm(0)"
                @blur="handleInputConfirm(1)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
                >+ 新增标签</el-button
              >
            </div>
          </div>
          <div class="info_block">
            <span class="title">简介:</span>
            <div class="file_wrap">
              <el-input
                v-model="videoInfoDescription"
                type="textarea"
                maxlength="400"
                style="width: 90%"
                show-word-limit
              ></el-input>
            </div>
          </div>
        </div>
        <el-button
          type="primary"
          @click="submitUpload()"
          style="margin: 20px 20px 20px 20px; float: right"
          >上传</el-button
        >
        <div
          class="progress"
          v-if="showProgress"
          style="margin: 20px 40px 20px 40px"
        >
          <el-progress
            :percentage="myprogress"
            :text-inside="true"
            :stroke-width="22"
            status="success"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComplainVideoCard from "./ComplainVideoCard.vue";
export default {
  components: { ComplainVideoCard },
  name: "UploadVideo",
  data() {
    return {
      //进度条
      myprogress: 0,
      showProgress: false,
      //标签相关
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      //上传图片相关
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      uploadFiles: [],
      //分区相关
      zone_list: [
        {
          id: 1,
          zone: "鬼畜",
        },
        {
          id: 2,
          zone: "科技",
        },
        {
          id: 3,
          zone: "户外",
        },
        {
          id: 4,
          zone: "动漫",
        },
        {
          id: 5,
          zone: "影视",
        },
        {
          id: 6,
          zone: "音乐",
        },
        {
          id: 7,
          zone: "汽车",
        },
        {
          id: 8,
          zone: "教育",
        },
        {
          id: 9,
          zone: "游戏",
        },
        {
          id: 10,
          zone: "时事",
        },
        {
          id: 11,
          zone: "生活",
        },
        {
          id: 12,
          zone: "军事",
        },
      ],
      //基本信息：
      videoInfoTitle: "",
      videoInfoDescription: "",
      videoInfoBlock: "",
      // videoTitle: '测试视频1号',
      avatar: "",
      TEST_JWT:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1MCwiaXNTdXBlckFkbWluIjpmYWxzZX0.RycUhwt145ZMLtR_9qvRoLotuS8SbKOvCcfIYabsOGE",
    };
  },

  methods: {
    //标签相关
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1); //去掉标签
    },
    showInput() {
      this.inputVisible = true; //出现输入框 聚焦
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm(val) {
      if (this.dynamicTags.length == 5) {
        if (val == 1) {
          this.inputVisible = false;
        }
        this.$message.warning("标签的数量不能超过5个哦~");
        this.inputVisible = false;
        return;
      }

      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    //图片上传相关
    handleRemove(file) {
      // this.$refs.upload.clearFiles();
      let fileList = this.$refs.uploadImg.uploadFiles;

      let index = fileList.findIndex((fileItem) => {
        return fileItem.uid === file.uid;
      });
      fileList.splice(index, 1);
      //console.log('filelist_2'+filelist)
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //绑定文件列表
    loadJsonFromFile(file, fileList) {
      this.uploadFiles = fileList
    },
    //视频上传相关
    submitUpload() {
      this.$refs.upload.submit();
    },
    // param是自带参数。
    // this.$refs.upload.submit() 会自动调用 httpRequest方法.在里面取得file
    uploadVideo(param) {
      let video = param.file;
      if (video == null) {
        this.$message.error("没视频传啥传QAQ");
        return;
      }
      if (this.videoInfoTitle == "") {
        this.$message.error("标题!标题！");
        return;
      }
      if (this.videoInfoDescription == "") {
        this.$message.error("简介!简介！");
        return;
      }
      if (this.videoInfoBlock == "") {
        this.$message.error("分区!分区！");
        return;
      }

      
      let formData = new FormData();
      let loginMessage = localStorage.getItem("loginMessage");
      let jwt = null;
      if (loginMessage != null) {
        jwt = JSON.parse(loginMessage).JWT;
        this.isLogined = true;
      } else {
        this.$message.warning("请先登录！");
        this.$router.push("/login");
        return;
      }

      this.showProgress = true;
      this.$message.warning("上传结束之前请勿进行其他操作！");

      // IMPORTANT 填写表单
      formData.append("JWT", jwt);
      formData.append("title", this.videoInfoTitle);
      formData.append("description", this.videoInfoDescription);
      formData.append("zone", this.videoInfoBlock);
      formData.append("avatar", this.uploadFiles[0].raw);
      formData.append("video", video);
      // TODO：不定个数的tag填入
      for (var index in this.dynamicTags)
        formData.append("tag" + (index + 1), this.dynamicTags[index]);

      console.log(formData); // DEBUG

      this.$axios({
        method: "post",
        url: "https://milimili.super2021.com/api/video/upload-video",
        data: formData,
        onUploadProgress: (progress) => {
          this.myprogress = Math.floor(
            (progress.loaded / progress.total) * 100
          );
        },
      })
        .then((res) => {
          console.log(res);
          switch (res.data.result) {
            case 1: {
              this.$message.success("上传视频成功！");
              this.showProgress = false;
              break;
            }
            default:
              this.$message.warning("上传视频失败！");
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * 目前我能实现的功能最全的视频上传前 检测函数：
     * 视频文件格式限制；'mp4', 'mkv'
     * 视频文件大小限制；
     * 视频文件时长限制；目前是60s
     * 视频文件尺寸限制（这个取消了）
     */
    beforeVideoUpload(file) {
      const self = this;
      var videoName = file.name || "";
      var suffix = "";
      // #region 视频文件大小检查
      const isLt50MB = file.size / 1024 / 1024 < 100;
      console.log(file.size / 1024 / 1024);
      if (!isLt50MB) {
        self.$message.error("上传视频文件的大小超过了50MB！");
        return false;
      }
      // #endregion
      // #region 视频文件格式检查  目前我探索中最有效的规避 诡异文件名 的方式
      try {
        var videoNameSplitArr = videoName.split(".");
        suffix = videoNameSplitArr[videoNameSplitArr.length - 1];
      } catch (error) {
        suffix = "";
      }
      console.log(suffix);
      var videoFormatList = ["mp4", "mkv", "avi", "wmv", "rmvb", "flv", "mov"];
      // some() 方法用于检测数组中的元素是否满足指定条件（函数提供）  如果有一个元素满足条件，则表达式返回true, 剩余的元素不会再执行检测。
      var judgeVideoFormat = videoFormatList.some(function (item) {
        return item === suffix;
      });
      console.log(judgeVideoFormat);
      if (!judgeVideoFormat) {
        self.$message.error(
          "上传视频文件只能是 MP4/MKV/AVI/WMV/RMVB/FLV/MOV 格式!"
        );
        return false;
      }
      // #endregion

      const isQulified = new Promise(function (resolve, reject) {
        let _URL = window.URL || window.webkitURL;
        // let videoElement = document.createElement("video");
        let videoElement = new Audio();
        videoElement.addEventListener("loadedmetadata", function () {
          // let width = videoElement.videoWidth
          // let height = videoElement.videoHeight
          let duration = videoElement.duration; // 视频时长

          if (duration > 500) {
            self.$message.error("上传视频文件的时长超过了60s！");
            return reject();
          }
          resolve();
        });
        videoElement.src = _URL.createObjectURL(file);
      }).then(() => {
        return file;
      });
      return isQulified;
    },
  },

  // watch: {
  //   dynamicTags(val,lav) {
  //     console.log(val.length)
  //     if (val.length == 5) {
  //       this.isActive == false;
  //     } else this.isActive == true;
  //   },
  // },
};
</script>

<style scoped>
.el-upload__tip {
  font-size: 12px;
  color: grey;
}
.card_wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  height: fit-content;
}
.card {
  border-radius: 20px;
  background-color: rgba(240, 248, 255, 0.722);
  width: 70%;
  padding: 20px auto 0;
  height: fit-content;
}
.file_title {
  font-size: 17px;
  margin-left: 20px;
  width: 20%;
  text-align: left;
}
.video {
  width: 100%;
  display: flex;
}
.upload-demo {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* overflow: hidden; */
}
.img {
  display: flex;
}
.file_wrap {
  /* margin-left: 40px; */
  width: 80%;
  display: flex;
}
.info_block {
  display: flex;
  margin: 10px auto 20px;
}
.title {
  font-size: 17px;
  margin-left: 20px;
  width: 20%;
  text-align: left;
}
.el-input {
  width: 60%;
}
.single_tag {
  margin-right: 10px;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>