<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%orders}}`.
 */
class m191003_083305_create_orders_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('orders', [
            'id' => $this->primaryKey()->notNull(),
            'length' => $this->integer()->notNull(),
            'height' => $this->integer()->notNull(),
            'material' => $this->string()->notNull(),
            'needMounting' => $this->integer(1)->notNull(),
            'sum' => $this->decimal(15,2)->notNull(),
            'userName' => $this->string()->notNull(),
            'phone' => $this->string()->notNull(),
            'email' => $this->string()->notNull(),
            'date' => $this->date()->notNull()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('orders');
    }
}
