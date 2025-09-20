import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, BookOpen } from "lucide-react";

interface SubjectsFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const SubjectsForm = ({ data, onUpdate }: SubjectsFormProps) => {
  const [formData, setFormData] = useState({
    subjects: data?.subjects || [
      {
        id: 'CS101',
        name: 'Data Structures',
        code: 'CS101',
        hoursPerWeek: 4,
        type: 'Theory',
        semester: 3,
        credits: 4
      },
      {
        id: 'CS102',
        name: 'Database Systems',
        code: 'CS102',
        hoursPerWeek: 3,
        type: 'Theory',
        semester: 3,
        credits: 3
      },
      {
        id: 'CS103',
        name: 'Programming Lab',
        code: 'CS103',
        hoursPerWeek: 2,
        type: 'Lab',
        semester: 3,
        credits: 2
      }
    ],
    ...data
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const addSubject = () => {
    const newSubject = {
      id: `SUB${Date.now()}`,
      name: '',
      code: '',
      hoursPerWeek: 3,
      type: 'Theory',
      semester: 1,
      credits: 3
    };
    setFormData(prev => ({
      ...prev,
      subjects: [...prev.subjects, newSubject]
    }));
  };

  const removeSubject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateSubject = (index: number, field: string, value: string | number) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setFormData(prev => ({ ...prev, subjects: newSubjects }));
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-gradient-to-br from-academic-light/20 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-academic" />
              <span>Subjects Configuration</span>
            </div>
            <Button onClick={addSubject} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Subject
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formData.subjects.map((subject: any, index: number) => (
              <Card key={subject.id} className="p-4 bg-background/50 border-l-4 border-primary">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                  <div className="space-y-2">
                    <Label className="text-xs">Subject Code</Label>
                    <Input
                      placeholder="CS101"
                      value={subject.code}
                      onChange={(e) => updateSubject(index, 'code', e.target.value)}
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-xs">Subject Name</Label>
                    <Input
                      placeholder="Data Structures"
                      value={subject.name}
                      onChange={(e) => updateSubject(index, 'name', e.target.value)}
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Hours/Week</Label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={subject.hoursPerWeek}
                      onChange={(e) => updateSubject(index, 'hoursPerWeek', parseInt(e.target.value) || 1)}
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Type</Label>
                    <Select
                      value={subject.type}
                      onValueChange={(value) => updateSubject(index, 'type', value)}
                    >
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Theory">Theory</SelectItem>
                        <SelectItem value="Lab">Lab</SelectItem>
                        <SelectItem value="Practical">Practical</SelectItem>
                        <SelectItem value="Elective">Elective</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end space-x-2">
                    <div className="space-y-2 flex-1">
                      <Label className="text-xs">Credits</Label>
                      <Input
                        type="number"
                        min="1"
                        max="6"
                        value={subject.credits}
                        onChange={(e) => updateSubject(index, 'credits', parseInt(e.target.value) || 1)}
                        className="text-sm"
                      />
                    </div>
                    <Button
                      onClick={() => removeSubject(index)}
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Semester</Label>
                      <Select
                        value={subject.semester.toString()}
                        onValueChange={(value) => updateSubject(index, 'semester', parseInt(value))}
                      >
                        <SelectTrigger className="text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                            <SelectItem key={sem} value={sem.toString()}>
                              Semester {sem}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Subject ID</Label>
                      <Input
                        placeholder="Unique ID"
                        value={subject.id}
                        onChange={(e) => updateSubject(index, 'id', e.target.value)}
                        className="text-sm"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {formData.subjects.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No subjects added yet. Click "Add Subject" to get started.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};