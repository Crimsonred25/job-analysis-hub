
-- Trainings table
CREATE TABLE public.trainings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  duration TEXT NOT NULL DEFAULT '',
  level TEXT NOT NULL DEFAULT '',
  competencies TEXT DEFAULT '',
  target TEXT DEFAULT '',
  cost TEXT DEFAULT '',
  mode TEXT DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.trainings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authenticated can view active trainings" ON public.trainings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage trainings" ON public.trainings FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Nominations table
CREATE TABLE public.nominations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  training_id UUID NOT NULL REFERENCES public.trainings(id) ON DELETE CASCADE,
  justification TEXT DEFAULT '',
  competency_type TEXT DEFAULT 'Core Competency',
  status TEXT NOT NULL DEFAULT 'pending',
  approved_at TIMESTAMP WITH TIME ZONE,
  disapproval_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.nominations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own nominations" ON public.nominations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own nominations" ON public.nominations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all nominations" ON public.nominations FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Supervisors can view all nominations" ON public.nominations FOR SELECT USING (public.has_role(auth.uid(), 'supervisor'));
CREATE POLICY "Admins can update nominations" ON public.nominations FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Supervisors can update nominations" ON public.nominations FOR UPDATE USING (public.has_role(auth.uid(), 'supervisor'));

-- Job Analysis Forms table
CREATE TABLE public.job_analysis_forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  position_title TEXT DEFAULT '',
  office_division TEXT DEFAULT '',
  section_unit TEXT DEFAULT '',
  alternate_position TEXT DEFAULT '',
  job_purpose TEXT DEFAULT '',
  main_duties TEXT DEFAULT '',
  secondary_duties JSONB DEFAULT '[]'::jsonb,
  required_competencies JSONB DEFAULT '[]'::jsonb,
  tools_equipment TEXT DEFAULT '',
  challenges TEXT DEFAULT '',
  additional_comments TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft',
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.job_analysis_forms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own JAF" ON public.job_analysis_forms FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own JAF" ON public.job_analysis_forms FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all JAF" ON public.job_analysis_forms FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Supervisors can view all JAF" ON public.job_analysis_forms FOR SELECT USING (public.has_role(auth.uid(), 'supervisor'));
CREATE POLICY "Supervisors can update JAF" ON public.job_analysis_forms FOR UPDATE USING (public.has_role(auth.uid(), 'supervisor'));

-- Timestamps triggers
CREATE TRIGGER update_trainings_updated_at BEFORE UPDATE ON public.trainings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_nominations_updated_at BEFORE UPDATE ON public.nominations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_jaf_updated_at BEFORE UPDATE ON public.job_analysis_forms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
