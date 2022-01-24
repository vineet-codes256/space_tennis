class SoundWrapper {
  constructor(fileName) {
    setAudioFormat();

    this.alternativeSoundTurn = false;
    this.mainSound = new Audio(fileName + audioFormat);
    this.alternativeSound = new Audio(fileName + audioFormat);
  }

  play() {
    if (this.alternativeSoundTurn) {
      this.alternativeSound.currentTime = 0;
      this.alternativeSound.play();
    } else {
      this.mainSound.currentTime = 0;
      this.mainSound.play();
    }

    this.alternativeSoundTurn = !this.alternativeSoundTurn;
  }
}