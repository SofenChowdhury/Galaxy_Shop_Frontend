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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id')->index();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->string('method');
            $table->enum('transaction_type', ['debit', 'credit'])->nullable()->comment('debit / credit');
            $table->double('amount_debit', 10,2)->default(0);
            $table->double('amount_credit', 10,2)->default(0);
            $table->string('bank')->nullable();            
            $table->string('branch')->nullable();            
            $table->string('account_number')->nullable();    
            $table->string('transaction_details')->nullable();          
            $table->string('payment_status')->nullable();
            $table->string('payment_note')->nullable();
            $table->string('payment_slip')->nullable();
            $table->integer('admin_id')->nullable()->comment('for admin manual entry'); 
            $table->foreign('order_id')->references('id')->on('orders');     
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
        Schema::dropIfExists('payments');
    }
};
