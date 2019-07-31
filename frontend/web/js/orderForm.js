//TODO вынести все настройки в отдельный класс config
//TODO сделать склонение "метров"
//TODO сделать попап успешного создания заказа
//TODO сделать выделение поля красным, если оно заполнено неверно
//TODO менять цвет кнопки "Вперед" в зависимости от заполнения полей формы
//TODO треугольник на конце кнопки "Вперед"
//TODO сделать отправку сообщения покупателю

/**
 * Класс отвечает за функционирование формы
 * Вынес все настройки и константы в этот класс, но если бы было больше времени, вынес бы их в отдельный класс Config
 */
class OrderForm {
    constructor() {
        this.fieldsId = { //объект с названиями полей формы и их id
            length: 'orderform-length', //id поля для ввода длины забора
            height: 'orderform-height', //id поля для ввода высоты забора
            material: 'orderform-material', //id поля для выбора материала забора
            needMounting: 'orderform-needmounting', //id чек-бокса для выбора нужен ли монтаж
            orderSum: 'order-sum', //id поля для вывода суммы заказа
            userName: 'orderform-username', //id поля для ввода имени
            phone: 'orderform-phone', //id поля для ввода номера телефона
            email: 'orderform-email' //id поля для ввода электронного адреса
        };
        this.errorDiscriptions = { //объект с названиями полей формы и id контейнеров для сообщения об ошибке под инпутом
            length: 'length-error-description', //id поля для вывода сообщения об ошибке длины забора
            height: 'height-error-description',
            material: 'material-error-description',
            userName: 'userName-error-description',
            phone: 'phone-error-description',
            email: 'email-error-description'
        };
        this.checkMarks = { //объект с названиями полей формы и id контейнеров для зеленой галочки рядом с инпутом
            length: 'length-check-mark', //id поля для вывода зеленой галочки для длины забора
            height: 'height-check-mark',
            userName: 'userName-check-mark',
            phone: 'phone-check-mark',
            email: 'email-check-mark'
        };
        this.screen1Id = 'screen1'; //id первого экрана формы
        this.screen2Id = 'screen2'; //id второго экрана формы
        this.screen3Id = 'screen3'; //id третьего экрана формы
        this.orderNumberFieldID = 'order-number'; //id поля для вывода номера заказа
        this.buttonForwardId = 'button-forward'; //id кнопки "Вперед"
        this.buttonReturnId = 'button-return'; //id кнопки "Назад"
        this.buttonSendId = 'button-send'; //id кнопки "Отправить"
        this.materialsPrices = {ironSheet: 400, modules: 500, concrete: 700, mesh: 200}; //объект со стоимостью разных материалов (по-хорошему надо брать из базы данных)
        this.mountingPrice = 200; //стоимость монтажа квадратного метра (по-хорошему надо брать из базы данных)
        this.calculator = new Calculator(this.materialsPrices, this.mountingPrice); //создадим экземпляр класса Calculator
        this.handler = {}; //создадим объект handler, впоследствие положим в него экземпляр класса Handler
        this.render = {}; //создадим объект render, впоследствие положим в него экземпляр класса Render
    }

    /**
     * Метод запускает функционирование формы
     */
    run() {
        let fields = this._getObjectWithElements(this.fieldsId); //получим объект с полями формы
        this._createListeners(fields); //повесим обработчики на поля формы
        let errorFields = this._getObjectWithElements(this.errorDiscriptions); //объект с полями для сообщений
        let checkMarksFields = this._getObjectWithElements(this.checkMarks); //объект с полями для зеленой галочки
        let screen1 = $(`#${this.screen1Id}`); //найдем объект jQuery для экрана 1
        let screen2 = $(`#${this.screen2Id}`); //найдем объект jQuery для экрана 2
        let screen3 = $(`#${this.screen3Id}`); //найдем объект jQuery для экрана 3
        let orderNumberField = $(`#${this.orderNumberFieldID}`); //найдем объект jQuery для поля вывода номера заказа
        this.render = new Render(fields, errorFields, checkMarksFields, this.calculator); //создадим экземпляр класса Render
        this.handler = new Handler(this.calculator, this.render, fields, screen1, screen2, screen3, orderNumberField); //создадим экземпляр класса Handler
        let buttonForward = $(`#${this.buttonForwardId}`);
        buttonForward.on('click', (e) => { //вешаем обработчик на кнопку
            this.handler.buttonHandle(e.target.id); //вызываем метод buttonHandle и передаем ему id кнопки
        });
        let buttonReturn = $(`#${this.buttonReturnId}`);
        buttonReturn.on('click', (e) => { //вешаем обработчик на кнопку
            this.handler.buttonHandle(e.target.id); //вызываем метод buttonHandle и передаем ему id кнопки
        });
        let buttonSend = $(`#${this.buttonSendId}`);
        buttonSend.on('click', (e) => { //вешаем обработчик на кнопку
            this.handler.buttonHandle(e.target.id); //вызываем метод buttonHandle и передаем ему id кнопки
        });
    }


    /**
     * Метод создает объекты jQuery для переданных в него названий полей.
     * Метод возаращает объект со свойствами, при этом
     * ключ каждого свойства - это название поля формы,
     * а значение - объект jQuery, с элементом этого поля
     */
    _getObjectWithElements(elements) {
        let result = {};
        for (let key in elements) { //перебираем объект с названиями полей
            result[key] = $(`#${elements[key]}`) //получаем для поля объект jQuery и вставляем его в result
        }
        return result;
    }

    /**
     * Метод получает в качестве аргумента объект, состоящий из объектов jQuery.
     * Метод вешает обработчик на поля формы.
     */
    _createListeners(fields) {
        for (let field in fields) { //перебираем объект, состоящий из объектов jQuery
            if (field !== 'needMounting' && field !== 'orderSum') { //исключаем поле "Нужен монтаж" и поле для вывода суммы
                fields[field].on('input', () => { //вешаем обработчик на событие ввода в поле
                    this.handler.handle(field, fields[field].val()); //передаем в метод _handler название поля и его значение
                });
            }
        }
        fields['needMounting'].change( () => { //отдельно вешаем обработчик на поле "Нужен монтаж"
            if(fields['needMounting'].prop("checked")) {
                this.handler.handle('needMounting', 1);
            }else {
                this.handler.handle('needMounting', 0);
            }
        });
    }


}