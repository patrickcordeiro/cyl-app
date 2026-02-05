'use client';

import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface InputMonthYearParams {
  actualMonth: string;
  actualYear: number;
  setMonth: (value: string) => void;
  setYear: (value: number) => void;
}

export default function InputMonthYear({
  actualMonth,
  actualYear,
  setMonth,
  setYear,
}: InputMonthYearParams) {
  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-3">
        <Label htmlFor="month">Mês</Label>

        <Select value={actualMonth} onValueChange={setMonth}>
          <SelectTrigger id="month" aria-label="Mês" className="w-full bg-white">
            <SelectValue placeholder="Mês" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="janeiro">Janeiro</SelectItem>
            <SelectItem value="fevereiro">Fevereiro</SelectItem>
            <SelectItem value="março">Março</SelectItem>
            <SelectItem value="abril">Abril</SelectItem>
            <SelectItem value="maio">Maio</SelectItem>
            <SelectItem value="junho">Junho</SelectItem>
            <SelectItem value="julho">Julho</SelectItem>
            <SelectItem value="agosto">Agosto</SelectItem>
            <SelectItem value="setembro">Setembro</SelectItem>
            <SelectItem value="outubro">Outubro</SelectItem>
            <SelectItem value="novembro">Novembro</SelectItem>
            <SelectItem value="dezembro">Dezembro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3">
        <Label htmlFor="year">Ano</Label>

        <Select value={String(actualYear)} onValueChange={(v) => setYear(Number(v))}>
          <SelectTrigger id="year" aria-label="Ano" className="w-full">
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => {
              const y = new Date().getFullYear() + i;
              return (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
