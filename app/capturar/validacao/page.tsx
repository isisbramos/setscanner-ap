'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inicializando o Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ValidacaoPage() {
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [valor, setValor] = useState('');
  const [fornecedor, setFornecedor] = useState('');

  const handleCapturaEUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMensagem('📸 Enviando foto para a nuvem...');

    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('comprovantes_nf')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('comprovantes_nf')
        .getPublicUrl(fileName);
      
      const fotoUrl = publicUrlData.publicUrl;
      setMensagem('✅ Foto salva! Gravando dados da nota...');

      const { error: dbError } = await supabase
        .from('notas_fiscais')
        .insert([
          { 
            valor_total: valor || '0', 
            fornecedor: fornecedor || 'Não informado',
            foto_url: fotoUrl,
            data_emissao: new Date().toISOString()
          }
        ]);

      if (dbError) throw dbError;

      setMensagem('🚀 Sucesso! Nota e foto salvas perfeitamente.');
      setValor('');
      setFornecedor('');

    } catch (error: any) {
      setMensagem(`❌ Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 p-6 font-sans">
      <div className="max-w-md mx-auto space-y-8 mt-10">
        
        <div>
          <h1 className="text-2xl font-light tracking-widest text-white mb-2">VALIDAÇÃO</h1>
          <p className="text-sm text-gray-500">Capture a nota fiscal do set.</p>
        </div>

        {mensagem && (
          <div className="p-4 rounded-md bg-gray-900 border border-gray-800 text-sm">
            {mensagem}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold tracking-wider text-gray-500 mb-2">FORNECEDOR</label>
            <input 
              type="text" 
              value={fornecedor}
              onChange={(e) => setFornecedor(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg p-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Ex: Padaria do Set"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wider text-gray-500 mb-2">VALOR TOTAL</label>
            <input 
              type="number" 
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg p-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="R$ 0,00"
            />
          </div>
        </div>

        {/* O TRUQUE DE MESTRE: A Label vira o botão nativo */}
        <label 
          className={`flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 rounded-lg transition-all cursor-pointer select-none active:scale-95 ${loading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          {loading ? 'Processando...' : '📷 Fotografar e Salvar'}
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            onChange={handleCapturaEUpload}
            className="hidden"
            disabled={loading}
          />
        </label>

      </div>
    </div>
  );
}