
-- Corrigir a constraint na tabela profiles com sintaxe correta
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Recriar a constraint com os valores corretos
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('admin', 'user', 'moderator', 'editor'));

-- Garantir que o trigger para criar perfis funciona corretamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Utilizador'),
    'user'
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Se houver erro, criar com valores padrão
    INSERT INTO public.profiles (id, full_name, role)
    VALUES (NEW.id, 'Utilizador', 'user')
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;

-- Garantir que o trigger existe
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
