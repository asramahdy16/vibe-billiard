<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Enums\UserRole;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin Billiard',
            'email' => 'admin@vibebilliard.com',
            'password' => Hash::make('Admin1234!'),
            'role' => UserRole::ADMIN,
            'phone' => '081234567890',
        ]);
    }
}
