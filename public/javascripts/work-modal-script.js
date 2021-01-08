$(document).ready(function () {

    $('#saveWorkModal').hide();
    $('#cancelWorkModal').hide();
    
    $("#editWorkModal").click(function () {
        $('.modal-body input, .modal-body textarea, select').attr('disabled', null);
        $(this).hide();
        $('#deleteWorkModal').hide();
        $('#saveWorkModal').show();
        $('#cancelWorkModal').show();
    })

    $('#cancelWorkModal').click(function () {
        $('.modal-body input, .modal-body textarea, select').attr('disabled', 'disabled');
        $(this).hide();
        $('#saveWorkModal').hide();
        $('#cancelWorkModal').hide();
        $('#deleteWorkModal').show();
        $('#editWorkModal').show();
    })

    $('#deleteWorkModal').click(function () {
        
    })
});