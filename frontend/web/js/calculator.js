/**
 * Класс отвечает за математические действия с данными
 * Пока он только может подсчитывать сумму заказа
 */
class Calculator {
    constructor(length = 0, height = 0, materialPrice = 0, mountingPrice = 0) {
        this._length = length; //длина забора
        this._height = height; //высота забора
        this._materialPrice = materialPrice; //стоимость квадратного метра материала
        this._mountingPrice = mountingPrice; //стоимость монтажа квадратного метра
        this._sum = 0;
    }

    /**
     * Считает сумму заказа и присваивает ее значение свойству _sum
     */
    calculateOrderSum() {
        this._sum = this._length * this._height * (this._materialPrice + this._mountingPrice);
    }

    set length(value) {
        this._length = value;
    }

    set height(value) {
        this._height = value;
    }

    set materialPrice(value) {
        this._materialPrice = value;
    }

    set mountingPrice(value) {
        this._mountingPrice = value;
    }

    get sum() {
        return this._sum;
    }
}