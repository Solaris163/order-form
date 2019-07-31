<?php


namespace frontend\controllers;


use common\models\OrderForm;
use yii\web\Controller;

/**
 * Класс отвечает за отображение формы, обработку ajax-запроса и отправку письма покупателю
 */
class OrderController extends Controller
{
    public $layout = 'createOrder.php';

    public function actionForm()
    {
        $model = new OrderForm();

        return $this->render('orderForm',
            [
                'model' => $model,
            ]);
    }

    /**
     * TODO метод должен принимать ajax-запрос, создавать заказ, сохранять его в базе и отдавать номер заказа
     */
    public function actionCreate()
    {
        //TODO получить данные из ajax-запроса и передать их в метод contact
        return '{"orderNumber": "555888"}';
    }

    public function contact($email, $message)
    {
        \Yii::$app->mailer->compose()
            ->setFrom('test.yii@mail.ru')
            ->setTo($email)
            ->setSubject('Заказ')
            ->setTextBody($message)
            ->send();
        return true;
    }
}