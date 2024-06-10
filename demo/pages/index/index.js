const qrcode = require('../../lib/qrcode/index');
// 1
Page({
    data: {
        qrcode0: '',
        options: [
          {
            label: '省份1',
            value: 0,
            children: [
              {
                label: '城市1-1',
                value: 0,
                children: [
                  { label: '区1-1-1', value: 0 },
                  { label: '区1-1-2', value: 1 }
                ]
              },
              {
                label: '城市1-2',
                value: 1,
                children: [
                  { label: '区1-2-1', value: 0 },
                  { label: '区1-2-2', value: 1 }
                ]
              }
            ]
          },
          {
            label: '省份2',
            value: 1,
            children: [
              {
                label: '城市2-1',
                value: 0,
                children: [
                  { label: '区2-1-1', value: 0 },
                  { label: '区2-1-2', value: 1 }
                ]
              },
              {
                label: '城市2-2',
                value: 1,
                children: [
                  { label: '区2-2-1', value: 0 },
                  { label: '区2-2-2', value: 1 }
                ]
              }
            ]
          },
          {
            label: '省份3',
            value: 3,
          },
          {
            label: '省份4',
            value: 4
          }
        ],
        selectedLabel: '',
        selectedIndexes: [],
        columns: [],
        dropdownVisible: false,
        placeholder:"请选择"
    },
    onReady(){
        let text = 'https://m.baidu.com';

        // qrcode0
        let qrcode0 = qrcode.outputQRCodeBase64(text, {
            size: 400,
            color: '#CC6600',
            padding: 16,
            background: '#FFCC99'
        });

        this.setData({
            qrcode0
        })

        // qrcode1
        qrcode.drawQRCodeToCanvas(text, {
            ctx: 'qrcode1',
            size: 200,
            color: '#CC6600',
            padding: 16,
            background: '#FFCC99'
        });

        // qrcode2
        let qrcode2 = wx.createCanvasContext('qrcode2');
        qrcode.drawQRCodeToCanvas(text, {
            ctx: qrcode2,
            size: 200,
            color: '#CC6600',
            padding: 16,
            background: '#FFCC99'
        });
        qrcode2.draw();
    },
    onLoad(){
      this.initColumns();
    },
    jumpPage(){
      console.log(243654);
      wx.navigateTo({
        // url: '/pages/test/test',
        url:"/pages/scroll/index"
      })
    },
    toggleDropdown() {
      this.setData({
        dropdownVisible: !this.data.dropdownVisible
      });
    },
    onSelect(e) {
      // 获取点击的选项的层级和索引
      const { level, index } = e.currentTarget.dataset;
      // 复制当前选中的索引数组，并根据点击的层级截断（只保留到点击的层级之前的部分）
      let selectedIndexes = this.data.selectedIndexes.slice(0, level);
      // 更新当前层级的索引为用户点击的索引
      selectedIndexes[level] = index;
  
      // 获取最顶层的选项数组
      let selectedOptions = this.data.options;
      // 根据选中的索引逐层获取子选项
      for (let i = 0; i <= level; i++) {
        selectedOptions = selectedOptions[selectedIndexes[i]].children || [];
      }
  
      // 根据层级更新显示的列，只保留到点击的层级之前的部分
      let columns = this.data.columns.slice(0, level + 1);
      // 如果有子选项，则添加新的一列
      if (selectedOptions.length > 0) {
        columns.push({ level: level + 1, options: selectedOptions });
      }
  
      // 根据选中的索引数组生成显示的标签文本
      const selectedLabel = selectedIndexes.map((value, idx) => {
        return this.data.columns[idx].options[value].label;
      }).join(' / ');
  
      // 更新组件的状态
      this.setData({
        selectedIndexes, // 更新选中的索引数组
        columns, // 更新显示的列数组
        selectedLabel, // 更新显示的标签文本
        dropdownVisible: selectedOptions.length > 0, // 如果有子选项，则保持下拉框展开
      });
    },
    initColumns() {
      this.setData({
        columns: [{ level: 0, options: this.data.options }]
      });
    }
});
