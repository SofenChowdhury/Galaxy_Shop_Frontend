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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            $table->unsignedBigInteger('category_id')->index();
            $table->unsignedBigInteger('series_id')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->string('sku')->index();
            $table->string('title');         
            // Pricing
            $table->double('regular_price', 12, 2);      
            $table->double('discount_price', 12, 2);      
            // Stock
            $table->integer('stock')->nullable(); 
            $table->integer('max_order_qty')->nullable();          

            // Display
            $table->tinyInteger('featured')->default(0);
            $table->tinyInteger('best')->default(0);
            $table->tinyInteger('top')->default(0);
            $table->tinyInteger('latest')->default(0);
            $table->tinyInteger('big_save')->default(0);

            $table->dateTime('discount_start_time')->nullable();
            $table->dateTime('discount_end_time')->nullable();

            $table->tinyInteger('enable_emi')->default(0);

            $table->text('specifications')->nullable();
            $table->text('details')->nullable();
            $table->string('photo');
            $table->integer('views')->nullable();
            $table->bigInteger('campaign_id')->nullable();
            $table->string('meta_title')->nullable();
            $table->text('meta_tag')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('youtube')->nullable();
            $table->integer('product_sort')->nullable();            
            $table->tinyInteger('status')->default(1);
            $table->foreign('category_id')->references('id')->on('categories');
        
            $table->foreign('user_id')->references('id')->on('admins');
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
        Schema::dropIfExists('products');
    }
};