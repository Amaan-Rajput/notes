import { client } from "./client.js";
import { db } from "./db.js";
import { DeleteConfirmModal, NoteModel, ReadModel } from "./Modal.js";
import { CallNotification, getRelativeTime } from "./notes.js";
import { Tooltip } from "./tooltip.js";

export const Note = function (note) {
    const { id, title, text, PostedOn, noteBookId } = note;
    const $note = document.createElement('div');
    $note.classList.add('notes-container');
    $note.setAttribute('data-note', id);
    $note.innerHTML = `
        <div class="layer" data-layer ></div>
        <div class="container-title">
            <h3>${title}</h3>
        </div>
        <pre class="container-body" data-note-text>${text}</pre>
        <div class="container-footer">
            <span class="time">${getRelativeTime(PostedOn)}</span>
            <div class="icons">
               <button class="note-edt-icon primary" data-Edit-Note data-tooltip="Edit Note"><i
                                class="fa-solid fa-pen-to-square"></i></button>
                <button class="note-bin-icon primary" data-delete-Note data-tooltip="Delete Note"><i
                                class="fa-solid fa-trash"></i></button>
            </div>
        </div>`;

    Tooltip($note.querySelector('[data-tooltip]'));

    const layer = $note.querySelector('[data-layer]')

    layer.addEventListener('click', () => {
        const Model = ReadModel(title, text, getRelativeTime(PostedOn));
        Model.open();
    });

    const EditNoteBtn = $note.querySelector('[data-Edit-Note]');

    EditNoteBtn.addEventListener('click', function (event) {
        event.stopImmediatePropagation();
        const Model = NoteModel(title, text, getRelativeTime(PostedOn));
        Model.open();
        Model.submit(function (note) {
            const updateDate = db.update.note(id, note);
            client.Note.Update(id, updateDate)
            Model.close();
        });
    });

    const deleteNoteBtn = $note.querySelector('[data-delete-Note]');

    deleteNoteBtn.addEventListener('click', function (event) {
        event.stopImmediatePropagation();
        const Model = DeleteConfirmModal(title);
        Model.open()
        Model.onSubmit(function (isConfirm) {
            if (isConfirm) {
                const existedNote = db.delete.note(noteBookId, id);
                client.Note.delete(id, existedNote.length);
                CallNotification('<i class="fa-solid fa-trash-arrow-up"></i>', 'remove', title, 'note');
            }
            Model.close();
        })
    })

    return $note;
}
