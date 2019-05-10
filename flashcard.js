// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement,TITLE) {
    this.containerElement = containerElement;

    this._flipCard = this._flipCard.bind(this);
    this._onDragStart = this._onDragStart.bind(this);
    this._onDragMove = this._onDragMove.bind(this);
    this._onDragEnd = this._onDragEnd.bind(this);
    

    this.frontText = new Array();
    this.backText = new Array();
    this.count = 0;
    this.cardNum = 0;
    this.right = 0;
    this.wrong = 0;
    
    this.totalwrong = 0;
    this.wrongfront = new Array();
    this.wrongback = new Array();
    this.flag = new Array();

    for(let i=0;i<FLASHCARD_DECKS.length;i++) {
      if(FLASHCARD_DECKS[i].title===TITLE) {
        let j=0;
        for(let word in FLASHCARD_DECKS[i].words) {
          this.frontText[j] = word;
          this.backText[j] = FLASHCARD_DECKS[i].words[word];
          this.flag[j] = 1;
          j++;
        }
        this.cardNum = j;
      } 
    }

    let correct = document.querySelector('.status .correct');
    let incorrect = document.querySelector('.status .incorrect');
    correct.textContent = this.right;
    incorrect.textContent = this.wrong;

    this.createFlashcard = this.createFlashcard.bind(this);
    this.createFlashcard();

    this.restart = this.restart.bind(this);
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM() {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = this.frontText[this.count];

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= this.backText[this.count];

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    this.flashcardElement.classList.toggle('show-word');
  }

  _onDragStart(event) {
    this.originX = event.clientX;
    this.originY = event.clientY;
    this.dragStarted = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.style.transitionDuration='0s';
  }
  
  _onDragMove(event) {
    if (!this.dragStarted) {
      return;
    }
    event.preventDefault();
    this.deltaX = event.clientX - this.originX;
    this.deltaY = event.clientY - this.originY;
    //console.log('this.originX: '+this.originX);
    const translateX = this.offsetX + this.deltaX;
    const translateY = this.offsetY + this.deltaY;
    event.currentTarget.style.transform = 'translate(' +
     translateX + 'px, ' + translateY + 'px) ' + 'rotate(' + 0.2 * translateX + 'deg)';
    //console.log('deltaX: '+this.deltaX);
    //console.log('translateX: '+translateX);
    
    let correct = document.querySelector('.status .correct');
    let incorrect = document.querySelector('.status .incorrect');
    let body = document.querySelector('body');
    if(this.deltaX >= 150) {
      body.style.backgroundColor = '#97b7b7';
    }
    else if(this.deltaX <= -150) {
      body.style.backgroundColor = '#97b7b7';
    }
    else {
      body.style.backgroundColor = '#d0e6df';
    }
  }
  
  _onDragEnd(event) {
    this.dragStarted = false;
    this.offsetX += event.clientX - this.originX;
    this.offsetY += event.clientY - this.originY;
    //console.log('offset: '+this.offsetX);
    if(this.deltaX >= 150 || this.deltaX <= -150) {
      //如果還沒到card的數量，刪掉一張再造一張
      if(this.count < this.cardNum){ 
        if(this.deltaX>=150) {
          if(this.flag[this.count-1]===0) {
            this.totalwrong--;
            this.wrong--;
            this.flag[this.count-1] = 1;
            let incorrect = document.querySelector('.status .incorrect');
            incorrect.textContent = this.wrong;
          }
          this.right++;
          let correct = document.querySelector('.status .correct');
          correct.textContent = this.right;
        }
        else if(this.deltaX<=-150) {
          if(this.flag[this.count-1]===0) {
            let incorrect = document.querySelector('.status .incorrect');
            incorrect.textContent = this.wrong;
          }
          else {
            this.wrong++;
            console.log('how many '+this.count);
            this.flag[this.count-1] = 0;
            this.wrongfront[this.totalwrong] = this.frontText[this.count-1];
            this.wrongback[this.totalwrong] = this.backText[this.count-1];
            this.totalwrong++;
            let incorrect = document.querySelector('.status .incorrect');
            incorrect.textContent = this.wrong;
          }
        }
        this.containerElement.innerHTML = '';
        this.createFlashcard();
        //console.log('answer');
      }
      else {
        if(this.deltaX>=150) {
          if(this.flag[this.count-1]===0) {
            this.totalwrong--;
            this.wrong--;
            this.flag[this.count-1] = 1;
            let incorrect = document.querySelector('.status .incorrect');
            incorrect.textContent = this.wrong;
          }
          this.right++;
          let correct = document.querySelector('.status .correct');
          correct.textContent = this.right;
        }
        else if(this.deltaX<=-150) {
          if(this.flag[this.count-1]===0) {
            let incorrect = document.querySelector('.status .incorrect');
            incorrect.textContent = this.wrong;
          }
          else {
            this.wrong++;
            console.log('how many '+this.count);
            this.flag[this.count-1] = 0;
            this.wrongfront[this.totalwrong] = this.frontText[this.count-1];
            this.wrongback[this.totalwrong] = this.backText[this.count-1];
            this.totalwrong++;
            let incorrect = document.querySelector('.status .incorrect');
            incorrect.textContent = this.wrong;
          }
        }

        this.containerElement.innerHTML = '';
        console.log('cal result');
        const result = {'right':this.right,'wrong':this.wrong};
        this.containerElement.dispatchEvent(new CustomEvent('endFlashcard',{detail:result}));
        for(let i=0;i<this.flag.length;i++)
          console.log(this.flag[i]);
      }
    }
    else {
      event.currentTarget.style.transform = 'translate(0px, 0px)';
      event.currentTarget.style.transitionDuration = '0.6s';
      this.originX = null;
      this.originY = null;
      this.offsetX = 0;
      this.offsetY = 0;
      this.deltaX = 0;
      this.deltaY = 0;
    }
  }

  createFlashcard() {
    let body = document.querySelector('body');
    body.style.backgroundColor = '#d0e6df';
    this.originX = null;
    this.originY = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.dragStarted = false;
    this.flashcardElement = this._createFlashcardDOM();
    this.containerElement.append(this.flashcardElement);
    this.flashcardElement.addEventListener('pointerup', this._flipCard);
    this.flashcardElement.addEventListener('pointerdown', this._onDragStart);
    this.flashcardElement.addEventListener('pointermove', this._onDragMove);
    this.flashcardElement.addEventListener('pointerup', this._onDragEnd);
    this.count++;
  }

  restart(event) {
    console.log('錯的題數 '+this.totalwrong);
    this.cardNum = this.totalwrong;
    this.count = 0;
    console.log('有幾個問題卡 '+this.cardNum);
    //for(let i=0;i<this.totalwrong;i++) {
    //  console.log(this.wrongfront[i]+' : '+this.wrongback[i]);
    //}
    this.frontText = new Array();
    this.backText = new Array();
    this.flag = new Array();
    for(let i=0;i<this.totalwrong;i++) {
      this.frontText[i] = this.wrongfront[i];
      this.backText[i] = this.wrongback[i];
      this.flag[i] = 0;
    }
    this.createFlashcard();
  }

}