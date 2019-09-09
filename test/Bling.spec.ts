import Bling from '../src/Bling';
const $ = new Bling(window);
describe('Bling', ()=>{
  it('should select the window object', ()=>{
    expect($.$('body')).toEqual(document.querySelector('body'));
  });

  it('should select all script objects', ()=>{
    expect($.$$('script')).toEqual(document.querySelectorAll('script'));
  })

  it('should attach an event to a single element', done =>{
    $.on($.$('body'), 'click', evt => {
      expect(evt instanceof Event).toBeTruthy();
      done();
    });
    $.$('body').click();
  });

  it('should attach an event to a list of elements', done =>{
    const elements = [];
    let count = 0;

    for(let i=0; i<10; i++) {
      let div = document.createElement('div');
      document.body.appendChild(div);
      elements.push(div);
    }
    $.on($.$$('div'), 'click', evt => {
      count ++;
      if(count === elements.length -1) {
        done();
      }
    });
    elements.forEach(element =>{
      element.click();
    })
  });
});