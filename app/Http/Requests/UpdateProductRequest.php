<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'sku' => 'required|string|max:255|unique:products,sku,' . $this->route('product')->id,
            'category_id' => 'required|exists:categories,id',
            'buy_price' => 'required|numeric|min:0',
            'sell_price' => 'required|numeric|min:0',
            'fixed_price' => 'nullable|numeric|min:0',
            'current_stock' => 'required|integer|min:0',
            'minimum_stock' => 'required|integer|min:0',
            'unit_of_measure' => 'required|string|max:50',
            'description' => 'nullable|string',
            'image_path' => 'nullable|string',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Product name is required.',
            'sku.required' => 'Product SKU is required.',
            'sku.unique' => 'This SKU already exists.',
            'category_id.required' => 'Please select a category.',
            'category_id.exists' => 'Selected category does not exist.',
            'buy_price.required' => 'Buy price is required.',
            'buy_price.numeric' => 'Buy price must be a valid number.',
            'sell_price.required' => 'Sell price is required.',
            'sell_price.numeric' => 'Sell price must be a valid number.',
            'current_stock.required' => 'Current stock is required.',
            'minimum_stock.required' => 'Minimum stock level is required.',
            'unit_of_measure.required' => 'Unit of measure is required.',
        ];
    }
}