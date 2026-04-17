<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Package;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Package::create([
            'nama_paket' => 'Paket Reguler',
            'harga_per_jam' => 35000,
            'harga_flat' => null,
            'durasi_min_jam' => 1,
            'hari_berlaku' => 'everyday',
            'jam_mulai' => null,
            'jam_selesai' => null,
            'is_active' => true,
        ]);

        Package::create([
            'nama_paket' => 'Paket Hemat',
            'harga_per_jam' => null,
            'harga_flat' => 50000,
            'durasi_min_jam' => 2,
            'hari_berlaku' => 'mon-fri',
            'jam_mulai' => '08:00:00',
            'jam_selesai' => '17:00:00',
            'is_active' => true,
        ]);
    }
}
