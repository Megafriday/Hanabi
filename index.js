const SCREEN_SIZE_W = window.innerWidth - 40;
const SCREEN_SIZE_H = window.innerHeight - 40;

let can = document.getElementById("can");
can.width = SCREEN_SIZE_W;
can.height = SCREEN_SIZE_H;
let ctx = can.getContext("2d");

let hanabis = [];
let zanzos = [];

function updateObj(obj) {
	//スプライトのブロックを更新
	for (let i = obj.length - 1; i >= 0; i--) {
		obj[i].update();
		if (obj[i].kill) obj.splice(i, 1);
	}
}
function drawObj(obj) {
	//スプライトのブロックを更新
	for (let i = obj.length - 1; i >= 0; i--) {
		obj[i].draw();
	}
}

//毎フレーム毎の更新処理
function update() {
	updateObj(hanabis);
	updateObj(zanzos);
}

//毎フレーム毎の描画
function draw() {
	//画面を黒でクリア
	ctx.globalCompositeOperation = 'source-over';
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H);

	ctx.fillStyle = "#ffffff";
	ctx.fillText("H:" + hanabis.length, 10, 10);
	ctx.fillText("Z:" + zanzos.length, 10, 30);

	ctx.globalCompositeOperation = 'lighter';
	drawObj(zanzos);
	drawObj(hanabis);
}

function mainLoop() {
	update();
	draw();
	window.requestAnimationFrame(mainLoop);
}

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//キーボードが押された時に呼ばれる
document.body.addEventListener("keydown", e => {

	if (e.key == " ") {

		const x = randInt(0, SCREEN_SIZE_W);
		const y = SCREEN_SIZE_H;
		const color = randInt(0, fwColor.length - 1);
		hanabis.push(
			new Hanabi(x << 8, y << 8, color, 0, -800, 4)
		);
	}
});


mainLoop();
