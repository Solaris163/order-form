/**
 * Класс содержит логику выбора окончания для едениц измерения (метр или метров)
 */
class Unit {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }

    getUnit(field) {
        let value =  this.orderModel[field];
        if (value === 0) return 'метров'; //если равно 0, вернем "метров"
        if (!Number.isInteger(value)) return 'метра'; //если не целое число, вернем "метра"

        if(Number(String(value).length) > 2) value = Number(String(value).substr(-2)); //берем последние две цифры
        if(value == 11 || value == 12 || value == 13 || value == 14) return 'метров';
        switch(Number(String(value).substr(-1))){ //берем последнюю цифру
            case 1: return 'метр';
            case 2:case 3:case 4: return 'метра';
            case 5:case 6:case 7:case 8:case 9:case 0: return 'метров';
        }
    }
}