$(document).ready(function () {
    
    $('#saveEndNote').click(function () {

        var endNote = {};

        endNote.place = $('#place').val();
        endNote.sign = $('#digSign').val();
        endNote.uid = localStorage.getItem('uid');

        $.post({
            url: window.location + '/saveendnote',
            data: endNote
        })
        .done(function () {
            $('#endnote-form, .end-note-save').hide();
            $('.end-success-1').fadeIn();
        })
        .fail(function () {
            $('#endnote-form, .end-note-save').hide();
            $('.end-fail').fadeIn();
        })
    })

    $('#enterEnd').click(function () {
        $('#end-fail').hide();
        $('#endnote-form, .end-note-save').fadeIn();
    })
});