var sampleMap = {
	'a': '/samples/kick.mp3',
	's': '/samples/snare.mp3',
	'd': '/samples/hihat.mp3'
};

// var sampleMap = {
// 	'a': '/samples/a.mp3',
// 	's': '/samples/s.mp3',
// 	'd': '/samples/d.mp3',
// 	'f': '/samples/f.mp3',
// 	'g': '/samples/g.mp3',
// 	'h': '/samples/h.mp3',
// 	'j': '/samples/j.mp3',
// 	'k': '/samples/k.mp3'
// };

document.addEventListener('keydown', function (ev) {
	window.ev = ev;
	var ascii = String.fromCharCode(ev.keyCode - 65 + 97);
	if (!(ascii in sampleMap)) return;

	var sample = sampleMap[ascii];

	sample.play();
});

function Sample(url) {
	this.url = url;
	this.buffer = null;
	this.source = context.createBufferSource();
	this.isPlaying = false;
}

Sample.prototype.play = function() {
	console.log("play", this);

	if (this.buffer === null) {
		console.error("buffer is null; cannot play");
		return;
	}
	if (this.source !== null && this.isPlaying) {
		this.stop();
	}

	var source = this.source;
	source.buffer = this.buffer;
	source.connect(context.destination);

	var self = this;
	source.onended = function() {
		console.log(self, "ended");
	};

	source.start(/*context.currentTime*/);
	this.isPlaying = true;
}

Sample.prototype.stop = function() {
	if (this.source === null) {
		console.error("null audio source");
		return;
	}
	if (!this.isPlaying) {
		return;
	}
	console.log("stop", this);
	this.source.stop();
	this.source = context.createBufferSource();
	this.isPlaying = false;
};

function initSamples(context) {
	var delay = 0;
	for (var k in sampleMap) {
		if (!sampleMap.hasOwnProperty(k)) continue;

		setTimeout(function(k) {
			var path = sampleMap[k];

			var request = new XMLHttpRequest();
			request.open('GET', path, true);
			request.responseType = 'arraybuffer';

			request.onload = function(ev) {
				// console.log(ev);
				// console.log(k, request.response);
				context.decodeAudioData(request.response,
					function(audioData) {
						console.log("successfully decoded", path);
						var sample = new Sample(path);
						console.log(audioData);
						sample.buffer = audioData;
						sampleMap[k] = sample;
					},
					function(e) {
						if (e) console.error("actual exception", e);
						else console.error("failed to decode", buffer.url);
					}
				);
			};

			console.log('requesting', k);
			request.send();
		}, delay, k);
		// delay += 200; // wtf, why do i have to do this
	}
}

function initAudio() {
	var context = window.context = new AudioContext;

}

initAudio();
initSamples(window.context);
