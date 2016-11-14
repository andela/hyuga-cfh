$(function () {
  // Initializes and creates emoji set from sprite sheet
  window.emojiPicker = new EmojiPicker({
    emojiable_selector: '[data-emojiable=true]',
    assetsPath: 'views/emoji-picker/lib/img/',
    popupButtonClasses: 'fa fa-smile-o'
  });
  window.emojiPicker.discover();
});
