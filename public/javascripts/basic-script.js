$(document).ready(function () {
    
    var basicCounter = 0;
    var basicClickCounter = 0;

    $('#saveBasic').click(function () {
        
        var basicInfo = {};

        $.get({
            url: window.location + "/user_info"
        })
        .done(function (user) {

            basicInfo.uid = user.id;
            basicInfo.first_name = $('#firstname').val();
            basicInfo.last_name = $('#lastname').val();
            basicInfo.email = $('#email').val();
            basicInfo.contact = parseInt($('#contact').val());
            basicInfo.address = $('#address').val();
            basicInfo.marital_status = $('#maritalstatus').val();
            basicInfo.sex = $('#sex').val();
            basicInfo.nationality = $('#nationality').val();
            basicInfo.dob = $('#dob').val();
            basicInfo.passport = $('#passport').val();
            basicInfo.pan = $('#pan').val();
            basicInfo.linkedin = $('#linkedin').val();
            basicInfo.cv_photo = 'aa';

        
            console.log(basicInfo);
            
            
            $.post({
                url: window.location + "/savebasicinfo",
                data: basicInfo
            })
            .done(function () {
                $('#basic-form').hide();
                $('.basic-success-1').fadeIn();
                basicCounter = 1;
            })
            .fail(function () {
                $('#basic-form').hide();
                $('.basic-fail').fadeIn();
            });
        })
        .fail(function () {
            $('#basic-form').hide();
            $('.basic-fail').fadeIn();
        });
        
        
    })


    $('#updateBasic').click(function () {
        $('.basic-success-1').hide();
        $('#basic-form').fadeIn();
    })

    $('#enterBasic').click(function () {
        $('.basic-fail').hide();
        $("#basic-form").fadeIn();
    })

    $('#basic-collapse-btn').click(function () {
        // $('#basic-form').hide();
        if (basicCounter == 0 && basicClickCounter == 0) {
            $('#basic-spinner').show();
            $.get({
                url: window.location + "/user_info"
            })
            .done(function (user) {
                $.get({
                    url: window.location + "/checkbasicinfo/" + user.id,
                })
                .done(function(data) {
                    $('#basic-spinner').hide();
                    basicCounter = data.saved;
                    if (data.saved == 1) {
                        $('#basic-form').hide();
                        $('.basic-success-2').show();
                    } else if (data.saved == 0) {
                        $('#basic-form').show();
                    }
                })
                .fail(function() {
                    $('#basic-spinner').hide();
                    $('#basic-form').hide();
                    $('.basic-error').show();
                })
            })
            .fail(function () {
                $('#basic-spinner').hide();
                $('#basic-form').hide();
                $('.basic-error').show();    
            })
            basicClickCounter = 1;
        } else if (basicClickCounter == 1 && basicCounter == 0) {
            $('#basic-form').show();
        } else if (basicClickCounter == 1 && basicCounter == 1) {
            $('#basic-div').children().hide();
            $('.basic-success-2').show();
        } else if (basicClickCounter == 1){
            $('#basic-div').children().slideUp('fast');
            basicClickCounter = 0;
        }
    })

    $("#basic-div").blur(function () {

    })

});