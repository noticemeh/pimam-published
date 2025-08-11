$(function () {
    $("#loaderbody").addClass('hide');

    $(document).bind('ajaxStart', function () {
        $("#loaderbody").removeClass('hide');
    }).bind('ajaxStop', function () {
        $("#loaderbody").addClass('hide');
    });
});

showInPopup = (url, size) => {
    console.log(url);
    $.ajax({
        type: 'GET',
        url: url,
        success: function (res) {
            $('#form_modal>.modal-dialog').addClass('modal-' + size);
            $('#form_modal>.modal-dialog').empty();
            $('#form_modal>.modal-dialog').html(res);
            $('#form_modal').modal('show');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (xhr.status === 401) {
                location.reload();
            }
            else {
                alert(xhr.responseText);
                alert(thrownError);
            }
        }
    })
}

jQueryAjaxPost = (form, return_container) => {
    try {
        $.ajax({
            type: 'POST',
            url: form.action,
            data: new FormData(form),
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.isValid) {
                    $(return_container).html(res.html)
                    $('#form_modal .modal-body').html('');
                    $('#form_modal .modal-title').html('');
                    $('#form_modal').modal('hide');
                }
                else {
                    $('#form_modal .modal-content').html(res.html);
                }
                if (res.toast !== '') {
                    toastr[res.type](res.toast);
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
        //to prevent default form submit event
        return false;
    } catch (ex) {
        console.log(ex)
    }
}

jQueryAjaxPost = (form) => {
    try {
        $.ajax({
            type: 'POST',
            url: form.action,
            data: new FormData(form),
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.isValid) {
                    $('#form_modal .modal-body').html('');
                    $('#form_modal .modal-title').html('');
                    $('#form_modal').modal('hide');
                }
                else {
                    $('#form_modal .modal-content').html(res.html);
                }
                if (res.toast !== '') {
                    toastr[res.type](res.toast);
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
        return false;
    } catch (ex) {
        console.log(ex)
    }
}

function jQueryAjaxPostWithReset(form) {
    try {
        $.ajax({
            type: $(form).attr('method'),
            url: $(form).attr('action'),
            data: new FormData(form),
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.isValid) {
                    // ✅ Redirect if RedirectUrl is returned
                    if (res.redirectUrl) {
                        window.location.href = res.redirectUrl;
                    }
                } else {
                    Toast("warning", res.toast);
                    if (res.html) {
                        $('#form_modal .modal-body').html(res.html);
                    }
                }
            },
            error: function (err) {
                console.error(err);
            }
        });
    } catch (ex) {
        console.log(ex);
    }
    return false;
}

summaryPost = (form) => {
    try {
        if ($(form).isValid()) {
            $.ajax({
                type: 'POST',
                url: form.action,
                data: new FormData(form),
                async: true,
                contentType: false,
                processData: false,
                error: function (err) {
                    console.log(err)
                }
            })
            return false;
        }
        else {
            alert('Fill up required fields');
            return false;
        }
    } catch (ex) {
        console.log(ex)
    }
}

updateForm = (form) => {
    try {
        console.log(form[0].action);
        $.ajax({
            type: 'POST',
            url: form[0].action,
            data: $(form).serialize(),
            async: true,
            error: function (err) {
                console.log(err)
            }
        });
        return false;
    } catch (ex) {
        console.log(ex)
    }
}