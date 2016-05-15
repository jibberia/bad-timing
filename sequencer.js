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
	'1': 'samples/hihat.mp3', // for metronome

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
	var self = this;
	var source = this.source;
	this.initSource();

	source.onended = function sourceOnEnded() {
		self.endAnimation();
		// self.initSource();
		// console.log(self, "ended");
	};

	window.gainNode.gain.value = 1.0;

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
	var animationIndex = parseInt(Math.random() * 3) + 1;
	this.element.classList.add('shake-chunk-' + animationIndex);

	showWhiskers();
	// // setTimeout(hideWhiskers, this.source.duration * 1000.0);
};

Sample.prototype.endAnimation = function() {// return;
	if (this.element == null) return;
	// console.log('endAnimation ' + this.letter);
	this.element.className = this.element.className.replace(/shake-chunk-\d/, '');
	// this.element.classList.remove('shake-chunk-' + this.animationIndex);
	clearTimeout(this.animationTimeout);
	hideWhiskers();
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

// inspired by https://github.com/cwilso/volume-meter/blob/master/volume-meter.js
// and https://mdn.github.io/script-processor-node/
// function volumeAudioProcess(ev) {
// 	var buf = ev.inputBuffer.getChannelData(0);
//     var bufLength = buf.length;
// 	var sum = 0;
//     var x;

// 	// Do a root-mean-square on the samples: sum up the squares...
//     for (var i=0; i<bufLength; i++) {
//     	x = buf[i];
//     	sum += x * x;
//     }

//     // ... then take the square root of the sum.
//     var rms = Math.sqrt(sum / bufLength);

//     // Now smooth this out with the averaging factor applied
//     // to the previous sample - take the max here because we
//     // want "fast attack, slow release."
//     this.volume = Math.max(rms, this.volume*this.averaging);
//     console.log(this.volume);

//     // input -> output
//     for (var channel = 0; i < ev.outputBuffer.numberOfChannels; channel++) {
// 		var inputData = inputBuffer.getChannelData(channel);
//         var outputData = outputBuffer.getChannelData(channel);
//         // outputData = inputData;
//         // Loop through the 4096 samples
// 		for (var sample = 0; sample < inputBuffer.length; sample++) {
//             // make output equal to the same as the input
//             outputData[sample] = inputData[sample];
//         }
// 	}
// }

function initAudio() {
	var AC = window.AudioContext || window.webkitAudioContext;
	var context = window.context = new AC;
	// var gainNode = window.gainNode = context.destination;
	var gainNode = window.gainNode = context.createGain();
	gainNode.gain.value = 1.0;

	// var processor = window.processor = context.createScriptProcessor(4096, 2, 2);
	// processor.onaudioprocess = volumeAudioProcess;
	// processor.volume = 0;
	// processor.averaging = 0.4;

	// var analyser = context.createAnalyser();
	// analyser.smoothingTimeConstant = 0.2;

	gainNode.connect(context.destination);
	// gainNode.connect(processor);
	// processor.connect(context.destination);

}

initAudio();
initSamples(window.context);



// Let's Loop!

var numBeats = 8;
var bpm = 100.0;
var loopLength = (60.0/bpm) * numBeats;
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
	hideHelp();

	if (looping) {
		window.gainNode.gain.value = 0.0;
		endLoop();
	} else {
		window.gainNode.gain.value = 1.0;
		startLoop();
	}
}
function toggleMetronome() {
	// console.log('toggleMetronome');
	useMetronome = !useMetronome;
	if (!useMetronome) {
		document.getElementById('hi-hat').classList.add('off');
	} else {
		document.getElementById('hi-hat').classList.remove('off');
	}

	console.log("use metronome?", useMetronome);
}
function toggleRecording() {
	isRecording = !isRecording;
	if (!isRecording) {
		document.getElementById('record').classList.add('off');
	} else {
		document.getElementById('record').classList.remove('off');
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

			if (!useMetronome && note.isMetronome) {
				continue;
			}

			sampleMap[note.ascii].play(when);

			// flag as scheduled so we don't try to play it twice
			// unflag scheduled after tickRate
			note.scheduled = true;
			setTimeout(function unscheduleNoteTimeout(note) {
				note.scheduled = false;
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
	loopInterval = setInterval(tick, tickRate);
	tick(); tick(); // calling this a couple times may trigger events at timeInMeasure 0
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
		// console.log('enqueueSample', note);
	}, (loopLength * 1000) / 4); // this will cause problems with short loopLengths
}
function getTimeInMeasure() {
	return (context.currentTime - startTime) % loopLength;
}
function clearLoop() {
	sampleQ = [];
	addMetronome();
}
function undo() {
	if (sampleQ.length > 16) {
		sampleQ.pop();
	}
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
	console.log('key ' + ev.keyCode, 'asciiCode ' + asciiCode);
	window.ev = ev;
	switch (ev.keyCode) {
	case 32: // spacebar
		document.getElementById('play-pause').erAction();
		// toggleLoop();
		ev.preventDefault();
		return false;
	case 192: // `toggleLoop
		// clearLoop();
		document.getElementById('reset').erAction();
		return;
	case 188: // ,
		document.getElementById('undo').erAction();
		// undo();
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
	// look, the code used to have separation of concerns!
	initUi();
}
function addListener(el, fn) {
	if ('ontouchstart' in el) {
		el.ontouchstart = el.erAction = fn;
	} else {
		el.onclick = el.erAction = fn;
	}
}
function addListenerAndAnimation(el, fn) {
	var cb = function() {
		el.classList.add('down');
		el.src = el.src.replace('images', 'images-inverted');
		fn();
		setTimeout(function() {
			el.classList.remove('down');
			el.src = el.src.replace('images-inverted', 'images');
		}, 15);
	};

	var preload = document.createElement('img');
	preload.src = el.src.replace('images', 'images-inverted');

	addListener(el, cb);
}
function initUi() {
	var keyboard = [
		['q','w','e','r','t','y','u','i','o','p'],
		  ['a','s','d','f','g','h','j','k','l'],
		     ['z','x','c','v','b','n','m']
	];
	var container = document.getElementById('letters');
	container.style.display = 'none';
	for (var ri=0; ri<keyboard.length; ri++) {
		var row = document.createElement('div');
		row.classList.add('row');
		keyRow = keyboard[ri];
		for (var ki=0; ki<keyRow.length; ki++) {
			var key = keyRow[ki];
			
			var el = document.createElement('img');
			el.className = 'letter shake-constant';
			el.id = 'key-' + key;
			el.src = 'images/' + key + '.png';
			// el.textContent = key;

			if (key in sampleMap) {
				sampleMap[key].element = el;
				addListener(el, onClickLetter);
			}
			
			row.appendChild(el);
		}
		container.appendChild(row);
	}

	container.style.display = 'block';

	// hide loading before computing help text position
	document.getElementById('loading').style.display = 'none';

	// don't allow buttons to take focus
	for (button in document.querySelectorAll('button')) {
		button.onclick = function(ev) {
			ev.preventDefault();
			return false;
		}
	}


	// specific buttons
	var record = document.getElementById("record");
	addListener(record, toggleRecording);

	var tiger = document.getElementById("tiger");

	var hiHat = document.getElementById("hi-hat");
	addListener(hiHat, toggleMetronome);

	var undoBtn = document.getElementById("undo");
	addListenerAndAnimation(undoBtn, undo);

	var playPause = document.getElementById("play-pause");
	addListenerAndAnimation(playPause, toggleLoop);

	var reset = document.getElementById("reset");
	addListenerAndAnimation(reset, clearLoop);


	// help text
	var positionHelpKeyZ = function positionHelpKeyZ() {
		var key = document.getElementById('key-z');
		var helpKeyZ = document.getElementById('help-key-z');
		var offset = cumulativeOffset(key);
		helpKeyZ.style.top = (offset.top + key.offsetHeight/4) + 'px';
		helpKeyZ.style.left = (offset.left - (helpKeyZ.offsetWidth + 10)) + 'px';
		helpKeyZ.style.visibility = 'visible';
	}
	setTimeout(positionHelpKeyZ, 15);
	setTimeout(positionHelpKeyZ, 750);

	var helpPlayPause = document.getElementById('help-play-pause');
	offset = cumulativeOffset(playPause);
	helpPlayPause.style.top = (offset.top + playPause.offsetHeight + 5) + 'px';
	helpPlayPause.style.left = (offset.left + 40) + 'px';
	helpPlayPause.style.visibility = 'visible';

	var helpHiHat = document.getElementById('help-hi-hat');
	offset = cumulativeOffset(hiHat);
	helpHiHat.style.top = (offset.top + hiHat.offsetHeight/2) + 'px';
	helpHiHat.style.left = (offset.left + hiHat.offsetWidth + 15) + 'px';
	helpHiHat.style.visibility = 'visible';

	var helpRecord = document.getElementById('help-record');
	offset = cumulativeOffset(record);
	helpRecord.style.top = (offset.top + record.offsetHeight/3) + 'px';
	helpRecord.style.left = (offset.left + record.offsetWidth + 15) + 'px';
	helpRecord.style.visibility = 'visible';

	document.getElementById('help-bug').onclick = toggleHelp;

	// showWhiskers();
	// window.requestAnimationFrame(function onAnimationFrame() {
	// 	console.log(volumeAudioProcess.volume);
	// });
}
// oh man i'm really getting careless here...
window.helpVisible = true;
function toggleHelp() {
	window.helpVisible = !window.helpVisible;
	if (window.helpVisible) {
		showHelp();
	} else {
		hideHelp();
	}
}
function hideHelp() {
	var hb = document.getElementById('help-bug');
	hb.textContent = hb.textContent.replace('hide', 'show');
	var helps = document.querySelectorAll('.help');
	for (var i=0; i<helps.length; i++) {
		helps[i].style.display = 'none';
	}
}
function showHelp() {
	var hb = document.getElementById('help-bug');
	hb.textContent = hb.textContent.replace('show', 'hide');
	var helps = document.querySelectorAll('.help');
	for (var i=0; i<helps.length; i++) {
		helps[i].style.display = 'inline-block';
	}
}
// they're really "comic-style sound indicators"
function showWhiskers() {
	var whiskers = document.querySelectorAll('.whiskers');
	for (var i=0; i<whiskers.length; i++) {
		whiskers[i].style.visibility = 'visible';
	}
}
function hideWhiskers() {
	var whiskers = document.querySelectorAll('.whiskers');
	for (var i=0; i<whiskers.length; i++) {
		whiskers[i].style.visibility = 'hidden';
	}
}

function cumulativeOffset(element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left
    };
};


// shim console
if (!('console' in window)) {
	window.console = {
		log: function() {},
		error: function() {}
	}
}

console.log(
	"hello inquisitive console viewer! this was written over a couple drunk saturdays in exchange for pizza. " +
	"i hope it works for you! :) source: https://github.com/jibberia/bad-timing"
);

/* TODO
- test on windows; account: IEUser / Passw0rd!
? fix on PC iPad
x disallow zoom
x fix stuck animations!
x record toggle
x metronome toggle
- what to do when holding down keys
- god damn chrome on some android devices. grr!
*/













