/*
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
*/

var sampleMap = {
	'1': 'samples/hihat-quiet.mp3', // for metronome

	'q': 'samples/badtiming03/badtiming-26-0.mp3' ,
	'w': 'samples/badtiming03/badtiming-26-1.mp3' ,
	'e': 'samples/badtiming03/badtiming-26-2.mp3' ,
	'r': 'samples/badtiming03/badtiming-26-3.mp3' ,
	't': 'samples/badtiming03/badtiming-26-4.mp3' ,
	'y': 'samples/badtiming03/badtiming-26-5.mp3' ,
	'u': 'samples/badtiming03/badtiming-26-6.mp3' ,
	'i': 'samples/badtiming03/badtiming-26-7.mp3' ,
	'o': 'samples/badtiming03/badtiming-26-8.mp3' ,
	'p': 'samples/badtiming03/badtiming-26-9.mp3' ,
	'a': 'samples/badtiming03/badtiming-26-10.mp3',
	's': 'samples/badtiming03/badtiming-26-11.mp3',
	'd': 'samples/badtiming03/badtiming-26-12.mp3',
	'f': 'samples/badtiming03/badtiming-26-13.mp3',
	'g': 'samples/badtiming03/badtiming-26-14.mp3',
	'h': 'samples/badtiming03/badtiming-26-15.mp3',
	'j': 'samples/badtiming03/badtiming-26-16.mp3',
	'k': 'samples/badtiming03/badtiming-26-17.mp3',
	'l': 'samples/badtiming03/badtiming-26-18.mp3',
	'z': 'samples/badtiming03/badtiming-26-19.mp3',
	'x': 'samples/badtiming03/badtiming-26-20.mp3',
	'c': 'samples/badtiming03/badtiming-26-21.mp3',
	'v': 'samples/badtiming03/badtiming-26-22.mp3',
	'b': 'samples/badtiming03/badtiming-26-23.mp3',
	'n': 'samples/badtiming03/badtiming-26-24.mp3',
	'm': 'samples/badtiming03/badtiming-26-25.mp3'
}
function Sample(letter, url, buffer) {
	this.letter = letter;
	this.url = url;
	this.buffer = buffer;
	this.element = null;
	this.animationTimeout = null;
	this.initSource();
}

Sample.prototype.initSource = function() {
	var source = this.source = context.createBufferSource();
	source.connect(gainNode);
	source.buffer = this.buffer;
}

Sample.prototype.play = function(when) {
	// console.log('play ' + this.letter + ' when? ' + when);
	// if (this.buffer === null) {
	// 	console.error("buffer is null; cannot play");
	// 	return;
	// }–––

	var self = this;
	var source = this.source;
	this.initSource();

	source.onended = function sourceOnEnded() {
		self.endAnimation();
		// self.initSource();
		// console.log(self, "ended");
	};

	if (when === undefined) {
		source.start();
		this.beginAnimation();
	} else {
		source.start(when);
		clearTimeout(this.animationTimeout);
		this.animationTimeout = setTimeout(function beginAnimationTimeout() {
			// console.log('timeout beginAnimation...');
			self.beginAnimation();
		}, when * 1000.0);
	}	
}

Sample.prototype.beginAnimation = function() {// return;
	if (this.element == null) return;
	// console.log('beginAnimation ' + this.letter);
	this.element.classList.add('shake-chunk');
};

Sample.prototype.endAnimation = function() {// return;
	if (this.element == null) return;
	// console.log('endAnimation ' + this.letter);
	this.element.classList.remove('shake-chunk');
	clearTimeout(this.animationTimeout);
};

function initSamples(context) {
	var delay = 0;
	var numSamplesLoaded = 0;
	var numSamples = Object.keys(sampleMap).length;
	for (var letter in sampleMap) {
		if (!sampleMap.hasOwnProperty(letter)) continue;

		setTimeout(function doSampleXHR(letter) {
			var path = sampleMap[letter];

			var request = new XMLHttpRequest();
			request.open('GET', path, true);
			request.responseType = 'arraybuffer';

			request.onload = function requestOnloadCb(ev) {
				// console.log(ev);
				// console.log(letter, request.response);
				context.decodeAudioData(request.response,
					function decodeAudioDataCb(audioData) {
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
	var gainNode = window.gainNode = context.destination;
	// var gainNode = window.gainNode = context.createGain();
	// gainNode.gain.value = 0.4;
	// gainNode.connect(context.destination);

}

initAudio();
initSamples(window.context);



// Let's Loop!

var numBeats = 8;
var bpm = 100.0;
var loopLength = (60.0/bpm) * numBeats;
console.log("loopLength", loopLength);
var startTime = 0.0;
var looping = false;
var tickRate = 25.0;
var loopInterval = null;
var sampleQ = []; // not really a queue
var useMetronome = true;
var isRecording = true;

function addMetronome() {
	var n = numBeats * 2;
	for (var i = 0; i < n; i++) {
		var t = i * (loopLength / n);
		// console.log('hat at ' + t);
		enqueueSample('1', t, true);
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
function toggleMetronome() {
	// console.log('toggleMetronome');
	useMetronome = !useMetronome;
	console.log("use metronome?", useMetronome);
}
function toggleRecording() {
	isRecording = !isRecording;
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

			if (!useMetronome && note.isMetronome) {
				continue;
			}

			sampleMap[note.ascii].play(when);

			// flag as scheduled so we don't try to play it twice
			// unflag scheduled after tickRate
			note.scheduled = true;
			setTimeout(function unscheduleNoteTimeout(note) {
				note.scheduled = false;
				// console.log('unscheduled', getNoteLog(note), 'timeInMeasure', parseInt(1000.0*getTimeInMeasure()));
				// logQ();
			}, tickRate, note);
		}
	}
	// logQ();
}
function logQ() {
	q = sampleQ.slice().sort(function(a, b) { return a.time > b.time });
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
	tick(); tick(); // calling this a couple times may trigger events at timeInMeasure 0
	loopInterval = setInterval(tick, tickRate);
}
function endLoop() {
	console.log('endLoop');
	clearInterval(loopInterval);
	looping = false;
	// animations can get stuck when you stop, so kill 'em
	setTimeout(function unstickAnimationTimeout() {
		for (var letter in sampleMap) {
			if (!sampleMap.hasOwnProperty(letter)) continue;
			sampleMap[letter].endAnimation();
		}
	}, tickRate);
}
function enqueueSample(ascii, now, isMetronome) {
	if (!isRecording && (isMetronome === undefined || isMetronome == false)) {
		// return if we're not recording, or if this is not a metronome
		return;
	}
	if (now === undefined) now = getTimeInMeasure();
	if (isMetronome === undefined) isMetronome = false;

	now = quantize(now);

	// amusing hack to prevent reading & playing this note from the q:
	setTimeout(function enqueueSampleTimeout() {
		var note = {time: now, ascii: ascii, scheduled: false, isMetronome: isMetronome};
		sampleQ.push(note);
		console.log('enqueueSample', note);
	}, (loopLength * 1000) / 4); // this will cause problems with short loopLengths
}
function getTimeInMeasure() {
	return (context.currentTime - startTime) % loopLength;
}
function clearLoop() {
	sampleQ = [];
}
function undo() {
	sampleQ.pop();
	logQ();
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

document.addEventListener('keydown', function onKeydownEvent(ev) {
	var asciiCode = ev.keyCode - 65 + 97;
	var ascii = String.fromCharCode(asciiCode);
	// console.log('key ' + ev.keyCode, 'asciiCode ' + asciiCode);
	window.ev = ev;
	switch (ev.keyCode) {
	case 32: // spacebar
		toggleLoop();
		ev.preventDefault();
		return false;
	case 192: // `toggleLoop
		clearLoop();
		return;
	case 188: // ,
		undo();
		return;
	// case 191: // /
	// 	addMetronome();
	// 	return;
	}

	if (ev.altKey || ev.metaKey || ev.ctrlKey) {
		return;
	}

	if (ascii in sampleMap) {
		onPressyClickyTappy(ascii);
	}
});

function onPressyClickyTappy(ascii) {
	sampleMap[ascii].play();
	if (looping && isRecording) {
		enqueueSample(ascii);
	}
}

// Let's UI!

function onClickLetter(ev) {
	var ascii = ev.target.id.replace('key-', '');
	onPressyClickyTappy(ascii);
}
function onSamplesLoaded() {
	initUi();
}
function addListenerToKey(el) {
	if ('ontouchstart' in el) {
		el.ontouchstart = onClickLetter;
	} else {
		el.onclick = onClickLetter;
	}
}
function initUi() {
	var keyboard = [
		['q','w','e','r','t','y','u','i','o','p'],
		['a','s','d','f','g','h','j','k','l'],
		['z','x','c','v','b','n','m']
	];
	var container = document.getElementById('letters');
	for (var ri=0; ri<keyboard.length; ri++) {
		var row = document.createElement('div');
		row.classList.add('row');
		keyRow = keyboard[ri];
		for (var ki=0; ki<keyRow.length; ki++) {
			var key = keyRow[ki];
			
			var el = document.createElement('div');
			el.className = 'letter shake-constant';
			el.id = 'key-' + key;
			el.textContent = key;

			if (key in sampleMap) {
				sampleMap[key].element = el;
				addListenerToKey(el);
			} else {
				el.classList.add('disabled');
			}
			
			row.appendChild(el);
		}
		container.appendChild(row);
	}

	// don't allow buttons to take focus
	for (button in document.querySelectorAll('button')) {
		button.onclick = function(ev) {
			ev.preventDefault();
			return false;
		}
	}
}


// shim console
if (!('console' in window)) {
	window.console = {
		log: function() {},
		error: function() {}
	}
}

/* TODO
- test on windows; account: IEUser / Passw0rd!
- fix on PC iPad
x disallow zoom
x fix stuck animations!
- record toggle
- metronome toggle
*/













