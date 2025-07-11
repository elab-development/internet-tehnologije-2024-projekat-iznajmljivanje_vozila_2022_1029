<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kategorija; 
use App\Http\Resources\KategorijaResource;

class KategorijaController extends Controller
{
    /**
     * Prikazuje listu svih kategorija.
     */
    public function index(Request $request)
    {
        $kategorije = Kategorija::all();
        return KategorijaResource::collection($kategorije);
    }
}
