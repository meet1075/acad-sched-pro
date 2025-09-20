import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Plus, Trash2 } from "lucide-react";

interface ScheduleFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

const DEFAULT_WORKING_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const DEFAULT_TIME_SLOTS = [
  { start: '09:00', end: '10:00' },
  { start: '10:00', end: '11:00' },
  { start: '11:15', end: '12:15' },
  { start: '12:15', end: '13:15' },
  { start: '14:00', end: '15:00' },
  { start: '15:00', end: '16:00' },
  { start: '16:15', end: '17:15' }
];

export const ScheduleForm = ({ data, onUpdate }: ScheduleFormProps) => {
  const [formData, setFormData] = useState({
    workingDays: data?.workingDays || DEFAULT_WORKING_DAYS,
    timeSlots: data?.timeSlots || DEFAULT_TIME_SLOTS,
    maxClassesPerDay: data?.maxClassesPerDay || 6,
    lunchBreakStart: data?.lunchBreakStart || '13:15',
    lunchBreakEnd: data?.lunchBreakEnd || '14:00',
    ...data
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleWorkingDayChange = (day: string, checked: boolean) => {
    const newWorkingDays = checked 
      ? [...formData.workingDays, day]
      : formData.workingDays.filter((d: string) => d !== day);
    setFormData(prev => ({ ...prev, workingDays: newWorkingDays }));
  };

  const addTimeSlot = () => {
    const newSlot = { start: '09:00', end: '10:00' };
    setFormData(prev => ({ 
      ...prev, 
      timeSlots: [...prev.timeSlots, newSlot] 
    }));
  };

  const removeTimeSlot = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      timeSlots: prev.timeSlots.filter((_: any, i: number) => i !== index) 
    }));
  };

  const updateTimeSlot = (index: number, field: string, value: string) => {
    const newTimeSlots = [...formData.timeSlots];
    newTimeSlots[index] = { ...newTimeSlots[index], [field]: value };
    setFormData(prev => ({ ...prev, timeSlots: newTimeSlots }));
  };

  const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-6">
      {/* Working Days */}
      <Card className="border-0 bg-gradient-to-br from-academic-light/20 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-academic" />
            <span>Working Days</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allDays.map(day => (
              <div key={day} className="flex items-center space-x-2">
                <Checkbox
                  id={day}
                  checked={formData.workingDays.includes(day)}
                  onCheckedChange={(checked) => handleWorkingDayChange(day, checked as boolean)}
                />
                <Label htmlFor={day} className="text-sm">{day}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time Slots */}
      <Card className="border-0 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Time Slots</span>
            <Button onClick={addTimeSlot} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Slot
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {formData.timeSlots.map((slot: any, index: number) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg">
                <span className="text-sm font-medium w-16">Slot {index + 1}</span>
                <Input
                  type="time"
                  value={slot.start}
                  onChange={(e) => updateTimeSlot(index, 'start', e.target.value)}
                  className="w-32"
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="time"
                  value={slot.end}
                  onChange={(e) => updateTimeSlot(index, 'end', e.target.value)}
                  className="w-32"
                />
                <Button
                  onClick={() => removeTimeSlot(index)}
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Settings */}
      <Card className="border-0 bg-gradient-to-br from-success/5 to-transparent">
        <CardHeader>
          <CardTitle>Additional Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="maxClasses">Max Classes Per Day</Label>
              <Input
                id="maxClasses"
                type="number"
                value={formData.maxClassesPerDay}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  maxClassesPerDay: parseInt(e.target.value) || 6 
                }))}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lunchStart">Lunch Break Start</Label>
              <Input
                id="lunchStart"
                type="time"
                value={formData.lunchBreakStart}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  lunchBreakStart: e.target.value 
                }))}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lunchEnd">Lunch Break End</Label>
              <Input
                id="lunchEnd"
                type="time"
                value={formData.lunchBreakEnd}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  lunchBreakEnd: e.target.value 
                }))}
                className="bg-background/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};