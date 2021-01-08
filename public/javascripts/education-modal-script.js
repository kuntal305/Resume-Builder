$(document).ready(function () {

    $('#saveEducationModal').hide();
    $('#cancelEducationModal').hide();
    
    $("#editEducationModal").click(function () {
        $('.modal-body input').attr('disabled', null);
        $(this).hide();
        $('#deleteEducationModal').hide();
        $('#saveEducationModal').show();
        $('#cancelEducationModal').show();
        $('#closeEducationModal').attr('disabled', 'disabled');
    })

    $('#cancelEducationModal').click(function () {
        education.forEach(e => {
            if (e.id == $('#eduIdModal').val()) {
                $('#degreeModal').val(e.degree);
                $('#instituteModal').val(e.institute);
                $('#authorityModal').val(e.authority);
                $('#startyearModal').val(e.startyear);
                $('#endyearModal').val(e.endyear);
                $('#marksModal').val(e.marks);
                $('#sem1Modal').val(e.sem1);
                $('#sem2Modal').val(e.sem2);
                $('#sem3Modal').val(e.sem3);
                $('#sem4Modal').val(e.sem4);
                $('#sem5Modal').val(e.sem5);
                $('#sem6Modal').val(e.sem6);
                $('#sem7Modal').val(e.sem7);
                $('#sem8Modal').val(e.sem8);
                $('#eduIdModal').val(e.id);
            }
        });
        $('.modal-body input').attr('disabled', 'disabled');
        $(this).hide();
        $('#saveEducationModal').hide();
        $('#deleteEducationModal').show();
        $('#editEducationModal').show();
        $('.edu-update').hide();
        $('#closeEducationModal').attr('disabled', null);
        
    })

    $('#deleteEducationModal').click(function () {
        
    })
    
    $('#saveEducationModal').click(function () {
        
        updatedVal = {};

        updatedVal.degree = $('#degreeModal').val();
        updatedVal.institute = $('#instituteModal').val();
        updatedVal.authority = $('#authorityModal').val();
        updatedVal.startyear = parseInt($('#startyearModal').val());
        updatedVal.endyear = parseInt($('#endyearModal').val());
        updatedVal.marks = parseFloat($('#marksModal').val());
        updatedVal.sem1 = isNaN(parseFloat($('#sem1Modal').val())) ? 0 : parseFloat($('#sem1Modal').val());
        updatedVal.sem2 = isNaN(parseFloat($('#sem2Modal').val())) ? 0 : parseFloat($('#sem2Modal').val());
        updatedVal.sem3 = isNaN(parseFloat($('#sem3Modal').val())) ? 0 : parseFloat($('#sem3Modal').val());
        updatedVal.sem4 = isNaN(parseFloat($('#sem4Modal').val())) ? 0 : parseFloat($('#sem4Modal').val());
        updatedVal.sem5 = isNaN(parseFloat($('#sem5Modal').val())) ? 0 : parseFloat($('#sem5Modal').val());
        updatedVal.sem6 = isNaN(parseFloat($('#sem6Modal').val())) ? 0 : parseFloat($('#sem6Modal').val());
        updatedVal.sem7 = isNaN(parseFloat($('#sem7Modal').val())) ? 0 : parseFloat($('#sem7Modal').val());
        updatedVal.sem8 = isNaN(parseFloat($('#sem8Modal').val())) ? 0 : parseFloat($('#sem8Modal').val());
        updatedVal.uid = parseInt(localStorage.getItem('uid'));
        updatedVal.id = parseInt($('#eduIdModal').val());
        

        console.log(updatedVal);

        $.post({
            url: window.location + "/updateeducation",
            data: updatedVal
        })
        .done(function () {
            education.forEach(e => {
                if(e.id = $('#eduIdModal').val()) {
                    e.degree = updatedVal.degree;
                    e.institute = updatedVal.institute;
                    e.authority = updatedVal.authority;
                    e.startyear = updatedVal.startyear;
                    e.endyear = updatedVal.endyear;
                    e.marks = updatedVal.marks;
                    e.sem1 = updatedVal.sem1;
                    e.sem2 = updatedVal.sem2;
                    e.sem3 = updatedVal.sem3;
                    e.sem4 = updatedVal.sem4;
                    e.sem5 = updatedVal.sem5;
                    e.sem6 = updatedVal.sem6;
                    e.sem7 = updatedVal.sem7;
                    e.sem8 = updatedVal.sem8;
                }
            });

            $('.modal-body input').attr('disabled', 'disabled');
            $('#saveEducationModal').hide();
            $('#cancelEducationModal').hide();
            $('#deleteEducationModal').show();
            $('#editEducationModal').show();
            $('.edu-update').hide();
            $('#closeEducationModal').attr('disabled', null);

        })
        .fail(function () {
            $('.edu-update').show();
            setTimeout(() => {
                $('.edu-update').fadeOut("slow");
            }, 5000);
        })
    })

    $('#closeEducationModal').click(function () {

    })


});