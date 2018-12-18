function customDebounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
var handleMutation = customDebounce(function (mutationType) {
  var player = document.querySelector('#page_header #top_audio_player .top_audio_player_title');
  if (player) {
    var titleMusic = player.innerText;
    if (titleMusic && titleMusic.search(/[А-яЁё]/) !== -1) {
      var nextButton = document.querySelector('#page_header #top_audio_player .top_audio_player_btn.top_audio_player_next');
      nextButton && nextButton.click();
    }
  }
}, 100);
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', afterDOMLoaded);
} else {
    afterDOMLoaded();
}

function afterDOMLoaded(){
  var target = document.querySelector('#page_header');
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      handleMutation(mutation.type);
    });
  });
  var configObserver = { attributes: true, childList: true, characterData: true, subtree: true };
  observer.observe(target, configObserver);
}