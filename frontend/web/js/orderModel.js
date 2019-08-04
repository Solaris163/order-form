/**
 * Класс содержит в себе данные заказа и методы работы с ними
 *
 */
class OrderModel {
    constructor() {
        this._materialsPrices = Config.prices['materialsPrices']; //стоимости квадратного метра материала
        this._mountingPrice = Config.prices['mountingPrice']; //стоимость монтажа квадратного метра
        this._length = 0; //длина забора
        this._height = 0; //высота забора
        this._material = null; //материал забора
        this._needMounting = 0; //нужен ли монтаж
        this._sum = 0;
        this._userName = null;
        this._phone = null;
        this._email = null;
    }

    /**
     * Метод подсчитывает сумму заказа и присваивает ее значение свойству _sum
     */
    updateOrderSum() {
        let materialPrice = this._materialsPrices[this._material]; //найдем цену материала из объекта _materialsPrices
        this._sum = this._length * this._height * (materialPrice + this._mountingPrice*this._needMounting);
        if (!this._sum) this._sum = 0; //если сумма не определена, приравняем ее нулю
    }

    set length(value) {
        let str = String(value).replace(',', '.'); //заменим запятую на точку
        this._length = Number(str);
    }

    set height(value) {
        let str = String(value).replace(',', '.'); //заменим запятую на точку
        this._height = Number(str);
    }

    set material(value) {
        this._material = value;
    }

    set needMounting(value) {
        this._needMounting = value;
    }

    set userName(value) {
        this._userName = value;
    }

    set phone(value) {
        this._phone = value;
    }

    set email(value) {
        this._email = value;
    }

    get length() {
        return this._length;
    }

    get height() {
        return this._height;
    }

    get material() {
        return this._material;
    }

    get needMounting() {
        return this._needMounting;
    }

    get userName() {
        return this._userName;
    }

    get phone() {
        return this._phone;
    }

    get email() {
        return this._email;
    }

    get sum() {
        return this._sum;
    }
}