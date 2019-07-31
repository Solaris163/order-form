class Handler {
    constructor(calculator, render, fields, screen1, screen2, screen3, orderNumberField) {
        this.calculator = calculator; //экземпляр класса Calculator
        this.render = render; //экземпляр класса Render
        this.fields = fields; //объект с полями формы
        this.screen1 = screen1; //объект jQuery для экрана 1
        this.screen2 = screen2; //объект jQuery для экрана 2
        this.screen3 = screen3; //объект jQuery для экрана 3
        this.validation = new Validation(); //создадим экземпляр класса Validation
    }

    /**
     * Метод обрабатывает событие ввода информации в поля формы
     * Метод получает название поля и введенное в него значение
     */
    handle(field, value) {
        switch (field) {
            case 'length':
            case 'height':
                if (this.validation.validate(field, value)) { //валидируем данные
                    this.calculator[field] = value; //через сеттер меняем значение для соответствующего поля в калькуляторе
                    this.calculator.updateOrderSum(); //обновляем сумму ордера в калькуляторе
                    this.render.setIsFieldValid(field, true); //устанавливаем значение isFieldValid для поля равным true
                    this.render.updateForm(field); //обновляем форму
                }else {
                    this.calculator[field] = 0; //через сеттер установим значение данного поля в калькуляторе равным нулю
                    this.calculator.updateOrderSum(); //обновляем сумму ордера в калькуляторе
                    this.render.setIsFieldValid(field, false); //устанавливаем значение isFieldValid для поля равным false
                    this.render.updateForm(field); //обновляем форму
                }
                break;
            case 'material':
                if (value) { //проверяем выбрано ли значение материала
                    this.render.setIsFieldValid(field, true); //устанавливаем значение isFieldValid для поля равным true
                }else this.render.setIsFieldValid(field, false); //устанавливаем значение isFieldValid для поля равным false
                this.calculator[field] = value; //передаем значение в соответствующее свойство калькулятора через setter
                this.calculator.updateOrderSum();
                this.render.updateForm(field);
                break;
            case 'needMounting':
                this.calculator[field] = value; //передаем значение в соответствующее свойство калькулятора через setter
                this.calculator.updateOrderSum();
                this.render.updateForm(field);
                break;
            case 'userName':
            case 'phone':
            case 'email':
                if (this.validation.validate(field, value)) { //валидируем данные
                    this.render.setIsFieldValid(field, true); //устанавливаем значение isFieldValid для поля равным true
                    this.render.updateForm(field); //обновляем форму
                }else {
                    this.render.setIsFieldValid(field, false); //устанавливаем значение isFieldValid для поля равным false
                    this.render.updateForm(field); //обновляем форму
                }
                break;
        }
    }

    /**
     * Метод обрабатывает события клика на кнопки
     * Метод получает id кнопки
     */
    buttonHandle(buttonId) {
        switch (buttonId) {
            case 'button-forward':
                if (this.render.isScreen1Valid()) {
                    this.screen1.hide();
                    this.screen2.show();
                }
                break;
            case 'button-return':
                this.screen1.show();
                this.screen2.hide();
                break;
            case 'button-send':
                if (this.render.isScreen2Valid()) {
                    OrderCreator.create(this.fields); //вызовем метод create для создания заказа, и передадим ему поля формы
                    this.screen2.hide();
                    this.screen3.show();
                }
                break;
        }
    }
}