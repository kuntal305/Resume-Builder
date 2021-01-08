var work = [];

$(document).ready(function () {
    
    $('#addWork').click(function () {
        var workInput = {};

        workInput.orgName = $('#workOrgName').val();
        workInput.type = $('#workType').val();
        workInput.workStartYear = parseInt($('#workStartYear').val());
        workInput.workEndYear = parseInt($('#workEndYear').val());
        workInput.resp = $('#workResp').val();
        workInput.uid = localStorage.getItem('uid');

        $.post({
            url: window.location + '/savework',
            data: workInput
        })
        .done(function(data) {
            workInput.id = data.id;
            work.push(workInput);
            
            var workCard = `
                <div class="col-sm-3 mb-2">
                    <div class="card text-center work">
                        <div class="card-body">
                            <p class="card-title">${workInput.orgName}</p>
                            <button class="btn btn-sm btn-primary" type="button" data-toggle="modal"
                                data-target="#workModal" showWorkModal(${workInput.id})>View</button>
                            <button class="btn btn-sm btn-info" type="button">Edit</button>
                            <button class="btn btn-sm btn-danger" type="button">Delete</button>
                        </div>
                    </div>
                </div>
            `;

            $('#work-row').append(workCard);
        })
        .fail(function () {
            alert('error');
        })
    })

});