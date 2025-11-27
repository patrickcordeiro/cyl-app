'use client';

import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export default function InputMonthYear() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="month">Mês</Label>

        <Select>
          <SelectTrigger id="month" aria-label="Mês" className="w-full">
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
      <div className="flex flex-col gap-3">
        <Label htmlFor="year">Ano</Label>
        <Select>
          <SelectTrigger id="year" aria-label="Ano" className="w-full">
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => (
              <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                {new Date().getFullYear() + i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
