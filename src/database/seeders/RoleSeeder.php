<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        $permissions=[
            [
                'name' 			=> 'Super Admin',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ],
            [
                'name' 			=> 'Admin',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ],
            [
                'name' 			=> 'Manager',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ],
            [
                'name' 			=> 'ND Admin',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ],
            [
                'name' 			=> 'NSM Admin',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ],
            [
                'name' 			=> 'RSM Admin',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ],
            [
                'name' 			=> 'AM Admin',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ],
            [
                'name' 			=> 'TM Admin',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ],
            [
                'name' 			=> 'Shop Admin',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ]
        
        ];
        


        foreach($permissions as $key=>$permission){

            if( !Permission::where('name',$permission['name'])->exists()){
                Permission::insert($permission);
            }
        }

    }
}
