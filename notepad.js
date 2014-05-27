goog.provide('notepad.Note');

goog.require('goog.dom');
goog.require('goog.ui.Zippy');
goog.require('goog.events');

notepad.Note = function(title, content, noteContainer) {
  this.title = title;
  this.content = content;
  this.parent = noteContainer;
};

notepad.Note.prototype.makeNoteDom = function() {
  this.headerElement = goog.dom.createDom('div',
    {'style': 'background-color: #EEE'}, this.title);
  this.contentElement = goog.dom.createDom('div', null, this.content);

  this.editorElement = goog.dom.createDom('textarea');
  var saveBtn= goog.dom.createDom('input', {type: 'button', value: 'Save'});
  this.editorContainer = goog.dom.createDom('div', {style: 'display: none'},
    this.editorElement, saveBtn);

  var newNote = goog.dom.createDom('div', null,
    this.headerElement, this.contentElement, this.editorContainer);

  goog.dom.appendChild(this.parent, newNote);

  goog.events.listen(this.contentElement, goog.events.EventType.CLICK, this.openEditor, false, this);
  goog.events.listen(saveBtn, goog.events.EventType.CLICK, this.save, false, this);

  this.zippy = new goog.ui.Zippy(this.headerElement, this.contentElement);
};

notepad.Note.prototype.openEditor = function(event) {
  var elt = event.target;
  var content = goog.dom.getTextContent(elt);

  this.editorElement.innerHTML = content;

  elt.style.display = 'none';
  this.editorContainer.style.display = 'inline';
};

notepad.Note.prototype.save = function(event) {
  this.content = this.editorElement.value;
  this.closeEditor();
};

notepad.Note.prototype.closeEditor = function() {
  this.contentElement.innerHTML = this.content;
  this.contentElement.style.display = 'inline';
  this.editorContainer.style.display = 'none';
};

notepad.makeNotes = function(data, noteContainer) {
  var notes = [];
  for (var i = 0; i < data.length; i++) {
    var note = new notepad.Note(data[i].title, data[i].content, noteContainer);
    notes.push(note);
    note.makeNoteDom();
  }
  return notes;
};
