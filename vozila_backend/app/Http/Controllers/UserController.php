<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // Provera da li je korisnik ulogovan i da li je admin
        if (!auth()->check() || !auth()->user()->is_admin) {
            return response()->json(['poruka' => 'Nemate ovlašćenja za ovu akciju.'], 403);
        }

        // Dohvatanje svih korisnika
        $users = User::all();

        // Vraćanje korisnika kao resursa
        return response()->json([
            'poruka' => 'Lista svih korisnika uspešno dobijena.',
            'korisnici' => UserResource::collection($users),
        ]);
    }

    public function show($id)
    {
        // Provera da li je korisnik ulogovan i da li je admin
        if (!auth()->check() || !auth()->user()->is_admin) {
            return response()->json(['poruka' => 'Nemate ovlašćenja za ovu akciju.'], 403);
        }

        // Provera da li korisnik postoji
        $user = User::find($id);

        if (!$user) {
            return response()->json(['poruka' => 'Korisnik sa datim ID-jem ne postoji.'], 404);
        }

        // Vraćanje korisnika kao resursa
        return response()->json([
            'poruka' => 'Korisnik uspešno dobijen.',
            'korisnik' => new UserResource($user),
        ]);
    }

    public function destroy($id)
    {
        // Provera da li je korisnik ulogovan i da li je admin
        if (!auth()->check() || !auth()->user()->is_admin) {
            return response()->json(['poruka' => 'Nemate ovlašćenja za ovu akciju.'], 403);
        }

        // Provera da li korisnik postoji
        $user = User::find($id);

        if (!$user) {
            return response()->json(['poruka' => 'Korisnik sa datim ID-jem ne postoji.'], 404);
        }

        // Brisanje korisnika
        $user->delete();

        return response()->json(['poruka' => 'Korisnik uspešno obrisan.']);
    }

}
