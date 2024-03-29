<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

//зарегистрируем orderForm.css и добавим depends чтобы orderForm.css загружался после css-файлов, указанных в AppAsset
$this->registerCssFile('/css/orderForm.css', ['depends' => ['frontend\assets\AppAsset']]);
$this->registerJsFile('/js/jquery/jquery-3.4.1.js');
$this->registerJsFile('/js/config.js');
$this->registerJsFile('/js/unit.js');
$this->registerJsFile('/js/orderModel.js');
$this->registerJsFile('/js/validation.js');
$this->registerJsFile('/js/render.js');
$this->registerJsFile('/js/orderCreator.js');
$this->registerJsFile('/js/handler.js');
$this->registerJsFile('/js/orderForm.js');
$this->registerJsFile('/js/main.js');

$form = ActiveForm::begin([
    'id' => 'order-form',
    'options' => ['class' => 'order-form'],
])
?>

    <fieldset id="screen1" class="order-fieldset">

        <h2 align="center">Заказать забор</h2>

        <div class="order-fieldset-container">
            <div class="flex-container-for-field">
                <?= $form->field($model, 'length', ['template' => "{label}\n{input}"])
                    ->textInput(['class' => 'order-input order-input-short form-control', 'placeholder' => '0'])
                    ->label('Длина забора', ['class' => 'control-label order-label']) ?>
                <div id="length-unit" class="unit">метров</div>
                <div id="length-check-mark" class="check-mark">&#10004;</div>
            </div>
            <div id="length-error-description" class="input-error-description"></div>

            <div class="flex-container-for-field">
                <?= $form->field($model, 'height', ['template' => "{label}\n{input}"])
                    ->textInput(['class' => 'form-control order-input order-input-short', 'placeholder' => '0'])
                    ->label('Высота забора', ['class' => 'control-label order-label']) ?>
                <div id="height-unit" class="unit">метров</div>
                <div id="height-check-mark" class="check-mark">&#10004;</div>
            </div>
            <div id="height-error-description" class="input-error-description"></div>

            <div class="flex-container-for-field">
                <?= $form->field($model, 'material', ['template' => "{label}\n{input}"])
                    ->dropDownList(
                        [],
                        [
                            'class' => 'form-control order-input',
                            'prompt' => 'Выберите материал'
                        ]
                    )
                    ->label('Материал забора', ['class' => 'control-label order-label']) ?>
            </div>
            <div id="material-error-description" class="input-error-description"></div>

            <div class="flex-container-for-field">
                <?= $form->field($model, 'needMounting', ['template' => "{input}{label}"])
                    ->checkbox([
                        'label' => 'Нужен монтаж',
                        'labelOptions' => ['class' => 'control-label order-label'],
                        'class' => 'order-checkbox',
                        'value' => 0
                    ])?>
            </div>

            <div class="order-sum-container">
                Сумма заказа:
                <span class="red-text">
                    <span id="order-sum"> 0 </span>
                    <i class="fas fa-ruble-sign"></i>
                </span>
            </div>

            <button id="button-forward" class="order-input button-forward">ДАЛЕЕ</button>

        </div>
    </fieldset>

    <fieldset id="screen2" class="order-fieldset">

        <div id="button-return">Вернуться</div>

        <h2 align="center">Пожалуйста представьтесь</h2>

        <div class="order-fieldset-container">
            <div class="flex-container-for-field">
                <?= $form->field($model, 'username', ['template' => "{label}\n{input}"])
                    ->textInput(['class' => 'order-input form-control'])
                    ->label('Ваше имя', ['class' => 'control-label order-label']) ?>
                <div id="userName-check-mark" class="check-mark">&#10004;</div>
            </div>
            <div id="userName-error-description" class="input-error-description"></div>

            <div class="flex-container-for-field">
                <?= $form->field($model, 'email', ['template' => "{label}\n{input}"])
                    ->input('email', ['class' => 'order-input form-control'])
                    ->label('Электронная почта', ['class' => 'control-label order-label']) ?>
                <div id="email-check-mark" class="check-mark">&#10004;</div>
            </div>
            <div id="email-error-description" class="input-error-description"></div>

            <div class="flex-container-for-field">
                <?= $form->field($model, 'phone', ['template' => "{label}\n{input}"])
                    ->textInput(['class' => 'order-input form-control'])
                    ->label('Телефон', ['class' => 'control-label order-label']) ?>
                <div id="phone-check-mark" class="check-mark">&#10004;</div>
            </div>
            <div id="phone-error-description" class="input-error-description"></div>

            <div id="screen2-order-description">
            </div>

            <button id="button-send" class="order-input button-send"  type="submit">ОТПРАВИТЬ</button>
        </div>
    </fieldset>

    <fieldset id="screen3" class="order-fieldset" align="center">
        <h2>
            Заказ оформляется
        </h2>

    </fieldset>

    <fieldset id="screen4" class="order-fieldset" align="center">
        <div id="screen4-order-description">
        </div>
    </fieldset>

<?php ActiveForm::end() ?>