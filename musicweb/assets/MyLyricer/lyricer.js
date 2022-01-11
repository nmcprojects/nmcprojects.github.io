function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                strSong = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
}


class Lyricer {

    // The constrcutor can be empty or passed in the lrc string
    constructor(options) {
        
        this.container = document.querySelector(".lyricer"); // the default container
        this.no_hover = false;
        this.clickable = true;
        this.isScroll = false;
        this.clickable = true;
        this.clickEventName = "lyricerclick";

        this.MAX_VOLUMN = 999; // max 999 seconds


        if(options) {
            for(var prop in options) {
                if(typeof this[prop] != "undefined" && options.hasOwnProperty(prop)) {
                    this[prop] = options[prop];
                }
            }
        }

        this.ulClass = "lyricer-wrap";
        this.liClass = "lyricer-item";
        this.oldLineClass = "lyricer-item--old-line";
        this.noHoverClass = "lyricer-item--no-hover";
        this.currentCss = "lyricer-item--current-line"  // this css for the line current playing
        this.lineidPrefix =  Array.prototype.join.call(this.container.parentNode.classList) + "lyricer-line"; // the id prefix for each line

       
    }

    setLrc(rawLrc) {
        this.tags = {};
		this.lrc = [];
		this.rangeLrc = [];

        var tagRegex = /\[([a-z]+):(.*)\].*/;
		var lrcAllRegex = /(\[[0-9.:\[\]]*\])+(.*)/;
		var timeRegex = /\[([0-9]+):([0-9.]+)\]/;
		var rawLrcArray = rawLrc.split(/[\r\n]/);
        
        for (var i = 0; i < rawLrcArray.length; i++) {
            // handle tags first
			var tag = tagRegex.exec(rawLrcArray[i]);
			if ( tag && tag[0] ) {
				this.tags[tag[1]] = tag[2];
				continue;
			}
			// handle lrc
			var lrc = lrcAllRegex.exec(rawLrcArray[i]);
			if ( lrc && lrc[0] ) {
				var times = lrc[1].replace(/\]\[/g,"],[").split(",");
				for (var j = 0; j < times.length; j++) {
					var time = timeRegex.exec(times[j]);
					if ( time && time[0] ) {
						this.lrc.push( { "starttime": parseInt(time[1],10) * 60 + parseFloat(time[2]), "line": lrc[2] } );
					};
				};
			};
        }

        //sort lrc array
		this.lrc.sort(function (a,b) {
			return a.starttime - b.starttime;
		});

        // create the range lrc array

        // real data
        var starttime = 0;
        var endtime;
		var line = "";

        for (var i = 0; i < this.lrc.length; i++) {
            endtime =  parseFloat(this.lrc[i].starttime);
            if(line) {
                this.rangeLrc.push( { "starttime": starttime, "endtime": endtime, "line": line} );
                starttime = endtime;
            }
            if(this.lrc[i].line) {
                if(this.rangeLrc.length > 0) {
                    this.rangeLrc[this.rangeLrc.length - 1]['endtime'] = endtime;
                    starttime = endtime;
                }
            }
            line = this.lrc[i].line;
        }
        this.rangeLrc.push( { "starttime": starttime, "endtime": this.MAX_VOLUMN, "line": line } ); // last line
        this.totalLines = this.rangeLrc.length;

        // set html and move to start
		this.setHtml(this);
        this.checkScroll(this);
		this.move(0);
    }

    setHtml(self) {
        self.currentLine = -1;
        self.container.innerHTML = "";
        var ul = document.createElement("ul");
        ul.classList.add(self.ulClass);
        self.container.appendChild(ul);

        for (var i = 0; i < self.totalLines; i++) {
            var li = document.createElement("li");
            li.classList.add(self.liClass);
            if(self.no_hover) {
                li.classList.add(self.noHoverClass);
            }
			li.innerHTML = self.rangeLrc[i].line;
			// if (!li.innerHTML) {
            //     li.innerHTML="&nbsp;"
            // };
			li.setAttribute("id", self.lineidPrefix + i);
			if (self.clickable) {
				li.onclick = this.lineClicked(self, i);
			}
			ul.appendChild(li);
        }
        // console.log(self.rangeLrc);
    }

    lineClicked(self, id) {
        return function(){
			var detail = {"time": self.rangeLrc[id].starttime};
			var e = new CustomEvent(self.clickEventName, { 
				'detail': detail,
				"bubbles": true
			});
			var elem = document.getElementById(self.lineidPrefix + id);
			elem.dispatchEvent(e);
		};
    }

    move(time) {
        for (let i = 0; i < this.totalLines; i++) {
			if (time >= this.rangeLrc[i].starttime && time < this.rangeLrc[i].endtime) {
                this.currentLine = i;
                this.moveToLine(this,this.currentLine);
				return;
			};
		};

    }

    moveToLine(self, line) {

		for (var i = 0; i < self.totalLines; i++) {
			var li = document.getElementById(self.lineidPrefix + i);

			if (i == line) {
                li.classList.add(self.currentCss);
                li.classList.remove(self.oldLineClass);
			} 
            else if (i < line) {
                li.classList.remove(self.currentCss);
                li.classList.add(self.oldLineClass);
			}
            else {
                li.classList.remove(self.currentCss);
                li.classList.remove(self.oldLineClass);
            };
		};

        self.moveToMiddle(self);
	};

    moveToMiddle(self) {
        if(self.isScroll == false) {
            
            if(self.currentLine == self.totalLines - 1) {
                self.container.scrollTop = self.container.scrollHeight;
                return;
            }
            var liCurrentLine = document.getElementById(self.lineidPrefix + self.currentLine);
            if(liCurrentLine.clientHeight > 0) {
                var lengthScroll = (self.currentLine + 1) * liCurrentLine.clientHeight - Math.floor(self.container.clientHeight / 2);
                if(lengthScroll > 0 || self.container.scrollTop > lengthScroll) {
                    self.container.scrollTop = lengthScroll;
                }
                
            }
        }
    }

    checkScroll(self) {
        self.container.addEventListener('mouseover', function() {
            self.isScroll = true;
        })
        self.container.addEventListener('mouseout', function() {
            self.isScroll = false;
        })
        
    }
}

window.Lyricer = Lyricer; //exposed to global
// var strSong;
// readTextFile("/song.txt")
// var lrc = new Lyricer({"appearInTheMiddle": false});
// lrc.setLrc(strSong);

// var audio = document.querySelector('audio');

// audio.addEventListener( "timeupdate", function() {
//     lrc.move(audio.currentTime);
// });

// var containerLyric = document.querySelector('.lyricer')

// // click lyric line back the song time
// window.addEventListener('lyricerclick', function(e){
//     if (e.detail.time > 0) {
//         audio.currentTime = e.detail.time;
//     }
// });



