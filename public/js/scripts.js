

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

$("#btn_del").click(function(){
    var id = $(this).attr('name');
    $.ajax({
        type: "DELETE",
        url: '/vmdelete',
        data:{id: id} ,
        success: function (data) {

            $( "#vm_table" ).load( "#vm_table" );
        }
    });

});

$("#btn_upd").click(function(){

    $.ajax({
        type: "GET",
        url: '/vmupdate',
        success: function (data) {

            $('#add_form').trigger("reset");
        }
    });

});


$(".btn_preconnect").click(function() {
    var $ip = $(this).closest(".thumbnail")
        .find("#ip")
        .text();
    var $name = $(this).closest(".thumbnail")
        .find("#name")
        .text();

     $("#ip_pop").text($ip);
     $("#user_pop" ).text($name);

});

$("#btn_connect").click(function() {
    var $ip = $(this).closest(".modal")
        .find("#ip_pop")
        .text().trim();
    var $username = $(this).closest(".modal")
        .find("#user_pop")
        .text().trim();

    var $psw = $('#password-pop').val();

    $.ajax({
        type: "GET",
        url: '/ssh',
        data:{ip:$ip,user:$username,password:$psw},
        success: function (data) {

            console.log(data.msg);

            if(data.msg =='connect') { window.location = "/home";}
            else {
            }
            console.log(data);
            //window.location = "/home";
        }
    });
});




$( "#btn_export" ).click(function() {

    $("#form_database").toggle();
});

$( "#btn_import" ).click(function() {

    $("#form_database_export").toggle();
});

$( "#btn_install" ).click(function() {

    $("#form_database_install").toggle();
});

$( "#btn_sub_exp" ).click(function() {


    var $username = $('#username_exp').val();
    var $psw = $('#password_exp').val();
    var $database = $('#data_base_exp').val();
    var $schema = $('#schema_exp').val();
    var $dumpfile = $('#dumpfile_name_exp').val();
    var $logfile = $('#logfile_name').val();

    $.ajax({
        type: "POST",
        url: '/export',
        data:{username:$username,password:$psw,database:$database,schema:$schema,dumpfile:$dumpfile,logfile:$logfile},
        success: function (data) {
            console.log(data.msg);
            $("#form_database_export").toggle();
        }
    });


});



$( "#btn_sub_imp" ).click(function() {


    var $username = $('#username_imp').val();
    var $psw = $('#password_imp').val();
    var $database = $('#data_base_imp').val();
    var $schema = $('#schema_imp').val();
    var $dumpfile = $('#dumpfile_name_imp').val();
    var $remap = $('#remap_name_imp').val();
    var $remap_2 = $('#remap_name2_imp').val();

    $.ajax({
        type: "POST",
        url: '/import',
        data:{username:$username,password:$psw,database:$database,schema:$schema,dumpfile:$dumpfile,rmp:$remap,rmps:$remap_2},
        success: function (data) {
            console.log(data.msg);
            $("#form_database").toggle();
        }
    });


});


$( "#btn_sub_install" ).click(function() {


    $.ajax({
        type: "GET",
        url: '/install',
        data:{user:'ok'},
        success: function (data) {
            console.log(data.msg);
            $("#form_database").toggle();
        }
    });


});






