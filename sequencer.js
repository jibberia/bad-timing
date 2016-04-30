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

function Sample(letter, url, buffer) {
	this.letter = letter;
	this.url = url;
	this.buffer = buffer;
	this.element = null;
	this.initSource();
}

Sample.prototype.initSource = function() {
	var source = this.source = context.createBufferSource();
	source.connect(gainNode);
	source.buffer = this.buffer;
}

Sample.prototype.play = function(when) {
	console.log('play ' + this.letter + ' when? ' + when);
	if (this.buffer === null) {
		console.error("buffer is null; cannot play");
		return;
	}

	var self = this;
	var source = this.source;
	this.initSource();

	source.onended = function() {
		self.endAnimation();
		// self.initSource();
		// console.log(self, "ended");
	};

	if (when === undefined) {
		source.start();
		this.beginAnimation();
	} else {
		source.start(when);
		setTimeout(function() {
			self.beginAnimation();
		}, when * 1000.0);
	}	
}

Sample.prototype.beginAnimation = function() {
	if (this.element == null) return;
	// console.log('beginAnimation ' + this.letter);

	this.element.classList.add('wobble');
};

Sample.prototype.endAnimation = function() {
	if (this.element == null) return;
	// console.log('endAnimation ' + this.letter);

	this.element.classList.remove('wobble');
};

function initSamples(context) {
	var delay = 0;
	var numSamplesLoaded = 0;
	var numSamples = Object.keys(sampleMap).length;
	for (var letter in sampleMap) {
		if (!sampleMap.hasOwnProperty(letter)) continue;

		setTimeout(function(letter) {
			var path = sampleMap[letter];

			var request = new XMLHttpRequest();
			request.open('GET', path, true);
			request.responseType = 'arraybuffer';

			request.onload = function(ev) {
				// console.log(ev);
				// console.log(letter, request.response);
				context.decodeAudioData(request.response,
					function(audioData) {
						// console.log("successfully decoded", path);
						var sample = new Sample(letter, path, audioData);
						// console.log(audioData);
						sampleMap[letter] = sample;
						numSamplesLoaded++;
						if (numSamplesLoaded == numSamples) {
							onSamplesLoaded();
						}
					},
					function(e) {
						if (e) console.error("actual exception", e);
						else console.error("failed to decode", buffer.url);
					}
				);
			};

			// console.log('requesting', letter);
			request.send();
		}, 0, letter);
	}
}

function initAudio() {
	var AC = window.AudioContext || window.webkitAudioContext;
	var context = window.context = new AC;
	var gainNode = window.gainNode = context.createGain();
	gainNode.gain.value = 0.4;
	gainNode.connect(context.destination);
}

initAudio();
initSamples(window.context);



// Let's Loop!

var numBeats = 8;
var bpm = 120.0;
var loopLength = (60.0/bpm) * numBeats;
console.log("loopLength", loopLength);
var startTime = 0.0;
var looping = false;
var tickRate = 25.0;
var loopInterval = null;
var sampleQ = []; // not really a queue

function addMetronome() {
	var n = numBeats * 2;
	for (var i = 0; i < n; i++) {
		var t = i * (loopLength / n);
		// console.log('hat at ' + t);
		enqueueSample('e', t);
	}
}
addMetronome();

function toggleLoop() {
	console.log('toggleLoop');
	if (looping) {
		endLoop();
	} else {
		startLoop();
	}
}
function tick() {
	if (!looping) return;
	
	var timeInMeasure = getTimeInMeasure();

	// tick() wakes up at timeInMeasure
	// find samples between timeInMeasure and timeInMeasure + tickRateInSeconds*1.25
	//     (add 25% time for setTimeout jitter, TODO tune)

	var begin = timeInMeasure;
	var lookInterval = (tickRate / 1000.0) * 1.25;
	var end = begin + lookInterval;

	var alsoBegin = -1;
	var alsoEnd = -1;
	var reachAround = false;
	if (end > loopLength) {
		reachAround = true;
		alsoBegin = 0;
		alsoEnd = end - loopLength;
	}

	// console.log('begin', parseInt(1000.0*begin), 'end', parseInt(1000.0*end),
	// 	        'alsoBegin', parseInt(1000.0*alsoBegin), 'alsoEnd', parseInt(1000.0*alsoEnd));
	
	for (var i = 0; i < sampleQ.length; i++) {
		var note = sampleQ[i];

		if ((note.time >= begin && note.time <= end) ||
		    (note.time >= alsoBegin && note.time <= alsoEnd)) {

			var when = note.time - begin;
			if (reachAround) {
				when = note.time + loopLength - alsoBegin;
			}

			// console.log(
			// 	'note.time',     parseInt(1000.0*note.time),
			// 	'timeInMeasure', parseInt(1000.0*timeInMeasure),
			// 	'when',          parseInt(1000.0*when)
			// 	// 'begin',         parseInt(1000.0*begin),
			// 	// 'end',           parseInt(1000.0*end)
			// );

			if (note.scheduled) {
				// console.log('SKIP, note scheduled', note);
				continue;
			}

			sampleMap[note.ascii].play(when);

			// flag as scheduled so we don't try to play it twice
			// unflag scheduled after tickRate
			note.scheduled = true;
			setTimeout(function(note) {
				note.scheduled = false;
				// console.log('unscheduled', getNoteLog(note), 'timeInMeasure', parseInt(1000.0*getTimeInMeasure()));
				logQ();
			}, tickRate, note);
		}
	}
	logQ();
}
function logQ() {
	q = sampleQ.slice().sort(function(a, b) { return a.time > b.time })
	var msg = '';
	for (var i = 0; i < q.length; i++) {
		var note = q[i];
		msg += getNoteLog(note) + ', ';
	}
	console.log(msg.substr(0, msg.length-2));
}
function getNoteLog(note) {
	return '[' + note.ascii + ' ' + parseInt(1000.0*note.time) + (note.scheduled ? ' S':'') + ']';
}
function startLoop() {
	startTime = context.currentTime;
	console.log('startTime ' + startTime);
	looping = true;
	// tick();
	loopInterval = setInterval(tick, tickRate);
}
function endLoop() {
	console.log('endLoop');
	clearInterval(loopInterval);
	looping = false;
}
function enqueueSample(ascii, now) {
	if (now === undefined) now = getTimeInMeasure();

	now = quantize(now);

	// TODO RETHINK:
	// amusing hack to prevent reading & playing this note from the q:
	setTimeout(function() {
		var note = {time: now, ascii: ascii, scheduled: false};
		sampleQ.push(note);
		console.log('enqueueSample', note, 'when', now);
	}, tickRate*2);
}
function getTimeInMeasure() {
	return (context.currentTime - startTime) % loopLength;
}
function clearLoop() {
	sampleQ = [];
}
function undo() {
	sampleQ.pop();
	console.log(sampleQ);
}
function quantize(noteTime) {
	var sixteenth = loopLength / 16.0;
	var beatNumber = parseInt(noteTime / sixteenth);
	var lastNoteTime = beatNumber * sixteenth;
	var nextNoteTime = lastNoteTime + sixteenth;
	var halfBeat = (nextNoteTime - lastNoteTime) / 2.0;

	var newTime;
	if (noteTime <= lastNoteTime + halfBeat) {
		newTime = lastNoteTime;
	} else {
		newTime = nextNoteTime;
	}

	// console.log(
	// 	'noteTime', noteTime,
	// 	'newTime', newTime,
	// 	'beatNumber', beatNumber,
	// 	'lastNoteTime', lastNoteTime,
	// 	'nextNoteTime', nextNoteTime
	// );

	return newTime;
}

document.addEventListener('keydown', function (ev) {
	var asciiCode = ev.keyCode - 65 + 97;
	var ascii = String.fromCharCode(asciiCode);
	// console.log('key ' + ev.keyCode, 'asciiCode ' + asciiCode);
	window.ev = ev;
	switch (ev.keyCode) {
	case 32: // spacebar
		toggleLoop();
		return;
	case 192: // `toggleLoop
		clearLoop();
		break;
	case 188: // ,
		undo();
		break;
	case 191: // /
		addMetronome();
		break;
	}

	if (ascii in sampleMap) {
		onPressyClickyTappy(ascii);
	}
});

function onPressyClickyTappy(ascii) {
	sampleMap[ascii].play();
	if (looping) {
		enqueueSample(ascii);
	}
}

// Let's UI!

function onClickLetter(ev) {
	var ascii = ev.target.id.replace('key-', '');
	onPressyClickyTappy(ascii);
}

function initUI() {
	var container = document.getElementById('letters');
	var prototype = document.querySelector('.letter');
	prototype.remove();
	for (var key in sampleMap) {
		if (!sampleMap.hasOwnProperty(key)) continue;
		
		var clone = prototype.cloneNode(false);
		clone.id = 'key-' + key;
		clone.textContent = key;
		clone.onclick = onClickLetter;

		sampleMap[key].element = clone;

		container.appendChild(clone);
	}
}

function onSamplesLoaded() {
	initUI();
}
















