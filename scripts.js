const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const full = player.querySelector(".fullscreen");
const link = document.querySelector(".add-items");

function play() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

function btn() {
	const icon = this.paused ? "►" : "❚ ❚";
	console.log(icon);
	toggle.textContent = icon;
}

function seek() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function chan() {
	video[this.name] = this.value;
}

function pro() {
	let prog = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${prog}%`;
}

function progs(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

function fullScreen() {
	var isInFullScreen =
		(document.fullscreenElement && document.fullscreenElement !== null) ||
		(document.webkitFullscreenElement &&
			document.webkitFullscreenElement !== null) ||
		(document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
		(document.msFullscreenElement && document.msFullscreenElement !== null);

	if (!isInFullScreen) {
		if (player.requestFullscreen) {
			player.requestFullscreen();
		} else if (player.mozRequestFullScreen) {
			player.mozRequestFullScreen();
		} else if (player.webkitRequestFullScreen) {
			player.webkitRequestFullScreen();
		} else if (player.msRequestFullscreen) {
			player.msRequestFullscreen();
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
	}
}

function handleLink(e) {
	e.preventDefault();
	const text = this.querySelector("[name=item]").value;
	video.src = `${text}`;
}

let mousedown = false;

video.addEventListener("click", play);
video.addEventListener("play", btn);
video.addEventListener("pause", btn);
toggle.addEventListener("click", play);
skipButtons.forEach((btns) => btns.addEventListener("click", seek));
ranges.forEach((slid) => slid.addEventListener("change", chan));
video.ontimeupdate = pro;
progress.addEventListener("click", progs);
progress.addEventListener("mousemove", (e) => mousedown && progs(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
full.addEventListener("click", fullScreen);

link.addEventListener("submit", handleLink);
