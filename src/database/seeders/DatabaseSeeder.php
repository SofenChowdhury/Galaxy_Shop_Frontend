<?php

namespace Database\Seeders;
use RoleSeeder;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {


        // \App\Models\User::factory(10)->create();
        // $this->call(PermissionSeeder::class);
        $this->call(RoleSeeder::class);
        // \App\Models\Slider::factory(10)->create();
        // \App\Models\Product::factory(50)->create();
    }
}