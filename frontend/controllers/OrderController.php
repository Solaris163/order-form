<?php


namespace frontend\controllers;


use common\models\Order;
use common\models\OrderForm;
use Yii;
use yii\helpers\BaseJson;
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
     * Метод принимает ajax-запрос с данными заказа, сохраняет заказ в базу данных и получает id последней записи в базу
     * Возвращает json - строку с номером заказа, равным id последней записи в базу данных
     */
    public function actionCreate()
    {
        if (\Yii::$app->request->isAjax) {
            $model = new Order(); //создаем модель ActiveRecord
            $json = \Yii::$app->request->post()['data'];
            $model->attributes = json_decode($json, true); //загружем в модель данные из isAjax-запроса
            $model->save();
            $id = Yii::$app->db->getLastInsertID();
            $email = $model->email;
            $message = $this->createMessage($model); //создаем сообщение пользователю
            $this->contact($email, $message); //отправляем пользователю письмо
            $answer = ['orderNumber' => $id]; //создаем ответ на isAjax-запрос и вставляем в него номер заказа
            return json_encode($answer); //отправляем ответ на isAjax-запрос
        }
    }


    /**
     * Метод принимает модель заказа и возвращает сообщение для отправки пользователю
     * @var Order $model
     * @return string
     */
    public function createMessage($model) {
        $str = "Вы сделали заказ на сайте Лучшие-заборы.рф \r\n
        Параметры Вашего заказа: \r\n
        Длина: {$model->length} м. Высота: {$model->height} м. Материал: {$model->material} \r\n
        Номер Вашего заказа: {$model->id}";
        return $str;
    }

    public function contact($email, $message)
    {
        try {
            \Yii::$app->mailer->compose()
                ->setFrom('test.yii@mail.ru')
                ->setTo($email)
                ->setSubject('Заказ')
                ->setTextBody($message)
                ->send();
        } catch (\Exception $e) {
            file_put_contents('../../data/1.txt', $e);
        }
        return true;
    }
}