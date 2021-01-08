$(document).ready(function () {

    $('#saveProjectModal').hide();
    $('#cancelProjectModal').hide();
    
    $("#editProjectModal").click(function () {
        $('.modal-body input, .modal-body textarea').attr('disabled', null);
        $(this).hide();
        $('#deleteProjectModal').hide();
        $('#saveProjectModal').show();
        $('#cancelProjectModal').show();
    })

    $('#cancelProjectModal').click(function () {
        $('.modal-body input, .modal-body textarea').attr('disabled', 'disabled');
        $(this).hide();
        $('#saveProjectModal').hide();
        $('#cancelProjectModal').hide();
        $('#deleteProjectModal').show();
        $('#editProjectModal').show();
    })

    $('#deleteProjectModal').click(function () {
        
    })
});