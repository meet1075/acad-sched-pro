import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Calendar, Users, BookOpen, MapPin, Clock } from "lucide-react";
import { SemesterForm } from "./forms/SemesterForm";
import { ScheduleForm } from "./forms/ScheduleForm";
import { ResourcesForm } from "./forms/ResourcesForm";
import { SubjectsForm } from "./forms/SubjectsForm";
import { FacultyForm } from "./forms/FacultyForm";
import { generateTimetable } from "@/lib/timetableGenerator";
import { useToast } from "@/hooks/use-toast";

interface TimetableFormProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onTimetableGenerated: (timetable: any) => void;
}

const FORM_STEPS = [
  { title: "Semester Details", icon: Calendar, component: SemesterForm },
  { title: "Schedule Settings", icon: Clock, component: ScheduleForm },
  { title: "Resources", icon: MapPin, component: ResourcesForm },
  { title: "Subjects", icon: BookOpen, component: SubjectsForm },
  { title: "Faculty", icon: Users, component: FacultyForm }
];

export const TimetableForm = ({ currentStep, setCurrentStep, onTimetableGenerated }: TimetableFormProps) => {
  const [formData, setFormData] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('timetable-form-data');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('timetable-form-data', JSON.stringify(formData));
  }, [formData]);

  const updateFormData = useCallback((stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  }, []);

  const handleNext = () => {
    if (currentStep < FORM_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerateTimetable = async () => {
    setIsGenerating(true);
    try {
      const timetable = await generateTimetable(formData);
      onTimetableGenerated(timetable);
      toast({
        title: "Timetable Generated!",
        description: "Your academic timetable has been successfully created.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please check your input data and try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const CurrentFormComponent = FORM_STEPS[currentStep].component;
  const currentStepData = FORM_STEPS[currentStep];

  const progress = ((currentStep + 1) / FORM_STEPS.length) * 100;

  return (
    <div className="p-6">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-academic/10 rounded-lg">
              <currentStepData.icon className="h-5 w-5 text-academic" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{currentStepData.title}</h3>
              <p className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {FORM_STEPS.length}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-primary">{Math.round(progress)}% Complete</div>
          </div>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        {/* Step Indicators */}
        <div className="flex justify-between mt-4 px-2">
          {FORM_STEPS.map((step, index) => (
            <div 
              key={index}
              className={`flex flex-col items-center space-y-1 ${
                index <= currentStep ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div className={`p-2 rounded-full ${
                index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                <step.icon className="h-3 w-3" />
              </div>
              <span className="text-xs font-medium hidden sm:block">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Form */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-muted/10">
        <CardHeader>
          <CardTitle className="text-xl">Configure {currentStepData.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CurrentFormComponent 
            data={formData} 
            onUpdate={updateFormData}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>

        {currentStep === FORM_STEPS.length - 1 ? (
          <Button 
            onClick={handleGenerateTimetable}
            disabled={isGenerating}
            className="flex items-center space-x-2 bg-gradient-to-r from-primary to-academic hover:from-primary-hover hover:to-academic"
          >
            <Calendar className="h-4 w-4" />
            <span>{isGenerating ? 'Generating...' : 'Generate Timetable'}</span>
          </Button>
        ) : (
          <Button 
            onClick={handleNext}
            className="flex items-center space-x-2"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};