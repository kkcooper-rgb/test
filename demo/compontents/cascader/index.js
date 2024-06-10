// components/cascader/cascader.js
Component({
  properties: {
    options: {
      type: Array,
      value: []
    },
    placeholder: {
      type: String,
      value: '请选择'
    }
  },
  data: {
    selectedLabel: '',
    selectedIndexes: [],
    columns: [],
    dropdownVisible: false
  },
  methods: {
    toggleDropdown() {
      this.setData({
        dropdownVisible: !this.data.dropdownVisible
      });
    },
    onSelect(e) {
        // 获取点击的选项的层级和索引
        const { level, index } = e.currentTarget.dataset;
      console.log(level, index,"===");
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
          dropdownVisible: selectedOptions.length > 0 // 如果有子选项，则保持下拉框展开
        });
      
    },
    initColumns() {
      this.setData({
        columns: [{ level: 0, options: this.data.options }]
      });
    }
  },
  lifetimes: {
    attached() {
      this.initColumns();
    }
  }
});
