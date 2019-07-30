$(document).ready(() => {


    let $btn = $('#btn');
    let $screen1 = $('#screen1');


    let $inputLength = $('#orderform-length');

    let validation = new Validation();

    $btn.on('click', () => {
        //$screen1.css('display', 'none');
        //console.log($inputLength.val());
        //$screen1.show();

    });

    $inputLength.on('input', () => {
        //здесь запускать проверку, как заполнен этот инпут
        //console.log($inputLength.val());
        //validation.validate(1, $inputLength.val());
    });

    let orderForm = new OrderForm();
    orderForm.run();


});

//вычисляемое название метода и свойств использовать