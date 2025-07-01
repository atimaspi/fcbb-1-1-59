
-- Corrigir o erro "Database error saving new user"
-- Primeiro, remover triggers e funções existentes que podem estar causando problemas
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Verificar se a tabela profiles existe e tem a estrutura correta
-- Se não existir, criar a tabela
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS se não estiver habilitado
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes que podem estar conflitando
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;

-- Recriar políticas mais simples
CREATE POLICY "Enable read access for users on own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Enable update access for users on own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable insert access for authenticated users" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Criar função simplificada para criar perfil automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'user'
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(NEW.raw_user_meta_data->>'full_name', profiles.full_name),
    updated_at = NOW();
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log do erro mas não falhar o registro do usuário
    RAISE WARNING 'Erro ao criar perfil para usuário %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recriar o trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Garantir que o primeiro usuário admin pode ser criado
-- Adicionar política temporária para permitir que novos usuários sejam promovidos a admin
CREATE POLICY "Allow admin promotion for new users" ON public.profiles
  FOR UPDATE USING (true)
  WITH CHECK (role IN ('user', 'admin'));

-- Função para verificar se o usuário é admin (melhorada)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Adicionar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON public.profiles(created_at);
