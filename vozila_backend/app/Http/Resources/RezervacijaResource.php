<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RezervacijaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
        'id' => $this->id,
        'start_date' => $this->start_date,
        'end_date' => $this->end_date,
        'licence' => url('storage/' . $this->licence),
        'total_price' => $this->total_price,
        'auto' => new AutoResource($this->auto),
        'user' => new UserResource($this->user),
        ];
    }
}
