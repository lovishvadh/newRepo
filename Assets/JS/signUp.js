$(document)
    .ready(function() {
        let globalObject = {};
        $('.ui.form')
            .form({
                on: 'blur',
                fields: {
                    email: {
                        identifier: 'email',
                        rules: [{
                            type: 'empty',
                            prompt: 'Please enter your e-mail'
                        }, {
                            type: 'email',
                            prompt: 'Please enter a valid e-mail'
                        }]
                    }, 
                    fname: {
                        identifier: 'fname',
                        rules: [{
                            type: 'empty',
                            prompt: 'Please enter your First Name '
                        },]
                    }, 
                    lname: {
                        identifier: 'lname',
                        rules: [{
                            type: 'empty',
                            prompt: 'Please enter your Last Name'
                        },]
                    },
                    password: {
                        identifier: 'password',
                        rules: [{
                            type: 'empty',
                            prompt: 'Please enter your password'
                        }, {
                            type: 'length[6]',
                            prompt: 'Your password must be at least 6 characters'
                        }, {
                            type   : 'regExp[/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/]',
                            prompt : 'Password should contain atleast 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.Allowed special characters are #?!@$%^&*-"'
                          }]
                    },
                    Username: {
                        identifier: 'usnn',
                        rules: [{
                            type: 'empty',
                            prompt: 'Please enter your username'
                        }, {
                            type   : 'regExp[/^[a-zA-Z0-9-_.@$+]{4,16}$/]',
                            prompt : "Username can have min 4, max 16 and _ . @ $ + characters"
                          }]
                    },
                    confirmpassword: {
                        identifier: 'sipassword2',
                        rules: [{
                            type   : 'match[sipassword1]',
                            prompt : "Password And Confirm password should match"
                          }]
                    }
                },  onSuccess: function(event) { event.preventDefault(); handleSubmit(); return false;}
            });
        let cfField1 = document.querySelector("#sipassword1");
        let cfField2 = document.querySelector("#sipassword2");
        $(".iconOfeye1").on('click', function() {

            if (cfField1.type === "text") {
                cfField1.type = 'password';
            } else {
                cfField1.type = 'text';
            }
        });
        $(".iconOfeye2").on('click', function() {

            if (cfField2.type === "text") {
                cfField2.type = 'password';
            } else {
                cfField2.type = 'text';
            }
        });
       function handleSubmit() {
            $('#signUp').css('visibility', 'hidden');

            let obj = {
                firstName: $('#fname').val(),
                lastName: $('#lname').val(),
                email: $('#email').val(),
                username: $('#usnn').val(),
                password: $('#sipassword1').val(),
                confirmPassword: $('#sipassword2').val(),
                referredBy: $('#referralCode').val()
            }
            globalObject = obj;
            $.ajax({
                url: 'http://trader.currycoins.com/send-signup-email-otp-full',
                contentType: "application/json",
                type: "post",
                data: JSON.stringify(obj),
                dataType: "json",
                success: function (data, success) {
                if(data.status) {
                    $('.headHidden').css('display','none');
                    $('.afterDiv').css('display','flex');
                } else {
                    $('form').form('reset');
                    $('#signUp').css('visibility', 'visible');

                    $('#erroRContainer').css(`display`,'block');

                    data.data.errors.forEach(element => {
                        $('#error').append(`<li>${element}</li>`);
                    });
                }
                    
            },
            error: function() { 
                $('#erroRContainer').css(`display`,'block');
                $('#error').append(`<li>Internal server error. Please retry after some time.</li>`);
            $('#signUp').css('visibility', 'visible');
                
            } 
              });

            }
            
        $('#verifyOtp').on('click', function(event) {
            event.preventDefault();
            $('#verifyOtp').css('visibility', 'hidden');

            let obj = {
               ...globalObject,
               emailOtp: $('#otp').val()
            }
            
            $.ajax({
                url: 'http://trader.currycoins.com/complete-signup-full',
                contentType: "application/json",
                type: "post",
                data: JSON.stringify(obj),
                dataType: "json",
                success: function (data, success) {
                if(data.status) {
                    window.location = "https://trader.currycoins.com";

                    // $('.afterDiv').css('display','none');
                    // $('.confirmation').css('display','flex');
                } else {
                    $('#verifyOtp').css('visibility', 'visible');
                    $('#error2cointainer').css(`display`,'block');

                    data.data.errors.forEach(element => {
                        $('#error2').append(`<li>${element}</li>`);
                    });
                }
                    
            }
              });
            
        });
    });