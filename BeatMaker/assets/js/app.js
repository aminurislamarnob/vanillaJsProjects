class DrumKit{
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.playBtn = document.querySelector('.play');
        this.kickSound = 'assets/sounds/kick-classic.wav';
        this.snareSound = 'assets/sounds/snare-acoustic01.wav';
        this.hihatSound = 'assets/sounds/hihat-acoustic01.wav';
        this.index = 0;
        this.bpm = 250;
        this.isPlay = null;
        this.selectAudio = document.querySelectorAll('select');
        this.muteBtn = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');
        this.tempoValue = document.querySelector('.tempo-nr');
    }

    //active pad
    activePad() {
        this.classList.toggle('active');
    }

    //repeat drum
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);

        //Loop over the pads
        activeBars.forEach(pad => {
            pad.style.animation = 'playTrack 0.3s alternate ease-in-out 2';

            //check which pad is active
            if (pad.classList.contains('active')) {
                
                //check each sound
                if (pad.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (pad.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (pad.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });

        this.index++;
    }

    //start drum
    start() {
        const interval = (60 / this.bpm) * 1000;

        if (this.isPlay) {
            clearInterval(this.isPlay);
            this.isPlay = null;
        } else {
            this.isPlay = setInterval(() => {
                this.repeat();
            }, interval); 
        }
        
    }

    //buton text update
    updateBtn() {
        if (!this.isPlay) {
            this.playBtn.innerText = 'Stop';
            this.playBtn.classList.add('active');
        } else {
            this.playBtn.innerText = 'Play';
            this.playBtn.classList.remove('active');
        }
    }

    //change audio on select dropdown change
    changeAudio(e) {
        const audioName = e.target.name;
        const audioPath = e.target.value;
        
        switch (audioName) {
            case 'kick-select':
                this.kickAudio.src = audioPath;
                break;
            
            case 'snare-select':
                this.snareAudio.src = audioPath;
                break;
            
            case 'hihat-select':
                this.hihatAudio.src = audioPath;
                break;
                
        }
    }

    //Mute Audio
    muteAudio(e) {
        e.target.classList.toggle('active');
        const dataTrack = e.target.getAttribute('data-track');
        
        if (e.target.classList.contains('active')) {
            switch (dataTrack) {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        } else {
            switch (dataTrack) {
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }


    //change tempo
    changeTempo(e) {
        this.tempoValue.innerText = e.target.value;
    }

    //udpate tempo/interval
    updateTempo(e) {
        this.bpm = e.target.value;
        clearInterval(this.isPlay);
        this.isPlay = null;

        const playBtn = document.querySelector('.play');
        if (playBtn.classList.contains('active')) {
            this.start();
        }
    }

}

const drumKit = new DrumKit();

//add active class to pad
drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function () {
        this.style.animation = '';
    });
});

//start to click play button
drumKit.playBtn.addEventListener('click', function () {
    drumKit.updateBtn();
    drumKit.start();
});


//change audio on select dropdown change
drumKit.selectAudio.forEach(select => {
    select.addEventListener('change', function (e) {
        drumKit.changeAudio(e);
    });
});


//Mute audio
drumKit.muteBtn.forEach(muteBtn => {
    muteBtn.addEventListener('click', function (e) {
        drumKit.muteAudio(e);
    });
});


//tempo slider
drumKit.tempoSlider.addEventListener('input', function (e) {
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener('change', function (e) {
    drumKit.updateTempo(e);
});