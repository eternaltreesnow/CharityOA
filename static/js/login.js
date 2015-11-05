var checkValidateForm = function(username, password, verify) {
    if(username.length === 0) {
        validateError('username');
        return 0;
    }
    if(password.length === 0) {
        validateError('password');
        return 0;
    }
    if(verify.length === 0) {
        validateError('verify');
        return 0;
    }
    return 1;
}
var validateError = function(type) {
    var $validateErrorInfo = $("#validateErrorInfo");
    console.log(1);
    if(type === 'username') {
        $validateErrorInfo.html('请输入用户名...');
    } else if(type === 'password') {
        $validateErrorInfo.html('请输入密码...');
    } else if(type === 'verify') {
        $validateErrorInfo.html('请输入验证码...看不清请点击图片刷新...');
    }
    $validateErrorInfo.css('visibility', 'visible');
    setTimeout("$('#validateErrorInfo').css('visibility', 'hidden')", 5000);
}
$(function() {
    var $loginBtn = $("#loginBtn");
    var $userName = $("#inputUsername");
    var $password = $("#inputPassword");
    var $verify = $("#inputVerify");

    $loginBtn.on('click', function() {
        var username = $userName.val();
        var password = $password.val();
        var verify = $verify.val();
        if(checkValidateForm(username, password, verify)) {
            document.location = 'index.html';
        }
    });
});
