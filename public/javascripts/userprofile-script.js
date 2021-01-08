
$(document).ready(function () {
    $.get({
            url: window.location + '/user_info'
    })
    .done(function (user) {
        localStorage.setItem('uid', user.id);
    })

    $('#proceed').click(function () {
        $('#form-body').fadeOut();
        $('#template-body').fadeIn();
        var uid = localStorage.getItem('uid');
        $.get({
            url: window.location + '/getcvdata/' + uid
        })
        .done(function(data) {
            var basic = data.basic;
            var education = data.education;
            var project = data.project;
            var work = data.work;

            var userDetails = `
                <div>
                    <h2>User details</h2>
                    <div>
                        <label for=""><b>Name:</b></label>&nbsp;
                        <span>${basic.first_name}&nbsp;${basic.last_name}</span>
                    </div>
                    <div>
                        <label for=""><b>Email:</b></label>&nbsp;
                        <span>${basic.email}</span>
                    </div>
                    <div>
                        <label for=""><b>Phone Number:</b></label>&nbsp;
                        <span>${basic.contact_no}</span>
                    </div>
                    <div>
                        <label for=""><b>Address:</b></label>&nbsp;
                        <span>${basic.address}</span>
                    </div>
                    <div>
                        <label for=""><b>Sex:</b></label>&nbsp;
                        <span>${basic.sex}</span>
                    </div>
                    <div>
                        <label for=""><b>Marital Status:</b></label>&nbsp;
                        <span>${basic.marital_status}</span>
                    </div>
                    <div>
                        <label for=""><b>D.O.B:</b></label>&nbsp;
                        <span>${basic.dob}</span>
                    </div>
                    <div>
                        <label for=""><b>Nationality:</b></label>&nbsp;
                        <span>${basic.nationality}</span>
                    </div>
                    <div>
                        <label for=""><b>Passport No.:</b></label>&nbsp;
                        <span>${basic.passport_no}</span>
                    </div>
                    <div>
                        <label for=""><b>PAN:</b></label>&nbsp;
                        <span>${basic.pan_no}</span>
                    </div>
                    <div>
                        <label for=""><b>LinkedIn url:</b></label>&nbsp;
                        <span>${basic.linkedin_url}</span>
                    </div>
                </div>
            `;

            var educationDetails = ``;

            education.forEach(e => {
                educationDetails += `
                    <div>
                        <div>
                            <label for=""><b>Degree:</b></label>&nbsp;
                            <span>${e.degree}</span>
                        </div>
                        <div>
                            <label for=""><b>Institute Name:</b></label>&nbsp;
                            <span>${e.inst_name}</span>
                        </div>
                        <div>
                            <label for=""><b>Board/University:</b></label>&nbsp;
                            <span>${e.authority}</span>
                        </div>
                        <div>
                            <label for=""><b>Start Year:</b></label>&nbsp;
                            <span>${e.start_year}</span>&nbsp;&nbsp;&nbsp;
                            <label for=""><b>End Year:</b></label>&nbsp;
                            <span>${e.end_year}</span>
                        </div>
                        <div>
                            <label for=""><b>Percentage/CGPA:</b></label>&nbsp;
                            <span>${e.marks}</span>
                        </div>
                    </div>
                `;
            });
            
            
            
            var projectDetails = ``;

            project.forEach(p => {
                projectDetails += `
                    <div>
                        <div>
                            <label for=""><b>Project Name:</b></label>&nbsp;
                            <span>${p.project_name}</span>
                        </div>
                        <div>
                            <label for=""><b>Organization Name:</b></label>&nbsp;
                            <span>${p.org_name}</span>
                        </div>
                        <div>
                            <label for=""><b>Start Year:</b></label>&nbsp;
                            <span>${p.start_date}</span>&nbsp;&nbsp;&nbsp;
                            <label for=""><b>End Year:</b></label>&nbsp;
                            <span>${p.end_date}</span>
                        </div>
                        <div>
                            <label for=""><b>Description:</b></label>&nbsp;
                            <span>${p.project_desc}</span>
                        </div>
                    </div>
                `;
            })

            var skills = `
                <div>
                    <h2>Skills</h2>
                    <div>
                        <label for=""><b>Technical Skills:</b></label>&nbsp;
                        <span>${basic.skills}</span>
                    </div>
                    <div>
                        <label for=""><b>Traits:</b></label>&nbsp;
                        <span>${basic.traits}</span>
                    </div>
                    <div>
                        <label for=""><b>Language:</b></label>&nbsp;
                        <span>${basic.languages}</span>
                    </div>
                    <div>
                        <label for=""><b>Hobbies:</b></label>&nbsp;
                        <span>${basic.hobbies}</span>
                    </div>
                    <div>
                        <label for=""><b>Objective:</b></label>&nbsp;
                        <span>${basic.objective}</span>
                    </div>
                </div>
            `;

            var workExp = ``;

            work.forEach(w => {
                workExp += `
                    <div>
                        <div>
                            <label for=""><b>Organization Name:</b></label>&nbsp;
                            <span>${w.org_name}</span>
                        </div>
                        <div>
                            <label for=""><b>Type:</b></label>&nbsp;
                            <span>${w.type}</span>
                        </div>
                        <div>
                            <label for=""><b>Start Year:</b></label>&nbsp;
                            <span>${w.start_date}</span>&nbsp;&nbsp;&nbsp;
                            <label for=""><b>End Year:</b></label>&nbsp;
                            <span>${w.end_date}</span>
                        </div>
                        <div>
                            <label for=""><b>Resposibility:</b></label>&nbsp;
                            <span>${w.responsibility}</span>
                        </div>
                    </div>
                `;
            })

            var endNote = `
                <div>
                    <h2>End Note</h2>
                    <div>
                        <label for="">Date:</label>&nbsp;
                        <span>${basic.gen_date_time}</span>
                    </div>
                    <div>
                        <label for="">Place:</label>&nbsp;
                        <span>${basic.place}</span>
                    </div>
                    <div>
                        <label for="">Name:</label>&nbsp;
                        <span>${basic.sign_img}</span>
                    </div>
                </div>
            `;

            $('#template-data').append(userDetails);
            $('#template-data').append('<h2>Education</h2>');
            $('#template-data').append(educationDetails);
            $('#template-data').append('<h2>Project Details</h2>');
            $('#template-data').append(projectDetails);
            $('#template-data').append('<h2>Work Experience</h2>');
            $('#template-data').append(workExp);
            $('#template-data').append(endNote);
        })
        .fail(function() {
            alert('fail');
        });
    })

    $('#temp-save').click(function () {
        // html2canvas($('#template-data'), {
        //     onrendered: function (canvas) {
        //         var data = canvas.toDataURL();
        //         var docDefinition = {
        //             content: [{
        //                 image: data,
        //                 width: 500
        //             }]
        //         };
        //         pdfMake.createPdf(docDefinition).download("CV.pdf");
        //     }
        // });


        var doc = new jsPDF();

        var elementHTML = $('#template-data').html();
        var specialElementHandlers = {
            '#elementH': function (element, renderer) {
                return true;
            }
        };
        doc.fromHTML(elementHTML, 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });

        // Save the PDF
        doc.save('cv.pdf');
    });
});