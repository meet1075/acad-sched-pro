import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, MapPin, Users } from "lucide-react";

interface ResourcesFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const ResourcesForm = ({ data, onUpdate }: ResourcesFormProps) => {
  const [formData, setFormData] = useState({
    classrooms: data?.classrooms || [
      { id: 'R101', name: 'Room 101', capacity: 60, type: 'Lecture Hall' },
      { id: 'R102', name: 'Room 102', capacity: 40, type: 'Classroom' }
    ],
    laboratories: data?.laboratories || [
      { id: 'L201', name: 'Computer Lab 1', capacity: 30, type: 'Computer Lab' },
      { id: 'L202', name: 'Physics Lab', capacity: 25, type: 'Science Lab' }
    ],
    classes: data?.classes || [
      { id: 'CS1A', name: 'Computer Science 1st Year A', strength: 45, batch: 'CS-1A' },
      { id: 'CS1B', name: 'Computer Science 1st Year B', strength: 40, batch: 'CS-1B' }
    ],
    ...data
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const addClassroom = () => {
    const newRoom = {
      id: `R${Date.now()}`,
      name: `Room ${formData.classrooms.length + 1}`,
      capacity: 40,
      type: 'Classroom'
    };
    setFormData(prev => ({
      ...prev,
      classrooms: [...prev.classrooms, newRoom]
    }));
  };

  const removeClassroom = (index: number) => {
    setFormData(prev => ({
      ...prev,
      classrooms: prev.classrooms.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateClassroom = (index: number, field: string, value: string | number) => {
    const newClassrooms = [...formData.classrooms];
    newClassrooms[index] = { ...newClassrooms[index], [field]: value };
    setFormData(prev => ({ ...prev, classrooms: newClassrooms }));
  };

  const addLaboratory = () => {
    const newLab = {
      id: `L${Date.now()}`,
      name: `Lab ${formData.laboratories.length + 1}`,
      capacity: 30,
      type: 'Computer Lab'
    };
    setFormData(prev => ({
      ...prev,
      laboratories: [...prev.laboratories, newLab]
    }));
  };

  const removeLaboratory = (index: number) => {
    setFormData(prev => ({
      ...prev,
      laboratories: prev.laboratories.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateLaboratory = (index: number, field: string, value: string | number) => {
    const newLaboratories = [...formData.laboratories];
    newLaboratories[index] = { ...newLaboratories[index], [field]: value };
    setFormData(prev => ({ ...prev, laboratories: newLaboratories }));
  };

  const addClass = () => {
    const newClass = {
      id: `C${Date.now()}`,
      name: `Class ${formData.classes.length + 1}`,
      strength: 40,
      batch: `Batch-${formData.classes.length + 1}`
    };
    setFormData(prev => ({
      ...prev,
      classes: [...prev.classes, newClass]
    }));
  };

  const removeClass = (index: number) => {
    setFormData(prev => ({
      ...prev,
      classes: prev.classes.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateClass = (index: number, field: string, value: string | number) => {
    const newClasses = [...formData.classes];
    newClasses[index] = { ...newClasses[index], [field]: value };
    setFormData(prev => ({ ...prev, classes: newClasses }));
  };

  return (
    <div className="space-y-6">
      {/* Classrooms */}
      <Card className="border-0 bg-gradient-to-br from-academic-light/20 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-academic" />
              <span>Classrooms</span>
            </div>
            <Button onClick={addClassroom} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Room
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {formData.classrooms.map((room: any, index: number) => (
              <div key={room.id} className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg">
                <Input
                  placeholder="Room ID"
                  value={room.id}
                  onChange={(e) => updateClassroom(index, 'id', e.target.value)}
                  className="w-24"
                />
                <Input
                  placeholder="Room Name"
                  value={room.name}
                  onChange={(e) => updateClassroom(index, 'name', e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Capacity"
                  value={room.capacity}
                  onChange={(e) => updateClassroom(index, 'capacity', parseInt(e.target.value) || 0)}
                  className="w-24"
                />
                <Input
                  placeholder="Type"
                  value={room.type}
                  onChange={(e) => updateClassroom(index, 'type', e.target.value)}
                  className="w-32"
                />
                <Button
                  onClick={() => removeClassroom(index)}
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

      {/* Laboratories */}
      <Card className="border-0 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Laboratories</span>
            <Button onClick={addLaboratory} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Lab
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {formData.laboratories.map((lab: any, index: number) => (
              <div key={lab.id} className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg">
                <Input
                  placeholder="Lab ID"
                  value={lab.id}
                  onChange={(e) => updateLaboratory(index, 'id', e.target.value)}
                  className="w-24"
                />
                <Input
                  placeholder="Lab Name"
                  value={lab.name}
                  onChange={(e) => updateLaboratory(index, 'name', e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Capacity"
                  value={lab.capacity}
                  onChange={(e) => updateLaboratory(index, 'capacity', parseInt(e.target.value) || 0)}
                  className="w-24"
                />
                <Input
                  placeholder="Type"
                  value={lab.type}
                  onChange={(e) => updateLaboratory(index, 'type', e.target.value)}
                  className="w-32"
                />
                <Button
                  onClick={() => removeLaboratory(index)}
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

      {/* Classes/Batches */}
      <Card className="border-0 bg-gradient-to-br from-success/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-success" />
              <span>Classes & Batches</span>
            </div>
            <Button onClick={addClass} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Class
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {formData.classes.map((classItem: any, index: number) => (
              <div key={classItem.id} className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg">
                <Input
                  placeholder="Class ID"
                  value={classItem.id}
                  onChange={(e) => updateClass(index, 'id', e.target.value)}
                  className="w-24"
                />
                <Input
                  placeholder="Class Name"
                  value={classItem.name}
                  onChange={(e) => updateClass(index, 'name', e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Strength"
                  value={classItem.strength}
                  onChange={(e) => updateClass(index, 'strength', parseInt(e.target.value) || 0)}
                  className="w-24"
                />
                <Input
                  placeholder="Batch Code"
                  value={classItem.batch}
                  onChange={(e) => updateClass(index, 'batch', e.target.value)}
                  className="w-32"
                />
                <Button
                  onClick={() => removeClass(index)}
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
    </div>
  );
};