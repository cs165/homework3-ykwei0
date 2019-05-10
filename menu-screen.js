// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    //console.log(this.containerElement);
    let choice = this.containerElement.querySelector('#choices');
    //console.log(choice);
    for(let i=0;i<FLASHCARD_DECKS.length;i++) {
      let div = document.createElement('div');
      //div.classList.add('menu-buttons');
      choice.append(div);
      div.textContent = FLASHCARD_DECKS[i].title;
      console.log(div);
      
      this.turnMain = this.turnMain.bind(this);
      div.addEventListener('click',this.turnMain);
    }
  }

  show() {
   this.containerElement.classList.remove('inactive');
  }

  hide() {
   this.containerElement.classList.add('inactive');
  }

  turnMain(event) {
    console.log('1. close menu screen, change to flashcard screen');
    //console.log(event.currentTarget.textContent);
    this.hide();
    const eventInfo = {
      title: event.currentTarget.textContent
    };
    document.dispatchEvent(new CustomEvent('menuClick', {detail: eventInfo }));
  }
}