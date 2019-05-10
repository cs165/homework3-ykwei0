// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;

    this.hide = this.hide.bind(this);
    this.backMenu = this.backMenu.bind(this);
    this.backFlashcard = this.backFlashcard.bind(this);
    //this.onclick1 = this.onclick1.bind(this);
    //this.onclick2 = this.onclick2.bind(this);

    let Continue = document.querySelector('.continue');
    Continue.addEventListener('click', this.backFlashcard);
    let toMenu = document.querySelector('.to-menu');
    toMenu.addEventListener('click', this.backMenu);
  }

  show(rightNum, wrongNum) {
    this.containerElement.classList.remove('inactive');
    let percent = document.querySelector('#results .percent');
    let correct = document.querySelector('#results .correct');
    let incorrect = document.querySelector('#results .incorrect');
    correct.textContent = rightNum;
    incorrect.textContent = wrongNum;
    percent.textContent = Math.round(rightNum/(rightNum+wrongNum)*100);

    let Continue = document.querySelector('#results .continue');
    if(wrongNum === 0) {
      Continue.textContent = 'Start over?';
    }
    else {
      Continue.textContent = 'Continue';
    }
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  backMenu() {
    this.hide();
    this.containerElement.dispatchEvent(new CustomEvent('turnMenu'));
  }

  backFlashcard() {
    this.hide();
    this.containerElement.dispatchEvent(new CustomEvent('turnFlashcard'));
  }

}

