$(document)
    .ready(function() {
        $('.ui.form')
            .form({
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
                    password: {
                        identifier: 'password',
                        rules: [{
                            type: 'empty',
                            prompt: 'Please enter your password'
                        }, {
                            type: 'length[6]',
                            prompt: 'Your password must be at least 6 characters'
                        }]
                    }
                }
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
        $('#signUp').on('submit', function() {
            alert('hello Baby!');
        });
    });