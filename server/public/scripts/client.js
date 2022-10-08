$(document).ready(onReady);
function onReady() {
console.log('client.js ready, jquery ready');
    showTasks();
    $('#submitBtn').on('click',addTask);
    $('#tbody').on('click', '.delBtn', deleteTask);

}

function showTasks() {
    console.log("in showTasks");
    $('#appendTask').empty();
    $.ajax({
        method:'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log("GET /tasks response",response);
        for(let x of response) {
            $('#appendTask').append(`
            <tr>
                <td> ${x.task}</td> 
                <td> ${x.completed} </td>
                <td><input type="checkbox" class="check"/></td>
                <td> ${x.notes} </td>
                <td> <button class="delBtn" data-id="${x.id}">Delete</button></td>
            </tr>
               `)
            }
        }).catch((err) => {
            console.log("error in GET /tasks",err)
        })
}

function addTask(evt) {
    evt.preventDefault();
if($('#inputTask').val() == "") {
    alert("Please enter a task");
    return;
}
console.log("Submit button clicked");

    let taskObj = {
        task: $('#inputTask').val(),
        completed: false,
        notes: $('#inputNotes').val()
    }
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskObj
    }).then(function(response) {
        $('#inputTask').val(''),
        $('#inputNotes').val('')
        showTasks();
    });

};

function deleteTask(evt) {
    evt.preventDefault();
console.log('DELETE button was clicked,ID being', $(this).data('id'));
    let taskId = $(this).data('id');
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`,
    }).then(function(response) {
        console.log("The song was deleted!");
        showTasks();
    }).catch(function(error) {
        console.log("ERROR on delete",error);
    });
};

