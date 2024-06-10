Page({
  data: {
    currentIndex: 0, // 当前页索引
    screenWidth: 0,  // 视口宽度
    toView: 'item1'  // 当前视图
  },
  
  onLoad: function() {
    // 获取屏幕宽度
    const res = wx.getSystemInfoSync();
    this.setData({
      screenWidth: res.windowWidth
    });
  },
  
  onScroll: function(e) {
    // 在滑动过程中，可以实时获取当前滚动的位置
    this.setData({
      scrollLeft: e.detail.scrollLeft
    });
  },
  
  onTouchEnd: function(e) {
    const { scrollLeft, screenWidth, currentIndex } = this.data;
    // 计算滑动距离
    const diff = scrollLeft - (currentIndex * screenWidth);
    let newIndex = currentIndex;
    
    // 根据滑动距离调整页索引
    if (diff > screenWidth / 4) {
      newIndex = currentIndex + 1;
    } else if (diff < -screenWidth / 4) {
      newIndex = currentIndex - 1;
    }
    
    // 确保索引在有效范围内
    newIndex = Math.max(0, Math.min(newIndex, 4));
    
    this.setData({
      currentIndex: newIndex,
      toView: `item${newIndex + 1}`
    });
  }
})
