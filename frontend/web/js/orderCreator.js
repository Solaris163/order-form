/**
 * Класс отвечает за передачу данных из формы на сервер и получения обратно номера созданного заказа
 * TODO передавать в метод create() объект с данными из формы. Пока захардкодил метод.
 * TODO добавить в объект fields поле суммы заказа
 */
class OrderCreator {

    static create(fields) {

        let order = {}; //объявим объект для записи в него данных заказа
        for (let field in fields) { //переберем поля формы и вставим их значения в объект order
            order[field] = fields[field].val();
        }

        let json = JSON.stringify(order);

        $.ajax({
            url: "order/create",
            type: "POST",
            dataType: "json",
            data: {hg: 'dfd'},
            error: function() {alert('Не удалось создать заказ');},
            success: function(answer) {
                $('#order-number').text(`Заказ номер ${answer['orderNumber']} создан`);
            }
        })
    }

}