let dics
fetch('./dics.json').then(r => r.json()).then(r => {
  dics = r;
} )

var $highlights = $('.highlights');
var $textarea = $('[name="Classic"]');
let marked = []
let english = []
// yeah, browser sniffing sucks, but there are browser-specific quirks to handle that are not a matter of feature detection
var ua = window.navigator.userAgent.toLowerCase();
var isIE = !!ua.match(/msie|trident\/7|edge/);
// var isWinPhone = ua.indexOf('windows phone') !== -1;
// var isIOS = !isWinPhone && !!ua.match(/ipad|iphone|ipod/);

function applyHighlights(text) {
  text = text.replace(/(?<!\n)\n$/g, '\n\n')
  console.info(text, marked)
  for(ctx of marked){
    text = text.replace(new RegExp(ctx+"(?= )", 'g'), '<span class="myhighlight">'+ctx+'</span>');
  }
  console.info(text, marked)
  
  for(eng of english){
    text = text.replace(new RegExp(eng, 'g'), '<span class="eng">'+eng+'</span>');
  }
  if (isIE) {
    // IE wraps whitespace differently in a div vs textarea, this fixes it
    text = text.replace(/ /g, ' <wbr>');
  }
  return text;
  // for (ctx of marked){
  //   text = text.replace(new RegExp(ctx, 'g'), '<span class="myhighlight">'+ctx+'</span>');
  // }
    
}

function handleInput() {
  var text = $textarea.val();
  var highlightedText = applyHighlights(text);
  $highlights.html(highlightedText);

  // this.style.height = 0;
  $textarea[0].style.height = "100%";
  $highlights.height(($textarea[0].scrollHeight) + "px")
  $textarea[0].style.height = ($textarea[0].scrollHeight) + "px";
}

function handleResize() {
  $highlights.width($textarea.width()).height($textarea.height());
  // handleInput();
}


function bindEvents() {
  $textarea.each(function () {
    this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
    $highlights.height((this.scrollHeight) + "px")
  })
  

  $(window).on({'resize': handleResize})
//   $toggle.on('click', function() {
//     $container.toggleClass('perspective');
//   });  
}

bindEvents();
handleResize();

// let classicText = $("[name='Classic']")
function last_word(){
  value = $textarea.val()
  length = value.length
  for (i=2;i<=length;i++){
    if(value[length-i]==" "||value[length-i]=="\n") return value.substr(length-i+1, length)
  }
  return value
}

function spell_check(text){
  var c_dic = dics
  for(i=0;i<text.length;i++){
    if (text[i] in c_dic){
      c_dic = c_dic[text[i]]
    }else{
      return false
    }
  }
  return true
}


function mark_error(text){
  is_correct = spell_check(text)
  if(!is_correct){
    if(!marked.includes(text)){marked.push(text)}
    handleInput()
  }
}