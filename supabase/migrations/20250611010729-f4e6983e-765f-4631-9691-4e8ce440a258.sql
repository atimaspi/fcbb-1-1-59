
-- Corrigir a migration anterior removendo a coluna email que não existe na tabela profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Recriar a função handle_new_user sem a coluna email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recriar o trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Criar um usuário admin de teste (você precisará registrar este email manualmente)
-- Depois de registrar admin@fcbb.cv no sistema, execute este comando para torná-lo admin:
UPDATE public.profiles 
SET role = 'admin' 
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'admin@fcbb.cv'
);

-- Adicionar política para permitir que admins vejam todos os perfis
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Adicionar política para permitir que admins criem novos perfis
CREATE POLICY "Admins can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
