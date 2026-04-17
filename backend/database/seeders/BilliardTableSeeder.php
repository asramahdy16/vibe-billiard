<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BilliardTable;
use App\Enums\TableStatus;

class BilliardTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tables = [
            ['nama_meja' => 'Meja VIP 1', 'deskripsi' => 'Meja VIP super nyaman', 'status' => TableStatus::AVAILABLE],
            ['nama_meja' => 'Meja VIP 2', 'deskripsi' => 'Meja VIP eksklusif', 'status' => TableStatus::AVAILABLE],
            ['nama_meja' => 'Meja Standar 1', 'deskripsi' => 'Meja standar', 'status' => TableStatus::AVAILABLE],
            ['nama_meja' => 'Meja Standar 2', 'deskripsi' => 'Meja standar', 'status' => TableStatus::AVAILABLE],
            ['nama_meja' => 'Meja Standar 3', 'deskripsi' => 'Meja standar', 'status' => TableStatus::AVAILABLE],
        ];

        foreach ($tables as $table) {
            BilliardTable::create($table);
        }
    }
}
