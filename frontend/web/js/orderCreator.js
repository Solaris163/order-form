/**
 * Класс отвечает за передачу данных из формы на сервер и получения обратно номера созданного заказа
 * TODO передавать в метод create() объект с данными из формы. Пока захардкодил метод.
 * TODO добавить в объект fields поле суммы заказа
 */
class OrderCreator {

    static create(fields, calculator) {

        let order = {}; //объявим объект для записи в него данных заказа
        for (let field in fields) { //переберем поля формы и вставим их значения в объект order
            order[field] = fields[field].val();
        }
        order['orderSum'] = calculator.sum;
        if(fields['needMounting'].prop("checked")) {
            order['needMounting'] = 1;
        }

        let json = JSON.stringify(order);

        $.ajax({
            url: "/order/create",
            type: "post",
            data: {data:json},
            error: function() {alert('Не удалось создать заказ');},
            success: function(answer) {
                let $resalt = $.parseJSON(answer);
                $('#order-number').text(`Заказ номер ${$resalt['orderNumber']} создан`);
            }
        })
    }

}