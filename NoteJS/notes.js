import { db } from "./db.js";

const addEventOnElements = function ($elements, eventType, callback) {
    $elements.forEach($element => $element.addEventListener(eventType, callback));
}

const notification_area = document.querySelector('.notification-area');
const CallNotification = function (Icon, whatdo, title, Obj) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `<div class="icon-area">${Icon}</div> ${whatdo} ${title} ${Obj}<i
                    class="fa-solid fa-xmark"></i>`;
    notification_area.appendChild(notification);

    setTimeout(() => {
        notification_area.removeChild(notification);
    }, 2900);
}

let LastactiveBook;
const ActiveBook = function () {
    LastactiveBook?.classList.remove('active');
    this.classList.add('active');
    LastactiveBook = this;
}

const MakeBookEdit = function (Element) {
    Element.setAttribute('contenteditable', true);
    Element.focus();
}

const generateID = function () {
    return new Date().getTime().toString()
}
const getRelativeTime = function (milliseconds) {
    const currentTime = new Date().getTime();
    const minute = Math.floor((currentTime - milliseconds) / 1000 / 60);
    const hour = Math.floor(minute / 60);
    const day = Math.floor(hour / 24);

    return minute < 1 ? 'Just now' : minute < 60 ? `${minute} min ago` : hour < 24 ? `${hour} hour ago ` : `${day} day ago `;
}


const findNoteBook = function (db, noteBookId) {
    return db.NoteBooks.find(notebook => notebook.id == noteBookId)
}
const findNoteBookIndex = function (db, noteBookId) {
    return db.NoteBooks.findIndex(item => item.id == noteBookId);
}

const findNote = (db, noteId) => {
    let note;
    for (const NoteBook of db.NoteBooks) {
        note = NoteBook.notes.find(note => note.id == noteId);
        if (note) break;
    }
    return note;
}
const findChindex = function (NoteBook, noteId) {
    return NoteBook.notes.findIndex(note => note.id == noteId);
}

export {
    addEventOnElements,
    CallNotification,
    ActiveBook,
    MakeBookEdit,
    generateID,
    findNoteBook,
    findNoteBookIndex,
    getRelativeTime,
    findNote,
    findChindex,
}