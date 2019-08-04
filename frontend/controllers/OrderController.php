<?php


namespace frontend\controllers;


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
     * TODO метод должен принимать ajax-запрос, создавать заказ, сохранять его в базе и отдавать номер заказа
     */
    public function actionCreate()
    {
        if (\Yii::$app->request->isAjax) {
            $json = $_POST['data'];
            $email = json_decode($json)->email;
            $this->contact($email, 'Заказ создан'); //отправляем пользователю письмо
            $this->getResponse('{"orderNumber": "5587"}'); //отправляем пользователю номер заказа
        }
    }

    /**
     * Метод отвечает на ajax запрос, не останавливая скрипта.
     * Это сделано для того, чтобы сначала отдать ответ пользователю, а потом послать например сообщение администратору
     * В реальном проекте это может и неуместно, но здесь добавил такую возможность.
     */
    public function getResponse ($response) {
        ignore_user_abort(true);
        header("Connection: close");
        header("Content-Length: " . mb_strlen($response));
        echo $response;
        flush();
    }

    public function contact($email, $message)
    {
        try {
            \Yii::$app->mailer->compose()
                ->setFrom('test.yii2@mail.ru')
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