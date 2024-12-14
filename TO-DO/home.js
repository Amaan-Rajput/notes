const screen = document.documentElement;

const greeting = document.getElementById('greeting');
const name = document.getElementById('name');

const username = localStorage.getItem('username') || '';

name.value = username;
name.addEventListener('change', (e) => {
    localStorage.setItem('username', e.target.value);
});

// winner_effact
const jsConfetti = new JSConfetti();

// clock code 
let date = document.getElementById('date');
let month = document.getElementById('month');
let year = document.getElementById('year');
let day = document.getElementById('day');
let hours = document.getElementById('hours');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let period = document.getElementById('period');

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
            greeting.innerHTML = "Goodnight";
        } if (hours.innerHTML >= 5) {
            greeting.innerHTML = "Good morning";
        } if (hours.innerHTML == 12) {
            greeting.innerHTML = "Goodnight";
        }
    } else if (period.innerHTML == "Pm") {
        if (hours.innerHTML < 4) {
            greeting.innerHTML = "Good afternoon";
        } if (hours.innerHTML >= 4) {
            greeting.innerHTML = "Good evening";
        } if (hours.innerHTML >= 9) {
            greeting.innerHTML = "Goodnight";
        } if (hours.innerHTML == 12) {
            greeting.innerHTML = "Good afternoon";
        }
    }
}
setInterval(time, 1000);

const type_area = document.getElementById('type-area');
const type_input = document.getElementById('type_input');
const tasks_list = document.getElementById('tasks-list');
const success_list = document.getElementById('success-list');
const give_up_list = document.getElementById('give-up-list');
const eyes = document.getElementById('eyes');
const trash = document.getElementById('trash');
const full = document.getElementById('full');
const success_heading = document.getElementsByClassName('success')[0];
const give_up_heading = document.getElementsByClassName('give-up')[0];
const tasks_heading = document.getElementsByClassName('tasks')[0];
const popups = document.getElementsByClassName('popups')[0];
const popup_massage = document.getElementById('popup-massage');
const ok = document.getElementById('ok');
const cancel = document.getElementById('cancel');


todos = JSON.parse(localStorage.getItem('todos')) || [];
success = JSON.parse(localStorage.getItem('success')) || [];
giveup = JSON.parse(localStorage.getItem('giveup')) || [];


eyes.addEventListener('click', () => {
    let on = eyes.innerHTML;

    if (window.innerWidth >= 1000) {
        switch (on) {
            case "hide":
                eyes.classList.remove('bxs-hide');
                eyes.classList.add('bxs-show');
                eyes.innerHTML = 'show';
                success_list.style.width = "";
                success_list.style.right = "";
                give_up_list.style.width = "";
                give_up_list.style.right = "";
                success_heading.style.display = "";
                give_up_heading.style.display = "";
                tasks_list.style.left = "";
                tasks_list.style.width = "";
                tasks_heading.style.left = "";
                type_area.style.left = "";
                break;
            case "show":
                eyes.classList.remove('bxs-show');
                eyes.classList.add('bxs-hide');
                eyes.innerHTML = 'hide'
                success_list.style.width = "42.5%";
                success_list.style.right = "3%";
                give_up_list.style.width = "42.5%";
                give_up_list.style.right = "3%";
                success_heading.style.display = "flex";
                give_up_heading.style.display = "flex";
                tasks_list.style.left = "3%";
                tasks_list.style.width = "45%";
                tasks_heading.style.left = "5%";
                type_area.style.left = "5%";
                break;
        }
    } else {
        switch (on) {
            case "hide":
                eyes.classList.remove('bxs-hide');
                eyes.classList.add('bxs-show');
                eyes.innerHTML = 'show'
                success_list.style.width = "";
                success_list.style.right = "";
                give_up_list.style.width = "";
                give_up_list.style.right = "";
                success_heading.style.display = "";
                give_up_heading.style.display = "";
                tasks_list.style.left = "";
                tasks_list.style.width = "";
                tasks_heading.style.left = "";
                type_area.style.left = "";
                type_area.style.width = "";
                type_area.style.opacity = "";
                break;
            case "show":
                eyes.classList.remove('bxs-show');
                eyes.classList.add('bxs-hide');
                eyes.innerHTML = 'hide'
                success_list.style.width = "90%";
                success_list.style.right = "5%";
                give_up_list.style.width = "90%";
                give_up_list.style.right = "5%";
                success_heading.style.display = "flex";
                give_up_heading.style.display = "flex";
                tasks_list.style.left = "0%";
                tasks_list.style.width = "0%";
                tasks_heading.style.display = "flex";
                type_area.style.left = "0%";
                type_area.style.width = "0%";
                type_area.style.opacity = "0";
                break;
        }
    }

});

trash.addEventListener('click', () => {
    popup_massage.innerHTML = "All data earse";
    popups.classList.add('refresh');
    pop();

    // ok_btn
    ok.addEventListener('click', () => {
        Ok();
        localStorage.clear();
        location.reload();
    });
    // cancel_btn
    cancel.addEventListener('click', () => {
        Cancelbtn();
    })
});
// pop();

function pop() {
    type_area.style.filter = "blur(10px)";
    tasks_list.style.filter = "blur(10px)";
    tasks_heading.style.filter = "blur(10px)";
    success_list.style.filter = "blur(10px)";
    success_heading.style.filter = "blur(10px)";
    give_up_list.style.filter = "blur(10px)";
    give_up_heading.style.filter = "blur(10px)";
}
function Ok() {
    type_area.style.filter = "blur(0px)";
    tasks_list.style.filter = "blur(0px)";
    tasks_heading.style.filter = "blur(0px)";
    success_list.style.filter = "blur(0px)";
    success_heading.style.filter = "blur(0px)";
    give_up_list.style.filter = "blur(0px)";
    give_up_heading.style.filter = "blur(0px)";
}
function Cancelbtn() {
    popups.classList.remove('refresh');
    type_area.style.filter = "blur(0px)";
    tasks_list.style.filter = "blur(0px)";
    tasks_heading.style.filter = "blur(0px)";
    success_list.style.filter = "blur(0px)";
    success_heading.style.filter = "blur(0px)";
    give_up_list.style.filter = "blur(0px)";
    give_up_heading.style.filter = "blur(0px)";
    return;
}

full.addEventListener('click', () => {
    let Full = full.innerHTML;

    switch (Full) {
        case "full":
            screen.requestFullscreen();
            full.classList.remove('bx-fullscreen');
            full.classList.add('bx-exit-fullscreen');
            full.innerHTML = 'exit';
            break;
        case "exit":
            document.exitFullscreen()
            full.classList.add('bx-fullscreen');
            full.classList.remove('bx-exit-fullscreen');
            full.innerHTML = 'full';
            break;
    }
});

const center_notification = document.getElementById('center-notification');
type_area.addEventListener('submit', e => {
    e.preventDefault();

    const task = {
        tasks: e.target.elements.type_input.value.toLowerCase(),
    }

    if (type_input.value == "") {
        type_area.classList.add('error');
        center_notification.classList.add('activated');
        center_notification.innerHTML = "please type task";

        let icon = document.createElement('i');
        icon.className = ('bx bx-detail');

        center_notification.appendChild(icon);

        setTimeout(() => {
            type_area.classList.remove('error');
        }, 400);
        setTimeout(() => {
            center_notification.classList.remove('activated');
        }, 2950);
        return;
    }

    if (name.value == "") {
        type_area.classList.add('error');

        center_notification.classList.add('activated');
        center_notification.innerHTML = "type user name";

        let icon = document.createElement('i');
        icon.className = ('bx bxs-hand');

        center_notification.appendChild(icon);

        setTimeout(() => {
            type_area.classList.remove('error');
        }, 400);
        setTimeout(() => {
            center_notification.classList.remove('activated');
        }, 2950);
        return;
    }

    todos.push(task);

    localStorage.setItem('todos', JSON.stringify(todos));

    type_input.value = "";
    let tasks_add = document.getElementById('tasks-add');
    tasks_add.classList.add('active-tasks-add');
    tasks_add.innerHTML = "New task add";

    setTimeout(() => {
        tasks_add.classList.remove('active-tasks-add');
    }, 3000);
    Giveups()
    display();
    completed();
});
Giveups()
completed();
display();

function display() {
    tasks_list.innerHTML = '';
    todos.forEach(task => {
        const list = document.createElement("div");
        list.classList.add('list');

        const icon_true = document.createElement('i');
        icon_true.className = ('bx bx-check');

        const icon_false = document.createElement('i');
        icon_false.className = ('bx bx-x');

        const text = document.createElement('input');
        text.type = "text"
        text.value = `${task.tasks}`
        text.setAttribute("readonly", "readonly");

        const edit = document.createElement('button');
        edit.classList.add('tasks-edit');
        edit.innerHTML = "Edit";

        const Delete = document.createElement('button');
        Delete.classList.add('tasks-Delete');
        Delete.innerHTML = "remove";

        list.appendChild(icon_true);
        list.appendChild(icon_false);
        list.appendChild(text);
        list.appendChild(edit);
        list.appendChild(Delete);

        tasks_list.appendChild(list);

        // task_edit
        edit.addEventListener('click', (e) => {
            edit.innerHTML = "Save";
            const input = list.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            // After_edit
            input.addEventListener('blur', (e) => {
                edit.innerHTML = "Edit";
                input.setAttribute('readonly', true);
                task.tasks = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                display();

                // notification_call
                notification.classList.add('edit');
                notification.innerHTML = "Save task";

                let icon = document.createElement('i');
                icon.className = ('bx bx-check-shield');

                notification.appendChild(icon);

                setTimeout(() => {
                    notification.classList.remove('edit');
                }, 2950);
            })
        })
        // tasks_delete
        Delete.addEventListener('click', e => {
            todos = todos.filter(de => de !== task);

            localStorage.setItem('todos', JSON.stringify(todos));

            // notification_call
            notification.classList.add('remove');
            notification.innerHTML = "remove your task";

            let icon = document.createElement('i');
            icon.className = ('bx bx-check-shield');

            notification.appendChild(icon);

            setTimeout(() => {
                notification.classList.remove('remove');
            }, 2950);
            display();
        });


        // task_complete
        icon_true.addEventListener('click', e => {
            todos = todos.filter(tr => tr !== task);
            localStorage.setItem('todos', JSON.stringify(todos));
            // effact_on 
            jsConfetti.addConfetti({
                // colors
                confettiColors: [
                    '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7', '#d30845', '#AF0639', '#91052f',
                    '#0e575b', '#9bd7d6', '#63d2ff', '#3196d2',
                ],
            });

            // notification_call
            let notification = document.getElementById('notification');
            notification.classList.add('complete');
            notification.innerHTML = "Complete your task";

            let icon = document.createElement('i');
            icon.className = ('bx bx-check-shield');

            notification.appendChild(icon);

            setTimeout(() => {
                notification.classList.remove('complete');
            }, 2950);

            success.push(task);
            localStorage.setItem('success', JSON.stringify(success));
            completed();
            display();
        });

        // task_complete
        icon_false.addEventListener('click', e => {
            if (!confirm('You Give up \n Are you sure?')) {
                full.classList.add('bx-fullscreen');
                full.classList.remove('bx-exit-fullscreen');
                full.innerHTML = 'full';
                return;
            }
            full.classList.add('bx-fullscreen');
            full.classList.remove('bx-exit-fullscreen');
            full.innerHTML = 'full';

            todos = todos.filter(ta => ta !== task);
            localStorage.setItem('todos', JSON.stringify(todos));

            giveup.push(task);
            localStorage.setItem('giveup', JSON.stringify(giveup));

            // notification_call
            notification.classList.add('giveup');
            notification.innerHTML = "You gave up task";

            let icon = document.createElement('i');
            icon.className = ('bx bx-sad');

            notification.appendChild(icon);

            setTimeout(() => {
                notification.classList.remove('giveup');
            }, 2950);
            Giveups();
            display();

        });

    })

};
completed()
function completed() {

    success_list.innerHTML = '';
    success.forEach(task => {
        const completed_list = document.createElement('div');
        completed_list.classList.add("list");

        const complet_text = document.createElement('input');
        complet_text.type = "text"
        complet_text.value = `${task.tasks}`;
        complet_text.setAttribute("readonly", "readonly");

        const complet_delete = document.createElement('button');
        complet_delete.classList.add('success-Delete');
        complet_delete.innerHTML = "Delete";

        completed_list.appendChild(complet_text);
        completed_list.appendChild(complet_delete);

        success_list.appendChild(completed_list);

        complet_delete.addEventListener('click', () => {
            if (!confirm('permanently Delete \n Are you sure?')) {
                full.classList.add('bx-fullscreen');
                full.classList.remove('bx-exit-fullscreen');
                full.innerHTML = 'full';
                return;
            }
            full.classList.add('bx-fullscreen');
            full.classList.remove('bx-exit-fullscreen');
            full.innerHTML = 'full';

            success_list.removeChild(completed_list);
            success = success.filter(c => c !== task);
            // notification_call
            notification.classList.add('remove');
            notification.innerHTML = "Remove your task";

            let icon = document.createElement('i');
            icon.className = ('bx bx-check-shield');

            notification.appendChild(icon);

            setTimeout(() => {
                notification.classList.remove('remove');
            }, 2950);
            Ok();
            localStorage.setItem('success', JSON.stringify(success));

        });
        display();
    })
}
Giveups()
function Giveups() {

    give_up_list.innerHTML = '';
    giveup.forEach(task => {
        const quit_list = document.createElement('div');
        quit_list.classList.add("list");

        const quit_text = document.createElement('input');
        quit_text.type = "text"
        quit_text.value = `${task.tasks}`;
        quit_text.setAttribute("readonly", "readonly");

        const quit_delete = document.createElement('button');
        quit_delete.classList.add('success-Delete');
        quit_delete.innerHTML = "Delete";

        quit_list.appendChild(quit_text);
        quit_list.appendChild(quit_delete);

        give_up_list.appendChild(quit_list);

        quit_delete.addEventListener('click', () => {
            if (!confirm('permanently Delete \n Are you sure?')) {
                full.classList.add('bx-fullscreen');
                full.classList.remove('bx-exit-fullscreen');
                full.innerHTML = 'full';
                return;
            }
            full.classList.add('bx-fullscreen');
            full.classList.remove('bx-exit-fullscreen');
            full.innerHTML = 'full';

            give_up_list.removeChild(quit_list);
            giveup = giveup.filter(g => g !== task);
            // notification_call
            notification.classList.add('remove');
            notification.innerHTML = "Remove your task";

            let icon = document.createElement('i');
            icon.className = ('bx bx-check-shield');

            notification.appendChild(icon);

            setTimeout(() => {
                notification.classList.remove('remove');
            }, 2950);
            localStorage.setItem('giveup', JSON.stringify(giveup))
        });
        display();
    })
}
