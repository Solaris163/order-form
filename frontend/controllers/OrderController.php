<?php


namespace frontend\controllers;


use common\models\OrderForm;
use yii\web\Controller;

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
}