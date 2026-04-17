<?php

namespace App\Http\Requests\Table;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTableRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // admin check handled in middleware
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama_meja' => 'required|string|max:100',
            'deskripsi' => 'nullable|string',
            'gambar' => 'nullable|string|max:255',
            'status' => 'nullable|string|in:available,booked,in_use,inactive',
        ];
    }
}
