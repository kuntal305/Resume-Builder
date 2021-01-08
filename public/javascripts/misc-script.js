$(document).ready(function () {

    $('#saveMisc').click(function () {
        misc = {};

        misc.skills = $('#skills').val();
        misc.traits = $('#traits').val();
        misc.language = $('#languages').val();
        misc.hobbies = $('#hobbies').val();
        misc.objective = $('#objective').val();
        misc.uid = localStorage.getItem('uid');

        $('#misc-form')[0].reset();
        $.post({
            url: window.location + '/savemisc',
            data: misc
        })
        .done(function () {
            $('#misc-form, .misc-save').hide();
            $('.misc-success-1').fadeIn();
        })
        .fail(function () {
            $('#misc-form, .misc-save').hide();
            $('.misc-fail').fadeIn();
        })
    })

    $('#enterMisc').click(function () {
        $('.misc-fail').hide();
        $('#misc-form, .misc-save').fadeIn();
    })
})