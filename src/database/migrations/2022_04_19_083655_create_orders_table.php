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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('order_number');
            $table->string('payment_status');
            $table->string('customer_name');
            $table->string('customer_email')->nullable();
            $table->string('customer_phone');
            $table->string('customer_address');
            $table->string('customer_city');
            $table->string('customer_area')->nullable();
            $table->string('customer_zip')->nullable();
            $table->string('shipping_name')->nullable();
            $table->string('shipping_email')->nullable();
            $table->string('shipping_phone')->nullable();
            $table->string('shipping_address')->nullable();
            $table->string('shipping_city')->nullable();
            $table->string('shipping_area')->nullable();
            $table->string('shipping_zip')->nullable();
            $table->string('order_note')->nullable();
            $table->enum('order_status', ['initiated', 'pending', 'hold', 'confirmation', 'vendor_confirmation', 'processing', 'delivered', 'closed', 'declined', 'lost', 'returned', 'unreached'])->default('initiated');
            $table->float('shipping_cost')->default(0);
            $table->float('packing_cost')->default(0);
            $table->float('vat')->default(0);
            $table->foreign('user_id')->references('id')->on('users');
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
        Schema::dropIfExists('orders');
    }
};
