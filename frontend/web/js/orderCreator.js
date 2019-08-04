/**
 * Класс отвечает за передачу данных из формы на сервер и получения обратно номера созданного заказа
 */
class OrderCreator {

    static create(orderModel, render) {

        let order = {}; //объявим объект для записи в него данных заказа
        for (let field in orderModel) { //переберем поля формы и вставим их значения в объект order
            let fieldName = field.substr(1); //убираем нижнее подчеркивание вначале названия поля заказа
            order[fieldName] = orderModel[field];
        }

        let json = JSON.stringify(order);

        $.ajax({
            url: "/order/create",
            type: "post",
            data: {data:json},
            error: function() {alert('Не удалось создать заказ');},
            success: function(answer) {
                answer = $.parseJSON(answer);
                render.showAnswer(answer);
            }
        })
    }
}