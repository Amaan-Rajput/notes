import {
    addEventOnElements,
    ActiveBook,
    MakeBookEdit,
} from "./notes.js";
import { db } from "./db.js";
import { Tooltip } from "./tooltip.js";
import { Book } from "./Book.js";
import { NoteModel } from "./Modal.js";
import { client } from "./client.js";

// clock code 
let date = document.getElementById('date');
let month = document.getElementById('month');
let year = document.getElementById('year');
let day = document.getElementById('day');
let hours = document.getElementById('hours');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let period = document.getElementById('period');
let dot = document.querySelectorAll('.dot');

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function time() {
    const currtime = new Date();
    date.innerHTML = (currtime.getDate() < 10 ? "0" : "") + currtime.getDate();
    year.innerHTML = currtime.getFullYear();
    month.innerHTML = months[currtime.getMonth()];
    day.innerHTML = week[currtime.getDay()];
    hours.innerHTML = currtime.getHours();
    minutes.innerHTML = (currtime.getMinutes() < 10 ? "0" : "") + currtime.getMinutes();
    seconds.innerHTML = (currtime.getSeconds() < 10 ? "0" : "") + currtime.getSeconds();

    if (hours.innerHTML == 0) {
        hours.innerHTML = 12;
        period.innerHTML = 'Am';
    } else if (hours.innerHTML < 12) {
        period.innerHTML = 'Am'
    } else if (hours.innerHTML == 12) {
        period.innerHTML = 'Pm'
    } else if (hours.innerHTML > 12) {
        hours.innerHTML = hours.innerHTML - 12;
        period.innerHTML = 'Pm';
    }
    if (hours.innerHTML < 10) {
        hours.innerHTML = `0${hours.innerHTML}`
    }

    if (period.innerHTML == "Am") {
        if (hours.innerHTML >= 1) {
            greeting.innerHTML = "Good night";
        } if (hours.innerHTML >= 5) {
            greeting.innerHTML = "Good morning";
        } if (hours.innerHTML == 12) {
            greeting.innerHTML = "Good night";
        }
    } else if (period.innerHTML == "Pm") {
        if (hours.innerHTML < 4) {
            greeting.innerHTML = "Good afternoon";
        } if (hours.innerHTML >= 4) {
            greeting.innerHTML = "Good evening";
        } if (hours.innerHTML >= 9) {
            greeting.innerHTML = "Good night";
        } if (hours.innerHTML == 12) {
            greeting.innerHTML = "Good afternoon";
        }
    }

}
setInterval(time, 1000);


const $togglerBtn = document.querySelectorAll('[data-toggler-Btn]');
const $sidePanel = document.querySelector('[data-side-panel]');
const $overlayer = document.querySelector('[data-overlayer]')

addEventOnElements($togglerBtn, 'click', function () {
    $sidePanel.classList.toggle('active');
    $overlayer.classList.toggle('active');
});

// tooltip

const $tooltipElems = document.querySelectorAll('[data-tooltip]');
$tooltipElems.forEach($elem => Tooltip($elem));


const welcomePageTemplate = `
    <div class="welcome-page emtpy-book">
        <h2 class="text">welcome to our notekeeper</h2>
        <img src="https://amaan-rajput.github.io/notes/Noteimage/first-page.svg" alt="" height="90%" width="100%" >
    </div>`;

const emptyNotesTemplate = `
        <div class="emtpy-book">
            <img src="https://amaan-rajput.github.io/notes/Noteimage/Data-not-found.svg" alt="" height="100%" width="100%">
            <h2>Please Add Notes</h2>
        </div> `;

const welcomePage = document.querySelector('.welcome-page');
if (window.innerWidth <= 900) {
    welcomePage.addEventListener('click', function () {
        $sidePanel.classList.toggle('active');
        $overlayer.classList.toggle('active');
    })
}
// noteBook

const AddBook = document.querySelector('#Add-book');
const Bag = document.querySelector('.bag');

const Shownotebooks = function () {

    const Book = document.createElement('div');
    Book.classList.add('book');

    Book.innerHTML = `
            <span class="title" id="Title"></span>
    `

    Bag.appendChild(Book);

    const NotebookTitle = Book.querySelector('#Title');

    ActiveBook.call(Book);
    MakeBookEdit(NotebookTitle);
    NotebookTitle.addEventListener('keydown', createBookTitle);

};

AddBook.addEventListener('click', Shownotebooks);

const createBookTitle = function (event) {
    if (event.key == 'Enter') {
        const noteBookData = db.post.noteBook(this.textContent || 'undefined');
        this.parentElement.remove();
        client.NoteBook.create(noteBookData);
    }

}

const readSavedNoteBook = function () {
    const noteBookList = db.get.noteBook();
    client.NoteBook.Read(noteBookList);
}
readSavedNoteBook();

const $NoteCreateBtns = document.querySelectorAll('[data-NoteAdd-btn]');

addEventOnElements($NoteCreateBtns, 'click', function () {
    const Model = NoteModel();
    Model.open();
    Model.submit(noteObj => {
        const currentactiveBook = document.querySelector('[data-notebook].active').dataset.notebook;
        const note = db.post.note(currentactiveBook, noteObj);
        client.Note.create(note);
        Model.close();
    })
});

const renderExistedNote = function () {
    const currentactiveBookId = document.querySelector('[data-notebook].active')?.dataset.notebook;

    if (currentactiveBookId) {
        const noteList = db.get.note(currentactiveBookId);
        client.Note.read(noteList);
    }
}
renderExistedNote();

export {
    welcomePageTemplate,
    emptyNotesTemplate
}
