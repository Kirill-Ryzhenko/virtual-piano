document.addEventListener('DOMContentLoaded', () => {
  const fullScreen = document.querySelector('.fullscreen');
  const btnNotesLetters = document.querySelectorAll('.btn');
  const pianoKey = document.querySelectorAll('.piano-key');
  const piano = document.querySelector('.piano');

  const audioArray = ['a', 'a♯', 'b', 'c', 'c♯', 'd', 'd♯', 'e', 'f', 'f♯', 'g', 'g♯'];

  function activateFullscreen() {
    element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  function deactivateFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  fullScreen.addEventListener('click', () => {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      activateFullscreen();
    } else {
      deactivateFullscreen();
    }
  });

  for (let el of btnNotesLetters) {
    el.addEventListener('click', (event) => {
      if (!el.classList.contains('btn-active')) {
        for (let i = 0; i < 2; i++) {
          btnNotesLetters[i].classList.toggle('btn-active');
        }
      }
      if (btnNotesLetters[0].classList.contains('btn-active')) {
        for (let i = 0; i < pianoKey.length; i++) {
          pianoKey[i].classList.remove('piano-key-letter');
        }
      }
      if (btnNotesLetters[1].classList.contains('btn-active')) {
        for (let i = 0; i < pianoKey.length; i++) {
          pianoKey[i].classList.add('piano-key-letter');
        }
      }
    });
  }

  for (let key of pianoKey) {
    key.addEventListener('mousedown', () => {
      key.style.transform = 'scale(0.9)';
      let sound = key.dataset.note;
      key.classList.add('piano-key-active');
      audioChoice(sound);
      key.addEventListener('mouseout', () => {
        key.classList.remove('piano-key-active');
        key.style.transform = 'scale(1)';
      });
    });
  }

  document.addEventListener('keydown', (event) => {
    const keyArray = ['KeyK', 'KeyO', 'KeyL', 'KeyD', 'KeyR', 'KeyF', 'KeyT', 'KeyG', 'KeyH', 'KeyU', 'KeyJ', 'KeyI'];
    for (let i = 0; i < keyArray.length; i++) {
      if (keyArray[i] === event.code) {
        audioChoice(audioArray[i]);
        for (let key of pianoKey) {
          if (key.dataset.note === audioArray[i]) {
            key.style.transform = 'scale(0.9)';
            key.classList.add('piano-key-active');
            setTimeout(() => {
              key.style.transform = 'scale(1)';
              key.classList.remove('piano-key-active');
            }, 300);
          }
        }
      }
    }
  });

  function audioChoice(audioMP) {
    let audio = new Audio(`./assets/audio/${audioMP}.mp3`);
    audio.play();
  }
});
