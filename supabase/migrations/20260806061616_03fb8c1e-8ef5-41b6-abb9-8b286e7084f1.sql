-- Allow anonymous participants to upload their abstract PDF and profile photo
-- into the private registration-files bucket during public registration.
create policy "Public can upload registration files"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'registration-files');

-- Admins and judges can read uploaded registration files.
create policy "Staff can read registration files"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'registration-files'
  and (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'judge'))
);

-- Admins can remove registration files.
create policy "Admins can delete registration files"
on storage.objects
for delete
to authenticated
using (bucket_id = 'registration-files' and public.has_role(auth.uid(), 'admin'));