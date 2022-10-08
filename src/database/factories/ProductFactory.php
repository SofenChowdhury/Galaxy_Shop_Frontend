<?php

namespace Database\Factories;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'category_id' =>1,
            'name' => $this->faker->name(),
		    'slug' =>$this->faker->slug(6),
		    'sku' =>Str::random(10),
		    'user_id' =>1,
            'lifting_price' =>100,
            'regular_price' =>200,
            'discount_price'=>160,
            'stock' => 10,
            'max_order_qty' => 3,
            'best'=>1,
            'top' => 1,
            'latest'=>1,
            'details'=> $this->faker->sentence(500),
            'specifications'=> $this->faker->realText(1000),
            'photo'=> $this->faker->imageUrl(),
            'status'=>1

        ];
    }
}
