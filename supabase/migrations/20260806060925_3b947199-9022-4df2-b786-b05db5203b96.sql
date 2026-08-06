
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'judge');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "Users can read their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- Registration ID sequence
CREATE SEQUENCE public.registration_seq START 1;

CREATE TABLE public.registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id text NOT NULL UNIQUE,
  full_name text NOT NULL,
  institution text NOT NULL,
  faculty text,
  department text,
  student_id text,
  email text NOT NULL,
  phone text NOT NULL,
  category text NOT NULL,
  track text NOT NULL,
  domain text NOT NULL,
  project_title text NOT NULL,
  project_abstract text,
  participation_type text NOT NULL DEFAULT 'individual',
  team_name text,
  team_members jsonb NOT NULL DEFAULT '[]'::jsonb,
  abstract_pdf_path text,
  profile_photo_path text,
  status text NOT NULL DEFAULT 'pending',
  checked_in_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.registrations TO authenticated;
GRANT ALL ON public.registrations TO service_role;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage registrations"
ON public.registrations FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Judges can view registrations"
ON public.registrations FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'judge'));

-- Scores
CREATE TABLE public.scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id uuid NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
  judge_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  innovation int NOT NULL DEFAULT 0,
  technical int NOT NULL DEFAULT 0,
  impact int NOT NULL DEFAULT 0,
  presentation int NOT NULL DEFAULT 0,
  comments text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (registration_id, judge_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.scores TO authenticated;
GRANT ALL ON public.scores TO service_role;
ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage scores"
ON public.scores FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Judges manage their own scores"
ON public.scores FOR ALL TO authenticated
USING (judge_id = auth.uid() AND public.has_role(auth.uid(), 'judge'))
WITH CHECK (judge_id = auth.uid() AND public.has_role(auth.uid(), 'judge'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_registrations_updated_at BEFORE UPDATE ON public.registrations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_scores_updated_at BEFORE UPDATE ON public.scores
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto registration id
CREATE OR REPLACE FUNCTION public.set_registration_id()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.registration_id IS NULL OR NEW.registration_id = '' THEN
    NEW.registration_id := 'TTE2026-' || lpad(nextval('public.registration_seq')::text, 4, '0');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_registrations_set_id BEFORE INSERT ON public.registrations
FOR EACH ROW EXECUTE FUNCTION public.set_registration_id();

ALTER TABLE public.registrations ALTER COLUMN registration_id DROP NOT NULL;
