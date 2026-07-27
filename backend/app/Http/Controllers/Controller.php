<?php

namespace App\Http\Controllers;

abstract class Controller
{
    protected function normalizeValidated(array $data, array $fields): array
    {
        foreach ($fields as $field) {
            if (array_key_exists($field, $data) && is_string($data[$field])) {
                $data[$field] = remove_accents($data[$field]);
            }
        }

        return $data;
    }
}
