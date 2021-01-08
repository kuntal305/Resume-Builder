
var education = [];

$(document).ready(function () {


    $('#sem-check').click(function () {
        if($(this).is(':checked')) {
            $('.sem').show();
        } else {
            $('.sem').hide();
            $('.sem input').val('');
        }

    })


    $('#addEducation').click(function () {
        $('.edu-spinner-col').show();
        var fieldInputs = {};

        

        $.get({
            url: window.location + '/user_info'
        })
        .done(function (user) {
            localStorage.setItem('uid', user.id);
            fieldInputs.uid = user.id;
            fieldInputs.degree = $('#degree').val();
            fieldInputs.institute = $('#institute').val();
            fieldInputs.authority = $('#authority').val();
            fieldInputs.startyear = parseInt($('#startyear').val());
            fieldInputs.endyear = parseInt($('#endyear').val());
            fieldInputs.marks = parseFloat($('#marks').val());

            if ($('#sem-check').is(':checked')) {
                fieldInputs.sem1 = parseFloat($('#sem1').val());
                fieldInputs.sem2 = parseFloat($('#sem2').val());
                fieldInputs.sem3 = parseFloat($('#sem3').val());
                fieldInputs.sem4 = parseFloat($('#sem4').val());
                fieldInputs.sem5 = parseFloat($('#sem5').val());
                fieldInputs.sem6 = parseFloat($('#sem6').val());
                fieldInputs.sem7 = parseFloat($('#sem7').val());
                fieldInputs.sem8 = parseFloat($('#sem8').val());    
            }

            $('#education-form')[0].reset();
            console.log(education);
            $.post({
                url: window.location + '/saveeducation',
                data: fieldInputs
            })
            .done(function (data) {
                fieldInputs.id = data.id;
                education.push(fieldInputs);
                var degreeCard = `
                    <div class="col-sm-3 mb-2">
                        <div class="card text-center education">
                            <div class="card-body">
                                <p class="card-title">${fieldInputs.degree}</p>
                                <button class="btn btn-sm btn-primary" type="button" data-toggle="modal" data-target="#educationModal" onclick="showModal(${data.id})">View</button>
                                <button class="btn btn-sm btn-info" type="button">Edit</button>
                                <button class="btn btn-sm btn-danger" type="button">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
                $('.edu-spinner-col').hide();
                $('.edu-row').append(degreeCard);
            })
            .fail(function () {
                $('.edu-spinner-col').hide();
                $('edu-fail').show().delay(3000).fadeOut('slow');
            });

            
        })
        .fail(function () {
            $('.edu-spinner-col').hide();
            $('#edu-form').hide();
            $('.education-error').fadeIn();
        });
    })


    $('#education-collapse-btn').click(function () {
        var uid = localStorage.getItem('uid');
        
        $('.edu-spinner-col').show(); 
        
        if (uid == null) {
            $.get({
                url: window.location + '/user_info'
            })
            .done(function (user) {
                uid = user.id;
            })
            .fail(function () {
                $('#education-form').hide();
                $('.edu-spinner-col').hide();
                $('.edu-error').show();
            });
        } 
        
        $.get({
            url: window.location + '/geteducationinfo/' + uid
        })
        .done(function (data) {
            $('.edu-spinner-col').hide();
            if (data.length != 0) {
                data.forEach(e => {
                    var eduObj = {
                        degree: e.degree,
                        uid: e.uid,
                        id: e.id,
                        institute: e.inst_name,
                        startyear: e.start_year,
                        endyear: e.end_year,
                        authority: e.authority,
                        marks: e.marks,
                        sem1: e.sem1,
                        sem2: e.sem2,
                        sem3: e.sem3,
                        sem4: e.sem4,
                        sem5: e.sem5,
                        sem6: e.sem6,
                        sem7: e.sem7,
                        sem8: e.sem8
                    };
                    education.push(eduObj);

                    var degreeCard = `
                        <div class="col-sm-3 mb-2">
                            <div class="card text-center education">
                                <div class="card-body">
                                    <p class="card-title">${e.degree}</p>
                                    <button class="btn btn-sm btn-primary" type="button" data-toggle="modal"  onclick="showModal(${e.id})">View</button>
                                    <button class="btn btn-sm btn-info" type="button">Edit</button>
                                    <button class="btn btn-sm btn-danger" type="button">Delete</button>
                                </div>
                            </div>
                        </div>
                    `;
                    $('.edu-row').append(degreeCard);    
                });
                
            }
        })
        .fail(function () {
            $('.edu-spinner-col').hide();
            $('edu-fail').show().delay(3000).fadeOut('slow');
        })



    })

    showModal = function(id) {
        education.forEach(e => {
            if (e.id == id) {
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
        $('#educationModal').modal('show');
    }    

});
