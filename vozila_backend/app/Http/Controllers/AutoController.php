<?php

namespace App\Http\Controllers;

use App\Http\Resources\AutoResource;
use App\Models\Auto;
use Illuminate\Http\Request;

class AutoController extends Controller
{
    public function index()
    {
        $auta = Auto::with('kategorija')->get(); 
        return AutoResource::collection($auta);
    }

    public function show($id)
    {
        $auto = Auto::with('kategorija')->find($id);

        if (!$auto) {
            return response()->json(['poruka' => 'Automobil nije pronađen.'], 404);
        }

        return new AutoResource($auto);
    }

    public function store(Request $request)
    {
        if (!auth()->check() || !auth()->user()->is_admin) {
            return response()->json(['poruka' => 'Nemate ovlašćenja za ovu akciju.'], 403);
        }

        // Validacija ulaznih podataka
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price_per_day' => 'required|integer|min:0',
            'kategorija_id' => 'required|exists:kategorije,id', // Provera da li kategorija postoji
        ]);

        // Kreiranje automobila
        $auto = Auto::create($validated);

        return new AutoResource($auto);
    }


    public function update(Request $request, $id)
    {
        // Provera da li je korisnik admin
        if (!auth()->check() || !auth()->user()->is_admin) {
            return response()->json(['poruka' => 'Nemate ovlašćenja za ovu akciju.'], 403);
        }

        $auto = Auto::find($id);

        if (!$auto) {
            return response()->json(['poruka' => 'Automobil nije pronađen.'], 404);
        }

        $validated = $request->validate([
            'price_per_day' => 'required|integer|min:0',
        ]);

        // Ažuriranje cene
        $auto->update(['price_per_day' => $validated['price_per_day']]);

        return new AutoResource($auto);
    }
}
