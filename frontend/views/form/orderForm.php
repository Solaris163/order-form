<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

$form = ActiveForm::begin([
    'id' => 'login-form',
    'options' => ['class' => 'order-form'],
])
?>

    <fieldset id="screen1">

        <div class="flex-container-for-field">
            <?= $form->field($model, 'length', ['template' => "{label}\n{input}"])
                ->textInput(['class' => 'order-input order-input-short form-control'])
                ->label('Длина забора', ['class' => 'control-label order-label']) ?>
            <div id="length-unit" class="unit">метров</div>
        </div>

        <div class="flex-container-for-field">
            <?= $form->field($model, 'height', ['template' => "{label}\n{input}"])
                ->textInput(['class' => 'order-input order-input-short form-control'])
                ->label('Высота забора', ['class' => 'control-label order-label']) ?>
            <div id="length-unit" class="unit">метров</div>
        </div>

        <div class="flex-container-for-field">
            <?= $form->field($model, 'material', ['template' => "{label}\n{input}"])
                ->dropDownList([1, 2, 3], ['class' => 'form-control order-input'])
                ->label('Материал забора', ['class' => 'control-label order-label']) ?>
        </div>

        <div class="flex-container-for-field">
            <?= $form->field($model, 'needMounting', ['template' => "{input}{label}"])
                ->checkbox([
                    'label' => 'Нужен монтаж',
                    'labelOptions' => ['class' => 'control-label order-label'],
                    'class' => 'order-checkbox'
                ])?>
        </div>




    </fieldset>

    <fieldset id="screen2">

        <div class="flex-container-for-field">
            <?= $form->field($model, 'username', ['template' => "{label}\n{input}"])
                ->textInput(['class' => 'order-input form-control'])
                ->label('Ваше имя', ['class' => 'control-label order-label']) ?>
        </div>

        <div class="flex-container-for-field">
            <?= $form->field($model, 'email', ['template' => "{label}\n{input}"])
                ->input('email', ['class' => 'order-input form-control'])
                ->label('Электронная почта', ['class' => 'control-label order-label']) ?>
        </div>

        <div class="flex-container-for-field">
            <?= $form->field($model, 'phone', ['template' => "{label}\n{input}"])
                ->textInput(['class' => 'order-input form-control'])
                ->label('Телефон', ['class' => 'control-label order-label']) ?>
        </div>





    </fieldset>

    <div class="form-group">
        <div class="col-lg-offset-1 col-lg-11">
            <?= Html::submitButton('Отправить', ['class' => 'btn btn-primary']) ?>
        </div>
    </div>
<?php ActiveForm::end() ?>