  $(document).ready(function(){
$("#same_as_billing").on("change", function(){
    if (this.checked) {
    $('input[name="FA_FathersStreetAddress"]').val(jQuery('input[name="MO_MothersStreetAddress"]').val());
    $('input[name="FA_FathersStreetAddress2"]').val(jQuery('input[name="MO_MothersStreetAddress2"]').val());  
    $('input[name="FA_FathersCity"]').val(jQuery('input[name="MO_MothersCity"]').val());
    $('input[name="FA_FathersState"]').val(jQuery('input[name="MO_MothersState"]').val());
    $('input[name="FA_FathersZip"]').val(jQuery('input[name="MO_MothersZip"]').val());
}
});
$.get("https://ipinfo.io", function (response) {
    $("#ip").html("IP: " + response.ip);
    $('input[name="SI_IPAddress"]').val(response.ip);
    $("#address").html("Location: " + response.city + ", " + response.region);
    $("#details").html(JSON.stringify(response, null, 4));
}, "jsonp");
});
