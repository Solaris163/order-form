//TODO менять цвет кнопки "Вперед" в зависимости от заполнения полей формы
//TODO треугольник на конце кнопки "Вперед"

/**
 * Класс отвечает за функционирование формы
 */
class OrderForm {
    /**
     * Константа равная Id поля "Нужен монтаж"
     */
    get checkBoxId() {return 'needMounting'}

    /**
     * Метод запускает функционирование формы
     */
    run() {
        let fields = this._getJQueryElements(Config.fieldsId); //получим объекты jQuery для полей формы
        let errorFields = this._getJQueryElements(Config.errorFieldsId); //объекты jQuery полей для сообщений
        let checkMarksFields = this._getJQueryElements(Config.checkMarksId); //объекты jQuery полей для зеленой галочки
        let buttons = this._getJQueryElements(Config.buttonsId); //объекты jQuery кнопок формы
        let otherElements = this._getJQueryElements(Config.otherElementsId); //объекты jQuery оставшихся элементов страницы

        let orderModel = new OrderModel(); //создадим модель заказа
        let render = new Render(fields, errorFields, checkMarksFields, buttons, otherElements, orderModel); //создадим экземпляр класса Render
        let handler = new Handler(fields, otherElements, orderModel, render); //создадим экземпляр класса Handler

        this._createFieldsListeners(fields, handler); //повесим обработчики на поля формы
        this._createButtonsListeners(buttons, handler); //повесим обработчики на кнопки формы
    }

    /**
     * Метод создает объекты jQuery для элементов формы
     * Метод получает объект с названиями элементов и их Id
     * Метод отдает объект с названиями элементов и соответствующими им объектами jQuery
     */
    _getJQueryElements(elements) {
        let result = {};
        for (let key in elements) { //перебираем объект с названиями полей
            result[key] = $(`#${elements[key]}`) //получаем для поля объект jQuery и вставляем его в result
        }
        return result;
    }

    /**
     * Метод вешает обработчики на поля формы
     * Метод в качестве аргументов получает объект с объектами jQuery и экземпляр класса Handler
     */
    _createFieldsListeners(fields, handler) {
        for (let field in fields) { //перебираем объект, состоящий из объектов jQuery
            if (field !== this.checkBoxId) { //исключаем поле чекбокса "Нужен монтаж"
                fields[field].on('input', () => { //вешаем обработчик на событие ввода в поле
                    handler.handle(field, fields[field].val()); //передаем в метод handle название поля и его значение
                });
            }
        }
        fields[this.checkBoxId].change( () => { //отдельно вешаем обработчик на поле чекбокса "Нужен монтаж"
            if(fields['needMounting'].prop("checked")) {
                handler.handle('needMounting', 1);
            }else {
                handler.handle('needMounting', 0);
            }
        });
    }

    /**
     * Метод вешает обработчики на кнопки формы
     * Метод в качестве аргументов получает объект с объектами jQuery и экземпляр класса Handler
     */
    _createButtonsListeners(buttons, handler) {
        for (let button in buttons) { //перебираем объект, состоящий из объектов jQuery
            buttons[button].on('click', (e) => { //вешаем обработчик на событие нажатия кнопки
                e.preventDefault();
                handler.buttonHandle(e.target.id); //вызываем метод buttonHandle и передаем ему id кнопки
            });
        }
    }
}