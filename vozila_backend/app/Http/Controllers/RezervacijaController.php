<?php
namespace App\Http\Controllers;

use App\Http\Resources\RezervacijaResource;
use Illuminate\Support\Facades\DB;
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

        $path = $request->file('licence')->store('licences', 'public');
        $fileName = $path;

        $rezervacija = Rezervacija::create([
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'licence' => $fileName,
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

    public function statistics(Request $request)
    {
        $user = auth()->user();
        if (! $user->is_admin) {
            return response()->json([
                'poruka' => 'Nemate dozvolu za ovu rutu.'
            ], 403);
        }

        // Ukupan broj rezervacija
        $totalReservations = Rezervacija::count();

        // Ukupan prihod
        $totalRevenue = Rezervacija::sum('total_price');

        // Prosečna dužina rezervacije (u danima)
        $averageLength = Rezervacija::selectRaw('AVG(DATEDIFF(end_date, start_date) + 1) as avg_days')
            ->value('avg_days');
        $averageLength = round($averageLength, 2);

        // Rezervacije i prihodi po automobilu
        $byCar = Rezervacija::select('auto_id',
                        DB::raw('COUNT(*) as count'),
                        DB::raw('SUM(total_price) as revenue'))
                    ->groupBy('auto_id')
                    ->get()
                    ->map(function($r) {
                        $auto = Auto::find($r->auto_id);
                        return [
                            'auto_id'    => $r->auto_id,
                            'auto_name'  => $auto ? $auto->name : 'Nepoznato',
                            'count'      => (int)$r->count,
                            'revenue'    => round($r->revenue, 2),
                        ];
                    });

        // Najpopularniji auto (po broju rezervacija)
        $mostPopular = $byCar->sortByDesc('count')->first();

        return response()->json([
            'total_reservations' => $totalReservations,
            'total_revenue'      => round($totalRevenue, 2),
            'average_length_days'=> $averageLength,
            'per_car'            => $byCar,
            'most_popular'       => $mostPopular,
        ]);
    }
}
