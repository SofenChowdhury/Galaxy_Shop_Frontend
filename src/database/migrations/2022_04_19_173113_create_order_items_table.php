<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();            
            $table->bigInteger('order_id')->unsigned()->index();
            $table->bigInteger('product_id')->unsigned()->index();
            $table->double('item_shipping_charge', 5, 2)->default(0);
            $table->double('item_mrp', 12, 2);
            $table->double('item_price', 12, 2);
            $table->integer('qty');
            $table->double('total_item_price', 12, 2);
            $table->double('coupon_value', 5, 2)->default(0);
            $table->double('reward_value', 5, 2)->default(0);
            $table->string('delivery_status')->nullable();
            $table->json('item_details')->nullable();            
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_items');
    }
};
