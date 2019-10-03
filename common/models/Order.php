<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "orders".
 *
 * @property int $id
 * @property int $length
 * @property int $height
 * @property string $material
 * @property int $needMounting
 * @property string $sum
 * @property string $userName
 * @property string $phone
 * @property string $email
 * @property string $date
 */
class Order extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'orders';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['length', 'height', 'material', 'needMounting', 'sum', 'userName', 'phone', 'email'], 'required'],
            [['length', 'height', 'needMounting'], 'integer'],
            [['sum'], 'number'],
            //[['date'], 'safe'],
            [['material', 'userName', 'phone', 'email'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'length' => 'Length',
            'height' => 'Height',
            'material' => 'Material',
            'needMounting' => 'Need Mounting',
            'sum' => 'Sum',
            'userName' => 'User Name',
            'phone' => 'Phone',
            'email' => 'Email',
            'date' => 'Date',
        ];
    }
}
