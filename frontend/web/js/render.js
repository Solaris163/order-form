class Render {
    constructor(fields, errorFields, checkMarksFields, buttons, otherElements, orderModel) {
        this.fields = fields; //объект с полями формы
        this.errorFields = errorFields; //объект с полями для сообщений
        this.checkMarksFields = checkMarksFields; //объект с полями для зеленой галочки
        this.buttons = buttons; //объект с кнопками формы
        this.otherElements = otherElements; //объект с остальными элементами
        this.orderModel = orderModel; //модель заказа
        this.isFieldsValid = { //объект с переменными, которые равны true, если значение поля валидно
            length: false, //поле для ввода длины забора
            height: false, //поле для ввода высоты забора
            material: false, //поле для выбора материала забора
            userName: false, //поле для ввода имени
            phone: false, //поле для ввода номера телефона
            email: false //поле для ввода электронного адреса
        };
    }

    setIsFieldValid(field, value) {
        this.isFieldsValid[field] = value;
    }

    /**
     * Метод обновляет форму после введения данных
     */
    updateForm(field, unit) {
        switch (field) {
            case 'length':
            case 'height':
                if (this.isFieldsValid[field]) { //проверяем валидно ли поле
                    this.checkMarksFields[field].show(); //показываем зеленую галочку
                    this.errorFields[field].text(''); //убираем сообщение об ошибке
                    this.fields[field].removeClass('error'); //меняем стиль поля
                    this.otherElements[field].text(unit); //подставляем еденицу измерения (метров, метр или метра)
                    if (this.isFieldsValid.length && this.isFieldsValid.height && this.isFieldsValid.material) { //проверяем заполнен ли эран1
                        this.buttons.buttonForward.addClass('button-forward-active'); //активируем кнопку
                    }
                }else {
                    this.checkMarksFields[field].hide(); //убираем зеленую галочку
                    this.buttons.buttonForward.removeClass('button-forward-active'); //дезактивируем кнопку
                }
                this.otherElements.orderSum.text(this.orderModel.sum); //обновляем сумму ордера
                break;
            case 'material':
                if (this.isFieldsValid[field]) { //проверяем валидно ли поле
                    this.errorFields[field].text(''); //убираем сообщение об ошибке
                    this.fields[field].removeClass('error'); //меняем стиль поля
                    if (this.isFieldsValid.length && this.isFieldsValid.height && this.isFieldsValid.material) {
                        this.buttons.buttonForward.addClass('button-forward-active'); //активируем кнопку
                    }
                }else {
                    this.buttons.buttonForward.removeClass('button-forward-active'); //дезактивируем кнопку
                }
                this.otherElements.orderSum.text(this.orderModel.sum); //обновляем сумму ордера
                break;
            case 'needMounting':
                this.otherElements.orderSum.text(this.orderModel.sum); //обновляем сумму ордера
                break;
            case 'userName':
            case 'phone':
            case 'email':
                if (this.isFieldsValid[field]) { //проверяем валидно ли поле
                    this.checkMarksFields[field].show(); //показываем зеленую галочку
                    this.errorFields[field].text(''); //убираем сообщение об ошибке
                    if (this.isFieldsValid.userName && this.isFieldsValid.phone && this.isFieldsValid.email) {
                        this.buttons.buttonSend.addClass('button-send-active'); //активируем кнопку
                    }
                }else {
                    this.checkMarksFields[field].hide(); //убираем зеленую галочку
                }
                break;
        }
    }

    /**
     * Метод проверяет валидны ли все поля на экране 1
     * Метод возвращает true или false
     */
    isScreen1Full() {
        let result = true;
        if (!this.isFieldsValid.length) {
            this.errorFields.length.text('это поле заполнено неверно'); //выводим сообщение об ошибке
            this.fields.length.addClass('error'); //выделяем поле красной рамкой
            result = false;
        }
        if (!this.isFieldsValid.height) {
            this.errorFields.height.text('это поле заполнено неверно');
            this.fields.height.addClass('error');
            result = false;
        }
        if (!this.isFieldsValid.material) {
            this.errorFields.material.text('это поле заполнено неверно');
            this.fields.material.addClass('error');
            result = false;
        }
        return result;
    }

    /**
     * Метод проверяет валидны ли все поля на экране 2
     * Метод возвращает true или false
     */
    isScreen2Full() {
        let result = true;
        if (!this.isFieldsValid.userName) {
            this.errorFields.userName.text('это поле заполнено неверно');
            result = false;
        }
        if (!this.isFieldsValid.phone) {
            this.errorFields.phone.text('это поле заполнено неверно');
            result = false;
        }
        if (!this.isFieldsValid.email) {
            this.errorFields.email.text('это поле заполнено неверно');
            result = false;
        }
        return result;
    }

    showOrderDescription() {
        let str = 'Вы укомплектовали забор' +
            '<span class="blue"> длиной ' + this.orderModel.length + ' ' + Unit.getUnit(this.orderModel.length) + '</span>' +
            ' и ' +
            '<span class="blue"> высотой ' + this.orderModel.height + ' ' + Unit.getUnit(this.orderModel.height) + '</span>' +
            ' из материала ' +
            '<span class="blue">' + Config.materials[this.orderModel.material].name + '</span>' +
            ' на сумму ' +
            '<span class="red-text">' + this.orderModel.sum + ' ' +
            '<i class="fas fa-ruble-sign"></i>' +
            '</span>'
        this.otherElements.screen2OrderDescription.html(str);
    }

    showAnswer(answer) {
        let str =
            '<h2>' +
                this.orderModel.userName + ',<br>' + 'заказ' +
                '<span class="blue"> № ' +  answer['orderNumber'] + '</span>' +
                ' сформирован!' +
            '</h2>' +
            '<h3>' +
                'Мы повторили его комплектацию <br> на почту ' +
                '<span class="blue">' + this.orderModel.email + '</span>' +
            '</h3>' +
            '<h3>' +
                'В ближайшее время наш специалист <br> свяжется с вами по телефону <br>' +
                '<span class="blue">' + this.orderModel.phone + '</span>' +
            '</h3>';

        this.otherElements.screen4.html(str);
        this.otherElements.screen3.hide();
        this.otherElements.screen4.show();
    }


}