<?php


namespace frontend\controllers;


use common\models\OrderForm;
use yii\web\Controller;

class FormController extends Controller
{
    public $layout = 'createOrder.php';

    public function actionIndex()
    {
        $model = new OrderForm();

        return $this->render('orderForm',
            [
                'model' => $model,
            ]);
    }
}