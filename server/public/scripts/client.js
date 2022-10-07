$(document).ready(onReady);
function onReady() {
console.log('client.js ready, jquery ready');

    showTasks();
}

function showTasks() {
    console.log("in showTasks");
    $('#tbody').empty();
    $.ajax({
        method:'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log("GET /tasks response",response);
        for(let x of response) {
            $('#appendTask').append(`
                <td> ${x}</td> 
                <td> ${x} </td>
                <td> ${x} </td>
               `)
            }
        }).catch((err) => {
            console.log("error in GET /tasks",err)
        })
};

