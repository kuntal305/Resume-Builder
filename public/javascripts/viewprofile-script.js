$(document).ready(function () {
    // $('.name').hide();
    // $('#saveProfileName, #cancelProfileName').hide();

    $('#changeProfileName').click(function () {
        $('#nameSpan').hide();
        $('.name').show();
        $(this).hide();
        $('#saveProfileName, #cancelProfileName').show();

    });

    $('#cancelProfileName').click(function() {
        $('#saveProfileName').hide();
        $(this).hide();
        $('#changeProfileName').show();
        $('.name').hide();
        $('#nameSpan').show();
        
    })

    $('#changeProfilePass').click(function () {
        $('#profilePassword').hide();
        $('.pwd').show();
        $(this).hide();
        $('#saveProfilePass, #cancelProfilePass').show();

    });

    $('#cancelProfilePass').click(function() {
        $('#saveProfilePass').hide();
        $(this).hide();
        $('#changeProfilePass').show();
        $('.pwd').hide();
        $('#profilePassword').show();
        
    })
});