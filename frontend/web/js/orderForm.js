/**
 * Класс отвечает за функционирование формы
 */
class OrderForm {
    constructor() {
        this.fieldsId = { //объект с названиями полей формы и их id
            inputLength: 'orderform-length', //id поля для ввода длины забора
            inputHeight: 'orderform-height', //id поля для ввода высоты забора
            inputMaterial: 'orderform-material', //id поля для выбора материала забора
            inputNeedMounting: 'orderform-needmounting', //id чек-бокса для выбора нужен ли монтаж
            spanOrderSum: 'order-sum', //id поля для вывода суммы заказа
            inputName: 'orderform-username', //id поля для ввода имени
            inputPhone: 'orderform-phone', //id поля для ввода номера телефона
            inputEmail: 'orderform-email' //id поля для ввода электронного адреса
        };
    }

    /**
     * Метод запускает функционирование формы
     */
    run() {
        let fields = this._getObjectWithElements(); //получим объект с полями формы
        this._createListeners(fields);
    }


    /**
     * Метод создает объект со свойствами, при этом
     * ключ каждого свойства - это название поля формы,
     * а значение - объект jQuery, с элементом этого поля
     */
    _getObjectWithElements() {
        let result = {};
        for (let field in this.fieldsId) { //перебираем объект с названиями полей
            result[field] = $(`#${this.fieldsId[field]}`) //получаем для поля объект jQuery и вставляем его в result
        }
        return result;
    }

    /**
     * Метод вешает обработчик на все поля формы.
     * Можно было бы не создавать обработчик для поля вывода суммы, но создадим и его, вдруг будет расширяться функционал
     * Метод получает объект, состоящий из объектов jQuery
     */
    _createListeners(fields) {
        for (let field in fields) { //перебираем объект, состоящий из объектов jQuery
            fields[field].on('input', () => { //вешаем обработчик на событие ввода в поле
                this._handler(field, fields[field].val()); //передаем в метод _handler название поля и его значение
            });
        }
    }

    /**
     * Метод обрабатывает событие ввода информации в поля формы
     * Метод получает название поля и введенное в него значение
     */
    _handler(field, value) {
        
    }


}