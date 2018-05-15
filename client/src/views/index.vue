<template>
  <div class="container">
    <canvas></canvas>
    <div class="route">
      <ul class="routeTitle">
        <li>
          <dl>
            <dt>
              <router-link to="posts">
                <img src="../assets/img/author/blogAuthor03.jpg" alt="">
              </router-link>
            </dt>
            <dd>“吾有一壶酒，足以慰风尘”</dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  methods: {
    canvasDots: function(){
      let canvas = document.querySelector('canvas'),
          ctx    = canvas.getContext('2d'),
          colorDot = '#00bdbf',
          color  = '#00bdbf';
      // 设置canvas宽度和高度
      canvas.width  = window.innerWidth; 
      canvas.height = window.innerHeight;
      canvas.style.display = 'block';
      ctx.fillStyle = colorDot;
      // 设置线的宽度
      ctx.lineWidth = .1;
      // 设置线的颜色
      ctx.strokeStyle = color;
      // 定义初始化的鼠标位置
      let mousePosition = {
        x: 30 * canvas.width / 100,
        y: 30 * canvas.height / 100
      };
      // 加一个定时器
      let times = null;
      let dots = {
        nb: 300, // 总数量
        distance: 100, // 两点之间可以连接的最长距离
        d_radius: 100, // 所在点的连接有效半径
        array: [] // 点对象数组
      }

      class Dot {
        constructor(){
          // 随即位置点，利用随即数0-1乘以整个画面的长宽，使其均匀分布在整个画布上
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          // x/y轴速度
          this.vx = -.5 + Math.random();
          this.vy = -.5 + Math.random();
          this.radius = Math.random();
        }
        // 创建点函数
        create(){
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          ctx.fill();
        }
        // 小球的生成和碰撞检测
        animate(){
          for(let i = 0; i < dots.nb; i++){
            // 往数组里添加点
            let dot = dots.array[i];
            // 碰撞检测 碰到边缘速度方向置反
            // y轴检测
            if(dot.y < 0 || dot.y > canvas.height){
              dot.vx = dot.vx;
              dot.vy = - dot.vy;
            }
            // x轴检测
            else if(dot.x < 0 || dot.x > canvas.width){
              dot.vx = - dot.vx;
              dot.vy = dot.vy;
            }
            // 运动轨迹
            dot.x += dot.vx;
            dot.y += dot.vy;
          }
        }

        line(){
          let i_dot;
          let j_dot;
          // 二维数组遍历
          // 计算次数为点总数的次方
          // 用于计算当前点和周围所有点的距离是否处于设置距离
          // 如果是 则将其相连
          for(let i = 0; i < dots.nb; i++){
            for(let j = 0; j < dots.nb; j++){
              // 目标点
              i_dot = dots.array[i];
              // 遍历整个页面所有点
              j_dot = dots.array[j];
              if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
                if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
                  //开始绘制这条线
                  ctx.beginPath();
                  ctx.moveTo(i_dot.x, i_dot.y);
                  ctx.lineTo(j_dot.x, j_dot.y);
                  ctx.stroke();
                  ctx.closePath();
                }
              }
            }
          }
        }
      }
      // 页面刷新重绘函数
      function createDots(){
        // 刷新整个区域
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 重回所有小点
        let dot;
        for(let i = 0; i < dots.nb; i++){
          dots.array.push(new Dot());
          // 遍历所有点
          dot = dots.array[i];
          dot.create(); 
        }
        // 创造线
        dot.line();
        // 点运动
        dot.animate();
      }
      // 鼠标移动
      // 每次移动将中心点变量的位置设置成当前鼠标的位置
      window.onmousemove = function(event){
        mousePosition.x = event.pageX;
        mousePosition.y = event.pageY;
      }
      clearInterval(times);
      // 每隔50毫秒刷新一次页面
      times = setInterval(createDots, 30)

      
    },
    
  },
  mounted(){
    this.canvasDots()
  }
}
</script>

<style lang="scss" scoped>
  @import "../styles/componentStyle/index";
</style>
