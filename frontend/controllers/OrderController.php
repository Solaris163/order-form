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

            $this->contact($email, 'Заказ созддан');
        }
        return '{"orderNumber": "Y55588877"}';
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