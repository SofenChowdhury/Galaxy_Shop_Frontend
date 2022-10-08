<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
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
                'name' 			=> 'Retrieve Users',
                'key' 	        => 'retrieve_users',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ],
            [
                'name' 			=> 'Create Users',
                'key' 			=> 'create_users',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ],
            [
                'name' 			=> 'Update Users',
                'key' 			=> 'update_users',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ],
            [
                'name' 			=> 'deleted_users',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ],
            [
                'name' 			=> 'Retrieve Roles',
                'key' 			=> 'retrieve_roles',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ],
            [
                'name' 			=> 'Create Roles',
                'key' 			=> 'create_roles',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ],
            [
                'name' 			=> 'Update Roles',
                'key' 			=> 'update_roles',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ],
            [
                'name' 			=> 'deleted_roles',
                'key' 			=> 'deleted_roles',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ],
            [
                'name' 			=> 'retrieve_permissions',
                'key' 			=> 'retrieve_permissions',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ],
            [
                'name' 			=> 'create_permissions',
                'key' 			=> 'create_permissions',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ],
            [
                'name' 			=> 'update_permissions',
                'key' 			=> 'update_permissions',
                'guard_name' 	=> 'admin',
                'created_at' 	=> now(),
                'updated_at' 	=> now(),
            ],
            [
                'name' 			=> 'deleted_permissions',
                'key' 			=> 'deleted_permissions',
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
