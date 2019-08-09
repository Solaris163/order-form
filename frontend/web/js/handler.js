class Handler {
    constructor(fields, otherElements, orderModel, render) {
        this.fields = fields; //объекты jQuery для полей формы
        this.orderModel = orderModel; //модель заказа
        this.render = render; //экземпляр класса Render
        this.screen1 = otherElements['screen1']; //объект jQuery для экрана 1
        this.screen2 = otherElements['screen2']; //объект jQuery для экрана 2
        this.screen3 = otherElements['screen3']; //объект jQuery для экрана 3
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
                    this.orderModel[field] = value; //через сеттер меняем значение для соответствующего поля в моднли ордера
                    let unit = Unit.getUnit(this.orderModel[field]); //найдем еденицу измерения (метров, метр или метра)
                    this.orderModel.updateOrderSum(); //обновляем сумму в модели ордера
                    this.render.setIsFieldValid(field, true); //устанавливаем значение isFieldValid для поля равным true
                    this.render.updateForm(field, unit); //обновляем форму
                }else {
                    this.orderModel[field] = 0; //через сеттер установим значение данного поля в модели ордера равным нулю
                    let unit = Unit.getUnit(this.orderModel[field]); //найдем еденицу измерения (метров, метр или метра)
                    this.orderModel.updateOrderSum(); //обновляем сумму в модели ордера
                    this.render.setIsFieldValid(field, false); //устанавливаем значение isFieldValid для поля равным false
                    this.render.updateForm(field, unit); //обновляем форму
                }
                break;
            case 'material':
                if (value) { //проверяем выбрано ли значение материала
                    this.render.setIsFieldValid(field, true); //устанавливаем значение isFieldValid для поля равным true
                }else this.render.setIsFieldValid(field, false); //устанавливаем значение isFieldValid для поля равным false
                this.orderModel[field] = value; //передаем значение в соответствующее свойство калькулятора через setter
                this.orderModel.updateOrderSum();
                this.render.updateForm(field);
                break;
            case 'needMounting':
                this.orderModel[field] = value; //передаем значение в соответствующее свойство калькулятора через setter
                this.orderModel.updateOrderSum();
                this.render.updateForm(field);
                break;
            case 'userName':
            case 'phone':
            case 'email':
                if (this.validation.validate(field, value)) { //валидируем данные
                    this.orderModel[field] = value; //через сеттер меняем значение для соответствующего поля в модели ордера
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
                if (this.render.isScreen1Full()) {
                    this.render.showOrderDescription();
                    this.screen1.hide();
                    this.screen2.show();
                }
                break;
            case 'button-return':
                this.screen1.show();
                this.screen2.hide();
                break;
            case 'button-send':
                if (this.render.isScreen2Full()) {
                    OrderCreator.create(this.orderModel, this.render); //вызовем метод create для создания заказа, и передадим ему поля формы
                    //TODO здесь показать песочные часы
                    this.screen2.hide();
                    this.screen3.show();
                }
                break;
        }
    }
}