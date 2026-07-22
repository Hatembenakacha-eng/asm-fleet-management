<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\EmployeeResource;
use App\Models\Employee;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Employee::query();

        if ($request->has('disponible')) {
            $query->where('disponible', $request->input('disponible'));
        }

        if ($request->has('specialite')) {
            $query->where('specialite', $request->input('specialite'));
        }

        $employees = $query->get();

        return EmployeeResource::collection($employees);


    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|string',
            'specialite' => 'required|string',
            'contact' => 'required|string',
            'disponible' => 'required|boolean',
        ]);

        $employee = Employee::create($validatedData);

        return (new EmployeeResource($employee))->response()->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        return (new EmployeeResource($employee));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $employee = Employee::findOrFail($id);

        $validatedData = $request->validate([
            'nom' => 'sometimes|required|string',
            'specialite' => 'sometimes|required|string',
            'contact' => 'sometimes|required|string',
            'disponible' => 'sometimes|required|boolean',
        ]);

        $employee->update($validatedData);

        return (new EmployeeResource($employee));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return response()->json(['message' => 'Employee supprimé avec succès']);
    }

}
