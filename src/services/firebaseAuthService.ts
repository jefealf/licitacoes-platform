import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';

export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'premium';
  avatar?: string;
  has_company: boolean;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  user_id: string;
  corporate_name: string;
  trade_name: string;
  cnpj: string;
  phone: string;
  email: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  created_at: string;
  updated_at: string;
}

export class FirebaseAuthService {
  // ===== LOGIN COM GOOGLE =====
  static async loginWithGoogle(): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      console.log('🔄 Iniciando login com Google...');

      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      console.log('✅ Login com Google realizado:', firebaseUser.email);

      // Buscar ou criar perfil do usuário
      const profileResult = await this.getOrCreateUserProfile(firebaseUser);
      if (!profileResult.success) {
        return profileResult;
      }

      return {
        success: true,
        message: 'Login realizado com sucesso!',
        user: profileResult.user
      };

    } catch (error: any) {
      console.error('❌ Erro no login com Google:', error);
      return {
        success: false,
        message: this.translateError(error.code)
      };
    }
  }

  // ===== LOGOUT =====
  static async logout(): Promise<{ success: boolean; message: string }> {
    try {
      await signOut(auth);
      console.log('✅ Logout realizado com sucesso');
      return {
        success: true,
        message: 'Logout realizado com sucesso'
      };
    } catch (error: any) {
      console.error('❌ Erro no logout:', error);
      return {
        success: false,
        message: 'Erro ao fazer logout'
      };
    }
  }

  // ===== VERIFICAR USUÁRIO ATUAL =====
  static async getCurrentUser(): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          unsubscribe(); // Parar de escutar mudanças

          if (!firebaseUser) {
            resolve({
              success: false,
              message: 'Usuário não autenticado'
            });
            return;
          }

          console.log('✅ Usuário autenticado:', firebaseUser.email);

          // Buscar perfil do usuário
          const profileResult = await this.getOrCreateUserProfile(firebaseUser);
          resolve(profileResult);
        });
      });
    } catch (error: any) {
      console.error('❌ Erro ao buscar usuário atual:', error);
      return {
        success: false,
        message: 'Erro interno do servidor'
      };
    }
  }

  // ===== MÉTODOS AUXILIARES =====

  // Buscar ou criar perfil do usuário
  private static async getOrCreateUserProfile(firebaseUser: FirebaseUser): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      // Primeiro, tentar buscar o perfil
      const profileResult = await this.getUserProfile(firebaseUser.uid);
      
      if (profileResult.success) {
        return profileResult;
      }

      // Se não encontrou, criar o perfil
      console.log('🔄 Perfil não encontrado, criando...');
      return await this.createUserProfile(firebaseUser);

    } catch (error: any) {
      console.error('❌ Erro ao buscar/criar perfil:', error);
      return {
        success: false,
        message: 'Erro ao processar perfil do usuário'
      };
    }
  }

  // Criar perfil do usuário
  private static async createUserProfile(firebaseUser: FirebaseUser): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const userData: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: firebaseUser.displayName || 'Usuário',
        plan: 'free',
        avatar: firebaseUser.photoURL || undefined,
        has_company: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Salvar no Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), userData);

      console.log('✅ Perfil criado:', userData.name);
      return {
        success: true,
        message: 'Perfil criado com sucesso',
        user: userData
      };

    } catch (error: any) {
      console.error('❌ Erro ao criar perfil:', error);
      return {
        success: false,
        message: 'Erro ao criar perfil do usuário'
      };
    }
  }

  // Buscar perfil do usuário
  private static async getUserProfile(userId: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));

      if (!userDoc.exists()) {
        return {
          success: false,
          message: 'Perfil não encontrado'
        };
      }

      const userData = userDoc.data() as User;
      return {
        success: true,
        message: 'Perfil encontrado',
        user: userData
      };

    } catch (error: any) {
      console.error('❌ Erro ao buscar perfil:', error);
      return {
        success: false,
        message: 'Erro ao buscar perfil do usuário'
      };
    }
  }

  // Traduzir mensagens de erro
  private static translateError(errorCode: string): string {
    const errorMap: { [key: string]: string } = {
      'auth/popup-closed-by-user': 'Login cancelado pelo usuário',
      'auth/popup-blocked': 'Popup bloqueado pelo navegador. Permita popups para este site.',
      'auth/cancelled-popup-request': 'Múltiplas tentativas de login detectadas',
      'auth/account-exists-with-different-credential': 'Conta já existe com credenciais diferentes',
      'auth/operation-not-allowed': 'Login com Google não está habilitado',
      'auth/user-disabled': 'Conta desabilitada',
      'auth/invalid-credential': 'Credenciais inválidas',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente em alguns minutos.',
      'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.',
      'auth/operation-not-supported-in-this-environment': 'Operação não suportada neste ambiente'
    };

    return errorMap[errorCode] || `Erro: ${errorCode}`;
  }

  // ===== MÉTODOS PARA EMPRESA =====
  
  static async saveCompany(companyData: Omit<Company, 'id' | 'created_at' | 'updated_at'>): Promise<{ success: boolean; message: string; company?: Company }> {
    try {
      const companyId = `company_${Date.now()}`;
      const company: Company = {
        id: companyId,
        ...companyData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      await setDoc(doc(db, 'companies', companyId), company);

      // Atualizar flag has_company no usuário
      await setDoc(doc(db, 'users', companyData.user_id), {
        has_company: true,
        updated_at: new Date().toISOString()
      }, { merge: true });

      return {
        success: true,
        message: 'Empresa salva com sucesso',
        company
      };

    } catch (error: any) {
      console.error('❌ Erro ao salvar empresa:', error);
      return {
        success: false,
        message: 'Erro ao salvar empresa'
      };
    }
  }

  static async getCompany(userId: string): Promise<{ success: boolean; message: string; company?: Company }> {
    try {
      const companiesRef = collection(db, 'companies');
      const q = query(companiesRef, where('user_id', '==', userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return {
          success: true,
          message: 'Nenhuma empresa encontrada',
          company: undefined
        };
      }

      const companyDoc = querySnapshot.docs[0];
      const companyData = companyDoc.data() as Company;

      return {
        success: true,
        message: 'Empresa encontrada',
        company: companyData
      };

    } catch (error: any) {
      console.error('❌ Erro ao buscar empresa:', error);
      return {
        success: false,
        message: 'Erro ao buscar empresa'
      };
    }
  }
} 