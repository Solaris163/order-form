/**
 * Класс отвечает за математические действия с данными
 * Пока он только может подсчитывать сумму заказа
 */
class Calculator {
    constructor(materialsPrices = 0, mountingPrice = 0) {
        this._materialsPrices = materialsPrices; //стоимость квадратного метра материала
        this._mountingPrice = mountingPrice; //стоимость монтажа квадратного метра
        this._length = 0; //длина забора
        this._height = 0; //высота забора
        this._material = null; //материал забора
        this._needMounting = 0; //нужен ли монтаж
        this._sum = 0;
    }

    /**
     * Подсчитывает сумму заказа и присваивает ее значение свойству _sum
     */
    updateOrderSum() {
        let materialPrice = this._materialsPrices[this._material];
        this._sum = this._length * this._height * (materialPrice + this._mountingPrice*this._needMounting);
        if (!this._sum) this._sum = 0; //если сумма не определена, приравняем ее нулю
    }

    set length(value) {
        this._length = value;
    }

    set height(value) {
        this._height = value;
    }

    set material(value) {
        this._material = value;
    }

    set needMounting(value) {
        this._needMounting = value;
    }

    // set sum(value) {
    //     this._sum = value;
    // }

    get sum() {
        return this._sum;
    }
}