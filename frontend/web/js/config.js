/**
 * Класс хранит константы приложения
 * В будущем некоторые из них можно будет получать из базы данных
 */
class Config {
    /**
     * Метод возвращает объект с названиями основных полей формы и их id
     */
    static get fieldsId() {
        return {
            length: 'orderform-length', //id поля для ввода длины забора
            height: 'orderform-height', //id поля для ввода высоты забора
            material: 'orderform-material', //id поля для выбора материала забора
            needMounting: 'orderform-needmounting', //id чек-бокса для выбора нужен ли монтаж
            userName: 'orderform-username', //id поля для ввода имени
            phone: 'orderform-phone', //id поля для ввода номера телефона
            email: 'orderform-email' //id поля для ввода электронного адреса
        }
    }

    /**
     * Метод возвращает объект, в котором ключи - это названия валидируемых полей формы,
     * а значения - это id соответствующих контейнеров для зеленой галочки рядом с инпутом
     */
    static get checkMarksId() {
        return {
            length: 'length-check-mark', //id элемента для вывода зеленой галочки около поля длины забора
            height: 'height-check-mark', //id элемента для вывода зеленой галочки около поля высоты забора
            userName: 'userName-check-mark', //id элемента для вывода зеленой галочки около поля имени
            phone: 'phone-check-mark', //id элемента для вывода зеленой галочки около поля номера телефона
            email: 'email-check-mark' //id элемента для вывода зеленой галочки около поля электронного адреса
        }
    }

    /**
     * Метод возвращает объект, в котором ключи - это названия валидируемых полей формы,
     * а значения - это id соответствующих контейнеров для вывода сообщения об ошибке под инпутом
     */
    static get errorFieldsId() {
        return {
            length: 'length-error-description', //id поля для вывода сообщения об ошибке в поле длины забора
            height: 'height-error-description', //id поля для вывода сообщения об ошибке в поле высоты забора
            material: 'material-error-description', //id поля для вывода сообщения об ошибке в выборе материала забора
            userName: 'userName-error-description', //id поля для вывода сообщения об ошибке в поле имени
            phone: 'phone-error-description', //id поля для вывода сообщения об ошибке в поле номера телефона
            email: 'email-error-description' //id поля для вывода сообщения об ошибке в поле электронного адреса
        }
    }

    /**
     * Метод возвращает объект с id кнопок
     */
    static get buttonsId() {
        return {
            buttonForward: 'button-forward', //id кнопки "Вперед"
            buttonReturn: 'button-return', //id кнопки "Назад"
            buttonSend: 'button-send' //id кнопки "Отправить"
        }
    }

    /**
     * Метод возвращает объект с id оставшихся элементов формы
     */
    static get otherElementsId() {
        return {
            screen1: 'screen1', //id первого экрана формы
            screen2: 'screen2', //id второго экрана формы
            screen3: 'screen3', //id третьего экрана формы
            screen4: 'screen4', //id четвертого экрана формы
            length: 'length-unit', //id поля для единицы измерения длины забора
            height: 'height-unit', //id поля для единицы измерения высоты забора
            orderSum: 'order-sum', //id поля для вывода суммы заказа
            screen2OrderDescription: 'screen2-order-description' //id поля для вывода описания заказа на экране 2
        }
    }

    /**
     * Метод возвращает объект с материалами (по-хорошему надо брать из базы данных)
     */
    static get materials() {
        return {
            ironSheet: {name: 'профнастил', price: 400},
            modules: {name: 'модули', price: 500},
            concrete: {name: 'бетон', price: 700},
            mesh: {name: 'сетка', price: 200}
        }
    }

    /**
     * Метод возвращает объект со стоимостью монтажа квадратного метра (по-хорошему надо брать из базы данных)
     */
    static get mountingPrice() {
        return 200;
    }
}