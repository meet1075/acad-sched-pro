import { useState } from "react";
import { TimetableForm } from "@/components/TimetableForm";
import { TimetableDisplay } from "@/components/TimetableDisplay";
import { TimetableHeader } from "@/components/TimetableHeader";
import { Card } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedTimetable, setGeneratedTimetable] = useState(null);

  const handleTimetableGenerated = (timetable: any) => {
    setGeneratedTimetable(timetable);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-academic-light/20">
      <TimetableHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-primary to-academic rounded-2xl shadow-lg">
              <CalendarDays className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-academic bg-clip-text text-transparent mb-2">
            Academic Timetable Generator
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Create perfect class schedules with intelligent conflict resolution and resource optimization
          </p>
        </div>

        {/* Main Content */}
        {!generatedTimetable ? (
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-card to-muted/20 border-0 shadow-xl">
            <TimetableForm 
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              onTimetableGenerated={handleTimetableGenerated}
            />
          </Card>
        ) : (
          <TimetableDisplay 
            timetable={generatedTimetable}
            onBack={() => {
              setGeneratedTimetable(null);
              setCurrentStep(0);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default Index;