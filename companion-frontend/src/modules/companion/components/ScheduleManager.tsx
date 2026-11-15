'use client';
import { useState } from 'react';
import { AvailableSlot } from '../types/companion.types';

interface Props {
  slots: AvailableSlot[];
  onSave: (slots: AvailableSlot[]) => void;
}

const DAYS = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

export default function ScheduleManager({ slots, onSave }: Props) {
  const [localSlots, setLocalSlots] = useState<AvailableSlot[]>(slots);

  const toggleDay = (dayIndex: number) => {
    const exists = localSlots.find(s => s.dayOfWeek === dayIndex);
    if (exists) {
      setLocalSlots(localSlots.filter(s => s.dayOfWeek !== dayIndex));
    } else {
      setLocalSlots([...localSlots, { dayOfWeek: dayIndex, startTime: '08:00', endTime: '22:00' }]);
    }
  };

  const updateSlot = (dayIndex: number, field: 'startTime' | 'endTime', value: string) => {
    setLocalSlots(localSlots.map(s =>
      s.dayOfWeek === dayIndex ? { ...s, [field]: value } : s
    ));
  };

  return (
    <div className="bg-[#1c1c24] border border-[#2d2d3a] rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-6">🗓️ Thiết lập khung giờ rảnh</h3>

      <div className="space-y-3">
        {DAYS.map((day, index) => {
          const slot = localSlots.find(s => s.dayOfWeek === index);
          const isActive = !!slot;

          return (
            <div key={index} className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${isActive ? 'border-red-500/30 bg-red-500/5' : 'border-[#333342] bg-[#111116]'}`}>
              <label className="flex items-center gap-3 cursor-pointer min-w-[120px]">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => toggleDay(index)}
                  className="w-4 h-4 accent-red-500"
                />
                <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-500'}`}>{day}</span>
              </label>

              {isActive && slot && (
                <div className="flex items-center gap-3 text-sm">
                  <input
                    type="time"
                    value={slot.startTime}
                    onChange={e => updateSlot(index, 'startTime', e.target.value)}
                    className="bg-[#252530] text-gray-200 border border-[#333342] p-2 rounded-lg outline-none focus:border-red-500"
                  />
                  <span className="text-gray-500">đến</span>
                  <input
                    type="time"
                    value={slot.endTime}
                    onChange={e => updateSlot(index, 'endTime', e.target.value)}
                    className="bg-[#252530] text-gray-200 border border-[#333342] p-2 rounded-lg outline-none focus:border-red-500"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => onSave(localSlots)}
        className="mt-6 w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]"
      >
        Lưu lịch rảnh
      </button>
    </div>
  );
}
