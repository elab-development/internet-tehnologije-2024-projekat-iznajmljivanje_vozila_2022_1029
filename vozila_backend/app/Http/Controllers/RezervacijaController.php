<?php
namespace App\Http\Controllers;

use App\Http\Resources\RezervacijaResource;
use App\Models\Auto;
use App\Models\Rezervacija;
use Illuminate\Http\Request;
use Carbon\Carbon;

class RezervacijaController extends Controller
{

    public function index()
    {
        $user = auth()->user();

        $rezervacije = Rezervacija::with('auto')
            ->where('user_id', $user->id)
            ->get();

        return RezervacijaResource::collection($rezervacije);
    }

    public function show($id)
    {
        $user = auth()->user();

        $rezervacija = Rezervacija::with('auto')
            ->where('user_id', $user->id)
            ->findOrFail($id);

        return new RezervacijaResource($rezervacija);
    }

    public function store(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
            'auto_id' => 'required|exists:auta,id',
        ]);

        $auto = Auto::findOrFail($validated['auto_id']);
        $totalDays = Carbon::parse($validated['start_date'])
        ->diffInDays(Carbon::parse($validated['end_date'])) + 1;

            $path = $request->file('licence')->store('public/licences');
            $fileName = basename($path);

        $rezervacija = Rezervacija::create([
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'licence' => "licences/{$fileName}",
            'total_price' => $auto->price_per_day * $totalDays,
            'user_id' => $user->id,
            'auto_id' => $validated['auto_id'],
        ]);

        return response()->json([
            'poruka' => 'Rezervacija uspešno kreirana!',
            'rezervacija' => new RezervacijaResource($rezervacija),
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = auth()->user();

        $rezervacija = Rezervacija::where('user_id', $user->id)->findOrFail($id);

        try {
            $validated = $request->validate([
                'start_date' => 'required|date|after:today',
                'end_date' => 'required|date|after:start_date',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        $rezervacija->update([
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'total_price' => $rezervacija->auto->price_per_day *
                ((new \DateTime($validated['start_date']))
                    ->diff(new \DateTime($validated['end_date']))->days + 1),
        ]);

        return response()->json([
            'poruka' => 'Rezervacija uspešno ažurirana!',
            'rezervacija' => new RezervacijaResource($rezervacija),
        ]);
    }

    public function destroy($id)
    {
        $user = auth()->user();
        if ($user->is_admin) {
            return response()->json([
                'poruka' => 'Nemate dozvolu da obrišete rezervaciju.'
            ], 403);
        }

        $rezervacija = Rezervacija::where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$rezervacija) {
            return response()->json([
                'poruka' => 'Rezervacija nije pronađena ili nemate dozvolu da je obrišete.'
            ], 404);
        }
        $rezervacija->delete();

        return response()->json([
            'poruka' => 'Rezervacija je uspešno obrisana.'
        ], 200);
    }








}
