

$("input:checkbox").click(function() {
    if ($(this).is(":checked")) {
        var group = "input:checkbox[name='" + $(this).attr("name") + "']";
        $(group).prop("checked", false);
        $(this).prop("checked", true);
    } else {
        $(this).prop("checked", false);
    }
});

$("#btn_sub").click(function(){

        $.ajax({
            type: "POST",
            url: '/vmcreate',
            success: function (data) {

                $('#add_form').trigger("reset");
            }
        });

});

$("#btn_sub").click(function(){

    $.ajax({
        type: "POST",
        url: '/vmcreate',
        success: function (data) {

            $('#add_form').trigger("reset");
        }
    });

});


