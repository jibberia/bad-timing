var sampleMap = {
	'a': 'samples/a.mp3',
	's': 'samples/s.mp3',
	'd': 'samples/d.mp3',
	'f': 'samples/f.mp3',
	'g': 'samples/g.mp3',
	'h': 'samples/h.mp3',
	'j': 'samples/j.mp3',
	'k': 'samples/k.mp3',

	'q': 'samples/kick.mp3',
	'w': 'samples/snare.mp3',
	'e': 'samples/hihat.mp3'
};

function Sample(url, buffer) {
	this.url = url;
	this.buffer = buffer;
	this.source = context.createBufferSource();
	this.isPlaying = false;
}

Sample.prototype.play = function(when) {
	console.log("play", this, "when", when);

	if (this.buffer === null) {
		console.error("buffer is null; cannot play");
		return;
	}
	if (this.source !== null && this.isPlaying) {
		console.log(this, "already playing -- return");
		return;
		// this.stop();
	}

	var source = this.source;
	source.buffer = this.buffer;
	source.connect(gainNode);

	var self = this;
	source.onended = function() {
		self.stop();
		// console.log(self, "ended");
	};

	if (when === undefined) {
		source.start();
	} else {
		source.start(when);
	}
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
	// console.log("stop", this);
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
						var sample = new Sample(path, audioData);
						// console.log(audioData);
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
	var AC = window.AudioContext || window.webkitAudioContext;
	var context = window.context = new AC;
	var gainNode = window.gainNode = context.createGain();
	gainNode.gain.value = 0.1;
	gainNode.connect(context.destination);
}

initAudio();
initSamples(window.context);





var loopLength = (60.0/120.0) * 4.0; // 4 beats @ 120bpm
console.log("loopLength", loopLength);
var startTime = 0.0;
var looping = false;
var sampleQ = [];

function startLoop() {
	startTime = context.currentTime;
	looping = true;
}
function enqueueSample(ascii, now) {
	if (now === undefined) now = getTimeInMeasure();
	// amusing hack to prevent reading & playing this note from the q:
	setTimeout(function() {
		var note = {time: now, ascii: ascii};
		sampleQ.push(note);
		console.log(note);
	}, tickRate*2);
}
function getTimeInMeasure() {
	return (context.currentTime - startTime) % loopLength;
}
function clearLoop() {
	sampleQ = [];
	addEighthNoteHats();
}
function undo() {
	sampleQ.pop();
	console.log(sampleQ);
}
function quantize(noteTime) {
	var sixteenth = loopLength / 16.0;
	var lower = parseInt(noteTime / sixteenth);
}
var tickRate = 25.0;
setInterval(function tick() {
	if (!looping) return;
	var measureTime = getTimeInMeasure();
	console.log(measureTime);
	for (var i = 0; i < sampleQ.length; i++) {
		var note = sampleQ[i];

		// TODO this is off
		var begin = Math.max(measureTime - (tickRate/1000.0), 0);
		if (note.time >= begin && note.time <= measureTime) {
			console.log('note.time', note.time, 'measureTime', measureTime, 'begin', begin,
				'note.time-begin', note.time-begin);

			sampleMap[note.ascii].play(note.time-begin);
		}
	}
}, tickRate);

document.addEventListener('keydown', function (ev) {
	console.log('key ' + ev.keyCode);
	window.ev = ev;
	var ascii = String.fromCharCode(ev.keyCode - 65 + 97);
	switch (ev.keyCode) {
	case 32: // spacebar
		looping = !looping;
		return;
	case 192: // `
		clearLoop();
		break;
	case 188: // ,
		undo();
		break;
	}
	if (!(ascii in sampleMap)) return;

	sampleMap[ascii].play();
	if (looping) {
		enqueueSample(ascii);
	}
});

function addEighthNoteHats() {
	for (var i = 0; i < 8; i++) {
		enqueueSample('e', i * (loopLength / 8.0));
	}
}
addEighthNoteHats();
