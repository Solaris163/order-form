<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

//зарегистрируем orderForm.css и добавим depends чтобы orderForm.css загружался после css-файлов, указанных в AppAsset
$this->registerCssFile('css/orderForm.css', ['depends' => ['frontend\assets\AppAsset']]);
$this->registerJsFile('js/jquery/jquery-3.4.1.js');
$this->registerJsFile('js/calculator.js');
$this->registerJsFile('js/validation.js');
$this->registerJsFile('js/orderForm.js');
$this->registerJsFile('js/main.js');

$form = ActiveForm::begin([
    'id' => 'login-form',
    'options' => ['class' => 'order-form'],
])
?>

    <fieldset id="screen1">

        <div class="flex-container-for-field">
            <?= $form->field($model, 'length', ['template' => "{label}\n{input}"])
                ->textInput(['class' => 'order-input order-input-short form-control', 'placeholder' => '0'])
                ->label('Длина забора', ['class' => 'control-label order-label']) ?>
            <div id="length-unit" class="unit">метров</div>
            <div id="length-check-mark" class="check-mark"></div>
        </div>
        <div id="length-error-description" class="input-error-description"></div>

        <div class="flex-container-for-field">
            <?= $form->field($model, 'height', ['template' => "{label}\n{input}"])
                ->textInput(['class' => 'form-control order-input order-input-short', 'placeholder' => '0'])
                ->label('Высота забора', ['class' => 'control-label order-label']) ?>
            <div id="height-unit" class="unit">метров</div>
            <div id="height-check-mark" class="check-mark"></div>
        </div>
        <div id="height-error-description" class="input-error-description"></div>

        <div class="flex-container-for-field">
            <?= $form->field($model, 'material', ['template' => "{label}\n{input}"])
                ->dropDownList([1, 2, 3], ['class' => 'form-control order-input', 'prompt' => 'Выберите материал'])
                ->label('Материал забора', ['class' => 'control-label order-label']) ?>
        </div>
        <div class="input-error-description"></div>

        <div class="flex-container-for-field">
            <?= $form->field($model, 'needMounting', ['template' => "{input}{label}"])
                ->checkbox([
                    'label' => 'Нужен монтаж',
                    'labelOptions' => ['class' => 'control-label order-label'],
                    'class' => 'order-checkbox'
                ])?>
        </div>

        <div class="order-sum-container">
            Сумма заказа:
            <span class="red-text">
                <span id="order-sum"> 0 </span>
                <i class="fas fa-ruble-sign"></i>
            </span>
        </div>

    </fieldset>

<div id="btn">кнопка</div>

    <fieldset id="screen2">

        <div class="flex-container-for-field">
            <?= $form->field($model, 'username', ['template' => "{label}\n{input}"])
                ->textInput(['class' => 'order-input form-control'])
                ->label('Ваше имя', ['class' => 'control-label order-label']) ?>
            <div id="height-check-mark" class="check-mark"></div>
        </div>
        <div id="username-error-description" class="input-error-description"></div>

        <div class="flex-container-for-field">
            <?= $form->field($model, 'email', ['template' => "{label}\n{input}"])
                ->input('email', ['class' => 'order-input form-control'])
                ->label('Электронная почта', ['class' => 'control-label order-label']) ?>
            <div id="height-check-mark" class="check-mark"></div>
        </div>
        <div id="email-error-description" class="input-error-description"></div>

        <div class="flex-container-for-field">
            <?= $form->field($model, 'phone', ['template' => "{label}\n{input}"])
                ->textInput(['class' => 'order-input form-control'])
                ->label('Телефон', ['class' => 'control-label order-label']) ?>
            <div id="height-check-mark" class="check-mark"></div>
        </div>
        <div id="phone-error-description" class="input-error-description"></div>





    </fieldset>

    <div class="form-group">
        <div class="col-lg-offset-1 col-lg-11">
            <?= Html::submitButton('Отправить', ['class' => 'btn btn-primary']) ?>
        </div>
    </div>
<?php ActiveForm::end() ?>