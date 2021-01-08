var projects = [];

$(document).ready(function () {
    

    $('#addProject').click(function () {
        var projectInput = {};

        var uid = localStorage.getItem('uid');

        projectInput.projectName = $('#projectName').val();
        projectInput.projectOrg = $('#projectOrg').val();
        projectInput.projectStartDate = $('#projectStartDate').val();
        projectInput.projectEndDate = $('#projectEndDate').val();
        projectInput.projectDesc = $('#projectDesc').val();
        projectInput.uid = uid;
        
        $('#project-form')[0].reset();
        
        $.post({
            url: window.location + '/saveproject',
            data: projectInput
        })
        .done(function (data) {
            projectInput.id = data.id;
            projects.push(projectInput);
            console.log(projects);
            
            var projectCard = `
                <div class="col-sm-3 mb-2">
                    <div class="card text-center project">
                        <div class="card-body">
                            <p class="card-title">${projectInput.projectName}</p>
                            <button class="btn btn-sm btn-primary" type="button" data-toggle="modal"
                                data-target="#projectModal" onclick=""showProjectModal(${projectInput.id})>View</button>
                            <button class="btn btn-sm btn-info" type="button">Edit</button>
                            <button class="btn btn-sm btn-danger" type="button">Delete</button>
                        </div>
                    </div>
                </div>
            `;
            $('.project-row').append(projectCard);
        })
        .fail(function () {
            alert('Error');
        })

        
    })
});