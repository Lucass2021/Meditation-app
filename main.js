//The currently code needs fixes regardless snow function//


const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");

    //Sounds //
    const sounds = document.querySelectorAll(".sound-picker button");

    //Time display//
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button");

    //Outline Length//
    const outlinelength = outline.getTotalLength();

    //Duration//
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlinelength;
    outline.style.strokeDashoffset = outlinelength;

    //Change Sound//
    sounds.forEach(sound => {
        sound.addEventListener("click", function () {
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(song);
        });
    });

    //Play Sound//
    play.addEventListener("click", () => {
        checkPlaying(song);
    });

    //Change time//

    timeSelect.forEach(option => {
        option.addEventListener("click", function () {
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:
            ${Math.floor(fakeDuration % 60)}`
        });
    });


    //Pause//
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = "./assets/svg/pause.svg";
        } else {
            song.pause();
            video.pause();
            play.src = "./assets/svg/play.svg";
        }
    };

    //Time//
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // Circle//
        let progress = outlinelength - (currentTime / fakeDuration) * outlinelength;
        outline.style.strokeDashoffset = progress;

        timeDisplay.textContent = `${minutes}: ${seconds}`;

        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = "./assets/svg/play.svg";
            video.pause();
        }
    };
};

app();