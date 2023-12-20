import './nape'
import html2canvas from 'html2canvas'

html2canvas(document.querySelector("#capture")).then(canvas => {
  document.body.appendChild(canvas)
});

console.log(window.nape.Space)

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");


const canvas2 = document.getElementById("canvas2");
const context2 = canvas2.getContext("2d");


//

// 创建 Nape.js 空间
const space = new window.nape.space.Space();
window.xxx = space

space.get_gravity().set_y(5)

// 添加刚体
const body = new window.nape.phys.Body(window.nape.phys.BodyType.get_DYNAMIC());
const circle = new window.nape.shape.Circle(25);
body.add(circle);
body.set_position(nape.geom.Vec2.get(100, 50));
space.add(body);


body.set_mass(123)
console.log(body.get_mass())




// 循环更新
function update() {
  // 更新 Nape.js 空间
  space.step(1/60);

  // 清空画布
  context.clearRect(0, 0, canvas.width, canvas.height);

  // 绘制刚体
  context.beginPath();
  context.arc(body.get_position().get_x(), body.get_position().get_y(), 25, 0, Math.PI * 2);
  context.fill();
  // -----
  // 清空画布
  context2.clearRect(0, 0, canvas2.width, canvas2.height);

  // 绘制刚体
  context2.beginPath();
  context2.arc(body.get_position().get_x(), body.get_position().get_y(), 25, 0, Math.PI * 2);
  context2.fill();


  

  // 循环更新
  requestAnimationFrame(update);
}

// 启动游戏循环
requestAnimationFrame(update);

