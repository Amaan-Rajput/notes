const overlayer = document.createElement('div');
overlayer.classList.add("overlayer", "model-overlay");

const NoteModel = function (title = 'Untitled', text = 'Add your note...', time = '') {
    const $model = document.createElement('div');
    $model.classList.add("model");
    $model.innerHTML = `
        <button class="icon-btn" data-close-btn data-tooltip="Close"><i class="fa-solid fa-xmark"></i></button>
        <input class="model-title" placeholder="Topic name" value="${title}" data-note-field>
        <textarea class="model-text" data-note-field>${text}</textarea>
        <div class="model-foot">
            <span class="note-time">${time}</span>
            <button class="submit fill note-button" aria-label="note-save" data-tooltip="Save Note">Save</button>
        </div>
    `;

    const [$titlefield, $textfield] = $model.querySelectorAll('[data-note-field]');
    const OnSubmit = $model.querySelector('.submit');

    const open = function () {
        document.body.appendChild($model);
        document.body.appendChild(overlayer);
        $titlefield.focus();
    }
    const close = function () {
        document.body.removeChild($model);
        document.body.removeChild(overlayer);
    }

    const CloseBtn = $model.querySelector('[data-close-btn]');
    CloseBtn.addEventListener('click', close);

    window.addEventListener('keydown', function (event) {
        if (event.key == 'Escape') {
            close();
        }
    });

    const submit = function (callback) {
        OnSubmit.addEventListener('click', function () {
            const note = {
                title: $titlefield.value,
                text: $textfield.value
            }
            callback(note);
        })
    }
    return { open, close, submit }
}
const ReadModel = function (title = 'Untitled', text = 'Add your note...', time = '') {
    const $model = document.createElement('div');
    $model.classList.add("model");
    $model.innerHTML = `
        <button class="icon-btn" data-close-btn data-tooltip="Close"><i class="fa-solid fa-xmark"></i></button>
        <input class="model-title" readonly placeholder="Topic name" value="${title}" data-note-field>
        <textarea class="model-text" readonly data-note-field>${text}</textarea>
        <div class="model-foot">
            <span class="note-time">${time}</span>
        </div>
    `;

    const [$titlefield, $textfield] = $model.querySelectorAll('[data-note-field]');
    const OnSubmit = $model.querySelector('.submit');

    const open = function () {
        document.body.appendChild($model);
        document.body.appendChild(overlayer);
        $titlefield.focus();
    }
    const close = function () {
        document.body.removeChild($model);
        document.body.removeChild(overlayer);
    }

    const CloseBtn = $model.querySelector('[data-close-btn]');
    CloseBtn.addEventListener('click', close);

    window.addEventListener('keydown', function (event) {
        if (event.key == 'Escape') {
            close();
        }
    });
    return { open, close }
}

const DeleteConfirmModal = function (title) {
    const $model = document.createElement('div');
    $model.classList.add("model");
    $model.innerHTML = `
            <h3>Are you sure you want delete <strong>"${title}"</strong>?</h3>
            <div class="model-foot extra">
                <button class=" text note-button" data-action-btn="false" aria-label-note-Cancel>Cancel</button>
                <button class="submit fill note-button" data-action-btn="true" aria-label-note-Delete>Delete</button>
            </div>
    `;

    const open = function () {
        document.body.appendChild($model);
        document.body.appendChild(overlayer);
    };
    const close = function () {
        document.body.removeChild($model);
        document.body.removeChild(overlayer);
    };
    const ActionBtn = $model.querySelectorAll('[data-action-btn]');

    const onSubmit = function (callback) {
        ActionBtn.forEach($btn => $btn.addEventListener('click', function () {
            const isConfirm = this.dataset.actionBtn == 'true' ? true : false;

            callback(isConfirm);
        }));
    }
    return { open, close, onSubmit }
}
export { DeleteConfirmModal, NoteModel, ReadModel };
