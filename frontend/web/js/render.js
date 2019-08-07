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
                    this.fields[field].removeClass('error');
                    this.otherElements[field].text(unit); //подставляем еденицу измерения (метров, метр или метра)
                }else {
                    this.checkMarksFields[field].hide(); //убираем зеленую галочку
                }
                this.otherElements.orderSum.text(this.orderModel.sum); //обновляем сумму ордера
                break;
            case 'material':
                this.otherElements.orderSum.text(this.orderModel.sum); //обновляем сумму ордера
                this.errorFields[field].text(''); //убираем сообщение об ошибке
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
                }else {
                    this.checkMarksFields[field].hide(); //убираем зеленую галочку
                }
                break;
        }
    }

    /**
     * Метод проверяет валидны ли все поля на экране 1
     * Метод возвращает true или false
     * TODO передавать в этот метод объект с полями, чтобы не было хардкода
     */
    isScreen1Full() {
        let result = true;
        //дальше захардкодил
        if (!this.isFieldsValid.length) {
            this.errorFields.length.text('это поле заполнено неверно'); //выводим сообщение об ошибке
            this.fields.length.addClass('error'); //выделяем поле красной рамкой
            result = false;
        } else this.fields.length.addClass('error');
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
     * TODO передавать в этот метод объект с полями, чтобы не было хардкода
     */
    isScreen2Full() {
        let result = true;
        //дальше захардкодил
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

    showAnswer(answer) {
        this.otherElements.showName.text(this.orderModel.userName);
        this.otherElements.showNumber.text(answer['orderNumber']);
        this.otherElements.showEmail.text(this.orderModel.email);
        this.otherElements.showPhone.text(this.orderModel.phone);
        this.otherElements.screen3.hide();
        this.otherElements.screen4.show();
    }


}