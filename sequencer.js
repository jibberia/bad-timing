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

	'q': "samples/badtiming02/BAD TIMING MIX 2 VOCAL SAMPLES_02-07.mp3",
	'w': "samples/badtiming02/BAD TIMING MIX 2 VOCAL SAMPLES_02-08.mp3",
	'e': "samples/badtiming02/BAD TIMING MIX 2 VOCAL SAMPLES_02-11.mp3",
	'r': "samples/badtiming02/BAD TIMING MIX 2. INSTRUMENTAL _02-101.mp3",
	't': "samples/badtiming02/BAD TIMING MIX 2. INSTRUMENTAL _02-103.mp3",
	'y': "samples/badtiming02/BAD TIMING MIX 2. INSTRUMENTAL _02-105.mp3",
	'u': "samples/badtiming02/BAD TIMING MIX 2. INSTRUMENTAL _02-44.mp3",
	'i': "samples/badtiming02/BAD TIMING MIX 2. INSTRUMENTAL _02-48.mp3",
	'o': "samples/badtiming02/BAD TIMING MIX 2. INSTRUMENTAL _02-52.mp3",
	'p': "samples/badtiming02/BAD TIMING MIX 2. INSTRUMENTAL _02-62.mp3",
	'a': "samples/badtiming02/BAD TIMING MIX 2. INSTRUMENTAL _02-70.mp3",
	's': "samples/badtiming02/BAD TIMING MIX 2. INSTRUMENTAL _02-74.mp3",
	'd': "samples/badtiming02/BAD TIMING MIX 2. INSTRUMENTAL _02-89.mp3",
	'f': "samples/badtiming02/BAD TIMING MIX 2. INSTRUMENTAL _02-93.mp3",
	'g': "samples/badtiming02/BAD TIMING MIX 2. INSTRUMENTAL _02-97.mp3",
	'h': "samples/badtiming02/breaks.mp3",
	'j': "samples/badtiming02/by.mp3",
	'k': "samples/badtiming02/gtr lick.mp3",
	'l': "samples/badtiming02/gtr pick 1.mp3",
	'z': "samples/badtiming02/i know i know 1.mp3",
	'x': "samples/badtiming02/i know it's bad timin.mp3",
	'c': "samples/badtiming02/lose cuz i took a chance.mp3",
	'v': "samples/badtiming02/our radio.mp3",
	'b': "samples/badtiming02/watch me dance.mp3",
	'n': "samples/badtiming02/ways.mp3",
	'm': "samples/badtiming02/yeah yeah.mp3"

	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-13.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-15.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-17.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-19.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-21.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-23.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-25.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-27.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-29.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-31.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-33.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-35.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-37.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-39.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-43.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-44.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-62.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-64.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-66.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-68.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-70.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-72.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-74.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-76.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-80.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-81.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-83.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-89.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-90.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-93.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-94.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-95.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-97.mp3",
	// "samples/badtiming01/VERSE/INST/BAD TIMING MIX 2. INSTRUMENTAL _02-99.mp3",
	// "samples/badtiming01/VERSE/VOX/breaks.mp3",
	// "samples/badtiming01/VERSE/VOX/by.mp3",
	// "samples/badtiming01/VERSE/VOX/dance.mp3",
	// "samples/badtiming01/VERSE/VOX/have to get.mp3",
	// "samples/badtiming01/VERSE/VOX/i dont wanna lie.mp3",
	// "samples/badtiming01/VERSE/VOX/leave us with the.mp3",
	// "samples/badtiming01/VERSE/VOX/lose cuz i took a chance.mp3",
	// "samples/badtiming01/VERSE/VOX/mess.mp3",
	// "samples/badtiming01/VERSE/VOX/our radio.mp3",
	// "samples/badtiming01/VERSE/VOX/out of this.mp3",
	// "samples/badtiming01/VERSE/VOX/watch me dance.mp3",
	// "samples/badtiming01/VERSE/VOX/ways.mp3",
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

Sample.prototype.beginAnimation = function() { return;
	if (this.element == null) return;
	// console.log('beginAnimation ' + this.letter);
	this.element.classList.add('shake-chunk');
};

Sample.prototype.endAnimation = function() { return;
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

function addMetronome() {
	var n = numBeats * 2;
	for (var i = 0; i < n; i++) {
		var t = i * (loopLength / n);
		// console.log('hat at ' + t);
		enqueueSample('1', t);
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
function enqueueSample(ascii, now) {
	if (now === undefined) now = getTimeInMeasure();

	now = quantize(now);

	// amusing hack to prevent reading & playing this note from the q:
	setTimeout(function enqueueSampleTimeout() {
		var note = {time: now, ascii: ascii, scheduled: false};
		sampleQ.push(note);
		console.log('enqueueSample', note, 'when', now);
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
	case 191: // /
		addMetronome();
		return;
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
// nah, force-disable console instead!
// if (!('console' in window)) {
	window.console = {
		log: function() {},
		error: function() {}
	}
// }

/* TODO
- test on windows; account: IEUser / Passw0rd!
- fix on PC iPad
x disallow zoom
- fix stuck animations!
*/













