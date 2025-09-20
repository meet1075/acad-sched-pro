import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, User, Clock } from "lucide-react";

interface FacultyFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const FacultyForm = ({ data, onUpdate }: FacultyFormProps) => {
  const [formData, setFormData] = useState({
    faculty: data?.faculty || [
      {
        id: 'F001',
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@university.edu',
        subjects: ['CS101', 'CS102'],
        maxHoursPerWeek: 20,
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        unavailableSlots: []
      },
      {
        id: 'F002',
        name: 'Prof. Michael Chen',
        email: 'michael.chen@university.edu',
        subjects: ['CS103'],
        maxHoursPerWeek: 18,
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        unavailableSlots: []
      }
    ],
    ...data
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const addFaculty = () => {
    const newFaculty = {
      id: `F${String(formData.faculty.length + 1).padStart(3, '0')}`,
      name: '',
      email: '',
      subjects: [],
      maxHoursPerWeek: 18,
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      unavailableSlots: []
    };
    setFormData(prev => ({
      ...prev,
      faculty: [...prev.faculty, newFaculty]
    }));
  };

  const removeFaculty = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faculty: prev.faculty.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateFaculty = (index: number, field: string, value: any) => {
    const newFaculty = [...formData.faculty];
    newFaculty[index] = { ...newFaculty[index], [field]: value };
    setFormData(prev => ({ ...prev, faculty: newFaculty }));
  };

  const toggleSubject = (facultyIndex: number, subjectId: string) => {
    const faculty = formData.faculty[facultyIndex];
    const newSubjects = faculty.subjects.includes(subjectId)
      ? faculty.subjects.filter((id: string) => id !== subjectId)
      : [...faculty.subjects, subjectId];
    updateFaculty(facultyIndex, 'subjects', newSubjects);
  };

  const toggleAvailableDay = (facultyIndex: number, day: string) => {
    const faculty = formData.faculty[facultyIndex];
    const newDays = faculty.availableDays.includes(day)
      ? faculty.availableDays.filter((d: string) => d !== day)
      : [...faculty.availableDays, day];
    updateFaculty(facultyIndex, 'availableDays', newDays);
  };

  const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const availableSubjects = data?.subjects || [];

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-gradient-to-br from-academic-light/20 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-academic" />
              <span>Faculty Configuration</span>
            </div>
            <Button onClick={addFaculty} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Faculty
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {formData.faculty.map((faculty: any, index: number) => (
              <Card key={faculty.id} className="p-6 bg-background/50 border-l-4 border-primary">
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Faculty ID</Label>
                      <Input
                        value={faculty.id}
                        onChange={(e) => updateFaculty(index, 'id', e.target.value)}
                        className="text-sm"
                        disabled
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Full Name</Label>
                      <Input
                        placeholder="Dr. John Doe"
                        value={faculty.name}
                        onChange={(e) => updateFaculty(index, 'name', e.target.value)}
                        className="text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Email Address</Label>
                      <Input
                        type="email"
                        placeholder="john.doe@university.edu"
                        value={faculty.email}
                        onChange={(e) => updateFaculty(index, 'email', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </div>

                  {/* Teaching Constraints */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <Label className="text-sm font-semibold">Max Hours Per Week</Label>
                      </div>
                      <Input
                        type="number"
                        min="1"
                        max="40"
                        value={faculty.maxHoursPerWeek}
                        onChange={(e) => updateFaculty(index, 'maxHoursPerWeek', parseInt(e.target.value) || 18)}
                        className="text-sm"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={() => removeFaculty(index)}
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove Faculty
                      </Button>
                    </div>
                  </div>

                  {/* Subject Assignment */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Teaching Subjects</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {availableSubjects.map((subject: any) => (
                        <div key={subject.id} className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg">
                          <Checkbox
                            id={`${faculty.id}-${subject.id}`}
                            checked={faculty.subjects.includes(subject.id)}
                            onCheckedChange={() => toggleSubject(index, subject.id)}
                          />
                          <Label htmlFor={`${faculty.id}-${subject.id}`} className="text-xs flex-1">
                            <div>{subject.code}</div>
                            <div className="text-muted-foreground">{subject.name}</div>
                          </Label>
                          <Badge variant="outline" className="text-xs">
                            {subject.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    {availableSubjects.length === 0 && (
                      <p className="text-sm text-muted-foreground italic">
                        No subjects configured yet. Please add subjects in the previous step.
                      </p>
                    )}
                  </div>

                  {/* Available Days */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Available Days</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {allDays.map(day => (
                        <div key={day} className="flex items-center space-x-2 p-2 bg-muted/20 rounded-lg">
                          <Checkbox
                            id={`${faculty.id}-${day}`}
                            checked={faculty.availableDays.includes(day)}
                            onCheckedChange={() => toggleAvailableDay(index, day)}
                          />
                          <Label htmlFor={`${faculty.id}-${day}`} className="text-sm">{day}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subject Summary */}
                  {faculty.subjects.length > 0 && (
                    <div className="pt-3 border-t border-border/50">
                      <Label className="text-xs font-semibold mb-2 block">Assigned Subjects</Label>
                      <div className="flex flex-wrap gap-2">
                        {faculty.subjects.map((subjectId: string) => {
                          const subject = availableSubjects.find((s: any) => s.id === subjectId);
                          return subject ? (
                            <Badge key={subjectId} variant="secondary" className="text-xs">
                              {subject.code} • {subject.hoursPerWeek}h/week
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}

            {formData.faculty.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No faculty members added yet. Click "Add Faculty" to get started.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};