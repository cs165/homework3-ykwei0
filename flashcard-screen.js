// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.over = this.over.bind(this);
    this.remake = this.remake.bind(this);
  }

  show(TITLE) {
    this.containerElement.classList.remove('inactive');
    const flashcardContainer = document.querySelector('#flashcard-container');
    const card = new Flashcard(flashcardContainer, TITLE);
    this.card = card;
    this.over = this.over.bind(this);
    flashcardContainer.addEventListener('endFlashcard', this.over);

  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  over(event) {
    this.hide();
    this.containerElement.dispatchEvent(new CustomEvent('turnResult',{detail:event.detail}));
  }

  remake(title) {
    //this.containerElement.classList.remove('inactive');
    console.log(this.card);
    if(this.card.totalwrong===0) {
      this.show(title);
    }
    else if(this.card.totalwrong!==0){
      console.log('it has wrong answer');
      console.log('wrong: '+this.card.totalwrong);
      console.log('wrong length: '+this.card.wrongfront.length);
      for(let i=0;i<this.card.wrongfront.length;i++) {
        console.log(this.card.wrongfront[i]);
      }
      this.containerElement.classList.remove('inactive');
      this.card.restart();
    }
  }
}
