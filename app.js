// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    this.tmp = null;
    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);

    this.showFlashcard = this.showFlashcard.bind(this);
    this.showResult = this.showResult.bind(this);
    this.restartMenu = this.restartMenu.bind(this);
    this.restartFlashcard = this.restartFlashcard.bind(this);

    document.addEventListener('menuClick', this.showFlashcard);
    mainElement.addEventListener('turnResult', this.showResult);
    resultElement.addEventListener('turnMenu', this.restartMenu);
    resultElement.addEventListener('turnFlashcard', this.restartFlashcard);
    // Uncomment this pair of lines to see the "flashcard" screen:
    //this.menu.hide();
    //this.flashcards.show();

    // Uncomment this pair of lines to see the "results" screen:
    //this.menu.hide();
    //this.results.show();
  }

  showFlashcard(event) {
    let TITLE = event.detail.title;
    this.tmp = TITLE;
    console.log(TITLE + ' was clicked');
    this.flashcards.show(TITLE);
  }

  showResult(event) {
    console.log(event.detail);
    let rightNum = event.detail['right'];
    let wrongNum = event.detail['wrong'];
    console.log(rightNum);
    console.log(wrongNum);
    this.results.show(rightNum, wrongNum);
  }

  restartMenu() {
    console.log('restart menu');
    this.menu.show();
  }

  restartFlashcard() {
    console.log('restart flashcard and check the score');
    this.flashcards.remake(this.tmp);
  }
  
}

