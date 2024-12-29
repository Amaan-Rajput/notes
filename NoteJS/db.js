import { generateID, findNoteBook, findNoteBookIndex, findNote, findChindex, } from "./notes.js";

let NoteBookkeeper = {};

const intiDB = function () {
    const db = localStorage.getItem('NoteBookkeeper');

    if (db) {
        NoteBookkeeper = JSON.parse(db);
    } else {
        NoteBookkeeper.NoteBooks = [];
        localStorage.setItem('NoteBookkeeper', JSON.stringify(NoteBookkeeper));
    }
}

intiDB()


const readDB = function () {
    NoteBookkeeper = JSON.parse(localStorage.getItem('NoteBookkeeper'))
}
const writeDB = function () {
    localStorage.setItem('NoteBookkeeper', JSON.stringify(NoteBookkeeper));
}

export const db = {
    post: {
        noteBook(name) {
            readDB();
            const NoteBookData = {
                id: generateID(),
                name,
                notes: []
            };

            NoteBookkeeper.NoteBooks.push(NoteBookData);

            writeDB();
            return NoteBookData;
        },
        note(noteBookId, object) {
            readDB();
            const notebook = findNoteBook(NoteBookkeeper, noteBookId);
            const note = {
                id: generateID(),
                noteBookId,
                ...object,
                PostedOn: new Date().getTime(),
            };
            notebook.notes.push(note);
            writeDB();
            return note;
        }
    },

    get: {
        noteBook() {
            readDB()
            return NoteBookkeeper.NoteBooks;
        },
        note(noteBookId) {
            readDB()
            const notebook = findNoteBook(NoteBookkeeper, noteBookId);
            return notebook.notes;
        }
    },

    update: {
        noteBook(noteBookId, name) {
            readDB();
            const noteBook = findNoteBook(NoteBookkeeper, noteBookId);
            console.log(noteBook);
            noteBook.name = name;
            writeDB();
            return noteBook;
        },
        note(noteId, object) {
            readDB();
            const oldnote = findNote(NoteBookkeeper, noteId)
            const newNote = Object.assign(oldnote, object);
            writeDB();
            return newNote;
        }
    },
    delete: {
        noteBook(noteBookId) {
            readDB();
            const NoteBookIndex = findNoteBookIndex(NoteBookkeeper, noteBookId);
            NoteBookkeeper.NoteBooks.splice(NoteBookIndex, 1);
            writeDB();
        },
        note(noteBookId, noteId) {
            readDB();
            const NoteBook = findNoteBook(NoteBookkeeper, noteBookId);            
            const NoteIndex = findChindex(NoteBook, noteId);
            NoteBook.notes.splice(NoteIndex, 1);
            writeDB();
            return NoteBook.notes;
        }
    }
}