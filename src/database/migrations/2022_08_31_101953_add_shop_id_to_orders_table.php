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
        Schema::table('orders', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('shop_id')->after('id');
            $table->string('payment_type')->after('order_note');
            $table->string('customer_thana')->after('customer_city');
           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            //
             $table->dropColumn('shop_id');
             $table->dropColumn('payment_type');
             $table->dropColumn('customer_thana');
             
        });
    }
};
