import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface SemesterFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const SemesterForm = ({ data, onUpdate }: SemesterFormProps) => {
  const [formData, setFormData] = useState({
    semesterName: data?.semesterName || '',
    startDate: data?.startDate || '',
    endDate: data?.endDate || '',
    academicYear: data?.academicYear || new Date().getFullYear().toString(),
    ...data
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-gradient-to-br from-academic-light/20 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="h-5 w-5 text-academic" />
            <h3 className="font-semibold">Semester Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="semesterName">Semester Name</Label>
              <Input
                id="semesterName"
                placeholder="e.g., Fall 2024, Spring 2025"
                value={formData.semesterName}
                onChange={(e) => handleChange('semesterName', e.target.value)}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="academicYear">Academic Year</Label>
              <Input
                id="academicYear"
                placeholder="e.g., 2024-2025"
                value={formData.academicYear}
                onChange={(e) => handleChange('academicYear', e.target.value)}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Semester Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Semester End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                className="bg-background/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};